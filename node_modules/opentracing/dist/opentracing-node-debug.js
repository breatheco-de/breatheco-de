require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
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
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _singleton = __webpack_require__(2);
	
	var _singleton2 = _interopRequireDefault(_singleton);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = new _singleton2.default();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracer = __webpack_require__(3);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	var _constants = __webpack_require__(6);
	
	var Constants = _interopRequireWildcard(_constants);
	
	var _binary_carrier = __webpack_require__(8);
	
	var _binary_carrier2 = _interopRequireDefault(_binary_carrier);
	
	var _reference = __webpack_require__(7);
	
	var _reference2 = _interopRequireDefault(_reference);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The Singleton object is the default export of the package and extends the
	 * standard Tracer object so that the default
	 * exported object of the package can be conveniently be used both as the
	 * default tracer and an interface to the library.
	 */
	var Singleton = function (_Tracer) {
	    _inherits(Singleton, _Tracer);
	
	    _createClass(Singleton, [{
	        key: 'initGlobalTracer',
	
	
	        // ---------------------------------------------------------------------- //
	        // OpenTracing API methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Set the global Tracer's underlying implementation.
	         *
	         * The behavior is undefined if this function is called more than once.
	         *
	         * @param {TracerImp} tracerImp - the Tracer implementation object
	         */
	        value: function initGlobalTracer(tracerImp) {
	            this._imp = tracerImp;
	
	            // Provide the implementation with a handle to the interface. This can
	            // also be used a post-initialization signal.
	            if (tracerImp) {
	                tracerImp.setInterface(this);
	            }
	        }
	
	        /**
	         * Create a new Tracer object with the given underlying implementation.
	         *
	         * @return {Tracer} a new Tracer object
	         */
	
	    }, {
	        key: 'initNewTracer',
	        value: function initNewTracer(tracerImp) {
	            var tracer = new _tracer2.default(tracerImp);
	            if (tracerImp) {
	                tracerImp.setInterface(this);
	            }
	            return tracer;
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private and non-standard methods
	        // ---------------------------------------------------------------------- //
	
	        /* For internal use only:
	         *
	         * Creates the Singleton with no underlying implementation (i.e. defaults
	         * to no-op behavior for all functions).
	         *
	         * The OpenTracing package-level object acts both at the singleton and the
	         * package interface itself, so this Singleton is both a the Tracer and
	         * also includes all the global library symbols.
	         *
	         * Note: this should never be called directly by consumers of the library.
	         */
	
	    }]);
	
	    function Singleton() {
	        _classCallCheck(this, Singleton);
	
	        // Merge the constants into the singleton object so they are accessible at the
	        // package level.
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Singleton).call(this));
	
	        for (var key in Constants) {
	            // eslint-disable-line no-restricted-syntax
	            _this[key] = Constants[key];
	        }
	        _this.Reference = _reference2.default;
	
	        // Carrier objects to be exposed at the package level
	        _this.BinaryCarrier = _binary_carrier2.default;
	        return _this;
	    }
	
	    return Singleton;
	}(_tracer2.default);
	
	exports.default = Singleton;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _span = __webpack_require__(4);
	
	var _span2 = _interopRequireDefault(_span);
	
	var _span_context = __webpack_require__(5);
	
	var _span_context2 = _interopRequireDefault(_span_context);
	
	var _constants = __webpack_require__(6);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _reference = __webpack_require__(7);
	
	var _reference2 = _interopRequireDefault(_reference);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Tracer is the entry-point between the instrumentation API and the tracing
	 * implementation.
	 *
	 * The default object acts as a no-op implementation.
	 */
	var Tracer = function () {
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
	         *         reference: Tracer.childOf(parent.context()),
	         *     });
	         *
	         * @param {string|object} nameOrFields - if the given argument is a
	         *        string, it is the name of the operation and the second `fields`
	         *        argument is optional. If it is an object, it is treated as the
	         *        fields argument and a second argument should not be provided.
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
	        value: function startSpan(nameOrFields, fields) {
	            if (true) {
	                if (arguments.length > 2) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (typeof nameOrFields !== 'string' && typeof nameOrFields !== 'object') {
	                    throw new Error('argument expected to be a string or object');
	                }
	                if (typeof nameOrFields === 'string' && nameOrFields.length === 0) {
	                    throw new Error('operation name cannot be length zero');
	                }
	                if (typeof nameOrFields === 'object') {
	                    if (arguments.length !== 1) {
	                        throw new Error('Unexpected number of arguments');
	                    }
	                    if (nameOrFields === null) {
	                        throw new Error('fields should not be null');
	                    }
	                    if (!nameOrFields.operationName) {
	                        throw new Error('operationName is a required parameter');
	                    }
	                }
	            }
	
	            var spanImp = null;
	            if (this._imp) {
	                // Normalize the argument so the implementation is always provided
	                // an associative array of fields.
	                if (arguments.length === 1) {
	                    if (typeof nameOrFields === 'string') {
	                        fields = {
	                            operationName: nameOrFields
	                        };
	                    } else {
	                        fields = nameOrFields;
	                    }
	                } else {
	                    fields.operationName = nameOrFields;
	                }
	                if (true) {
	                    if (fields.childOf && fields.references) {
	                        throw new Error('At most one of `childOf` and ' + '`references` may be specified');
	                    }
	                    if (fields.childOf && !(fields.childOf instanceof _span2.default || fields.childOf instanceof _span_context2.default)) {
	                        throw new Error('childOf must be a Span or SpanContext instance');
	                    }
	                }
	                // Convert fields.childOf to fields.references as needed.
	                if (fields.childOf) {
	                    // Convert from a Span or a SpanContext into a Reference.
	                    var childOf = this.childOf(fields.childOf);
	                    if (fields.references) {
	                        fields.references.push(childOf);
	                    } else {
	                        fields.references = [childOf];
	                    }
	                    delete fields.childOf;
	                }
	                spanImp = this._imp.startSpan(fields);
	            }
	            return new _span2.default(spanImp);
	        }
	
	        /**
	         * Return a new REFERENCE_CHILD_OF reference.
	         *
	         * @param {SpanContext} spanContext - the parent SpanContext instance to
	         *        reference.
	         * @return a REFERENCE_CHILD_OF reference pointing to `spanContext`
	         */
	
	    }, {
	        key: 'childOf',
	        value: function childOf(spanContext) {
	            return new _reference2.default(_constants2.default.REFERENCE_CHILD_OF, spanContext);
	        }
	
	        /**
	         * Return a new REFERENCE_FOLLOWS_FROM reference.
	         *
	         * @param {SpanContext} spanContext - the parent SpanContext instance to
	         *        reference.
	         * @return a REFERENCE_FOLLOWS_FROM reference pointing to `spanContext`
	         */
	
	    }, {
	        key: 'followsFrom',
	        value: function followsFrom(spanContext) {
	            return new _reference2.default(_constants2.default.REFERENCE_FOLLOWS_FROM, spanContext);
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
	                if (format === _constants2.default.FORMAT_TEXT_MAP && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for FORMAT_TEXT_MAP');
	                }
	                if (format === _constants2.default.FORMAT_HTTP_HEADERS && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for FORMAT_HTTP_HEADERS');
	                }
	                if (format === _constants2.default.FORMAT_BINARY && typeof carrier !== 'object') {
	                    throw new Error('Unexpected carrier object for FORMAT_BINARY');
	                }
	            }
	
	            if (this._imp) {
	                // Allow the user to pass a Span instead of a SpanContext
	                if (spanContext instanceof _span2.default) {
	                    spanContext = spanContext.context();
	                }
	                this._imp.inject(spanContext._imp, format, carrier);
	            }
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
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments.');
	                }
	                if (typeof format !== 'string' || !format.length) {
	                    throw new Error('format is expected to be a string of non-zero length');
	                }
	                if (format === _constants2.default.FORMAT_TEXT_MAP && !(typeof carrier === 'object')) {
	                    throw new Error('Unexpected carrier object for FORMAT_TEXT_MAP');
	                }
	                if (format === _constants2.default.FORMAT_HTTP_HEADERS && !(typeof carrier === 'object')) {
	                    throw new Error('Unexpected carrier object for FORMAT_HTTP_HEADERS');
	                }
	                if (format === _constants2.default.FORMAT_BINARY) {
	                    if (carrier.buffer !== undefined && typeof carrier.buffer !== 'object') {
	                        throw new Error('Unexpected carrier object for FORMAT_BINARY');
	                    }
	                }
	            }
	            var spanContextImp = null;
	            if (this._imp) {
	                spanContextImp = this._imp.extract(format, carrier);
	            }
	            if (spanContextImp !== null) {
	                return new _span_context2.default(spanContextImp);
	            }
	            return null;
	        }
	
	        /**
	         * Request that any buffered or in-memory data is flushed out of the process.
	         *
	         * @param {function(err: objectg)} done - optional callback function with
	         *        the signature `function(err)` that will be called as soon as the
	         *        flush completes. `err` should be null or undefined if the flush
	         *        was successful.
	         */
	
	    }, {
	        key: 'flush',
	        value: function flush(done) {
	            if (true) {
	                if (arguments.length > 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (done !== undefined && typeof done !== 'function') {
	                    throw new Error('callback expected to be a function');
	                }
	            }
	            if (!this._imp) {
	                done(null);
	                return;
	            }
	            this._imp.flush(done);
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private and non-standard methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Note: this constructor should not be called directly by consumers of this
	         * code. The singleton's initNewTracer() method should be invoked instead.
	         */
	
	    }]);
	
	    function Tracer(imp) {
	        _classCallCheck(this, Tracer);
	
	        this._imp = imp || null;
	    }
	
	    /**
	     * Handle to implementation object.
	     *
	     * Use of this method is discouraged as it greatly reduces the portability of
	     * the calling code. Use only when implementation-specific functionality must
	     * be used and cannot accessed otherwise.
	     *
	     * @return {object}
	     *         An implementation-dependent object.
	     */
	
	
	    _createClass(Tracer, [{
	        key: 'imp',
	        value: function imp() {
	            return this._imp;
	        }
	    }]);
	
	    return Tracer;
	}();
	
	exports.default = Tracer;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracer = __webpack_require__(3);
	
	var _tracer2 = _interopRequireDefault(_tracer);
	
	var _span_context = __webpack_require__(5);
	
	var _span_context2 = _interopRequireDefault(_span_context);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultTracer = __webpack_require__(1);
	
	/**
	 * Span represents a logical unit of work as part of a broader Trace. Examples
	 * of span might include remote procedure calls or a in-process function calls
	 * to sub-components. A Trace has a single, top-level "root" Span that in turn
	 * may have zero or more child Spans, which in turn may have children.
	 */
	
	var Span = function () {
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
	            if (true) {
	                if (arguments.length !== 0) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	            var spanContextImp = null;
	            if (this._imp) {
	                spanContextImp = this._imp.context();
	            }
	            return new _span_context2.default(spanContextImp);
	        }
	
	        /**
	         * Returns the Tracer object used to create this Span.
	         *
	         * @return {Tracer}
	         */
	
	    }, {
	        key: 'tracer',
	        value: function tracer() {
	            if (true) {
	                if (arguments.length !== 0) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	            if (this._imp) {
	                return new _tracer2.default(this._imp.tracer());
	            }
	            return defaultTracer;
	        }
	
	        /**
	         * Sets the string name for the logical operation this span represents.
	         *
	         * @param {string} name
	         */
	
	    }, {
	        key: 'setOperationName',
	        value: function setOperationName(name) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof name !== 'string' || name.length === 0) {
	                    throw new Error('Name must be a string of length > 0');
	                }
	            }
	            if (this._imp) {
	                this._imp.setOperationName(name);
	            }
	            return this;
	        }
	
	        /**
	         * Adds a single tag to the span.  See `AddTags()` for details.
	         *
	         * @param {string} key
	         * @param {any} value
	         */
	
	    }, {
	        key: 'setTag',
	        value: function setTag(key, value) {
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof key !== 'string') {
	                    throw new Error('Tag key must be a string');
	                }
	            }
	            this.addTags(_defineProperty({}, key, value));
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
	        value: function addTags(keyValuePairs) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof keyValuePairs !== 'object') {
	                    throw new Error('Invalid argument type');
	                }
	            }
	
	            if (!this._imp) {
	                return;
	            }
	            this._imp.addTags(keyValuePairs);
	            return this;
	        }
	
	        /**
	         * Explicitly create a log record associated with the span.
	         *
	         * @param {object} fields - object containing the log record properties
	         * @param {number} [fields.timestamp] - optional field specifying the
	         *        timestamp in milliseconds as a Unix timestamp. Fractional values
	         *        are allowed so that timestamps with sub-millisecond accuracy
	         *        can be represented. If not specified, the implementation is
	         *        expected to use it's notion of the current time of the call.
	         * @param {string} [fields.event] - the event name
	         * @param {object} [fields.payload] - an arbitrary structured payload. It is
	         *        implementation-dependent how this will be processed.
	         */
	
	    }, {
	        key: 'log',
	        value: function log(fields) {
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	                if (typeof fields !== 'object') {
	                    throw new Error('Expected fields to be an object');
	                }
	            }
	            if (!this._imp) {
	                return;
	            }
	            this._imp.log(fields);
	            return this;
	        }
	
	        /**
	         * Logs a event with an optional payload.
	         *
	         * @param  {string} eventName - string associated with the log record
	         * @param  {object} [payload] - arbitrary payload object associated with the
	         *         log record.
	         */
	
	    }, {
	        key: 'logEvent',
	        value: function logEvent(eventName, payload) {
	            return this.log({
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
	         * @param  {Number} finishTime
	         *         Optional finish time in milliseconds as a Unix timestamp. Decimal
	         *         values are supported for timestamps with sub-millisecond accuracy.
	         *         If not specified, the current time (as defined by the
	         *         implementation) will be used.
	         */
	
	    }, {
	        key: 'finish',
	        value: function finish(finishTime) {
	            if (true) {
	                if (arguments.length > 1) {
	                    throw new Error('Invalid arguments');
	                }
	                if (arguments.length === 1 && typeof finishTime !== 'number') {
	                    throw new Error('Unexpected argument type');
	                }
	            }
	
	            if (!this._imp) {
	                return;
	            }
	            this._imp.finish(finishTime);
	        }
	
	        // ---------------------------------------------------------------------- //
	        // Private and non-standard methods
	        // ---------------------------------------------------------------------- //
	
	        /**
	         * Constructs a new Span object, this method should not be called directly;
	         * Tracer.startSpan() or Tracer.join() should be used instead.
	         */
	
	    }]);
	
	    function Span(imp) {
	        _classCallCheck(this, Span);
	
	        this._imp = imp;
	    }
	
	    /**
	     * Returns the Span implementation object. The returned object is by its
	     * nature entirely implementation-dependent.
	     */
	
	
	    _createClass(Span, [{
	        key: 'imp',
	        value: function imp() {
	            return this._imp;
	        }
	    }]);
	
	    return Span;
	}();
	
	exports.default = Span;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SpanContext = function () {
	    _createClass(SpanContext, [{
	        key: 'setBaggageItem',
	
	
	        /**
	         * Sets a key:value pair on this SpanContext that also propagates to future
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
	        value: function setBaggageItem(key, value) {
	            if (true) {
	                if (arguments.length !== 2) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	            if (this._imp) {
	                this._imp.setBaggageItem(key, value);
	            }
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
	            if (true) {
	                if (arguments.length !== 1) {
	                    throw new Error('Invalid number of arguments');
	                }
	            }
	            if (this._imp) {
	                return this._imp.getBaggageItem(key);
	            }
	            return undefined;
	        }
	
	        /**
	         * Constructs a new SpanContext object.
	         *
	         * This method should not be called directly; Span.context() should be used
	         * instead.
	         */
	
	    }]);
	
	    function SpanContext(imp) {
	        _classCallCheck(this, SpanContext);
	
	        this._imp = imp;
	    }
	
	    /**
	     * Returns the SpanContext implementation object. The returned object is by
	     * its nature entirely implementation-dependent.
	     */
	
	
	    _createClass(SpanContext, [{
	        key: 'imp',
	        value: function imp() {
	            return this._imp;
	        }
	    }]);
	
	    return SpanContext;
	}();
	
	exports.default = SpanContext;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
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
	  FORMAT_BINARY: 'binary',
	
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
	  FORMAT_TEXT_MAP: 'text_map',
	
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
	  FORMAT_HTTP_HEADERS: 'http_headers',
	
	  /**
	   * A Span may be the "child of" a parent Span. In a “child of” reference,
	   * the parent Span depends on the child Span in some capacity.
	   *
	   * See more about reference types at http://opentracing.io/spec/
	   */
	  REFERENCE_CHILD_OF: 'child_of',
	
	  /**
	   * Some parent Spans do not depend in any way on the result of their child
	   * Spans. In these cases, we say merely that the child Span “follows from”
	   * the parent Span in a causal sense.
	   *
	   * See more about reference types at http://opentracing.io/spec/
	   */
	  REFERENCE_FOLLOWS_FROM: 'follows_from'
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _span = __webpack_require__(4);
	
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
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Convenience class to use as a binary carrier.
	 *
	 * Any valid Object with a field named `buffer` may be used as a binary carrier;
	 * this class is only one such type of object that can be used.
	 */
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BinaryCarrier = function BinaryCarrier(binaryData) {
	    _classCallCheck(this, BinaryCarrier);
	
	    this.buffer = binaryData;
	};
	
	exports.default = BinaryCarrier;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=opentracing-node-debug.js.map