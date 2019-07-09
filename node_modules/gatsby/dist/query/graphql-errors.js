"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.multipleRootQueriesError = multipleRootQueriesError;
exports.graphqlValidationError = graphqlValidationError;
exports.graphqlError = graphqlError;

var _graphql = require("graphql");

var _codeFrame = _interopRequireDefault(require("@babel/code-frame"));

var _lodash = _interopRequireDefault(require("lodash"));

var _reporter = _interopRequireDefault(require("gatsby-cli/lib/reporter"));

// These handle specific errors throw by RelayParser. If an error matches
// you get a pointer to the location in the query that is broken, otherwise
// we show the error and the query.
const handlers = [[/Unknown field `(.+)` on type `(.+)`/i, ([name], node) => {
  if (node.kind === `Field` && node.name.value === name) {
    return node.name.loc;
  }

  return null;
}], [/Unknown argument `(.+)`/i, ([name], node) => {
  if (node.kind === `Argument` && node.name.value === name) {
    return node.name.loc;
  }

  return null;
}], [/Unknown directive `@(.+)`/i, ([name], node) => {
  if (node.kind === `Directive` && node.name.value === name) {
    return node.name.loc;
  }

  return null;
}]];

function formatFilePath(filePath) {
  return `${_reporter.default.format.bold(`file:`)} ${_reporter.default.format.blue(filePath)}`;
}

function formatError(message, filePath, codeFrame) {
  return _reporter.default.stripIndent`
    ${message}

      ${formatFilePath(filePath)}
  ` + `\n\n${codeFrame}\n`;
}

function extractError(error) {
  const docRegex = /Error:[\0-\uFFFF](RelayParser|GraphQLParser):([\0-\uFFFF]*)Source: document[\0-\uFFFF]`([\0-\uFFFF]*)`[\0-\uFFFF]file[\0-\uFFFF]*(GraphQL[\0-\uFFFF]request[\0-\uFFFF]*^[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$)/gm;
  let matches;
  let message = ``;
  let docName = ``;
  let codeBlock = ``;

  while ((matches = docRegex.exec(error.toString())) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (matches.index === docRegex.lastIndex) docRegex.lastIndex++;
    var _matches = matches;
    message = _matches[2];
    docName = _matches[3];
    codeBlock = _matches[4];
  }

  if (!message) {
    message = error.toString();
  }

  return {
    message,
    codeBlock,
    docName
  };
}

function findLocation(extractedMessage, def) {
  let location = null;
  (0, _graphql.visit)(def, {
    enter(node) {
      if (location) return;

      for (var _i = 0; _i < handlers.length; _i++) {
        let _handlers$_i = handlers[_i],
            regex = _handlers$_i[0],
            handler = _handlers$_i[1];
        let match = extractedMessage.match(regex);
        if (!match) continue;
        if (location = handler(match.slice(1), node)) break;
      }
    }

  });
  return location;
}

function getCodeFrame(query, lineNumber, column) {
  return (0, _codeFrame.default)(query, lineNumber, column, {
    linesAbove: 10,
    linesBelow: 10
  });
}

function getCodeFrameFromRelayError(def, extractedMessage, error) {
  let _ref = findLocation(extractedMessage, def) || {},
      start = _ref.start,
      source = _ref.source;

  let query = source ? source.body : (0, _graphql.print)(def); // we can't reliably get a location without the location source, since
  // the printed query may differ from the original.

  let _ref2 = source && (0, _graphql.getLocation)(source, start) || {},
      line = _ref2.line,
      column = _ref2.column;

  return getCodeFrame(query, line, column);
}

function multipleRootQueriesError(filePath, def, otherDef) {
  let name = def.name.value;
  let otherName = otherDef.name.value;
  let unifiedName = `${_lodash.default.camelCase(name)}And${_lodash.default.upperFirst(_lodash.default.camelCase(otherName))}`;
  return formatError(`Multiple "root" queries found in file: "${name}" and "${otherName}". ` + `Only the first ("${otherName}") will be registered.`, filePath, `  ${_reporter.default.format.yellow(`Instead of:`)} \n\n` + (0, _codeFrame.default)(_reporter.default.stripIndent`
      query ${otherName} {
        bar {
          #...
        }
      }

      query ${name} {
        foo {
          #...
        }
      }
    `) + `\n\n  ${_reporter.default.format.green(`Do:`)} \n\n` + (0, _codeFrame.default)(_reporter.default.stripIndent`
      query ${unifiedName} {
        bar {
          #...
        }
        foo {
          #...
        }
      }
    `));
}

function graphqlValidationError(errors, filePath, doc) {
  if (!errors || !errors.length) return ``;
  let error = errors[0];
  let source = error.source,
      _error$locations = error.locations;
  _error$locations = _error$locations === void 0 ? [{}] : _error$locations;
  let _error$locations$ = _error$locations[0],
      line = _error$locations$.line,
      column = _error$locations$.column;
  let query = source ? source.body : (0, _graphql.print)(doc);
  return formatError(error.message, filePath, getCodeFrame(query, line, column));
}

function graphqlError(namePathMap, nameDefMap, error) {
  let codeBlock;

  let _extractError = extractError(error),
      message = _extractError.message,
      docName = _extractError.docName;

  let filePath = namePathMap.get(docName);

  if (filePath && docName) {
    codeBlock = getCodeFrameFromRelayError(nameDefMap.get(docName), message, error);
    const formattedMessage = formatError(message, filePath, codeBlock);
    return {
      formattedMessage,
      docName,
      message,
      codeBlock
    };
  }

  let reportedMessage = `There was an error while compiling your site's GraphQL queries.
  ${message || error.message}
    `;

  if (error.message.match(/must be an instance of/)) {
    reportedMessage += `This usually means that more than one instance of 'graphql' is installed ` + `in your node_modules. Remove all but the top level one or run \`npm dedupe\` to fix it.`;
  }

  if (error.message.match(/Duplicate document/)) {
    reportedMessage += `${error.message.slice(21)}\n`;
  }

  return {
    formattedMessage: reportedMessage,
    docName,
    message,
    codeBlock
  };
}
//# sourceMappingURL=graphql-errors.js.map