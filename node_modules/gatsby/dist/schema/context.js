"use strict";

const _require = require(`./node-model`),
      LocalNodeModel = _require.LocalNodeModel;

const withResolverContext = (context, schema) => {
  const nodeStore = require(`../db/nodes`);

  const createPageDependency = require(`../redux/actions/add-page-dependency`);

  return Object.assign({}, context, {
    nodeModel: new LocalNodeModel({
      nodeStore,
      schema,
      createPageDependency,
      path: context.path
    })
  });
};

module.exports = withResolverContext;
//# sourceMappingURL=context.js.map