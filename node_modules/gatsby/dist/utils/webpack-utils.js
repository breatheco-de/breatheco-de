"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const autoprefixer = require(`autoprefixer`);

const flexbugs = require(`postcss-flexbugs-fixes`);

const TerserPlugin = require(`terser-webpack-plugin`);

const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

const OptimizeCssAssetsPlugin = require(`optimize-css-assets-webpack-plugin`);

const isWsl = require(`is-wsl`);

const GatsbyWebpackStatsExtractor = require(`./gatsby-webpack-stats-extractor`);

const builtinPlugins = require(`./webpack-plugins`);

const eslintConfig = require(`./eslint-config`);

/**
 * A factory method that produces an atoms namespace
 */
module.exports =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(function* ({
    stage,
    program
  }) {
    const assetRelativeRoot = `static/`;
    const vendorRegex = /(node_modules|bower_components)/;
    const supportedBrowsers = program.browserslist;
    const PRODUCTION = !stage.includes(`develop`);
    const isSSR = stage.includes(`html`);

    const makeExternalOnly = original => (options = {}) => {
      let rule = original(options);
      rule.include = vendorRegex;
      return rule;
    };

    const makeInternalOnly = original => (options = {}) => {
      let rule = original(options);
      rule.exclude = vendorRegex;
      return rule;
    };

    let ident = 0;
    const loaders = {
      json: (options = {}) => {
        return {
          options,
          loader: require.resolve(`json-loader`)
        };
      },
      yaml: (options = {}) => {
        return {
          options,
          loader: require.resolve(`yaml-loader`)
        };
      },
      null: (options = {}) => {
        return {
          options,
          loader: require.resolve(`null-loader`)
        };
      },
      raw: (options = {}) => {
        return {
          options,
          loader: require.resolve(`raw-loader`)
        };
      },
      style: (options = {}) => {
        return {
          options,
          loader: require.resolve(`style-loader`)
        };
      },
      miniCssExtract: (options = {}) => {
        return {
          options,
          // use MiniCssExtractPlugin only on production builds
          loader: PRODUCTION ? MiniCssExtractPlugin.loader : require.resolve(`style-loader`)
        };
      },
      css: (options = {}) => {
        return {
          loader: isSSR ? require.resolve(`css-loader/locals`) : require.resolve(`css-loader`),
          options: Object.assign({
            sourceMap: !PRODUCTION,
            camelCase: `dashesOnly`,
            // https://github.com/webpack-contrib/css-loader/issues/406
            localIdentName: `[name]--[local]--[hash:base64:5]`
          }, options)
        };
      },
      postcss: (options = {}) => {
        let _plugins = options.plugins,
            _options$browsers = options.browsers,
            browsers = _options$browsers === void 0 ? supportedBrowsers : _options$browsers,
            postcssOpts = (0, _objectWithoutPropertiesLoose2.default)(options, ["plugins", "browsers"]);
        return {
          loader: require.resolve(`postcss-loader`),
          options: Object.assign({
            ident: `postcss-${++ident}`,
            sourceMap: !PRODUCTION,
            plugins: loader => {
              _plugins = (typeof _plugins === `function` ? _plugins(loader) : _plugins) || [];
              return [flexbugs, autoprefixer({
                browsers,
                flexbox: `no-2009`
              }), ..._plugins];
            }
          }, postcssOpts)
        };
      },
      file: (options = {}) => {
        return {
          loader: require.resolve(`file-loader`),
          options: Object.assign({
            name: `${assetRelativeRoot}[name]-[hash].[ext]`
          }, options)
        };
      },
      url: (options = {}) => {
        return {
          loader: require.resolve(`url-loader`),
          options: Object.assign({
            limit: 10000,
            name: `${assetRelativeRoot}[name]-[hash].[ext]`
          }, options)
        };
      },
      js: options => {
        return {
          options,
          loader: require.resolve(`./babel-loader`)
        };
      },
      eslint: (schema = ``) => {
        const options = eslintConfig(schema);
        return {
          options,
          loader: require.resolve(`eslint-loader`)
        };
      },
      imports: (options = {}) => {
        return {
          options,
          loader: require.resolve(`imports-loader`)
        };
      },
      exports: (options = {}) => {
        return {
          options,
          loader: require.resolve(`exports-loader`)
        };
      }
      /**
       * Rules
       */

    };
    const rules = {};
    /**
     * JavaScript loader via babel, excludes node_modules
     */

    {
      let js = (options = {}) => {
        return {
          test: /\.jsx?$/,
          exclude: vendorRegex,
          use: [loaders.js(options)]
        };
      };

      rules.js = js;
    }
    /**
     * mjs loader:
     * webpack 4 has issues automatically dealing with
     * the .mjs extension, thus we need to explicitly
     * add this rule to use the default webpack js loader
     */

    {
      let mjs = (options = {}) => {
        return Object.assign({
          test: /\.mjs$/,
          include: /node_modules/,
          type: `javascript/auto`
        }, options);
      };

      rules.mjs = mjs;
    }
    {
      let eslint = schema => {
        return {
          enforce: `pre`,
          test: /\.jsx?$/,
          exclude: vendorRegex,
          use: [loaders.eslint(schema)]
        };
      };

      rules.eslint = eslint;
    }

    rules.yaml = () => {
      return {
        test: /\.ya?ml/,
        use: [loaders.json(), loaders.yaml()]
      };
    };
    /**
     * Font loader
     */


    rules.fonts = () => {
      return {
        use: [loaders.url()],
        test: /\.(eot|otf|ttf|woff(2)?)(\?.*)?$/
      };
    };
    /**
     * Loads image assets, inlines images via a data URI if they are below
     * the size threshold
     */


    rules.images = () => {
      return {
        use: [loaders.url()],
        test: /\.(ico|svg|jpg|jpeg|png|gif|webp)(\?.*)?$/
      };
    };
    /**
     * Loads audio and video and inlines them via a data URI if they are below
     * the size threshold
     */


    rules.media = () => {
      return {
        use: [loaders.url()],
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga|flac)$/
      };
    };
    /**
     * Loads assets without inlining
     */


    rules.miscAssets = () => {
      return {
        use: [loaders.file()],
        test: /\.pdf$/
      };
    };
    /**
     * CSS style loader.
     */


    {
      const css = (_ref2 = {}) => {
        let browsers = _ref2.browsers,
            options = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["browsers"]);
        const use = [loaders.css(Object.assign({}, options, {
          importLoaders: 1
        })), loaders.postcss({
          browsers
        })];
        if (!isSSR) use.unshift(loaders.miniCssExtract({
          hmr: !options.modules
        }));
        return {
          use,
          test: /\.css$/
        };
      };
      /**
       * CSS style loader, _excludes_ node_modules.
       */


      css.internal = makeInternalOnly(css);
      css.external = makeExternalOnly(css);

      const cssModules = options => {
        const rule = css(Object.assign({}, options, {
          modules: true
        }));
        delete rule.exclude;
        rule.test = /\.module\.css$/;
        return rule;
      };

      rules.css = css;
      rules.cssModules = cssModules;
    }
    /**
     * PostCSS loader.
     */

    {
      const postcss = options => {
        return {
          test: /\.css$/,
          use: [loaders.css({
            importLoaders: 1
          }), loaders.postcss(options)]
        };
      };
      /**
       * PostCSS loader, _excludes_ node_modules.
       */


      postcss.internal = makeInternalOnly(postcss);
      postcss.external = makeExternalOnly(postcss);
      rules.postcss = postcss;
    }
    /**
     * Plugins
     */

    const plugins = Object.assign({}, builtinPlugins);
    /**
     * Minify JavaScript code without regard for IE8. Attempts
     * to parallelize the work to save time. Generally only add in Production
     */

    plugins.minifyJs = (_ref3 = {}) => {
      let terserOptions = _ref3.terserOptions,
          options = (0, _objectWithoutPropertiesLoose2.default)(_ref3, ["terserOptions"]);
      return new TerserPlugin(Object.assign({
        cache: true,
        // We can't use parallel in WSL because of https://github.com/gatsbyjs/gatsby/issues/6540
        // This issue was fixed in https://github.com/gatsbyjs/gatsby/pull/12636
        parallel: !isWsl,
        exclude: /\.min\.js/,
        sourceMap: true,
        terserOptions: Object.assign({
          ie8: false,
          mangle: {
            safari10: true
          },
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5
          },
          output: {
            ecma: 5
          }
        }, terserOptions)
      }, options));
    };

    plugins.minifyCss = (options = {}) => new OptimizeCssAssetsPlugin(options);
    /**
     * Extracts css requires into a single file;
     * includes some reasonable defaults
     */


    plugins.extractText = options => new MiniCssExtractPlugin(Object.assign({
      filename: `[name].[contenthash].css`,
      chunkFilename: `[name].[contenthash].css`
    }, options));

    plugins.moment = () => plugins.ignore(/^\.\/locale$/, /moment$/);

    plugins.extractStats = options => new GatsbyWebpackStatsExtractor(options);

    return {
      loaders,
      rules: rules,
      plugins: plugins
    };
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=webpack-utils.js.map