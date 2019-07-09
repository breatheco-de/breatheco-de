"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const tracer = require(`opentracing`).globalTracer();

const _require = require(`../redux`),
      store = _require.store;

const nodeStore = require(`../db/nodes`);

const _require2 = require(`./schema-composer`),
      createSchemaComposer = _require2.createSchemaComposer;

const _require3 = require(`./schema`),
      buildSchema = _require3.buildSchema,
      rebuildSchemaWithSitePage = _require3.rebuildSchemaWithSitePage;

const _require4 = require(`./infer/type-conflict-reporter`),
      TypeConflictReporter = _require4.TypeConflictReporter;

module.exports.build =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    parentSpan
  }) {
    const spanArgs = parentSpan ? {
      childOf: parentSpan
    } : {};
    const span = tracer.startSpan(`build schema`, spanArgs);

    let _store$getState = store.getState(),
        _store$getState$schem = _store$getState.schemaCustomization,
        thirdPartySchemas = _store$getState$schem.thirdPartySchemas,
        types = _store$getState$schem.types,
        typeMapping = _store$getState.config.mapping;

    const typeConflictReporter = new TypeConflictReporter();
    const schemaComposer = createSchemaComposer();
    const schema = yield buildSchema({
      schemaComposer,
      nodeStore,
      types,
      thirdPartySchemas,
      typeMapping,
      typeConflictReporter,
      parentSpan
    });
    typeConflictReporter.printConflicts();
    store.dispatch({
      type: `SET_SCHEMA_COMPOSER`,
      payload: schemaComposer
    });
    store.dispatch({
      type: `SET_SCHEMA`,
      payload: schema
    });
    span.finish();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.rebuildWithSitePage =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* ({
    parentSpan
  }) {
    const spanArgs = parentSpan ? {
      childOf: parentSpan
    } : {};
    const span = tracer.startSpan(`rebuild schema with SitePage context`, spanArgs);

    let _store$getState2 = store.getState(),
        schemaComposer = _store$getState2.schemaCustomization.composer,
        typeMapping = _store$getState2.config.mapping;

    const typeConflictReporter = new TypeConflictReporter();
    const schema = yield rebuildSchemaWithSitePage({
      schemaComposer,
      nodeStore,
      typeMapping,
      typeConflictReporter,
      parentSpan
    });
    typeConflictReporter.printConflicts();
    store.dispatch({
      type: `SET_SCHEMA_COMPOSER`,
      payload: schemaComposer
    });
    store.dispatch({
      type: `SET_SCHEMA`,
      payload: schema
    });
    span.finish();
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map