/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */

import * as YamlValidator from "./index"

const validator = new YamlValidator({
  log: false,
  structure: {
    foo: 'string',
    bar: 'number'
  },
  writeJson: true,
  onWarning: (error, filepath) => {
    console.log(filepath + ' has error: ' + error)
  }
})

validator.validate(['/path/to/yaml'])
validator.report()
