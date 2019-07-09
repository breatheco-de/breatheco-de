"use strict";

const _ = require(`lodash`);

const _require = require(`../redux`),
      store = _require.store;

const _require2 = require(`./nodes-query`),
      runQuery = _require2.run;

const _require3 = require(`../db/node-tracking`),
      findRootNodeAncestor = _require3.findRootNodeAncestor;

const backend = process.env.GATSBY_DB_NODES || `redux`;
let nodesDb;

switch (backend) {
  case `redux`:
    nodesDb = require(`../redux/nodes`);
    break;

  case `loki`:
    nodesDb = require(`./loki/nodes`);
    break;

  default:
    throw new Error(`Unsupported DB nodes backend (value of env var GATSBY_DB_NODES)`);
}

module.exports = Object.assign({}, nodesDb, {
  runQuery,
  findRootNodeAncestor
});
module.exports.backend = backend;
/**
 * Get content for a node from the plugin that created it.
 *
 * @param {Object} node
 * @returns {promise}
 */

module.exports.loadNodeContent = node => {
  if (_.isString(node.internal.content)) {
    return Promise.resolve(node.internal.content);
  } else {
    return new Promise(resolve => {
      // Load plugin's loader function
      const plugin = store.getState().flattenedPlugins.find(plug => plug.name === node.internal.owner);

      const _require4 = require(plugin.resolve),
            loadNodeContent = _require4.loadNodeContent;

      if (!loadNodeContent) {
        throw new Error(`Could not find function loadNodeContent for plugin ${plugin.name}`);
      }

      return loadNodeContent(node).then(content => {
        // TODO update node's content field here.
        resolve(content);
      });
    });
  }
};
//# sourceMappingURL=nodes.js.map