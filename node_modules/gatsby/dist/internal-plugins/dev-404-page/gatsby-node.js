"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const path = require(`path`);

const fs = require(`fs-extra`);

const chokidar = require(`chokidar`);

exports.createPagesStatefully =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    store,
    actions
  }, options, done) {
    if (process.env.NODE_ENV !== `production`) {
      const _store$getState = store.getState(),
            program = _store$getState.program;

      const createPage = actions.createPage;
      const source = path.join(__dirname, `./raw_dev-404-page.js`);
      const destination = path.join(program.directory, `.cache`, `dev-404-page.js`);

      const copy = () => fs.copy(source, destination);

      yield copy();
      createPage({
        component: destination,
        path: `/dev-404-page/`
      });
      chokidar.watch(source).on(`change`, () => copy()).on(`ready`, () => done());
    } else {
      done();
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=gatsby-node.js.map