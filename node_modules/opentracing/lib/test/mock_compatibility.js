"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
function mockCompatibilityTests() {
    describe('Noop Tracer Implementation', function () {
        describe('Tracer#inject', function () {
            it('should handle Spans and SpanContexts', function () {
                var tracer = createTracer();
                var span = tracer.startSpan('test_operation');
                var textCarrier = {};
                chai_1.expect(function () { tracer.inject(span, FORMAT_TEXT_MAP, textCarrier); }).to.not.throw(Error);
            });
        });
        describe('Span#finish', function () {
            it('should return undefined', function () {
                var tracer = createTracer();
                var span = tracer.startSpan('test_span');
                chai_1.expect(span.finish()).to.be.undefined;
            });
        });
        describe('Miscellaneous', function () {
            describe('Memory usage', function () {
                it('should not report leaks after setting the global tracer', function () {
                    initGlobalTracer(createTracer());
                });
            });
        });
    });
}
exports.mockCompatibilityTests = mockCompatibilityTests;
exports.default = noopImplementationTests;
//# sourceMappingURL=mock_compatibility.js.map