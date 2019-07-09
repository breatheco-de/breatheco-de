"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const fs = require(`fs-extra`);

const path = require(`path`);

module.exports =
/*#__PURE__*/
function () {
  var _clean = (0, _asyncToGenerator2.default)(function* (args) {
    const directory = args.directory,
          report = args.report;
    const directories = [`.cache`, `public`];
    report.info(`Deleting ${directories.join(`, `)}`);
    yield Promise.all(directories.map(dir => fs.remove(path.join(directory, dir))));
    report.info(`Successfully deleted directories`);
  });

  return function clean(_x) {
    return _clean.apply(this, arguments);
  };
}();
//# sourceMappingURL=clean.js.map