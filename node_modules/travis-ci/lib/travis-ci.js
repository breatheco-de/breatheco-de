'use strict';

var assert = require('assert');
var url = require('url');
var _ = require('lodash');
var util = require('util');
var TravisHttp = require('./travis-http');
var GitHub = require('github');

var PARAM = ':param';
var TEMP_URI = 'tempUri';

var getRouteTree = function (routes) {
    var functions = _(routes).filter(function (route) {
        return !_.compact(route[TEMP_URI].split('/')).length;
    }).map(function (route) {
        return _.omit(route, TEMP_URI);
    }).value();
    var paths = _(routes).filter(function (route) {
        return _.compact(route[TEMP_URI].split('/')).length;
    }).groupBy(function (route) {
        var segment = _(route[TEMP_URI].split('/')).compact().first();
        return segment[0] === ':' ? PARAM : segment;
    }).value();
    _.each(paths, function (routes) {
        _.each(routes, function (route) {
            route[TEMP_URI] = _(route[TEMP_URI].split('/')).compact().rest().value().join('/');
        });
    });
    for (var prefix in paths) {
        paths[prefix] = getRouteTree(paths[prefix]);
    }
    return {
        functions: functions,
        paths: paths
    };
};

var createFunctionTree = function (context, obj, tree, url) {
    _.each(tree.functions, function (fn) {
        obj[fn.verb.toLowerCase()] = function (data, callback) {
            if (typeof data === 'function') {
                callback = data;
                data = undefined;
            }

            return context.agent.request(fn.verb, url, data, function (err, res) {
                if (err && err.error) {
                    callback(new Error(err.error.message || err.error));
                } else {
                    callback(err, res);
                }
            });
        };
    });
    _.each(tree.paths, function (subtree, prefix) {
        if (subtree.paths.hasOwnProperty(PARAM)) {
            obj[prefix] = function () {
                var args = _.toArray(arguments);
                assert(_.all(args, function (arg) {
                    return _.isString(arg) || _.isNumber(arg);
                }), 'all url parameter must be strings');

                var retSubtree = subtree;
                var retPrefix = '';
                for (var i = 0; i < args.length; ++i) {
                    assert(retSubtree.paths.hasOwnProperty(PARAM), 'too many param function arguments');
                    retSubtree = retSubtree.paths[PARAM];
                    retPrefix += '/' + args[i];
                }

                var ret = {};
                createFunctionTree(context, ret, retSubtree, url + '/' + prefix + retPrefix);
                return ret;
            };
        } else {
            obj[prefix] = {};
        }
        createFunctionTree(context, obj[prefix], subtree, url + '/' + prefix);
    });
};

var TravisClient = function (config) {
    this.pro = config.pro || false;
    this.enterprise = false;
    if (this.pro) {
        this.travisApiUrl = 'https://api.travis-ci.com';
    } else if (config.enterprise) {
        var parsedUrl = url.parse(config.enterprise);

        assert(parsedUrl.protocol && parsedUrl.host, 'Expected a valid URL, got ' + config.enterprise);

        this.travisApiUrl = parsedUrl.protocol + '//' + parsedUrl.host + '/api';
        this.enterprise = true;
    } else {
        this.travisApiUrl =  'https://api.travis-ci.org';
    }

    this.agent = new TravisHttp(this.travisApiUrl, config.headers);

    if (!config.hasOwnProperty('version')) {
        throw 'must specify api version';
    }

    var version = config.version;
    var routes = _(require('../api/v' + version + '/routes.json')).pluck('routes').flatten(true).map(function (route) {
        route[TEMP_URI] = _(route.uri.split('/')).compact().value().join('/');
        return route;
    }).value();

    createFunctionTree(this, this, getRouteTree(routes), '');
};
util.inherits(TravisClient, TravisHttp);

TravisClient.prototype._authenticateAccessToken = function (msg, callback) {
    assert(_.isObject(msg), msg);
    assert(msg.hasOwnProperty('access_token'), msg);
    assert(_.isFunction(callback));
    this.agent.request('GET', '/users', msg, function (err) {
        if (err) { return callback(err); }

        this.agent.setAccessToken(msg.access_token);
        return callback(null, msg);
    }.bind(this));
};

TravisClient.prototype._authenticateGithubToken = function (msg, callback) {
    assert(_.isObject(msg), msg);
    assert(msg.hasOwnProperty('github_token'), msg);
    assert(_.isFunction(callback));
    this.auth.github.post(msg, function (err, res) {
        if (err) { return callback(err); }

        this._authenticateAccessToken(res, callback);
    }.bind(this));
};

TravisClient.prototype._authenticateBasic = function (msg, callback) {
    assert(_.isObject(msg), msg);
    assert(msg.hasOwnProperty('username'), msg);
    assert(msg.hasOwnProperty('password'), msg);
    assert(_.isFunction(callback));
    assert(!this.enterprise, 'basic authentication cannot be used with Travis Enterprise');

    var GITHUB_TRAVIS_APP_INFO = {
        app: {
            name: 'Travis CI',
            url: 'https://travis-ci.org'
        }
    };
    var GITHUB_TRAVIS_PRO_APP_INFO = {
        app: {
            name: 'Travis CI Pro',
            url: 'https://travis-ci.com'
        }
    };

    var github = new GitHub({
        version: '3.0.0'
    });
    github.authenticate({
        type: 'basic',
        username: msg.username,
        password: msg.password
    });

    github.authorization.getAll({}, function (err, res) {
        if (err) { return callback(err); }
        var app = _.findWhere(res, this.pro ? GITHUB_TRAVIS_PRO_APP_INFO : GITHUB_TRAVIS_APP_INFO);

        if (!app) {
            return callback('travis github token not found');
        }

        this._authenticateGithubToken({
            github_token: app.token
        }, callback);
    }.bind(this));
};

TravisClient.prototype.authenticate = function (msg, callback) {
    if (!_.isFunction(callback)) {
        throw new Error('expected callback to be a function');
    }

    if (!_.isObject(msg)) {
        return callback('expected an object');
    }

    if (_.difference(_.keys(msg), ['username', 'password']).length === 0) {
        return this._authenticateBasic(msg, callback);
    } else if (_.difference(_.keys(msg), ['access_token']).length === 0) {
        return this._authenticateAccessToken(msg, callback);
    } else if (_.difference(_.keys(msg), ['github_token']).length === 0) {
        return this._authenticateGithubToken(msg, callback);
    } else {
        return callback('unexpected arguments');
    }
};

TravisClient.prototype.isAuthenticated = function () {
    return !!this._getAccessToken();
};

module.exports = TravisClient;
