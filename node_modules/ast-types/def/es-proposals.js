module.exports = function (fork) {
  fork.use(require('./core'));

  var types = fork.use(require("../lib/types"));
  var Type = types.Type;
  var def = types.Type.def;
  var or = Type.or;

  var shared = fork.use(require("../lib/shared"));
  var defaults = shared.defaults;


  // https://github.com/tc39/proposal-optional-chaining
  // `a?.b` as per https://github.com/estree/estree/issues/146
  def("OptionalMemberExpression")
    .bases("MemberExpression")
    .build("object", "property", "computed", "optional")
    .field("optional", Boolean, defaults["true"])

  // a?.b()
  def("OptionalCallExpression")
    .bases("CallExpression")
    .build("callee", "arguments", "optional")
    .field("optional", Boolean, defaults["true"])


  // https://github.com/tc39/proposal-nullish-coalescing
  // `a ?? b` as per https://github.com/babel/babylon/pull/761/files
  var LogicalOperator = or("||", "&&", "??");

  def("LogicalExpression")
    .field("operator", LogicalOperator)
};
