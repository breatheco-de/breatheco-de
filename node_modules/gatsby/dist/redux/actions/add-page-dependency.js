"use strict";

const _ = require(`lodash`);

const _require = require(`../`),
      store = _require.store;

const _require2 = require(`../actions.js`),
      actions = _require2.actions;

function createPageDependency({
  path,
  nodeId,
  connection
}) {
  const state = store.getState(); // Check that the dependencies aren't already recorded so we
  // can avoid creating lots of very noisy actions.

  let nodeDependencyExists = false;
  let connectionDependencyExists = false;

  if (!nodeId) {
    nodeDependencyExists = true;
  }

  if (nodeId && _.includes(state.componentDataDependencies.nodes[nodeId], path)) {
    nodeDependencyExists = true;
  }

  if (!connection) {
    connectionDependencyExists = true;
  }

  if (connection && _.includes(state.componentDataDependencies.connections, connection)) {
    connectionDependencyExists = true;
  }

  if (nodeDependencyExists && connectionDependencyExists) {
    return;
  } // It's new, let's dispatch it


  const action = actions.createPageDependency({
    path,
    nodeId,
    connection
  });
  store.dispatch(action);
}

module.exports = createPageDependency;
//# sourceMappingURL=add-page-dependency.js.map