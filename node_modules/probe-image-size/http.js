'use strict';


var ProbeError  = require('./lib/common').ProbeError;
var request     = require('request');
var merge       = require('deepmerge');
var pkg         = require('./package.json');
var probeStream = require('./stream');

var defaultAgent = pkg.name + '/' + pkg.version + '(+https://github.com/nodeca/probe-image-size)';

var defaults = {
  timeout: 60000,
  // retries: 1, // needed for `got` only, not supported by `request`
  headers: {
    'User-Agent': defaultAgent
  }
};

var P;


module.exports = function probeHttp(src, options) {
  // lazy Promise init
  P = P || require('any-promise');

  return new P(function (resolve, reject) {
    var req, length, finalUrl;

    try {
      req = request(merge.all([ { url: src }, defaults, options ]));
    } catch (err) {
      reject(err);
      return;
    }

    req.on('response', function (res) {
      if (res.statusCode !== 200) {
        var err = new ProbeError('bad status code: ' + res.statusCode, null, res.statusCode);

        req.abort();
        reject(err);

        return;
      }

      var len = res.headers['content-length'];

      if (len && len.match(/^\d+$/)) length = +len;
      finalUrl = res.request.uri.href;

      probeStream(res)
        .then(function (result) {
          if (length) result.length = length;

          result.url = finalUrl;

          resolve(result);
        })
        .catch(reject)
        .then(function () { req.abort(); });
    });

    req.on('error', function (err) {
      /* This check needed for `got` only, because it returns 404 as error.
      if (err.statusCode) {
        reject(new ProbeError('bad status code: ' + err.statusCode, null, err.statusCode));
        return;
      }*/
      reject(err);
    });
  });
};


module.exports.parsers = require('./lib/parsers_stream');
