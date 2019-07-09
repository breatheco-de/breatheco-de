#!/usr/bin/env node

'use strict';
var _ = require('lodash');
var Travis = require('../lib/travis-ci');
var domain = require('domain').create();

var coerseType = function (arg) {
    var num = parseInt(arg, 10);
    var ret;
    if (_.isNaN(num) || String(Number(num)) !== arg) {
        ret = arg;
    } else {
        ret = num;
    }
    return ret;
};

domain.on('error', function (err) {
    console.log(err.message);
});

domain.run(function () {
    // Strip off node and the file path to this file.
    var argv = _.rest(process.argv, 2);
    // Check if we should make calls to the pro server.
    var pro = _.contains(argv, '--pro');

    // Parse off arguments that are part of the function path.
    var subCommands = _.select(argv, function (arg) {
        return arg.indexOf('--') !== 0;
    });
    if (subCommands.length === 0) {
      throw new Error('no subcommand provided'); // TODO: display help
    }
    // Parse off args that will be passed as args to the function.
    var args = _(argv).select(function (arg) {
        return arg.indexOf('--') === 0;
    }).without('--pro').map(function (arg) {
        var split = arg.substr(2).split('=');
        return [split[0], coerseType(split[1])];
    }).object().value();

    var travis = new Travis({
        version: '2.0.0',
        pro: pro
    });
    var func = travis;
    // Iterate until we find the right function.
    _.each(subCommands, function (subCommand) {
        func = func[subCommand];
        if (_.isUndefined(func) || _.isNull(func)) {
            throw new Error(subCommand + ' not found');
        }
    });

    // Call the function and deliver the news.
    func.call(travis, args, function (err, res) {
        if (err) {
            throw new Error(err);
        }
        console.log(JSON.stringify(res, null, 4));
    });
});