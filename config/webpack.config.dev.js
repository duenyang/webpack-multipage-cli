/**
 * 开发环境配置
 */
const webpack = require("webpack");
const config = require("./config")
// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    mode: 'development',
    devtool: 'source-map',
    // 插件
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    // 配置 webpack-dev-server
    devServer: Object.assign({}, {
        port: 8080,
        // 项目根目录
        contentBase: '../dist',
        inline: true,
        open: false,
        disableHostCheck: true,
        // 错误、警告展示设置
        overlay: {
            warnings: true,
            errors: true
        },
        // 配置在命令行中出现的提示信息
        stats: {
            all: false,
            hash: true,
            timings: true,
            version: true,
            modules: true,
            maxModules: 0,
            errors: true,
            warnings: true,
            moduleTrace: true,
            errorDetails: true
        }
    }, config.devServer)
});
