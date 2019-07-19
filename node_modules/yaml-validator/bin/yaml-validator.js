#!/usr/bin/env node

/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

'use strict';

const fs = require('fs'),
  path = require('path');

const optionator = require('optionator');

const YamlValidator = require('../index');

let pkg;

try {
  const packageJson = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8');

  pkg = JSON.parse(packageJson);
}
catch (error) {
  console.error('Could not read/parse "package.json", quite strange...');
  console.error(error);
  process.exit(1);
}

const optsParser = optionator({
  prepend: `${pkg.name} [options] <file>`,
  append: `Version ${pkg.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Help and usage instructions'
    },
    {
      option: 'version',
      alias: 'V',
      type: 'Boolean',
      description: 'Version number',
      example: '-V'
    },
    {
      option: 'write-json',
      alias: 'w',
      type: 'Boolean',
      description: 'Write the contents of the Yaml file to a JSON file next to it'
    },
    {
      option: 'log-file',
      alias: 'l',
      type: 'String',
      description: 'Log file where errors are written'
    }
  ]
});

let opts;

try {
  opts = optsParser.parse(process.argv);
}
catch (error) {
  console.error(error.message);
  console.log(optsParser.generateHelp());
  process.exit(1);
}

if (opts.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (opts.help) {
  console.log(optsParser.generateHelp());
  process.exit(0);
}

if (opts._.length !== 1) {
  console.error('File not specified');
  console.log(optsParser.generateHelp());
  process.exit(1);
}

const filepath = path.resolve(opts._[0]);

try {
  fs.accessSync(filepath);
}
catch (error) {
  console.error(`The file "${filepath}" does not exist`);
  process.exit(1);
}

const options = {
  writeJson: typeof opts.writeJson === 'boolean' ?
    opts.writeJson :
    false,
  log: typeof opts.logFile === 'string' ?
    opts.logFile :
    false
};

const validator = new YamlValidator(options);
validator.validate([filepath]);
process.exitCode = validator.report();
