"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _ = require(`lodash`);

const _require = require(`graphql`),
      isAbstractType = _require.isAbstractType,
      GraphQLOutputType = _require.GraphQLOutputType,
      GraphQLUnionType = _require.GraphQLUnionType;

const invariant = require(`invariant`);

class LocalNodeModel {
  constructor({
    schema,
    nodeStore,
    createPageDependency,
    path
  }) {
    this.schema = schema;
    this.nodeStore = nodeStore;
    this.createPageDependency = createPageDependency;
    this.path = path;
  }
  /**
   * Get a node from the store by ID and optional type.
   *
   * @param {Object} args
   * @param {string} args.id ID of the requested node
   * @param {(string|GraphQLOutputType)} [args.type] Optional type of the node
   * @param {PageDependencies} [pageDependencies]
   * @returns {(Node|null)}
   */


  getNodeById(args, pageDependencies) {
    const _ref = args || {},
          id = _ref.id,
          type = _ref.type;

    const node = getNodeById(this.nodeStore, id);
    let result;

    if (!node) {
      result = null;
    } else if (!type) {
      result = node;
    } else {
      const nodeTypeNames = toNodeTypeNames(this.schema, type);
      result = nodeTypeNames.includes(node.internal.type) ? node : null;
    }

    return this.trackPageDependencies(result, pageDependencies);
  }
  /**
   * Get nodes from the store by IDs and optional type.
   *
   * @param {Object} args
   * @param {string[]} args.ids IDs of the requested nodes
   * @param {(string|GraphQLOutputType)} [args.type] Optional type of the nodes
   * @param {PageDependencies} [pageDependencies]
   * @returns {Node[]}
   */


  getNodesByIds(args, pageDependencies) {
    const _ref2 = args || {},
          ids = _ref2.ids,
          type = _ref2.type;

    const nodes = Array.isArray(ids) ? ids.map(id => getNodeById(this.nodeStore, id)).filter(Boolean) : [];
    let result;

    if (!nodes.length || !type) {
      result = nodes;
    } else {
      const nodeTypeNames = toNodeTypeNames(this.schema, type);
      result = nodes.filter(node => nodeTypeNames.includes(node.internal.type));
    }

    return this.trackPageDependencies(result, pageDependencies);
  }
  /**
   * Get all nodes in the store, or all nodes of a specified type. Note that
   * this doesn't add tracking to all the nodes, unless pageDependencies are
   * passed.
   *
   * @param {Object} args
   * @param {(string|GraphQLOutputType)} [args.type] Optional type of the nodes
   * @param {PageDependencies} [pageDependencies]
   * @returns {Node[]}
   */


  getAllNodes(args, pageDependencies) {
    const _ref3 = args || {},
          type = _ref3.type;

    let result;

    if (!type) {
      result = this.nodeStore.getNodes();
    } else {
      const nodeTypeNames = toNodeTypeNames(this.schema, type);
      const nodes = nodeTypeNames.reduce((acc, typeName) => acc.concat(this.nodeStore.getNodesByType(typeName)), []);
      result = nodes.filter(Boolean);
    }

    if (pageDependencies) {
      return this.trackPageDependencies(result, pageDependencies);
    } else {
      return result;
    }
  }
  /**
   * Get nodes of a type matching the specified query.
   *
   * @param {Object} args
   * @param {Object} args.query Query arguments (`filter`, `sort`, `limit`, `skip`)
   * @param {(string|GraphQLOutputType)} args.type Type
   * @param {boolean} [args.firstOnly] If true, return only first match
   * @param {PageDependencies} [pageDependencies]
   * @returns {Promise<Node[]>}
   */


  runQuery(args, pageDependencies) {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const _ref4 = args || {},
            query = _ref4.query,
            firstOnly = _ref4.firstOnly,
            type = _ref4.type; // We don't support querying union types (yet?), because the combined types
      // need not have any fields in common.


      const gqlType = typeof type === `string` ? _this.schema.getType(type) : type;
      invariant(!(gqlType instanceof GraphQLUnionType), `Querying GraphQLUnion types is not supported.`); // We provide nodes in case of abstract types, because `run-sift` should
      // only need to know about node types in the store.

      let nodes;
      const nodeTypeNames = toNodeTypeNames(_this.schema, gqlType);

      if (nodeTypeNames.length > 1) {
        nodes = nodeTypeNames.reduce((acc, typeName) => acc.concat(_this.nodeStore.getNodesByType(typeName)), []);
      }

      const queryResult = yield _this.nodeStore.runQuery({
        queryArgs: query,
        firstOnly,
        gqlType,
        nodes
      });
      let result = queryResult;

      if (args.firstOnly) {
        if (result && result.length > 0) {
          result = result[0];
        } else {
          result = null;
        }
      }

      return _this.trackPageDependencies(result, pageDependencies);
    })();
  }
  /**
   * Get the names of all node types in the store.
   *
   * @returns {string[]}
   */


  getTypes() {
    return this.nodeStore.getTypes();
  }
  /**
   * Get the root ancestor node for an object's parent node, or its first
   * ancestor matching a specified condition.
   *
   * @param {(Object|Array)} obj An object belonging to a Node, or a Node object
   * @param {Function} [predicate] Optional condition to match
   * @returns {(Node|null)}
   */


  findRootNodeAncestor(obj, predicate) {
    return this.nodeStore.findRootNodeAncestor(obj, predicate);
  }
  /**
   * Given a result, that's either a single node or an array of them, track them
   * using pageDependencies. Defaults to tracking according to current resolver
   * path. Returns the result back.
   *
   * @param {Node | Node[]} result
   * @param {PageDependencies} [pageDependencies]
   * @returns {Node | Node[]}
   */


  trackPageDependencies(result, pageDependencies) {
    const fullDependencies = Object.assign({
      path: this.path
    }, pageDependencies || {});
    const path = fullDependencies.path,
          connectionType = fullDependencies.connectionType;

    if (path) {
      if (connectionType) {
        this.createPageDependency({
          path,
          connection: connectionType
        });
      } else {
        const nodes = Array.isArray(result) ? result : [result];
        nodes.filter(Boolean).map(node => this.createPageDependency({
          path,
          nodeId: node.id
        }));
      }
    }

    return result;
  }

}

const getNodeById = (nodeStore, id) => {
  // This is for cases when the `id` has already been resolved
  // to a full Node for the input filter, and is also in the selection
  // set. E.g. `{ foo(parent: { id: { eq: 1 } } ) { parent { id } } }`.
  if (_.isPlainObject(id) && id.id) {
    return id;
  }

  return id != null ? nodeStore.getNode(id) : null;
};

const toNodeTypeNames = (schema, gqlTypeName) => {
  const gqlType = typeof gqlTypeName === `string` ? schema.getType(gqlTypeName) : gqlTypeName;
  if (!gqlType) return [];
  const possibleTypes = isAbstractType(gqlType) ? schema.getPossibleTypes(gqlType) : [gqlType];
  return possibleTypes.filter(type => type.getInterfaces().some(iface => iface.name === `Node`)).map(type => type.name);
};

module.exports = {
  LocalNodeModel
};
//# sourceMappingURL=node-model.js.map