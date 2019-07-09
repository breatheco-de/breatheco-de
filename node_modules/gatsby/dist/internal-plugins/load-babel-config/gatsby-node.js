"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const fs = require(`fs-extra`);

const apiRunnerNode = require(`../../utils/api-runner-node`);

const _require = require(`../../utils/path`),
      withBasePath = _require.withBasePath;

exports.onPreBootstrap =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    store
  }) {
    const _store$getState$progr = store.getState().program,
          directory = _store$getState$progr.directory,
          browserslist = _store$getState$progr.browserslist;
    const directoryPath = withBasePath(directory);
    yield apiRunnerNode(`onCreateBabelConfig`, {
      stage: `develop`
    });
    yield apiRunnerNode(`onCreateBabelConfig`, {
      stage: `develop-html`
    });
    yield apiRunnerNode(`onCreateBabelConfig`, {
      stage: `build-javascript`
    });
    yield apiRunnerNode(`onCreateBabelConfig`, {
      stage: `build-html`
    });
    const babelState = JSON.stringify(Object.assign({}, store.getState().babelrc, {
      browserslist
    }), null, 2);
    yield fs.writeFile(directoryPath(`.cache/babelState.json`), babelState);
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=gatsby-node.js.map