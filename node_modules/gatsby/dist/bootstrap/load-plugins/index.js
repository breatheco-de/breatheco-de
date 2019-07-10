"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const _ = require(`lodash`);

const _require = require(`../../redux`),
      store = _require.store;

const nodeAPIs = require(`../../utils/api-node-docs`);

const browserAPIs = require(`../../utils/api-browser-docs`);

const ssrAPIs = require(`../../../cache-dir/api-ssr-docs`);

const loadPlugins = require(`./load`);

const _require2 = require(`./validate`),
      collatePluginAPIs = _require2.collatePluginAPIs,
      handleBadExports = _require2.handleBadExports,
      handleMultipleReplaceRenderers = _require2.handleMultipleReplaceRenderers;

const apis = {
  node: _.keys(nodeAPIs),
  browser: _.keys(browserAPIs),
  ssr: _.keys(ssrAPIs) // Create a "flattened" array of plugins with all subplugins
  // brought to the top-level. This simplifies running gatsby-* files
  // for subplugins.

};

const flattenPlugins = plugins => {
  const flattened = [];

  const extractPlugins = plugin => {
    plugin.pluginOptions.plugins.forEach(subPlugin => {
      flattened.push(subPlugin);
      extractPlugins(subPlugin);
    });
  };

  plugins.forEach(plugin => {
    flattened.push(plugin);
    extractPlugins(plugin);
  });
  return flattened;
};

module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (config = {}, rootDir = null) {
    // Collate internal plugins, site config plugins, site default plugins
    const plugins = loadPlugins(config, rootDir); // Create a flattened array of the plugins

    let flattenedPlugins = flattenPlugins(plugins); // Work out which plugins use which APIs, including those which are not
    // valid Gatsby APIs, aka 'badExports'

    const x = collatePluginAPIs({
      apis,
      flattenedPlugins
    });
    flattenedPlugins = x.flattenedPlugins;
    const badExports = x.badExports; // Show errors for any non-Gatsby APIs exported from plugins

    handleBadExports({
      apis,
      badExports
    }); // Show errors when ReplaceRenderer has been implemented multiple times

    flattenedPlugins = handleMultipleReplaceRenderers({
      flattenedPlugins
    }); // If we get this far, everything looks good. Update the store

    store.dispatch({
      type: `SET_SITE_FLATTENED_PLUGINS`,
      payload: flattenedPlugins
    });
    return flattenedPlugins;
  });

  return function () {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=index.js.map