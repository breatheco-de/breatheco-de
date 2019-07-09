"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const report = require(`gatsby-cli/lib/reporter`);

const buildHTML = require(`./build-html`);

const buildProductionBundle = require(`./build-javascript`);

const bootstrap = require(`../bootstrap`);

const apiRunnerNode = require(`../utils/api-runner-node`);

const _require = require(`../utils/get-static-dir`),
      copyStaticDirs = _require.copyStaticDirs;

const _require2 = require(`../utils/tracer`),
      initTracer = _require2.initTracer,
      stopTracer = _require2.stopTracer;

const db = require(`../db`);

const chalk = require(`chalk`);

const tracer = require(`opentracing`).globalTracer();

const signalExit = require(`signal-exit`);

const telemetry = require(`gatsby-telemetry`);

const _require3 = require(`../redux`),
      store = _require3.store;

function reportFailure(msg, err) {
  report.log(``);
  report.panic(msg, err);
}

module.exports =
/*#__PURE__*/
function () {
  var _build = (0, _asyncToGenerator2.default)(function* (program) {
    initTracer(program.openTracingConfigFile);
    telemetry.trackCli(`BUILD_START`);
    signalExit(() => {
      telemetry.trackCli(`BUILD_END`);
    });
    const buildSpan = tracer.startSpan(`build`);
    buildSpan.setTag(`directory`, program.directory);

    const _ref = yield bootstrap(Object.assign({}, program, {
      parentSpan: buildSpan
    })),
          graphqlRunner = _ref.graphqlRunner;

    yield db.saveState();
    yield apiRunnerNode(`onPreBuild`, {
      graphql: graphqlRunner,
      parentSpan: buildSpan
    }); // Copy files from the static directory to
    // an equivalent static directory within public.

    copyStaticDirs();
    let activity;
    activity = report.activityTimer(`Building production JavaScript and CSS bundles`, {
      parentSpan: buildSpan
    });
    activity.start();
    yield buildProductionBundle(program).catch(err => {
      reportFailure(`Generating JavaScript bundles failed`, err);
    });
    activity.end();
    activity = report.activityTimer(`Building static HTML for pages`, {
      parentSpan: buildSpan
    });
    activity.start();

    try {
      yield buildHTML.buildPages({
        program,
        stage: `build-html`,
        pagePaths: [...store.getState().pages.keys()],
        activity
      });
    } catch (err) {
      reportFailure(report.stripIndent`
        Building static HTML failed${err.context && err.context.path ? ` for path "${chalk.bold(err.context.path)}"` : ``}

        See our docs page on debugging HTML builds for help https://gatsby.dev/debug-html
      `, err);
    }

    activity.end();
    yield apiRunnerNode(`onPostBuild`, {
      graphql: graphqlRunner,
      parentSpan: buildSpan
    });
    report.info(`Done building in ${process.uptime()} sec`);
    buildSpan.finish();
    yield stopTracer();
  });

  return function build(_x) {
    return _build.apply(this, arguments);
  };
}();
//# sourceMappingURL=build.js.map