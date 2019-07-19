"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const webpack = require(`webpack`);

const webpackConfig = require(`../utils/webpack.config`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program) {
    const directory = program.directory;
    const compilerConfig = yield webpackConfig(program, directory, `build-javascript`);
    return new Promise((resolve, reject) => {
      webpack(compilerConfig).run((err, stats) => {
        if (err) {
          reject(err);
          return;
        }

        const jsonStats = stats.toJson();

        if (jsonStats.errors && jsonStats.errors.length > 0) {
          reject(jsonStats.errors);
          return;
        }

        resolve();
      });
    });
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=build-javascript.js.map