"use strict";

const babelLoader = require(`babel-loader`);

const _require = require(`./babel-loader-helpers`),
      prepareOptions = _require.prepareOptions,
      getCustomOptions = _require.getCustomOptions,
      mergeConfigItemOptions = _require.mergeConfigItemOptions;
/**
 * Gatsby's custom loader for webpack & babel
 *
 * Gatsby allows sites to either use our Babel setup (the default)
 * or to add a .babelrc to take control.
 *
 * Our default setup is defined in the fallbackPlugins/fallbackPresets arrays
 * below.
 *
 * After using either the fallback or user supplied setup, we add on a handful
 * of required plugins and finally merge in any presets/plugins supplied
 * by Gatsby plugins.
 *
 * You can find documentation for the custom loader here: https://babeljs.io/docs/en/next/babel-core.html#loadpartialconfig
 */


module.exports = babelLoader.custom(babel => {
  const toReturn = {
    // Passed the loader options.
    customOptions(options) {
      return {
        loader: Object.assign({
          cacheDirectory: true,
          sourceType: `unambiguous`
        }, getCustomOptions(), options)
      };
    },

    // Passed Babel's 'PartialConfig' object.
    config(partialConfig) {
      let options = partialConfig.options;

      const _prepareOptions = prepareOptions(babel),
            reduxPresets = _prepareOptions[0],
            reduxPlugins = _prepareOptions[1],
            requiredPresets = _prepareOptions[2],
            requiredPlugins = _prepareOptions[3],
            fallbackPresets = _prepareOptions[4]; // If there is no filesystem babel config present, add our fallback
      // presets/plugins.


      if (!partialConfig.hasFilesystemConfig()) {
        options = Object.assign({}, options, {
          plugins: requiredPlugins,
          presets: [...fallbackPresets, ...requiredPresets]
        });
      } else {
        // With a babelrc present, only add our required plugins/presets
        options = Object.assign({}, options, {
          plugins: [...options.plugins, ...requiredPlugins],
          presets: [...options.presets, ...requiredPresets]
        });
      } // Merge in presets/plugins added from gatsby plugins.


      reduxPresets.forEach(preset => {
        options.presets = mergeConfigItemOptions({
          items: options.presets,
          itemToMerge: preset,
          type: `preset`,
          babel
        });
      });
      reduxPlugins.forEach(plugin => {
        options.plugins = mergeConfigItemOptions({
          items: options.plugins,
          itemToMerge: plugin,
          type: `plugin`,
          babel
        });
      });
      return options;
    }

  };
  return toReturn;
});
//# sourceMappingURL=babel-loader.js.map