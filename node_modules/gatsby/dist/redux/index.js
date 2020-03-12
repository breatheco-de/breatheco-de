"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.saveState = exports.store = exports.configureStore = exports.readState = exports.emitter = void 0;

var _redux = require("redux");

var _mitt = _interopRequireDefault(require("mitt"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _persist = require("./persist");

const emitter = (0, _mitt.default)(); // Read old node data from cache.

exports.emitter = emitter;

const readState = () => {
  try {
    const state = (0, _persist.readFromCache)();

    if (state.nodes) {
      // re-create nodesByType
      state.nodesByType = new Map();
      state.nodes.forEach(node => {
        const {
          type
        } = node.internal;

        if (!state.nodesByType.has(type)) {
          state.nodesByType.set(type, new Map());
        }

        state.nodesByType.get(type).set(node.id, node);
      });
    } // jsonDataPaths was removed in the per-page-manifest
    // changes. Explicitly delete it here to cover case where user
    // runs gatsby the first time after upgrading.


    delete state[`jsonDataPaths`];
    return state;
  } catch (e) {} // ignore errors.
  // BUG: Would this not cause downstream bugs? seems likely. Why wouldn't we just
  // throw and kill the program?


  return {};
};
/**
 * Redux middleware handling array of actions
 */


exports.readState = readState;

const multi = ({
  dispatch
}) => next => action => Array.isArray(action) ? action.filter(Boolean).map(dispatch) : next(action);

const configureStore = initialState => (0, _redux.createStore)((0, _redux.combineReducers)(Object.assign({}, _reducers.default)), initialState, (0, _redux.applyMiddleware)(_reduxThunk.default, multi));

exports.configureStore = configureStore;
const store = configureStore(readState()); // Persist state.

exports.store = store;

const saveState = () => {
  const state = store.getState();
  return (0, _persist.writeToCache)({
    nodes: state.nodes,
    status: state.status,
    componentDataDependencies: state.componentDataDependencies,
    components: state.components,
    jobsV2: state.jobsV2,
    staticQueryComponents: state.staticQueryComponents,
    webpackCompilationHash: state.webpackCompilationHash,
    pageDataStats: state.pageDataStats,
    pageData: state.pageData
  });
};

exports.saveState = saveState;
store.subscribe(() => {
  const lastAction = store.getState().lastAction;
  emitter.emit(lastAction.type, lastAction);
});
//# sourceMappingURL=index.js.map