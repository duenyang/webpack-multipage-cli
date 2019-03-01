/**
 * 生产环境配置
 */

// 引入基础配置
const webpackBase = require("./webpack.config.base");
const path = require("path");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");
// 清理 dist 文件夹
const CleanWebpackPlugin = require("clean-webpack-plugin")
// UglifyJsPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 优化打包css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 合并配置文件
module.exports = webpackMerge(webpackBase,{
    mode: 'production',
    stats: {
        children: false
    },
    devtool: 'nosources-source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // 默认js
                test: /\.js(\?.*)?$/i,
                exclude: /\.min\.js$/,
                // 开启 sourceMap
                sourceMap: true,
                // 启用文件缓存
                cache: true,
                // 推荐，开启多线程（可设置运行线程数量）
                parallel: true,
                // 配置项
                uglifyOptions: {
                    compress: {
                        unused: true,
                      warnings: false,
                      drop_console: true,
                      drop_debugger: true,
                      reduce_vars: true
                  },
                  output: {
                        comments: false
                  }
                },
                // 是否把注释提到单独的文件中（[name].[ext].LICENSE）
                extractComments: false
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                    preset: ['default', {
                        autoprefixer: true,
                        discardComments: {
                            removeAll: true,
                        },
                        zindex: false
                    }]
                },
                canPrint: false
            })
          ],
          splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors/vendors',
                    reuseExistingChunk: true,
                      chunks: 'async'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: 'vendors/common',
                    reuseExistingChunk: true,
                    chunks: 'all'
                }
            }
        }
    },
    plugins:[
        // 自动清理 dist 文件夹
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),  //根目录

            verbose: true,    //开启在控制台输出信息

            dry: false　　　　  //启用删除文件
        }),
    ],
    performance:{
        hints: false
    }
});
