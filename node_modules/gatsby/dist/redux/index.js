"use strict";

const Redux = require(`redux`);

const _ = require(`lodash`);

const mitt = require(`mitt`); // Create event emitter for actions


const emitter = mitt(); // Reducers

const reducers = require(`./reducers`);

const _require = require(`./persist`),
      writeToCache = _require.writeToCache,
      readFromCache = _require.readFromCache; // Read old node data from cache.


const readState = () => {
  try {
    const state = readFromCache();

    if (state.nodes) {
      // re-create nodesByType
      state.nodesByType = new Map();
      state.nodes.forEach(node => {
        const type = node.internal.type;

        if (!state.nodesByType.has(type)) {
          state.nodesByType.set(type, new Map());
        }

        state.nodesByType.get(type).set(node.id, node);
      });
    }

    return state;
  } catch (e) {// ignore errors.
  }

  return {};
};

exports.readState = readState;
const store = Redux.createStore(Redux.combineReducers(Object.assign({}, reducers)), readState(), Redux.applyMiddleware(function multi({
  dispatch
}) {
  return next => action => Array.isArray(action) ? action.filter(Boolean).map(dispatch) : next(action);
})); // Persist state.

function saveState() {
  if (process.env.DANGEROUSLY_DISABLE_OOM) {
    return Promise.resolve();
  }

  const state = store.getState();

  const pickedState = _.pick(state, [`nodes`, `status`, `componentDataDependencies`, `jsonDataPaths`, `components`, `staticQueryComponents`]);

  return writeToCache(pickedState);
}

exports.saveState = saveState;
store.subscribe(() => {
  const lastAction = store.getState().lastAction;
  emitter.emit(lastAction.type, lastAction);
});
/** Event emitter */

exports.emitter = emitter;
/** Redux store */

exports.store = store;
//# sourceMappingURL=index.js.map