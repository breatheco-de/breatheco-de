"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const express = require(`express`);

const graphqlHTTP = require(`express-graphql`);

const _require = require(`../redux`),
      store = _require.store;

const bootstrap = require(`../bootstrap`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program) {
    let port = program.port,
        host = program.host;
    port = typeof port === `string` ? parseInt(port, 10) : port; // bootstrap to ensure schema is in the store

    yield bootstrap(program);
    const schema = store.getState().schema;
    const app = express();
    app.use(`/`, graphqlHTTP({
      schema,
      graphiql: true
    }));
    console.log(`Gatsby data explorer running at`, `http://${host}:${port}`);
    app.listen(port, host);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=data-explorer.js.map