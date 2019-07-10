"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const getDevelopmentCertificate = require(`devcert-san`).default;

const report = require(`gatsby-cli/lib/reporter`);

const fs = require(`fs`);

const path = require(`path`);

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    name,
    certFile,
    keyFile,
    directory
  }) {
    // check that cert file and key file are both true or both false, if they are both
    // false, it defaults to the automatic ssl
    if (certFile ? !keyFile : keyFile) {
      report.panic(`for custom ssl --https, --cert-file, and --key-file must be used together`);
    }

    if (certFile && keyFile) {
      const keyPath = path.join(directory, keyFile);
      const certPath = path.join(directory, certFile);
      return yield {
        keyPath,
        certPath,
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      };
    }

    report.info(`setting up automatic SSL certificate (may require sudo)\n`);

    try {
      return yield getDevelopmentCertificate(name, {
        installCertutil: true
      });
    } catch (err) {
      report.panic(`\nFailed to generate dev SSL certificate`, err);
    }

    return false;
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=get-ssl-cert.js.map