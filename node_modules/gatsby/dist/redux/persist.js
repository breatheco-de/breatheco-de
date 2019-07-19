"use strict";

const v8 = require(`v8`);

const fs = require(`fs-extra`);

const stringify = require(`json-stringify-safe`);

const objectToMap = obj => {
  const map = new Map();
  Object.keys(obj).forEach(key => {
    map.set(key, obj[key]);
  });
  return map;
};

const mapToObject = map => {
  const obj = {};

  for (var _iterator = map, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
        key = _ref2[0],
        value = _ref2[1];
    obj[key] = value;
  }

  return obj;
};

const jsonStringify = contents => {
  contents.staticQueryComponents = mapToObject(contents.staticQueryComponents);
  contents.components = mapToObject(contents.components);
  contents.nodes = contents.nodes ? mapToObject(contents.nodes) : {};
  return stringify(contents, null, 2);
};

const jsonParse = buffer => {
  const parsed = JSON.parse(buffer.toString(`utf8`));
  parsed.staticQueryComponents = objectToMap(parsed.staticQueryComponents);
  parsed.components = objectToMap(parsed.components);
  parsed.nodes = objectToMap(parsed.nodes || {});
  return parsed;
};

const useV8 = Boolean(v8.serialize);

const _ref3 = useV8 ? [v8.serialize, v8.deserialize, `${process.cwd()}/.cache/redux.state`] : [jsonStringify, jsonParse, `${process.cwd()}/.cache/redux-state.json`],
      serialize = _ref3[0],
      deserialize = _ref3[1],
      file = _ref3[2];

const readFromCache = () => deserialize(fs.readFileSync(file));

const writeToCache = contents => {
  fs.writeFileSync(file, serialize(contents));
};

module.exports = {
  readFromCache,
  writeToCache
};
//# sourceMappingURL=persist.js.map