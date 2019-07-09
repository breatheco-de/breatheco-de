"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = _interopRequireDefault(require("crypto"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _redux = require("../redux/");

var _path = require("../utils/path");

let lastHash = null;

const writeRedirects =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* () {
    bootstrapFinished = true;

    let _store$getState = _redux.store.getState(),
        program = _store$getState.program,
        redirects = _store$getState.redirects; // Filter for redirects that are meant for the browser.


    const browserRedirects = redirects.filter(r => r.redirectInBrowser);

    const newHash = _crypto.default.createHash(`md5`).update(JSON.stringify(browserRedirects)).digest(`hex`);

    if (newHash === lastHash) {
      return Promise.resolve();
    }

    lastHash = newHash;
    return yield _fsExtra.default.writeFile((0, _path.joinPath)(program.directory, `.cache/redirects.json`), JSON.stringify(browserRedirects, null, 2));
  });

  return function writeRedirects() {
    return _ref.apply(this, arguments);
  };
}();

exports.writeRedirects = writeRedirects;
let bootstrapFinished = false;
let oldRedirects;

const debouncedWriteRedirects = _lodash.default.debounce(() => {
  // Don't write redirects again until bootstrap has finished.
  if (bootstrapFinished && !_lodash.default.isEqual(oldRedirects, _redux.store.getState().redirects)) {
    writeRedirects();
    oldRedirects = _redux.store.getState().Redirects;
  }
}, 250);

_redux.emitter.on(`CREATE_REDIRECT`, () => {
  debouncedWriteRedirects();
});
//# sourceMappingURL=redirects-writer.js.map