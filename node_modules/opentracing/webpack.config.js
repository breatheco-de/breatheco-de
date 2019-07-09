const webpack = require("webpack");

// Pass in the build configuration as environment variables
const CONFIG = process.env.BUILD_CONFIG

// Modify the webpack settings based on the configuration
const plugins = [];
let bundleSuffix = '';
let devtool;

if (CONFIG === 'debug') {
    devtool = "source-map";
} else {
    bundleSuffix = ".min";
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                dead_code: true,
                unused: true,
                // Hide the dead code warnings. The defines intentionally create
                // dead code paths.
                warnings: false,
            },
        })
    );
}

//
// Webpack configuration
//
module.exports = {
    entry: './src/index.ts',
    target: 'web',
    output: {
        path: __dirname + '/dist/',
        filename: 'opentracing-browser' + bundleSuffix + '.js',
        library: 'opentracing',
        libraryTarget: 'umd',
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    compilerOptions: {
                        declaration: false
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts']
    },
};
