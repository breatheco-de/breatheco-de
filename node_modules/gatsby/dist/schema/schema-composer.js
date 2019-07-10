"use strict";

const _require = require(`graphql-compose`),
      SchemaComposer = _require.SchemaComposer;

const _require2 = require(`./types/node-interface`),
      getNodeInterface = _require2.getNodeInterface;

const _require3 = require(`./types/date`),
      GraphQLDate = _require3.GraphQLDate;

const _require4 = require(`./types/directives`),
      InferDirective = _require4.InferDirective,
      DontInferDirective = _require4.DontInferDirective;

const createSchemaComposer = () => {
  const schemaComposer = new SchemaComposer();
  getNodeInterface({
    schemaComposer
  });
  schemaComposer.addAsComposer(GraphQLDate);
  schemaComposer.addDirective(InferDirective);
  schemaComposer.addDirective(DontInferDirective);
  return schemaComposer;
};

module.exports = {
  createSchemaComposer
};
//# sourceMappingURL=schema-composer.js.map