const path = require('path');
module.exports = {
  entry: [
    './src/index.js',  
  ],
  output: {
    filename: 'dom.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'breathecode-dom',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
    ]
  },
  devtool: "source-map",
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  }
};