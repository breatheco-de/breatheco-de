'use strict';

var request = require('request');

var TravisHttp = function (endpoint, headers) {
    this._endpoint = endpoint;
    this._headers = headers ? JSON.parse(JSON.stringify(headers)) : {};
};

TravisHttp.prototype._getHeaders = function () {
    var headers = JSON.parse(JSON.stringify(this._headers));
    headers.Accept = 'application/vnd.travis-ci.2+json, */*; q=0.01';
    if (this._getAccessToken()) {
        headers.Authorization = 'token ' + this._getAccessToken();
    }
    return headers;
};

TravisHttp.prototype.request = function (method, path, data, callback) {
    if (typeof data === 'function') {
        callback = data;
        data = undefined;
    }

    var options = {
        method: method,
        url: this._endpoint + path,
        headers: this._getHeaders()
    };

    if (data instanceof Buffer) {
        options.body = data;
    } else {
        options.json = data || true;
    }
    return request(options, function (err, res) {
        if (err) {
            return callback(err);
        }

        if (res.headers['content-type'] === 'application/json' && !options.json) {
            res.body = JSON.parse(res.body);
        }

        if (res.statusCode >= 400) {
            callback(res.body || res.statusCode);
        } else {
            callback(null, res.body);
        }
    });
};

TravisHttp.prototype.setAccessToken = function (accessToken) {
    this._accessToken = accessToken;
};

TravisHttp.prototype._getAccessToken = function () {
    return this._accessToken;
};

module.exports = TravisHttp;
