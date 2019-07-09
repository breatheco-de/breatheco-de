"use strict";

const fs = require(`fs-extra`);

const path = require(`path`);

class GatsbyWebpackStatsExtractor {
  constructor(options) {
    this.plugin = {
      name: `GatsbyWebpackStatsExtractor`
    };
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync(this.plugin, (stats, done) => {
      let assets = {};
      let assetsMap = {};

      for (var _iterator = stats.compilation.chunkGroups, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        let chunkGroup = _ref;

        if (chunkGroup.name) {
          let files = [];

          for (var _iterator2 = chunkGroup.chunks, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
              if (_i2 >= _iterator2.length) break;
              _ref2 = _iterator2[_i2++];
            } else {
              _i2 = _iterator2.next();
              if (_i2.done) break;
              _ref2 = _i2.value;
            }

            let chunk = _ref2;
            files.push(...chunk.files);
          }

          assets[chunkGroup.name] = files.filter(f => f.slice(-4) !== `.map`);
          assetsMap[chunkGroup.name] = files.filter(f => f.slice(-4) !== `.map` && f.slice(0, chunkGroup.name.length) === chunkGroup.name).map(filename => `/${filename}`);
        }
      }

      const webpackStats = Object.assign({}, stats.toJson({
        all: false,
        chunkGroups: true
      }), {
        assetsByChunkName: assets
      });
      fs.writeFile(path.join(`public`, `chunk-map.json`), JSON.stringify(assetsMap), () => {
        fs.writeFile(path.join(`public`, `webpack.stats.json`), JSON.stringify(webpackStats), done);
      });
    });
  }

}

module.exports = GatsbyWebpackStatsExtractor;
//# sourceMappingURL=gatsby-webpack-stats-extractor.js.map