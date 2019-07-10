"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _ = require(`lodash`);

const invariant = require(`invariant`);

const _require = require(`graphql`),
      isSpecifiedScalarType = _require.isSpecifiedScalarType,
      isIntrospectionType = _require.isIntrospectionType,
      defaultFieldResolver = _require.defaultFieldResolver,
      assertValidName = _require.assertValidName,
      getNamedType = _require.getNamedType,
      Kind = _require.Kind;

const _require2 = require(`graphql-compose`),
      ObjectTypeComposer = _require2.ObjectTypeComposer,
      InterfaceTypeComposer = _require2.InterfaceTypeComposer,
      UnionTypeComposer = _require2.UnionTypeComposer,
      InputTypeComposer = _require2.InputTypeComposer;

const apiRunner = require(`../utils/api-runner-node`);

const report = require(`gatsby-cli/lib/reporter`);

const _require3 = require(`./types/node-interface`),
      addNodeInterfaceFields = _require3.addNodeInterfaceFields;

const _require4 = require(`./infer`),
      addInferredType = _require4.addInferredType,
      addInferredTypes = _require4.addInferredTypes;

const _require5 = require(`./resolvers`),
      findOne = _require5.findOne,
      findManyPaginated = _require5.findManyPaginated;

const _require6 = require(`./types/pagination`),
      getPagination = _require6.getPagination;

const _require7 = require(`./types/sort`),
      getSortInput = _require7.getSortInput;

const _require8 = require(`./types/filter`),
      getFilterInput = _require8.getFilterInput;

const _require9 = require(`./types/type-builders`),
      isGatsbyType = _require9.isGatsbyType,
      GatsbyGraphQLTypeKind = _require9.GatsbyGraphQLTypeKind;

const buildSchema =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    schemaComposer,
    nodeStore,
    types,
    thirdPartySchemas,
    typeMapping,
    typeConflictReporter,
    parentSpan
  }) {
    yield updateSchemaComposer({
      schemaComposer,
      nodeStore,
      types,
      thirdPartySchemas,
      typeMapping,
      typeConflictReporter,
      parentSpan
    }); // const { printSchema } = require(`graphql`)

    const schema = schemaComposer.buildSchema(); // console.log(printSchema(schema))

    return schema;
  });

  return function buildSchema(_x) {
    return _ref.apply(this, arguments);
  };
}();

const rebuildSchemaWithSitePage =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* ({
    schemaComposer,
    nodeStore,
    typeMapping,
    typeConflictReporter,
    parentSpan
  }) {
    const typeComposer = addInferredType({
      schemaComposer,
      typeComposer: schemaComposer.getOTC(`SitePage`),
      nodeStore,
      typeConflictReporter,
      typeMapping,
      parentSpan
    });
    yield processTypeComposer({
      schemaComposer,
      typeComposer,
      nodeStore,
      parentSpan
    });
    return schemaComposer.buildSchema();
  });

  return function rebuildSchemaWithSitePage(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  buildSchema,
  rebuildSchemaWithSitePage
};

const updateSchemaComposer =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(function* ({
    schemaComposer,
    nodeStore,
    types,
    typeMapping,
    thirdPartySchemas,
    typeConflictReporter,
    parentSpan
  }) {
    yield addTypes({
      schemaComposer,
      parentSpan,
      types
    });
    yield addInferredTypes({
      schemaComposer,
      nodeStore,
      typeConflictReporter,
      typeMapping,
      parentSpan
    });
    yield addSetFieldsOnGraphQLNodeTypeFields({
      schemaComposer,
      nodeStore,
      parentSpan
    });
    yield Promise.all(Array.from(schemaComposer.values()).map(typeComposer => processTypeComposer({
      schemaComposer,
      typeComposer,
      nodeStore,
      parentSpan
    })));
    yield addThirdPartySchemas({
      schemaComposer,
      thirdPartySchemas,
      parentSpan
    });
    yield addCustomResolveFunctions({
      schemaComposer,
      parentSpan
    });
  });

  return function updateSchemaComposer(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

const processTypeComposer =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(function* ({
    schemaComposer,
    typeComposer,
    nodeStore,
    parentSpan
  }) {
    if (typeComposer instanceof ObjectTypeComposer && typeComposer.hasInterface(`Node`)) {
      yield addNodeInterfaceFields({
        schemaComposer,
        typeComposer,
        parentSpan
      });
      yield addResolvers({
        schemaComposer,
        typeComposer,
        parentSpan
      });
      yield addConvenienceChildrenFields({
        schemaComposer,
        typeComposer,
        nodeStore,
        parentSpan
      });
      yield addTypeToRootQuery({
        schemaComposer,
        typeComposer,
        parentSpan
      });
    }
  });

  return function processTypeComposer(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

const addTypes = ({
  schemaComposer,
  types,
  parentSpan
}) => {
  types.forEach(({
    typeOrTypeDef,
    plugin
  }) => {
    if (typeof typeOrTypeDef === `string`) {
      let addedTypes;

      try {
        addedTypes = schemaComposer.addTypeDefs(typeOrTypeDef);
      } catch (error) {
        reportParsingError(error);
      }

      addedTypes.forEach(type => {
        processAddedType({
          schemaComposer,
          type,
          parentSpan,
          createdFrom: `sdl`,
          plugin
        });
      });
    } else if (isGatsbyType(typeOrTypeDef)) {
      const type = createTypeComposerFromGatsbyType({
        schemaComposer,
        type: typeOrTypeDef,
        parentSpan
      });

      if (type) {
        processAddedType({
          schemaComposer,
          type,
          parentSpan,
          createdFrom: `typeBuilder`,
          plugin
        });
      }
    } else {
      processAddedType({
        schemaComposer,
        type: typeOrTypeDef,
        parentSpan,
        createdFrom: `graphql-js`,
        plugin
      });
    }
  });
};

const processAddedType = ({
  schemaComposer,
  type,
  parentSpan,
  createdFrom,
  plugin
}) => {
  const typeName = schemaComposer.addAsComposer(type);
  checkIsAllowedTypeName(typeName);
  const typeComposer = schemaComposer.get(typeName);

  if (typeComposer instanceof InterfaceTypeComposer || typeComposer instanceof UnionTypeComposer) {
    if (!typeComposer.getResolveType()) {
      typeComposer.setResolveType(node => node.internal.type);
    }
  }

  schemaComposer.addSchemaMustHaveType(typeComposer);
  typeComposer.setExtension(`createdFrom`, createdFrom);
  typeComposer.setExtension(`plugin`, plugin ? plugin.name : null);

  if (createdFrom === `sdl`) {
    if (type.astNode && type.astNode.directives) {
      type.astNode.directives.forEach(directive => {
        if (directive.name.value === `infer`) {
          typeComposer.setExtension(`infer`, true);
          typeComposer.setExtension(`addDefaultResolvers`, getNoDefaultResolvers(directive));
        } else if (directive.name.value === `dontInfer`) {
          typeComposer.setExtension(`infer`, false);
          typeComposer.setExtension(`addDefaultResolvers`, getNoDefaultResolvers(directive));
        }
      });
    }
  }

  return typeComposer;
};

const getNoDefaultResolvers = directive => {
  const noDefaultResolvers = directive.arguments.find(({
    name
  }) => name.value === `noDefaultResolvers`);

  if (noDefaultResolvers) {
    if (noDefaultResolvers.value.kind === Kind.BOOLEAN) {
      return !noDefaultResolvers.value.value;
    }
  }

  return null;
};

const checkIsAllowedTypeName = name => {
  invariant(name !== `Node`, `The GraphQL type \`Node\` is reserved for internal use.`);
  invariant(!name.endsWith(`FilterInput`) && !name.endsWith(`SortInput`), `GraphQL type names ending with "FilterInput" or "SortInput" are ` + `reserved for internal use. Please rename \`${name}\`.`);
  invariant(![`Boolean`, `Date`, `Float`, `ID`, `Int`, `JSON`, `String`].includes(name), `The GraphQL type \`${name}\` is reserved for internal use by ` + `built-in scalar types.`);
  assertValidName(name);
};

const createTypeComposerFromGatsbyType = ({
  schemaComposer,
  type,
  parentSpan
}) => {
  switch (type.kind) {
    case GatsbyGraphQLTypeKind.OBJECT:
      {
        return ObjectTypeComposer.createTemp(Object.assign({}, type.config, {
          interfaces: () => {
            if (type.config.interfaces) {
              return type.config.interfaces.map(iface => {
                if (typeof iface === `string`) {
                  return schemaComposer.getIFTC(iface).getType();
                } else {
                  return iface;
                }
              });
            } else {
              return [];
            }
          }
        }), schemaComposer);
      }

    case GatsbyGraphQLTypeKind.INPUT_OBJECT:
      {
        return InputTypeComposer.createTemp(type.config, schemaComposer);
      }

    case GatsbyGraphQLTypeKind.UNION:
      {
        return UnionTypeComposer.createTemp(Object.assign({}, type.config, {
          types: () => {
            if (type.config.types) {
              return type.config.types.map(typeName => schemaComposer.getOTC(typeName).getType());
            } else {
              return [];
            }
          }
        }), schemaComposer);
      }

    case GatsbyGraphQLTypeKind.INTERFACE:
      {
        return InterfaceTypeComposer.createTemp(type.config, schemaComposer);
      }

    default:
      {
        report.warn(`Illegal type definition: ${JSON.stringify(type.config)}`);
        return null;
      }
  }
};

const addSetFieldsOnGraphQLNodeTypeFields = ({
  schemaComposer,
  nodeStore,
  parentSpan
}) => Promise.all(Array.from(schemaComposer.values()).map(
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(function* (tc) {
    if (tc instanceof ObjectTypeComposer && tc.hasInterface(`Node`)) {
      const typeName = tc.getTypeName();
      const result = yield apiRunner(`setFieldsOnGraphQLNodeType`, {
        type: {
          name: typeName,
          nodes: nodeStore.getNodesByType(typeName)
        },
        traceId: `initial-setFieldsOnGraphQLNodeType`,
        parentSpan: parentSpan
      });

      if (result) {
        // NOTE: `setFieldsOnGraphQLNodeType` only allows setting
        // nested fields with a path as property name, i.e.
        // `{ 'frontmatter.published': 'Boolean' }`, but not in the form
        // `{ frontmatter: { published: 'Boolean' }}`
        result.forEach(fields => tc.addNestedFields(fields));
      }
    }
  });

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}()));

const addThirdPartySchemas = ({
  schemaComposer,
  thirdPartySchemas,
  parentSpan
}) => {
  thirdPartySchemas.forEach(schema => {
    const schemaQueryType = schema.getQueryType();
    const queryTC = ObjectTypeComposer.createTemp(schemaQueryType);
    processThirdPartyType({
      schemaComposer,
      typeComposer: queryTC,
      schemaQueryType
    });
    const fields = queryTC.getFields();
    schemaComposer.Query.addFields(fields); // Explicitly add the third-party schema's types, so they can be targeted
    // in `createResolvers` API.

    const types = schema.getTypeMap();
    Object.keys(types).forEach(typeName => {
      const type = types[typeName];

      if (type !== schemaQueryType && !isSpecifiedScalarType(type) && !isIntrospectionType(type)) {
        schemaComposer.addAsComposer(type);
        const typeComposer = schemaComposer.getAnyTC(type.name);
        processThirdPartyType({
          schemaComposer,
          typeComposer,
          schemaQueryType
        });
        schemaComposer.addSchemaMustHaveType(typeComposer);
      }
    });
  });
};

const processThirdPartyType = ({
  schemaComposer,
  typeComposer,
  schemaQueryType
}) => {
  typeComposer.getType().isThirdPartyType = true; // Fix for types that refer to Query. Thanks Relay Classic!

  if (typeComposer instanceof ObjectTypeComposer || typeComposer instanceof InterfaceTypeComposer) {
    typeComposer.getFieldNames().forEach(fieldName => {
      const fieldType = typeComposer.getFieldType(fieldName);

      if (getNamedType(fieldType) === schemaQueryType) {
        typeComposer.extendField(fieldName, {
          type: fieldType.toString().replace(schemaQueryType.name, `Query`)
        });
      }
    });
  }

  return typeComposer;
};

const addCustomResolveFunctions =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2.default)(function* ({
    schemaComposer,
    parentSpan
  }) {
    const intermediateSchema = schemaComposer.buildSchema();

    const createResolvers = resolvers => {
      Object.keys(resolvers).forEach(typeName => {
        const fields = resolvers[typeName];

        if (schemaComposer.has(typeName)) {
          const tc = schemaComposer.getOTC(typeName);
          Object.keys(fields).forEach(fieldName => {
            const fieldConfig = fields[fieldName];

            if (tc.hasField(fieldName)) {
              const originalFieldConfig = tc.getFieldConfig(fieldName);
              const originalTypeName = originalFieldConfig.type.toString();
              const originalResolver = originalFieldConfig.resolve;
              const fieldTypeName = fieldConfig.type && fieldConfig.type.toString();

              if (!fieldTypeName || fieldTypeName.replace(/!/g, ``) === originalTypeName.replace(/!/g, ``) || tc.getType().isThirdPartyType) {
                const newConfig = {};

                if (fieldConfig.type) {
                  newConfig.type = fieldConfig.type;
                }

                if (fieldConfig.args) {
                  newConfig.args = fieldConfig.args;
                }

                if (fieldConfig.resolve) {
                  newConfig.resolve = (source, args, context, info) => fieldConfig.resolve(source, args, context, Object.assign({}, info, {
                    originalResolver: originalResolver || defaultFieldResolver
                  }));
                }

                tc.extendField(fieldName, newConfig);
              } else if (fieldTypeName) {
                report.warn(`\`createResolvers\` passed resolvers for field ` + `\`${typeName}.${fieldName}\` with type \`${fieldTypeName}\`. ` + `Such a field with type \`${originalTypeName}\` already exists ` + `on the type. Use \`createTypes\` to override type fields.`);
              }
            } else {
              tc.addFields({
                [fieldName]: fieldConfig
              });
            }
          });
        } else {
          report.warn(`\`createResolvers\` passed resolvers for type \`${typeName}\` that ` + `doesn't exist in the schema. Use \`createTypes\` to add the type ` + `before adding resolvers.`);
        }
      });
    };

    yield apiRunner(`createResolvers`, {
      schema: intermediateSchema,
      createResolvers,
      traceId: `initial-createResolvers`,
      parentSpan: parentSpan
    });
  });

  return function addCustomResolveFunctions(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

const addResolvers = ({
  schemaComposer,
  typeComposer
}) => {
  const typeName = typeComposer.getTypeName(); // TODO: We should have an abstraction for keeping and clearing
  // related TypeComposers and InputTypeComposers.
  // Also see the comment on the skipped test in `rebuild-schema`.

  typeComposer.removeInputTypeComposer();
  const sortInputTC = getSortInput({
    schemaComposer,
    typeComposer
  });
  const filterInputTC = getFilterInput({
    schemaComposer,
    typeComposer
  });
  const paginationTC = getPagination({
    schemaComposer,
    typeComposer
  });
  typeComposer.addResolver({
    name: `findOne`,
    type: typeComposer,
    args: Object.assign({}, filterInputTC.getFields()),
    resolve: findOne(typeName)
  });
  typeComposer.addResolver({
    name: `findManyPaginated`,
    type: paginationTC,
    args: {
      filter: filterInputTC,
      sort: sortInputTC,
      skip: `Int`,
      limit: `Int` // page: `Int`,
      // perPage: { type: `Int`, defaultValue: 20 },

    },
    resolve: findManyPaginated(typeName)
  });
};

const addConvenienceChildrenFields = ({
  schemaComposer,
  typeComposer,
  nodeStore
}) => {
  const nodes = nodeStore.getNodesByType(typeComposer.getTypeName());
  const childNodesByType = groupChildNodesByType({
    nodeStore,
    nodes
  });
  Object.keys(childNodesByType).forEach(typeName => {
    const typeChildren = childNodesByType[typeName];

    const maxChildCount = _.maxBy(_.values(_.groupBy(typeChildren, c => c.parent)), g => g.length).length;

    if (maxChildCount > 1) {
      typeComposer.addFields(createChildrenField(typeName));
    } else {
      typeComposer.addFields(createChildField(typeName));
    }
  });
};

function createChildrenField(typeName) {
  return {
    [_.camelCase(`children ${typeName}`)]: {
      type: () => [typeName],

      resolve(source, args, context) {
        const path = context.path;
        return context.nodeModel.getNodesByIds({
          ids: source.children,
          type: typeName
        }, {
          path
        });
      }

    }
  };
}

function createChildField(typeName) {
  return {
    [_.camelCase(`child ${typeName}`)]: {
      type: () => typeName,

      resolve(source, args, context) {
        return (0, _asyncToGenerator2.default)(function* () {
          const path = context.path;
          const result = yield context.nodeModel.getNodesByIds({
            ids: source.children,
            type: typeName
          }, {
            path
          });

          if (result && result.length > 0) {
            return result[0];
          } else {
            return null;
          }
        })();
      }

    }
  };
}

function groupChildNodesByType({
  nodeStore,
  nodes
}) {
  return _(nodes).flatMap(node => (node.children || []).map(nodeStore.getNode)).groupBy(node => node.internal ? node.internal.type : undefined).value();
}

const addTypeToRootQuery = ({
  schemaComposer,
  typeComposer
}) => {
  const typeName = typeComposer.getTypeName(); // not strictly correctly, result is `npmPackage` and `allNpmPackage` from type `NPMPackage`

  const queryName = _.camelCase(typeName);

  const queryNamePlural = _.camelCase(`all ${typeName}`);

  schemaComposer.Query.addFields({
    [queryName]: typeComposer.getResolver(`findOne`),
    [queryNamePlural]: typeComposer.getResolver(`findManyPaginated`)
  });
};

const reportParsingError = error => {
  const message = error.message,
        source = error.source,
        locations = error.locations;

  if (source && locations && locations.length) {
    const report = require(`gatsby-cli/lib/reporter`);

    const _require10 = require(`@babel/code-frame`),
          codeFrameColumns = _require10.codeFrameColumns;

    const frame = codeFrameColumns(source.body, {
      start: locations[0]
    }, {
      linesAbove: 5,
      linesBelow: 5
    });
    report.panic(`Encountered an error parsing the provided GraphQL type definitions:\n` + message + `\n\n` + frame + `\n`);
  } else {
    throw error;
  }
};
//# sourceMappingURL=schema.js.map