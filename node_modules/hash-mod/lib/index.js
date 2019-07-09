
var crypto = require('crypto');


/**
 * Expose `createHashMod`.
 */

module.exports = hashMod;


/**
 * Returns a `hashMod` function that will return an integer hash of a string
 * modded by `buckets`.
 *
 * @param {Number} buckets
 * @return {Function}
 */

function hashMod (buckets) {
  buckets = buckets || 100;
  return function (string) {
    return integerHash(string) % buckets;
  };
}

/**
 * Return the integer hash of a `string`.
 *
 * http://stackoverflow.com/questions/2624192/good-hash-function-for-strings
 *
 * @param {String} string
 * @returns {Number}
 */
function integerHash (string) {
  return (string+'').split('').reduce(function (memo, item) {
    return (memo * 31 * item.charCodeAt(0)) % 982451653;
  }, 7);
}