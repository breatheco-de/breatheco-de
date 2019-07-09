(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["opentracing"] = factory();
	else
		root["opentracing"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _global_tracer = __webpack_require__(1);
	
	var GlobalTracer = _interopRequireWildcard(_global_tracer);
	
	var _constants = __webpack_require__(6);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _functions = __webpack_require__(7);
	
	var Functions = _interopRequireWildcard(_functions);
	
	var _noop = __webpack_require__(4);
	
	var Noop = _interopRequireWildcard(_noop);
	
	var _tags = __webpack_require__(9);
	
	var Tags = _interopRequireWildcard(_tags);
	
	var _binary_carrier = __webpack_require__(10);
	
	var _binary_carrier2 = _interopRequireDefault(_binary_carrier);
	
	var _reference = __webpack_require__(8);
	
	var _reference2 = _interopRequireDefault(_reference);
	
	var _span_context = __webpack_require__(5);
	
	var _span_context2 = _interopRequireDefault(_span_context);
	
	var _span = __webpack_require__(3);
	
	var _span2 = _interopRequireDefault(_span);
	
	var _tracer = __webpack_require__(2);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// Object.assign() is not available on Node v0.12, so implement a similar
	// function here (subset of a proper polyfill).
	function _extend(target) {
	    for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        for (var key in source) {
	            // eslint-disable-line no-restricted-syntax
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key];
	            }
	        }
	    }
	    return target;
	}
	
	// Use `module.exports` rather than `export` to avoid the need to use `.default`
	// when requiring the package in ES5 code.
	module.exports = _extend({
	    BinaryCarrier: _binary_carrier2.default,
	    Reference: _reference2.default,
	    SpanContext: _span_context2.default,
	    Span: _span2.default,
	    Tracer: _tracer2.default,
	    Tags: Tags
	}, Constants, Functions, GlobalTracer);
	
	// Initialize the noops last to avoid a dependecy cycle between the classes.
	Noop.initialize();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.initGlobalTracer = initGlobalTracer;
	exports.globalTracer = globalTracer;
	
	var _tracer = __webpack_require__(2);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var noopTracer = new _tracer2.default();
	var _globalTracer = null;
	
	// Allows direct importing/requiring of the global tracer:
	//
	// let globalTracer = require('opentracing/global');
	//      OR
	// import globalTracer from 'opentracing/global';
	//
	// Acts a bridge to the global tracer that can be safely called before the
	// global tracer is initialized. The purpose of the delegation is to avoid the
	// sometimes nearly intractible initialization order problems that can arise in
	// applications with a complex set of dependencies, while also avoiding the
	// case where
	
	var GlobalTracerDelegate = function (_Tracer) {
	    _inherits(GlobalTracerDelegate, _Tracer);
	
	    function GlobalTracerDelegate() {
	        _classCallCheck(this, GlobalTracerDelegate);
	
	        return _possibleConstructorReturn(this, Object.getPrototypeOf(GlobalTracerDelegate).apply(this, arguments));
	    }
	
	    _createClass(GlobalTracerDelegate, [{
	        key: 'startSpan',
	        value: function startSpan() {
	            var tracer = _globalTracer || noopTracer;
	            return tracer.startSpan.apply(tracer, arguments);
	        }
	    }, {
	        key: 'inject',
	        value: function inject() {
	            var tracer = _globalTracer || noopTracer;
	            return tracer.inject.apply(tracer, arguments);
	        }
	    }, {
	        key: 'extract',
	        value: function extract() {
	            var tracer = _globalTracer || noopTracer;
	            return tracer.extract.apply(tracer, arguments);
	        }
	    }]);
	
	    return GlobalTracerDelegate;
	}(_tracer2.default);
	
	var globalTracerDelegate = new GlobalTracerDelegate();
	
	/**
	 * Set the global Tracer.
	 *
	 * The behavior is undefined if this function is called more than once.
	 *
	 * @param {Tracer} tracer - the Tracer implementation
	 */
	function initGlobalTracer(tracer) {
	    _globalTracer = tracer;
	}
	
	/**
	 * Returns the global tracer.
	 */
	function globalTracer() {
	    // Return the delegate.  Since the global tracer is largely a convenience
	    // (the user can always create their own tracers), the delegate is used to
	    // give the added convenience of not needing to worry about initialization
	    // order.
	    return globalTracerDelegate;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _span = __webpack_require__(3);
	
	var _span2 = _interopRequireDefault(_span);
	
	var _span_context = __webpack_require__(5);
	
	var _span_context2 = _interopRequireDefault(_span_context);
	
	var _constants = __webpack_require__(6);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _functions = __webpack_require__(7);
	
	var Functions = _interopRequireWildcard(_functions);
	
	var _noop = __webpack_require__(4);
	
	var Noop = _interopRequireWildcard(_noop);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Tracer is the entry-point between the instrumentation API and the tracing
	 * implementation.
	 *
	 * The default object acts as a no-op implementation.
	 *
	 * Note to implementators: derived classes can choose to directly implement the
	 * methods in the "OpenTracing API methods" section, or optionally the subset of
	 * underscore-prefixed methods to pick up the argument checking and handling
	 * automatically from the base class.
	 */
	var Tracer = function () {
	    function Tracer() {
	        _classCallCheck(this, Tracer);
	    }
	
	    _createClass(Tracer, [{
	        key: 'startSpan',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Starts and returns a new Span representing a logical unit of work.
	         *
	         * For example:
	         *
	         *     // Start a new (parentless) root Span:
	         *     var parent = Tracer.startSpan('DoWork');
	         *
	         *     // Start a new (child) Span:
	         *     var child = Tracer.startSpan('Subroutine', {
	         *         childOf: parent.context(),
	         *     });
	         *
	         * @param {string} name - the name of the operation.
	         * @param {object} [fields] - the fields to set on the newly created span.
	         * @param {string} [fields.operationName] - the name to use for the newly
	         *        created span. Required if called with a single argument.
	         * @param {SpanContext} [fields.childOf] - a parent SpanContext (or Span,
	         *        for convenience) that the newly-started span will be the child of
	         *        (per REFERENCE_CHILD_OF). If specified, `fields.references` must
	         *        be unspecified.
	         * @param {array} [fields.references] - an array of Reference instances,
	         *        each pointing to a causal parent SpanContext. If specified,
	         *        `fields.childOf` must be unspecified.
	         * @param {object} [fields.tags] - set of key-value pairs which will be set
	         *        as tags on the newly created Span. Ownership of the object is
	         *        passed to the created span for efficiency reasons (the caller
	         *        should not modify this object after calling startSpan).
	         * @param {number} [fields.startTime] - a manually specified start time for
	         *        the created Span object. The time should be specified in
	         *        milliseconds as Unix timestamp. Decimal value are supported
	         *        to represent time values with sub-millisecond accuracy.
	         * @return {Span} - a new Span object.
	         */
	        value: function startSpan(name, fields) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length > 2) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (typeof name !== 'string') {
	                    throw new Error('argument expected to be a string');
	                }
	                if (name.length === 0) {
	                    throw new Error('operation name cannot be length zero');
	                }
	                if (fields && fields.childOf && fields.references) {
	                    throw new Error('At most one of `childOf` and ' + '`references` may be specified');
	                }
	                if (fields && fields.childOf && !(fields.childOf instanceof _span2.default || fields.childOf instanceof _span_context2.default)) {
	                    throw new Error('childOf must be a Span or SpanContext instance');
	                }
	            }
	
	            // Convert fields.childOf to fields.references as needed.
	            fields = fields || {};
	            if (fields.childOf) {
	                // Convert from a Span or a SpanContext into a Reference.
	                var childOf = Functions.childOf(fields.childOf);
	                if (fields.references) {
	                    fields.references.push(childOf);
	                } else {
	                    fields.references = [childOf];
	                }
	                delete fields.childOf;
	            }
	            return this._startSpan(name, fields);
	        }
	
	        /**
	         * Injects the given SpanContext instance for cross-process propagation
	         * within `carrier`. The expected type of `carrier` depends on the value of
	         * `format.
	         *
	         * OpenTracing defines a common set of `format` values (see
	         * FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS, and FORMAT_BINARY), and each has
	         * an expected carrier type.
	         *
	         * Consider this pseudocode example:
	         *
	         *     var clientSpan = ...;
	         *     ...
	         *     // Inject clientSpan into a text carrier.
	         *     var headersCarrier = {};
	         *     Tracer.inject(clientSpan.context(), Tracer.FORMAT_HTTP_HEADERS, headersCarrier);
	         *     // Incorporate the textCarrier into the outbound HTTP request header
	         *     // map.
	         *     Object.assign(outboundHTTPReq.headers, headersCarrier);
	         *     // ... send the httpReq
	         *
	         * @param  {SpanContext} spanContext - the SpanContext to inject into the
	         *         carrier object. As a convenience, a Span instance may be passed
	         *         in instead (in which case its .context() is used for the
	         *         inject()).
	         * @param  {string} format - the format of the carrier.
	         * @param  {any} carrier - see the documentation for the chosen `format`
	         *         for a description of the carrier object.
	         */
	
	    }, {
	        key: 'inject',
	        value: function inject(spanContext, format, carrier) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 3) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (!(spanContext instanceof _span_context2.default || spanContext instanceof _span2.default)) {
	                    throw new Error('first argument must be a SpanContext or Span instance');
	                }
	                if (typeof format !== 'string') {
	                    throw new Error('format expected to be a string. Found: ' + typeof format);
	                }
	                if (format === Constants.FORMAT_TEXT_MAP && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for FORMAT_TEXT_MAP');
	                }
	                if (format === Constants.FORMAT_HTTP_HEADERS && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for FORMAT_HTTP_HEADERS');
	                }
	                if (format === Constants.FORMAT_BINARY && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for FORMAT_BINARY');
	                }
	            }
	
	            // Allow the user to pass a Span instead of a SpanContext
	            if (spanContext instanceof _span2.default) {
	                spanContext = spanContext.context();
	            }
	            return this._inject(spanContext, format, carrier);
	        }
	
	        /**
	         * Returns a SpanContext instance extracted from `carrier` in the given
	         * `format`.
	         *
	         * OpenTracing defines a common set of `format` values (see
	         * FORMAT_TEXT_MAP, FORMAT_HTTP_HEADERS, and FORMAT_BINARY), and each has
	         * an expected carrier type.
	         *
	         * Consider this pseudocode example:
	         *
	         *     // Use the inbound HTTP request's headers as a text map carrier.
	         *     var headersCarrier = inboundHTTPReq.headers;
	         *     var wireCtx = Tracer.extract(Tracer.FORMAT_HTTP_HEADERS, headersCarrier);
	         *     var serverSpan = Tracer.startSpan('...', { childOf : wireCtx });
	         *
	         * @param  {string} format - the format of the carrier.
	         * @param  {any} carrier - the type of the carrier object is determined by
	         *         the format.
	         * @return {SpanContext}
	         *         The extracted SpanContext, or null if no such SpanContext could
	         *         be found in `carrier`
	         */
	
	    }, {
	        key: 'extract',
	        value: function extract(format, carrier) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (typeof format !== 'string' || !format.length) {
	                    throw new Error('format is expected to be a string of non-zero length');
	                }
	                if (format === Constants.FORMAT_TEXT_MAP && !(typeof carrier === 'object')) {
	                    throw new Error('Unexpected carrier object for FORMAT_TEXT_MAP');
	                }
	                if (format === Constants.FORMAT_HTTP_HEADERS && !(typeof carrier === 'object')) {
	                    throw new Error('Unexpected carrier object for FORMAT_HTTP_HEADERS');
	                }
	                if (format === Constants.FORMAT_BINARY) {
	                    if (carrier.buffer !== undefined && typeof carrier.buffer !== 'object') {
	                        throw new Error('Unexpected carrier object for FORMAT_BINARY');
	                    }
	                }
	            }
	            return this._extract(format, carrier);
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Derived classes can choose to implement the below
	        // ---------------------------------------------------------------------- //
	
	        // NOTE: the input to this method is *always* an associative array. The
	        // public-facing startSpan() method normalizes the arguments so that
	        // all N implementations do not need to worry about variations in the call
	        // signature.
	        //
	        // The default behavior returns a no-op span.
	
	    }, {
	        key: '_startSpan',
	        value: function _startSpan(name, fields) {
	            return Noop.span;
	        }
	
	        // The default behavior is a no-op.
	
	    }, {
	        key: '_inject',
	        value: function _inject(spanContext, format, carrier) {}
	
	        // The default behavior is to return null.
	
	    }, {
	        key: '_extract',
	        value: function _extract(format, carrier) {
	            return Noop.spanContext;
	        }
	    }]);
	
	    return Tracer;
	}();
	
	exports.default = Tracer;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _noop = __webpack_require__(4);
	
	var noop = _interopRequireWildcard(_noop);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Span represents a logical unit of work as part of a broader Trace. Examples
	 * of span might include remote procedure calls or a in-process function calls
	 * to sub-components. A Trace has a single, top-level "root" Span that in turn
	 * may have zero or more child Spans, which in turn may have children.
	 */
	var Span = function () {
	    function Span() {
	        _classCallCheck(this, Span);
	    }
	
	    _createClass(Span, [{
	        key: 'context',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Returns the SpanContext object associated with this Span.
	         *
	         * @return {SpanContext}
	         */
	        value: function context() {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 0) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	
	            return this._context();
	        }
	
	        /**
	         * Returns the Tracer object used to create this Span.
	         *
	         * @return {Tracer}
	         */
	
	    }, {
	        key: 'tracer',
	        value: function tracer() {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 0) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	
	            return this._tracer();
	        }
	
	        /**
	         * Sets the string name for the logical operation this span represents.
	         *
	         * @param {string} name
	         */
	
	    }, {
	        key: 'setOperationName',
	        value: function setOperationName(name) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof name !== 'string' || name.length === 0) {
	                    throw new Error('Name must be a string of length > 0');
	                }
	            }
	
	            this._setOperationName(name);
	            return this;
	        }
	
	        /**
	         * Sets a key:value pair on this Span that also propagates to future
	         * children of the associated Span.
	         *
	         * setBaggageItem() enables powerful functionality given a full-stack
	         * opentracing integration (e.g., arbitrary application data from a web
	         * client can make it, transparently, all the way into the depths of a
	         * storage system), and with it some powerful costs: use this feature with
	         * care.
	         *
	         * IMPORTANT NOTE #1: setBaggageItem() will only propagate baggage items to
	         * *future* causal descendants of the associated Span.
	         *
	         * IMPORTANT NOTE #2: Use this thoughtfully and with care. Every key and
	         * value is copied into every local *and remote* child of the associated
	         * Span, and that can add up to a lot of network and cpu overhead.
	         *
	         * @param {string} key
	         * @param {string} value
	         */
	
	    }, {
	        key: 'setBaggageItem',
	        value: function setBaggageItem(key, value) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	
	            this._setBaggageItem(key, value);
	            return this;
	        }
	
	        /**
	         * Returns the value for a baggage item given its key.
	         *
	         * @param  {string} key
	         *         The key for the given trace attribute.
	         * @return {string}
	         *         String value for the given key, or undefined if the key does not
	         *         correspond to a set trace attribute.
	         */
	
	    }, {
	        key: 'getBaggageItem',
	        value: function getBaggageItem(key) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	
	            return this._getBaggageItem(key);
	        }
	
	        /**
	         * Adds a single tag to the span.  See `addTags()` for details.
	         *
	         * @param {string} key
	         * @param {any} value
	         */
	
	    }, {
	        key: 'setTag',
	        value: function setTag(key, value) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof key !== 'string') {
	                    throw new Error('Tag key must be a string');
	                }
	            }
	
	            // NOTE: the call is normalized to a call to _addTags()
	            this._addTags(_defineProperty({}, key, value));
	            return this;
	        }
	
	        /**
	         * Adds the given key value pairs to the set of span tags.
	         *
	         * Multiple calls to addTags() results in the tags being the superset of
	         * all calls.
	         *
	         * The behavior of setting the same key multiple times on the same span
	         * is undefined.
	         *
	         * The supported type of the values is implementation-dependent.
	         * Implementations are expected to safely handle all types of values but
	         * may choose to ignore unrecognized / unhandle-able values (e.g. objects
	         * with cyclic references, function objects).
	         *
	         * @return {[type]} [description]
	         */
	
	    }, {
	        key: 'addTags',
	        value: function addTags(keyValueMap) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof keyValueMap !== 'object') {
	                    throw new Error('Invalid argument type');
	                }
	            }
	
	            this._addTags(keyValueMap);
	            return this;
	        }
	
	        /**
	         * Add a log record to this Span, optionally at a user-provided timestamp.
	         *
	         * For example:
	         *
	         *     span.log({
	         *         size: rpc.size(),  // numeric value
	         *         URI: rpc.URI(),  // string value
	         *         payload: rpc.payload(),  // Object value
	         *         "keys can be arbitrary strings": rpc.foo(),
	         *     });
	         *
	         *     span.log({
	         *         "error.description": someError.description(),
	         *     }, someError.timestampMillis());
	         *
	         * @param {object} keyValuePairs
	         *        An object mapping string keys to arbitrary value types. All
	         *        Tracer implementations should support bool, string, and numeric
	         *        value types, and some may also support Object values.
	         * @param {number} timestamp
	         *        An optional parameter specifying the timestamp in milliseconds
	         *        since the Unix epoch. Fractional values are allowed so that
	         *        timestamps with sub-millisecond accuracy can be represented. If
	         *        not specified, the implementation is expected to use its notion
	         *        of the current time of the call.
	         */
	
	    }, {
	        key: 'log',
	        value: function log(keyValuePairs, timestamp) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length > 2 || arguments.length === 0) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (arguments.length === 2) {
	                    if (typeof timestamp !== 'number') {
	                        throw new Error('Expected timestamp to be a number');
	                    }
	                }
	                if (typeof keyValuePairs !== 'object') {
	                    throw new Error('Expected keyValuePairs to be an object');
	                }
	            }
	
	            this._log(keyValuePairs, timestamp);
	            return this;
	        }
	
	        /**
	         * DEPRECATED
	         */
	
	    }, {
	        key: 'logEvent',
	        value: function logEvent(eventName, payload) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length > 2 || arguments.length < 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof eventName !== 'string') {
	                    throw new Error('Expected eventName to be a string');
	                }
	                if (payload !== undefined && typeof payload !== 'object') {
	                    throw new Error('Expected payload to be an object');
	                }
	            }
	
	            return this._log({
	                event: eventName,
	                payload: payload
	            });
	        }
	
	        /**
	         * Sets the end timestamp and finalizes Span state.
	         *
	         * With the exception of calls to Span.context() (which are always allowed),
	         * finish() must be the last call made to any span instance, and to do
	         * otherwise leads to undefined behavior.
	         *
	         * @param  {number} finishTime
	         *         Optional finish time in milliseconds as a Unix timestamp. Decimal
	         *         values are supported for timestamps with sub-millisecond accuracy.
	         *         If not specified, the current time (as defined by the
	         *         implementation) will be used.
	         */
	
	    }, {
	        key: 'finish',
	        value: function finish(finishTime) {
	            // Debug-only runtime checks on the arguments
	            if (true) {
	                if (arguments.length > 1) {
	                    throw new Error('Invalid arguments');
	                }
	                if (arguments.length === 1 && typeof finishTime !== 'number') {
	                    throw new Error('Unexpected argument type');
	                }
	            }
	
	            this._finish(finishTime);
	
	            // Do not return `this`. The Span generally should not be used after it
	            // is finished so chaining is not desired in this context.
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Derived classes can choose to implement the below
	        // ---------------------------------------------------------------------- //
	
	        // By default returns a no-op SpanContext.
	
	    }, {
	        key: '_context',
	        value: function _context() {
	            return noop.spanContext;
	        }
	
	        // By default returns a no-op tracer.
	        //
	        // The base class could store the tracer that created it, but it does not
	        // in order to ensure the no-op span implementation has zero members,
	        // which allows V8 to aggressively optimize calls to such objects.
	
	    }, {
	        key: '_tracer',
	        value: function _tracer() {
	            return noop.tracer;
	        }
	
	        // By default does nothing
	
	    }, {
	        key: '_setOperationName',
	        value: function _setOperationName(name) {}
	
	        // By default does nothing
	
	    }, {
	        key: '_setBaggageItem',
	        value: function _setBaggageItem(key, value) {}
	
	        // By default does nothing
	
	    }, {
	        key: '_getBaggageItem',
	        value: function _getBaggageItem(key) {}
	
	        // By default does nothing
	        //
	        // NOTE: both setTag() and addTags() map to this function. keyValuePairs
	        // will always be an associative array.
	
	    }, {
	        key: '_addTags',
	        value: function _addTags(keyValuePairs) {}
	
	        // By default does nothing
	
	    }, {
	        key: '_log',
	        value: function _log(keyValuePairs, timestamp) {}
	
	        // By default does nothing
	        //
	        // finishTime is expected to be either a number or undefined.
	
	    }, {
	        key: '_finish',
	        value: function _finish(finishTime) {}
	    }]);
	
	    return Span;
	}();
	
	exports.default = Span;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.span = exports.spanContext = exports.tracer = undefined;
	exports.initialize = initialize;
	
	var _tracer = __webpack_require__(2);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	var _span_context = __webpack_require__(5);
	
	var _span_context2 = _interopRequireDefault(_span_context);
	
	var _span = __webpack_require__(3);
	
	var _span2 = _interopRequireDefault(_span);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint-disable import/no-mutable-exports */
	var tracer = exports.tracer = null;
	var spanContext = exports.spanContext = null;
	var span = exports.span = null;
	/* eslint-enable import/no-mutable-exports */
	
	// Deferred initialization to avoid a dependency cycle where Tracer depends on
	// Span which depends on the noop tracer.
	function initialize() {
	    exports.tracer = tracer = new _tracer2.default();
	    exports.span = span = new _span2.default();
	    exports.spanContext = spanContext = new _span_context2.default();
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * SpanContext represents Span state that must propagate to descendant Spans
	 * and across process boundaries.
	 *
	 * SpanContext is logically divided into two pieces: the user-level "Baggage"
	 * (see setBaggageItem and getBaggageItem) that propagates across Span
	 * boundaries and any Tracer-implementation-specific fields that are needed to
	 * identify or otherwise contextualize the associated Span instance (e.g., a
	 * <trace_id, span_id, sampled> tuple).
	 */
	var SpanContext = function SpanContext() {
	  _classCallCheck(this, SpanContext);
	};
	
	exports.default = SpanContext;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * The FORMAT_BINARY format represents SpanContexts in an opaque binary
	 * carrier.
	 *
	 * Tracer.inject() will set the buffer field to an Array-like (Array,
	 * ArrayBuffer, or TypedBuffer) object containing the injected binary data.
	 * Any valid Object can be used as long as the buffer field of the object
	 * can be set.
	 *
	 * Tracer.extract() will look for `carrier.buffer`, and that field is
	 * expected to be an Array-like object (Array, ArrayBuffer, or
	 * TypedBuffer).
	 */
	var FORMAT_BINARY = exports.FORMAT_BINARY = 'binary';
	
	/**
	 * The FORMAT_TEXT_MAP format represents SpanContexts using a
	 * string->string map (backed by a Javascript Object) as a carrier.
	 *
	 * NOTE: Unlike FORMAT_HTTP_HEADERS, FORMAT_TEXT_MAP places no restrictions
	 * on the characters used in either the keys or the values of the map
	 * entries.
	 *
	 * The FORMAT_TEXT_MAP carrier map may contain unrelated data (e.g.,
	 * arbitrary gRPC metadata); as such, the Tracer implementation should use
	 * a prefix or other convention to distinguish Tracer-specific key:value
	 * pairs.
	 */
	var FORMAT_TEXT_MAP = exports.FORMAT_TEXT_MAP = 'text_map';
	
	/**
	 * The FORMAT_HTTP_HEADERS format represents SpanContexts using a
	 * character-restricted string->string map (backed by a Javascript Object)
	 * as a carrier.
	 *
	 * Keys and values in the FORMAT_HTTP_HEADERS carrier must be suitable for
	 * use as HTTP headers (without modification or further escaping). That is,
	 * the keys have a greatly restricted character set, casing for the keys
	 * may not be preserved by various intermediaries, and the values should be
	 * URL-escaped.
	 *
	 * The FORMAT_HTTP_HEADERS carrier map may contain unrelated data (e.g.,
	 * arbitrary HTTP headers); as such, the Tracer implementation should use a
	 * prefix or other convention to distinguish Tracer-specific key:value
	 * pairs.
	 */
	var FORMAT_HTTP_HEADERS = exports.FORMAT_HTTP_HEADERS = 'http_headers';
	
	/**
	 * A Span may be the "child of" a parent Span. In a “child of” reference,
	 * the parent Span depends on the child Span in some capacity.
	 *
	 * See more about reference types at http://opentracing.io/spec/
	 */
	var REFERENCE_CHILD_OF = exports.REFERENCE_CHILD_OF = 'child_of';
	
	/**
	 * Some parent Spans do not depend in any way on the result of their child
	 * Spans. In these cases, we say merely that the child Span “follows from”
	 * the parent Span in a causal sense.
	 *
	 * See more about reference types at http://opentracing.io/spec/
	 */
	var REFERENCE_FOLLOWS_FROM = exports.REFERENCE_FOLLOWS_FROM = 'follows_from';

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.childOf = childOf;
	exports.followsFrom = followsFrom;
	
	var _constants = __webpack_require__(6);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _span = __webpack_require__(3);
	
	var _span2 = _interopRequireDefault(_span);
	
	var _reference = __webpack_require__(8);
	
	var _reference2 = _interopRequireDefault(_reference);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * Return a new REFERENCE_CHILD_OF reference.
	 *
	 * @param {SpanContext} spanContext - the parent SpanContext instance to
	 *        reference.
	 * @return a REFERENCE_CHILD_OF reference pointing to `spanContext`
	 */
	function childOf(spanContext) {
	    // Allow the user to pass a Span instead of a SpanContext
	    if (spanContext instanceof _span2.default) {
	        spanContext = spanContext.context();
	    }
	    return new _reference2.default(Constants.REFERENCE_CHILD_OF, spanContext);
	}
	
	/**
	 * Return a new REFERENCE_FOLLOWS_FROM reference.
	 *
	 * @param {SpanContext} spanContext - the parent SpanContext instance to
	 *        reference.
	 * @return a REFERENCE_FOLLOWS_FROM reference pointing to `spanContext`
	 */
	function followsFrom(spanContext) {
	    // Allow the user to pass a Span instead of a SpanContext
	    if (spanContext instanceof _span2.default) {
	        spanContext = spanContext.context();
	    }
	    return new _reference2.default(Constants.REFERENCE_FOLLOWS_FROM, spanContext);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _span = __webpack_require__(3);
	
	var _span2 = _interopRequireDefault(_span);
	
	var _span_context = __webpack_require__(5);
	
	var _span_context2 = _interopRequireDefault(_span_context);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Reference pairs a reference type constant (e.g., REFERENCE_CHILD_OF or
	 * REFERENCE_FOLLOWS_FROM) with the SpanContext it points to.
	 *
	 * See the exported childOf() and followsFrom() functions at the package level.
	 */
	var Reference = function () {
	    _createClass(Reference, [{
	        key: 'type',
	
	
	        /**
	         * @return {string} The Reference type (e.g., REFERENCE_CHILD_OF or
	         *         REFERENCE_FOLLOWS_FROM).
	         */
	        value: function type() {
	            return this._type;
	        }
	
	        /**
	         * @return {SpanContext} The SpanContext being referred to (e.g., the
	         *         parent in a REFERENCE_CHILD_OF Reference).
	         */
	
	    }, {
	        key: 'referencedContext',
	        value: function referencedContext() {
	            return this._referencedContext;
	        }
	
	        /**
	         * Initialize a new Reference instance.
	         *
	         * @param {string} type - the Reference type constant (e.g.,
	         *        REFERENCE_CHILD_OF or REFERENCE_FOLLOWS_FROM).
	         * @param {SpanContext} referencedContext - the SpanContext being referred
	         *        to. As a convenience, a Span instance may be passed in instead
	         *        (in which case its .context() is used here).
	         */
	
	    }]);
	
	    function Reference(type, referencedContext) {
	        _classCallCheck(this, Reference);
	
	        if (true) {
	            if (!(referencedContext instanceof _span_context2.default || referencedContext instanceof _span2.default)) {
	                throw new Error('referencedContext must be a Span or SpanContext instance');
	            }
	        }
	        this._type = type;
	        this._referencedContext = referencedContext instanceof _span2.default ? referencedContext.context() : referencedContext;
	    }
	
	    return Reference;
	}();
	
	exports.default = Reference;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	
	    /** ------------------------------------------------------------------------
	    * SPAN_KIND hints at relationship between spans, e.g. client/server
	    * --------------------------------------------------------------------------*/
	    SPAN_KIND: 'span.kind',
	
	    // Marks a span representing the client-side of an RPC or other remote call
	    SPAN_KIND_RPC_CLIENT: 'client',
	
	    // Marks a span representing the server-side of an RPC or other remote call
	    SPAN_KIND_RPC_SERVER: 'server',
	
	    /** ------------------------------------------------------------------------
	    * ERROR (boolean) indicates whether a Span ended in an error state.
	    * --------------------------------------------------------------------------*/
	    ERROR: 'error',
	
	    /** ------------------------------------------------------------------------
	    * COMPONENT (string) ia s low-cardinality identifier of the module, library,
	    * or package that is generating a span.
	    * --------------------------------------------------------------------------*/
	    COMPONENT: 'component',
	
	    /** ------------------------------------------------------------------------
	    * SAMPLING_PRIORITY (number) determines the priority of sampling this Span.
	    * --------------------------------------------------------------------------*/
	    SAMPLING_PRIORITY: 'sampling.priority',
	
	    /** ------------------------------------------------------------------------
	    * PEER_* tags can be emitted by either client-side of server-side to describe
	    * the other side/service in a peer-to-peer communications, like an RPC call.
	    * ---------------------------------------------------------------------------*/
	
	    // PEER_SERVICE (string) records the service name of the peer
	    PEER_SERVICE: 'peer.service',
	
	    // PEER_HOSTNAME records the host name of the peer
	    PEER_HOSTNAME: 'peer.hostname',
	
	    // PEER_HOST_IPV4 (number) records IP v4 host address of the peer
	    PEER_HOST_IPV4: 'peer.ipv4',
	
	    // PEER_HOST_IPV6 (string) records IP v6 host address of the peer
	    PEER_HOST_IPV6: 'peer.ipv6',
	
	    // PEER_PORT (number) records port number of the peer
	    PEER_PORT: 'peer.port',
	
	    /** ------------------------------------------------------------------------
	    * HTTP tags
	    * ---------------------------------------------------------------------------*/
	
	    // HTTP_URL (string) should be the URL of the request being handled in this
	    // segment of the trace, in standard URI format. The protocol is optional.
	    HTTP_URL: 'http.url',
	
	    // HTTP_METHOD (string) is the HTTP method of the request.
	    // Both upper/lower case values are allowed.
	    HTTP_METHOD: 'http.method',
	
	    // HTTP_STATUS_CODE (number) is the numeric HTTP status code (200, 404, etc)
	    // of the HTTP response.
	    HTTP_STATUS_CODE: 'http.status_code'
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Convenience class to use as a binary carrier.
	 *
	 * Any valid Object with a field named `buffer` may be used as a binary carrier;
	 * this class is only one such type of object that can be used.
	 */
	var BinaryCarrier = function BinaryCarrier(binaryData) {
	    _classCallCheck(this, BinaryCarrier);
	
	    this._buffer = binaryData;
	};
	
	exports.default = BinaryCarrier;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=opentracing-browser.js.map