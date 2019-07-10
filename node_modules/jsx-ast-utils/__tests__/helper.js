/* eslint-env jest */
import getProp from '../src/getProp';

const nodeVersion = parseInt(process.version.match(/^v(\d+)\./)[1], 10);

export const fallbackToBabylon = nodeVersion < 6;

const parser = fallbackToBabylon ? require('babylon') : require('@babel/parser');

const defaultPlugins = ['jsx', 'functionBind', 'estree', 'objectRestSpread', 'optionalChaining'];
let plugins = [...defaultPlugins];

export function changePlugins(pluginOrFn) {
  if (Array.isArray(pluginOrFn)) {
    plugins = pluginOrFn;
  } else if (typeof pluginOrFn === 'function') {
    plugins = pluginOrFn(plugins);
  } else {
    throw new Error('changePlugins argument should be either an array or a function');
  }
}

beforeEach(() => {
  plugins = [...defaultPlugins];
});

function parse(code) {
  return parser.parse(code, { plugins });
}

export function getOpeningElement(code) {
  return parse(code).program.body[0].expression.openingElement;
}

export function extractProp(code, prop = 'foo') {
  const node = getOpeningElement(code);
  const { attributes: props } = node;
  return getProp(props, prop);
}
