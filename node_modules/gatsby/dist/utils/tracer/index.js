"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const slash = require(`slash`);

const path = require(`path`);

const opentracing = require(`opentracing`);

let tracerProvider;
/**
 * tracerFile should be a js file that exports two functions.
 *
 * `create` - Create and return an open-tracing compatible tracer. See
 * https://github.com/opentracing/opentracing-javascript/blob/master/src/tracer.ts
 *
 * `stop` - Run any tracer cleanup required before the node.js process
 * exits
 */

function initTracer(tracerFile) {
  let tracer;

  if (tracerFile) {
    const resolvedPath = slash(path.resolve(tracerFile));
    tracerProvider = require(resolvedPath);
    tracer = tracerProvider.create();
  } else {
    tracer = new opentracing.Tracer(); // Noop
  }

  opentracing.initGlobalTracer(tracer);
  return tracer;
}

function stopTracer() {
  return _stopTracer.apply(this, arguments);
}

function _stopTracer() {
  _stopTracer = (0, _asyncToGenerator2.default)(function* () {
    if (tracerProvider && tracerProvider.stop) {
      yield tracerProvider.stop();
    }
  });
  return _stopTracer.apply(this, arguments);
}

module.exports = {
  initTracer,
  stopTracer
};
//# sourceMappingURL=index.js.map