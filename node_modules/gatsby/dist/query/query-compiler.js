"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = compile;
exports.resolveThemes = exports.Runner = void 0;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _glob = _interopRequireDefault(require("glob"));

var _graphql = require("graphql");

var _relayCompiler = require("@gatsbyjs/relay-compiler");

var _RelayParser = _interopRequireDefault(require("@gatsbyjs/relay-compiler/lib/RelayParser"));

var _ASTConvert = _interopRequireDefault(require("@gatsbyjs/relay-compiler/lib/ASTConvert"));

var _GraphQLCompilerContext = _interopRequireDefault(require("@gatsbyjs/relay-compiler/lib/GraphQLCompilerContext"));

var _filterContextForNode = _interopRequireDefault(require("@gatsbyjs/relay-compiler/lib/filterContextForNode"));

var _redux = require("../redux");

var _fileParser = _interopRequireDefault(require("./file-parser"));

var _GraphQLIRPrinter = _interopRequireDefault(require("@gatsbyjs/relay-compiler/lib/GraphQLIRPrinter"));

var _graphqlErrors = require("./graphql-errors");

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

const normalize = require(`normalize-path`);

const _ = require(`lodash`);

const _require = require(`../redux/actions`),
      boundActionCreators = _require.boundActionCreators;

const websocketManager = require(`../utils/websocket-manager`);

const printTransforms = _relayCompiler.IRTransforms.printTransforms;

const _require2 = require(`graphql`),
      ValuesOfCorrectTypeRule = _require2.ValuesOfCorrectTypeRule,
      FragmentsOnCompositeTypesRule = _require2.FragmentsOnCompositeTypesRule,
      KnownTypeNamesRule = _require2.KnownTypeNamesRule,
      LoneAnonymousOperationRule = _require2.LoneAnonymousOperationRule,
      PossibleFragmentSpreadsRule = _require2.PossibleFragmentSpreadsRule,
      ScalarLeafsRule = _require2.ScalarLeafsRule,
      VariablesAreInputTypesRule = _require2.VariablesAreInputTypesRule,
      VariablesInAllowedPositionRule = _require2.VariablesInAllowedPositionRule;

const validationRules = [ValuesOfCorrectTypeRule, FragmentsOnCompositeTypesRule, KnownTypeNamesRule, LoneAnonymousOperationRule, PossibleFragmentSpreadsRule, ScalarLeafsRule, VariablesAreInputTypesRule, VariablesInAllowedPositionRule];
let lastRunHadErrors = null;
const overlayErrorID = `graphql-compiler`;

const resolveThemes = (themes = []) => themes.reduce((merged, theme) => {
  merged.push(theme.themeDir);
  return merged;
}, []);

exports.resolveThemes = resolveThemes;

class Runner {
  constructor(base, additional, schema) {
    (0, _defineProperty2.default)(this, "base", void 0);
    (0, _defineProperty2.default)(this, "additional", void 0);
    (0, _defineProperty2.default)(this, "schema", void 0);
    (0, _defineProperty2.default)(this, "errors", void 0);
    (0, _defineProperty2.default)(this, "fragmentsDir", void 0);
    this.base = base;
    this.additional = additional;
    this.schema = schema;
  }

  reportError(message) {
    const queryErrorMessage = `${_reporter.default.format.red(`GraphQL Error`)} ${message}`;

    _reporter.default.panicOnBuild(queryErrorMessage);

    if (process.env.gatsby_executing_command === `develop`) {
      websocketManager.emitError(overlayErrorID, queryErrorMessage);
      lastRunHadErrors = true;
    }
  }

  compileAll() {
    var _this = this;

    return (0, _asyncToGenerator2.default)(function* () {
      let nodes = yield _this.parseEverything();
      return yield _this.write(nodes);
    })();
  }

  parseEverything() {
    var _this2 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const filesRegex = _path.default.join(`/**`, `*.+(t|j)s?(x)`);

      let files = [_path.default.join(_this2.base, `src`), _path.default.join(_this2.base, `.cache`, `fragments`)].concat(_this2.additional.map(additional => _path.default.join(additional, `src`))).reduce((merged, folderPath) => merged.concat(_glob.default.sync(_path.default.join(folderPath, filesRegex), {
        nodir: true
      })), []);
      files = files.filter(d => !d.match(/\.d\.ts$/));
      files = files.map(normalize); // Ensure all page components added as they're not necessarily in the
      // pages directory e.g. a plugin could add a page component.  Plugins
      // *should* copy their components (if they add a query) to .cache so that
      // our babel plugin to remove the query on building is active (we don't
      // run babel on code in node_modules). Otherwise the component will throw
      // an error in the browser of "graphql is not defined".

      files = files.concat(Array.from(_redux.store.getState().components.keys(), c => normalize(c)));
      files = _.uniq(files);
      let parser = new _fileParser.default();
      return yield parser.parseFiles(files);
    })();
  }

  write(nodes) {
    var _this3 = this;

    return (0, _asyncToGenerator2.default)(function* () {
      const compiledNodes = new Map();
      const namePathMap = new Map();
      const nameDefMap = new Map();
      const nameErrorMap = new Map();
      const documents = [];

      for (var _iterator = nodes.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        let _ref2 = _ref,
            filePath = _ref2[0],
            doc = _ref2[1];
        let errors = (0, _graphql.validate)(_this3.schema, doc, validationRules);

        if (errors && errors.length) {
          _this3.reportError((0, _graphqlErrors.graphqlValidationError)(errors, filePath));

          boundActionCreators.queryExtractionGraphQLError({
            componentPath: filePath
          });
          return compiledNodes;
        }

        documents.push(doc);
        doc.definitions.forEach(def => {
          const name = def.name.value;
          namePathMap.set(name, filePath);
          nameDefMap.set(name, def);
        });
      }

      let compilerContext = new _GraphQLCompilerContext.default(_this3.schema);

      try {
        compilerContext = compilerContext.addAll(_ASTConvert.default.convertASTDocuments(_this3.schema, documents, validationRules, _RelayParser.default.transform.bind(_RelayParser.default)));
      } catch (error) {
        const _graphqlError = (0, _graphqlErrors.graphqlError)(namePathMap, nameDefMap, error),
              formattedMessage = _graphqlError.formattedMessage,
              docName = _graphqlError.docName,
              message = _graphqlError.message,
              codeBlock = _graphqlError.codeBlock;

        nameErrorMap.set(docName, {
          formattedMessage,
          message,
          codeBlock
        });
        boundActionCreators.queryExtractionGraphQLError({
          componentPath: namePathMap.get(docName),
          error: formattedMessage
        });

        _this3.reportError(formattedMessage);

        return false;
      } // relay-compiler v1.5.0 added "StripUnusedVariablesTransform" to
      // printTransforms. Unfortunately it currently doesn't detect variables
      // in input objects widely used in gatsby, and therefore removing
      // variable declaration from queries.
      // As a temporary workaround remove that transform by slicing printTransforms.


      const printContext = printTransforms.slice(0, -1).reduce((ctx, transform) => transform(ctx, _this3.schema), compilerContext);
      compilerContext.documents().forEach(node => {
        if (node.kind !== `Root`) return;
        const name = node.name;
        let filePath = namePathMap.get(name) || ``;

        if (compiledNodes.has(filePath)) {
          let otherNode = compiledNodes.get(filePath);

          _this3.reportError((0, _graphqlErrors.multipleRootQueriesError)(filePath, nameDefMap.get(name), otherNode && nameDefMap.get(otherNode.name)));

          boundActionCreators.queryExtractionGraphQLError({
            componentPath: filePath
          });
          return;
        }

        let text = (0, _filterContextForNode.default)(printContext.getRoot(name), printContext).documents().map(_GraphQLIRPrinter.default.print).join(`\n`);
        const query = {
          name,
          text,
          originalText: nameDefMap.get(name).text,
          path: filePath,
          isHook: nameDefMap.get(name).isHook,
          isStaticQuery: nameDefMap.get(name).isStaticQuery,
          hash: nameDefMap.get(name).hash
        };

        if (query.isStaticQuery) {
          query.jsonName = `sq--` + _.kebabCase(`${_path.default.relative(_redux.store.getState().program.directory, filePath)}`);
        }

        if (query.isHook && process.env.NODE_ENV === `production` && typeof require(`react`).useContext !== `function`) {
          _reporter.default.panicOnBuild(`You're likely using a version of React that doesn't support Hooks\n` + `Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);
        }

        compiledNodes.set(filePath, query);
      });

      if (process.env.gatsby_executing_command === `develop` && lastRunHadErrors) {
        websocketManager.emitError(overlayErrorID, null);
        lastRunHadErrors = false;
      }

      return compiledNodes;
    })();
  }

}

exports.Runner = Runner;

function compile() {
  return _compile.apply(this, arguments);
}

function _compile() {
  _compile = (0, _asyncToGenerator2.default)(function* () {
    // TODO: swap plugins to themes
    const _store$getState = _redux.store.getState(),
          program = _store$getState.program,
          schema = _store$getState.schema,
          themes = _store$getState.themes;

    const runner = new Runner(program.directory, resolveThemes(themes.themes), schema);
    const queries = yield runner.compileAll();
    return queries;
  });
  return _compile.apply(this, arguments);
}
//# sourceMappingURL=query-compiler.js.map