"use strict";

const DEFAULT_INFER_CONFIG = {
  infer: true,
  addDefaultResolvers: true // Get inferance config from type directives

};

const getInferConfig = typeComposer => {
  return {
    infer: typeComposer.hasExtension(`infer`) ? typeComposer.getExtension(`infer`) : DEFAULT_INFER_CONFIG.infer,
    addDefaultResolvers: typeComposer.hasExtension(`addDefaultResolvers`) ? typeComposer.getExtension(`addDefaultResolvers`) : DEFAULT_INFER_CONFIG.addDefaultResolvers
  };
};

module.exports = getInferConfig;
//# sourceMappingURL=get-infer-config.js.map