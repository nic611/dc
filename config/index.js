// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        // 默认关闭Gzip,如果开启，需要执行下面的命令安装webpack插件
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8087,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        cssSourceMap: false,
        proxyTable: {
          //  测试
          // '/unification-api': {
          //   target: 'http://58.42.243.7:10001',
          //   changeOrigin: true
          //   生产
          '/unification-api': {
            target: eval(require('./prod.env').HOST),
            changeOrigin: true
          }
        }
    }
};
