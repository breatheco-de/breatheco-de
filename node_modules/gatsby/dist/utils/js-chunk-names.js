"use strict";

const _require = require(`lodash`),
      kebabCase = _require.kebabCase;

const path = require(`path`);

const kebabHash = require(`kebab-hash`);

const _require2 = require(`../redux`),
      store = _require2.store;

const generatePathChunkName = path => {
  const name = path === `/` ? `index` : kebabHash(path);
  return `path---${name}`;
};

const generateComponentChunkName = componentPath => {
  const program = store.getState().program;
  let directory = `/`;

  if (program && program.directory) {
    directory = program.directory;
  }

  const name = path.relative(directory, componentPath);
  return `component---${kebabCase(name)}`;
};

exports.generatePathChunkName = generatePathChunkName;
exports.generateComponentChunkName = generateComponentChunkName;
//# sourceMappingURL=js-chunk-names.js.map