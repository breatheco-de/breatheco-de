"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _require = require(`util`),
      promisify = _require.promisify;

const detectPort = promisify(require(`detect-port`));

const report = require(`gatsby-cli/lib/reporter`);

const readlinePort = (port, rlInterface) => {
  const question = `Something is already running at port ${port} \nWould you like to run the app at another port instead? [Y/n] `;
  return new Promise(resolve => {
    rlInterface.question(question, answer => {
      resolve(answer.length === 0 || answer.match(/^yes|y$/i));
    });
  });
};

const detectPortInUseAndPrompt =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (port, rlInterface) {
    let foundPort = port;
    const detectedPort = yield detectPort(port).catch(err => report.panic(err));

    if (port !== detectedPort) {
      if (yield readlinePort(port, rlInterface)) {
        foundPort = detectedPort;
      }
    }

    return foundPort;
  });

  return function detectPortInUseAndPrompt(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = detectPortInUseAndPrompt;
//# sourceMappingURL=detect-port-in-use-and-prompt.js.map