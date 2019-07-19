"use strict";

// Invoke plugins for certain actions.
const _require = require(`./index`),
      emitter = _require.emitter;

const _require2 = require(`../db/nodes`),
      getNode = _require2.getNode;

const apiRunnerNode = require(`../utils/api-runner-node`);

emitter.on(`CREATE_NODE`, action => {
  const node = getNode(action.payload.id);
  const traceTags = {
    nodeId: node.id,
    nodeType: node.internal.type
  };
  apiRunnerNode(`onCreateNode`, {
    node,
    traceId: action.traceId,
    parentSpan: action.parentSpan,
    traceTags
  });
});
emitter.on(`CREATE_PAGE`, action => {
  const page = action.payload;
  apiRunnerNode(`onCreatePage`, {
    page,
    traceId: action.traceId,
    parentSpan: action.parentSpan
  }, action.plugin.name);
});
//# sourceMappingURL=plugin-runner.js.map