'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromObjectExpression;
/**
 * Extractor function for an ObjectExpression type value node.
 * An object expression is using {}.
 *
 * @returns - a representation of the object
 */
function extractValueFromObjectExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = require('./index.js').default;
  return value.properties.reduce(function (obj, property) {
    var object = Object.assign({}, obj);
    // Support types: SpreadProperty and ExperimentalSpreadProperty
    if (/^(?:Experimental)?Spread(?:Property|Element)$/.test(property.type)) {
      if (property.argument.type === 'ObjectExpression') {
        return Object.assign(object, extractValueFromObjectExpression(property.argument));
      }
    } else {
      object[getValue(property.key)] = getValue(property.value);
    }
    return object;
  }, {});
}