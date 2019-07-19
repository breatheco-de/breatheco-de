"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const repl = require(`repl`);

const _require = require(`graphql`),
      graphql = _require.graphql;

const bootstrap = require(`../bootstrap`);

const _require2 = require(`../db/nodes`),
      loadNodeContent = _require2.loadNodeContent,
      getNodes = _require2.getNodes,
      getNode = _require2.getNode,
      getNodesByType = _require2.getNodesByType;

const _require3 = require(`../redux`),
      store = _require3.store;

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program) {
    // run bootstrap
    yield bootstrap(program); // get all the goodies from the store

    const _store$getState = store.getState(),
          schema = _store$getState.schema,
          config = _store$getState.config,
          babelrc = _store$getState.babelrc,
          jsonDataPaths = _store$getState.jsonDataPaths,
          pages = _store$getState.pages,
          components = _store$getState.components,
          staticQueryComponents = _store$getState.staticQueryComponents;

    const nodes = getNodes();

    const query =
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (_query) {
        const result = yield graphql(schema, _query, {}, {}, {});
        console.log(`query result: ${JSON.stringify(result)}`);
      });

      return function query(_x2) {
        return _ref2.apply(this, arguments);
      };
    }(); // init new repl


    const _ = repl.start({
      prompt: `gatsby > `
    }); // set some globals to make life easier


    _.context.babelrc = babelrc;
    _.context.components = components;
    _.context.dataPaths = jsonDataPaths;
    _.context.getNode = getNode;
    _.context.getNodes = getNodes;
    _.context.getNodesByType = getNodesByType;
    _.context.loadNodeContent = loadNodeContent;
    _.context.nodes = [...nodes.entries()];
    _.context.pages = [...pages.entries()];
    _.context.graphql = query;
    _.context.schema = schema;
    _.context.siteConfig = config;
    _.context.staticQueries = staticQueryComponents;

    _.on(`exit`, () => process.exit(0));
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=repl.js.map