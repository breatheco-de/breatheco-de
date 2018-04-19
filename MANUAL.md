# Vanilla.js Professional Boilerplate

1. Install Webpack to use it as a bundler
```
$ npm i webpack webpack-dev-server webpack-cli html-webpack-plugin --save-dev
```
2. Install eslint to upgrade your coding IDE and make it help you better.
```
$ npm i eslint eslint-loader --save-dev
```
3. Install Babel.js for transpilation
```
npm i babel babel-core babel-loader babel-eslint babel-preset-env --save-dev
```

4. Install the SASS loaders to allow bundling SASS
```
npm i style-loader css-loader sass-loader --save-dev
```

5. Install file loader for fonts
```
npm i file-loader --save-dev
```

6. Install Bootstrap
```
npm i bootstrap jquery popper.js --save-dev
```

7. Set you webpack.config.js like this:
```js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/js/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/bundle/')
  },
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.scss$/, use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        }, //css only files
        { 
          test: /\.(png|svg|jpg|gif)$/, use: {
            loader: 'file-loader',
            options: { name: '[name].[ext]' } 
          }
        }, //for images
        { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, use: ['file-loader'] } //for fonts
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devtool: "source-map",
  devServer: {
    contentBase:  './dist',
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      Popper: 'popper.js',
      jQuery: 'jquery',
      // In case you imported plugins individually, you must also require them here:
      Util: "exports-loader?Util!bootstrap/js/dist/util",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    })
  ]
};
```
