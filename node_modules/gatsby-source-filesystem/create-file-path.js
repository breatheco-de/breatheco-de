"use strict";

const path = require(`path`);

const slash = require(`slash`);

function findFileNode({
  node,
  getNode
}) {
  // Find the file node.
  let fileNode = node;
  let whileCount = 0;

  while (fileNode.internal.type !== `File` && fileNode.parent && getNode(fileNode.parent) !== undefined && whileCount < 101) {
    fileNode = getNode(fileNode.parent);
    whileCount += 1;

    if (whileCount > 100) {
      console.log(`It looks like you have a node that's set its parent as itself`, fileNode);
    }
  }

  return fileNode;
}

module.exports = ({
  node,
  getNode,
  basePath = `src/pages`,
  trailingSlash = true
}) => {
  // Find the File node
  const fileNode = findFileNode({
    node,
    getNode
  });
  if (!fileNode) return undefined;
  const relativePath = path.posix.relative(slash(basePath), slash(fileNode.relativePath));

  const _path$parse = path.parse(relativePath),
        _path$parse$dir = _path$parse.dir,
        dir = _path$parse$dir === void 0 ? `` : _path$parse$dir,
        name = _path$parse.name;

  const parsedName = name === `index` ? `` : name;
  return path.posix.join(`/`, dir, parsedName, trailingSlash ? `/` : ``);
};