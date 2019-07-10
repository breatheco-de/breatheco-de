"use strict";

const GatsbyThemeComponentShadowingResolverPlugin = require(`.`);

exports.onCreateWebpackConfig = ({
  store,
  stage,
  getConfig,
  rules,
  loaders,
  actions
}, pluginOptions) => {
  const _store$getState = store.getState(),
        program = _store$getState.program,
        themes = _store$getState.themes;

  if (themes.themes) {
    actions.setWebpackConfig({
      resolve: {
        plugins: [new GatsbyThemeComponentShadowingResolverPlugin({
          themes: themes.themes,
          projectRoot: program.directory
        })]
      }
    });
  }
};
//# sourceMappingURL=gatsby-node.js.map