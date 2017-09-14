const path = require('path');
const utils = require('./utils');
const config = require('../config');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: {
      app: ['babel-polyfill', './src/main.js']
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            '$src': resolve('src'),
            '$assets': resolve('src/assets'),
            '$store': resolve('src/store'),
            '$module': resolve('src/module'),
            '$connection': resolve('src/connection'),
            '$base': resolve('src/base'),
            '$common': resolve('src/module/common'),
            '$cc': resolve('src/module/common/components'),
            '$i18n': resolve('src/assets/i18n')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
              test: /\.svg$/,
              loader: 'raw-loader'
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};
