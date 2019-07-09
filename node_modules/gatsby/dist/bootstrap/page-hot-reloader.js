"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _require = require(`../redux`),
      emitter = _require.emitter,
      store = _require.store;

const apiRunnerNode = require(`../utils/api-runner-node`);

const _require2 = require(`../redux/actions`),
      boundActionCreators = _require2.boundActionCreators;

const deletePage = boundActionCreators.deletePage,
      deleteComponentsDependencies = boundActionCreators.deleteComponentsDependencies;
let pagesDirty = false;
let graphql;
emitter.on(`CREATE_NODE`, action => {
  if (action.payload.internal.type !== `SitePage`) {
    pagesDirty = true;
  }
});
emitter.on(`DELETE_NODE`, action => {
  if (action.payload.internal.type !== `SitePage`) {
    pagesDirty = true; // Make a fake API call to trigger `API_RUNNING_QUEUE_EMPTY` being called.
    // We don't want to call runCreatePages here as there might be work in
    // progress. So this is a safe way to make sure runCreatePages gets called
    // at a safe time.

    apiRunnerNode(`FAKE_API_CALL`);
  }
});
emitter.on(`API_RUNNING_QUEUE_EMPTY`, () => {
  if (pagesDirty) {
    runCreatePages();
  }
});

const runCreatePages =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* () {
    pagesDirty = false;
    const timestamp = Date.now();
    yield apiRunnerNode(`createPages`, {
      graphql,
      traceId: `createPages`,
      waitForCascadingActions: true
    }); // Delete pages that weren't updated when running createPages.

    Array.from(store.getState().pages.values()).forEach(page => {
      if (!page.isCreatedByStatefulCreatePages && page.updatedAt < timestamp && page.path !== `/404.html`) {
        deleteComponentsDependencies([page.path]);
        deletePage(page);
      }
    });
    emitter.emit(`CREATE_PAGE_END`);
  });

  return function runCreatePages() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = graphqlRunner => {
  graphql = graphqlRunner;
};
//# sourceMappingURL=page-hot-reloader.js.map