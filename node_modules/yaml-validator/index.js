/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs');

const yaml = require('js-yaml');
const check = require('check-type').init();

const YamlValidatore = function YamlValidatore(options) {
  this.options = Object.assign({
    log: false,
    structure: false,
    onWarning: null,
    writeJson: false
  }, options);

  this.logs = [];
  this.nonValidPaths = []; // list of property paths
  this.inValidFilesCount = 0;
};

/**
 * Store log messages
 * possible later use by writing a log file.
 * @param {string} msg Error message
 * @returns {void}
 */
YamlValidatore.prototype.errored = function errored(msg) {
  this.logs.push(msg);
};

/**
 * Check that the given structure is available.
 * @param {Object} doc Object loaded from Yaml file
 * @param {Object} structure Structure requirements
 * @param {string} parent Address in a dot notation
 * @returns {Array} List of not found structure paths
 */
YamlValidatore.prototype.validateStructure = function validateStructure(doc, structure, parent) {
  let notFound = [],
    current = '',
    notValid; // false or path

  parent = parent || '';

  Object.keys(structure).forEach(function eachKey(originKey) {
    const optional = originKey.endsWith('?');
    const key = originKey.replace(/\?$/u, '');

    current = parent;
    if (!check(structure).is('Array')) {
      current += (parent.length > 0 ?
        '.' :
        '') + key;
    }

    const item = structure[originKey];
    if (item instanceof Array) {
      if (check(doc).has(key) && check(doc[key]).is('Array')) {
        doc[key].forEach(function eachArray(child, index) {
          if (item.length > 1) {
            notValid = validateStructure([child], [item[index]], current + '[' + index + ']');
          }
          else {
            notValid = validateStructure([child], item, current + '[' + index + ']');
          }
          notFound = notFound.concat(notValid);
        });
      }
      else if (!optional) {
        notFound.push(current);
      }
    }
    else if (typeof item === 'string') {
      if (!check(doc).has(key) && optional){
        notValid = false;
      }
      else {
        notValid = !((check(structure).is('Array') || check(doc).has(key)) && check(doc[key]).is(item));
      }

      // Key can be a index number when the structure is an array, but passed as a string
      notFound.push(notValid ?
        current :
        false);
    }
    else if (typeof item === 'object' && item !== null) {
      if (!optional) {
        notValid = validateStructure(doc[key], item, current);
        notFound = notFound.concat(notValid);
      }
    }
  });

  return notFound.filter(function filterFalse(item) {
    return item !== false;
  });
};

/**
 * Parse the given Yaml data.
 * @param {string} filepath Yaml file path
 * @param {string} data Yaml data
 * @returns {string|null} Parsed Yaml or null on failure
 */
YamlValidatore.prototype.loadData = function loadData(filepath, data) {

  const _self = this;
  let doc;

  try {
    doc = yaml.safeLoad(data, {
      onWarning: (error) => {
        _self.errored(filepath + ' > ' + error);
        if (typeof _self.options.onWarning === 'function') {
          _self.options.onWarning.call(_self, error, filepath);
        }
      }
    });
  }
  catch (error) {
    const lineNumber = error.message.match(/line (\d+)/u)[1];
    _self.errored(`Failed to load the Yaml file "${filepath}:${lineNumber}"\n${error.message}`);
    console.error(`${filepath}:${lineNumber}\n${error.message}`);

    return null;
  }

  return doc;
};

/**
 * Read and parse the given Yaml file.
 * @param {string} filepath Yaml file path
 * @returns {string|null} Parsed Yaml or null on failure
 */
YamlValidatore.prototype.loadFile = function loadFile(filepath) {
  // Verbose output will tell which file is being read
  let data;
  const _self = this;

  try {
    data = fs.readFileSync(filepath, 'utf8');
  }
  catch (err) {
    _self.errored(filepath + ' > No such file or directory');

    return null;
  }

  return this.loadData(filepath, data);
};

/**
 * Read the given Yaml file, load and check its structure.
 * @param {string} filepath Yaml file path
 * @returns {number} 0 when no errors, 1 when errors.
 */
YamlValidatore.prototype.checkFile = function checkFile(filepath) {
  const doc = this.loadFile(filepath);

  if (!doc) {
    return 1;
  }

  if (this.options.writeJson) {
    const json = JSON.stringify(doc, null, '  ');
    fs.writeFileSync(filepath.replace(/\.y(a)?ml$/iu, '.json'), json, 'utf8');
  }

  if (this.options.structure) {
    const nonValidPaths = this.validateStructure(doc, this.options.structure);

    if (nonValidPaths.length > 0) {
      this.errored(filepath + ' is not following the correct structure, missing:');
      this.errored(nonValidPaths.join('\n'));
      this.nonValidPaths = this.nonValidPaths.concat(nonValidPaths);

      return 1;
    }
  }

  return 0;
};

/**
 * Create a report out of this, but in reality also run.
 * @param {array} files List of files that have been checked that they exist
 * @returns {void}
 */
YamlValidatore.prototype.validate = function validate(files) {
  const _self = this;
  this.inValidFilesCount = files.map(function mapFiles(filepath) {
    return _self.checkFile(filepath);
  }).reduce(function reduceFiles(prev, curr) {
    return prev + curr;
  }, _self.inValidFilesCount);
};

/**
 * Create a report out of this, but in reality also run.
 * @returns {number} 0 when no errors, the count of invalid files otherwise.
 */
YamlValidatore.prototype.report = function report() {

  if (this.inValidFilesCount > 0) {
    this.errored('Yaml format related errors in ' + this.inValidFilesCount + ' files');
  }

  const len = this.nonValidPaths.length;
  this.errored('Total of ' + len + ' structure validation error(s)');

  if (typeof this.options.log === 'string') {
    fs.writeFileSync(this.options.log, this.logs.join('\n'), 'utf8');
  }

  return this.inValidFilesCount;
};

module.exports = YamlValidatore;
