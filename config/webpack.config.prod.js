/**
 * 生产环境配置
 */

// 引入基础配置
const webpackBase = require("./webpack.config.base");
// 引入 webpack
const webpack = require("webpack");
const path = require("path");
//  提取css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 清理 dist 文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")
// UglifyJsPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // 默认js
                test: /\.js(\?.*)?$/i,
                // 开启 sourceMap
                sourceMap: true,
                // 启用文件缓存
                cache: true,
                // 推荐，开启多线程（可设置运行线程数量）
                parallel: true,
                // 配置项
                uglifyOptions: {
                    warnings: false
                },
                // 是否把注释提到单独的文件中（[name].[ext].LICENSE）
                extractComments: false
            })
          ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        // 提取公共 JavaScript 代码
        new webpack.optimize.CommonsChunkPlugin({
            // chunk 名为 commons
            name: "commons",
            filename: "javascript/[name].bundle.js",
        }),
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),  //根目录

            verbose: true,    //开启在控制台输出信息

            dry: false　　　　  //启用删除文件
        }),
    ]
});
