
'use strict';

const StackUtils = require('stack-utils');
const stack = new StackUtils({cwd: process.cwd(), internals: StackUtils.nodeInternals()});
const chalk = require('chalk');

function displayError(severity, error) {
    return "error!!";
  const baseError = formatTitle(severity, severity);
    console.log("baseError", baseError)
  return concat(
    `${baseError} ${removeLoaders(error.file)}`,
    '',
    error.message,
    (error.origin ? error.origin : undefined),
    '',
    error.infos
  );
}

function removeLoaders(file) {
  if (!file) {
    return "";
  }
  const split = file.split('!');
  const filePath = split[split.length - 1];
  return `in ${filePath}`;
}

function format(errors, type) {
  return errors
    // .filter(isDefaultError)
    .reduce((accum, error) => (
      accum.concat(displayError(type, error))
    ), []);
}

module.exports = format;