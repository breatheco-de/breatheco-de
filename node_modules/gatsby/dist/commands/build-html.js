"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const webpack = require(`webpack`);

const fs = require(`fs-extra`);

const webpackConfig = require(`../utils/webpack.config`);

const _require = require(`gatsby-cli/lib/reporter/errors`),
      createErrorFromString = _require.createErrorFromString;

const renderHTMLQueue = require(`../utils/html-renderer-queue`);

const telemetry = require(`gatsby-telemetry`);

const runWebpack = compilerConfig => new Promise((resolve, reject) => {
  webpack(compilerConfig).run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      resolve(stats);
    }
  });
});

const doBuildRenderer =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (program, webpackConfig) {
    const directory = program.directory;
    const stats = yield runWebpack(webpackConfig); // render-page.js is hard coded in webpack.config

    const outputFile = `${directory}/public/render-page.js`;

    if (stats.hasErrors()) {
      let webpackErrors = stats.toJson().errors.filter(Boolean);
      const error = webpackErrors.length ? createErrorFromString(webpackErrors[0], `${outputFile}.map`) : new Error(`There was an issue while building the site: ` + `\n\n${stats.toString()}`);
      throw error;
    }

    return outputFile;
  });

  return function doBuildRenderer(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

const buildRenderer =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (program, stage) {
    const directory = program.directory;
    const config = yield webpackConfig(program, directory, stage, null);
    return yield doBuildRenderer(program, config);
  });

  return function buildRenderer(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

const deleteRenderer =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* (rendererPath) {
    try {
      yield fs.remove(rendererPath);
      yield fs.remove(`${rendererPath}.map`);
    } catch (e) {// This function will fail on Windows with no further consequences.
    }
  });

  return function deleteRenderer(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

const doBuildPages =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* ({
    rendererPath,
    pagePaths,
    activity
  }) {
    telemetry.decorateEvent(`BUILD_END`, {
      siteMeasurements: {
        pagesCount: pagePaths.length
      }
    });

    try {
      yield renderHTMLQueue(rendererPath, pagePaths, activity);
    } catch (e) {
      const prettyError = createErrorFromString(e.stack, `${rendererPath}.map`);
      prettyError.context = e.context;
      throw prettyError;
    }
  });

  return function doBuildPages(_x6) {
    return _ref4.apply(this, arguments);
  };
}();

const buildPages =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* ({
    program,
    stage,
    pagePaths,
    activity
  }) {
    const rendererPath = yield buildRenderer(program, stage);
    yield doBuildPages({
      rendererPath,
      pagePaths,
      activity
    });
    yield deleteRenderer(rendererPath);
  });

  return function buildPages(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports = {
  buildPages
};
//# sourceMappingURL=build-html.js.map