/**
 * webpack 基础配置
 */
const webpack = require('webpack');

const fs = require('fs')

const path = require("path");
// 引入模板插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
//  环境变量
const env = process.env.NODE_ENV
// 提取js中的css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入config.js
const config = require("./config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}



// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
  const htmlPlugin = new HTMLWebpackPlugin({
    filename: `${page}.html`,
    template: path.resolve(__dirname, `../src/page/${page}.html`),
    chunks: [page, 'commons'],
    minify: {
      "removeAttributeQuotes": true,
      "removeComments": true,
      "removeEmptyAttributes": true,
    }
  });
  HTMLPlugins.push(htmlPlugin);
  Entries[page] = path.resolve(__dirname, `../src/js/${page}.js`);
})

module.exports = {
  // 入口文件
  entry: Entries,
  // 启用 sourceMap
  devtool: "cheap-module-source-map",
  // 输出文件
  output: {
    filename: env === 'prod' // webpack热更新和chunkhash有冲突,在开发环境下使用hash模式
                ? "js/[name].[chunkhash:8].js"
                : "js/[name].[hash:8].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js'] // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀
  },
  // 加载器
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href'],
            interpolate: true
          }
        }]
      }, 
      {
        // 对 css 后缀名进行处理
        test: /\.css$/,
        // 不处理 node_modules 文件中的 css 文件
        exclude: /node_modules/,
        /* link打包之后引入对应的css形式(dev模式下为内嵌style形式) */
        use: [
          env === 'prod'?  MiniCssExtractPlugin.loader : 'style-loader', 
          'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            // 打包生成图片的名字
            name: "image/[name].[hash].[ext]",
          }
        }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["url-loader"]
      }
    ],
  },
  // 插件
  plugins: [
    // new webpack.BannerPlugin('Created by YourName.')
    // 自动生成 HTML 插件
    ...HTMLPlugins,
    // 从js中提取css配置
    new MiniCssExtractPlugin({
			filename: env == 'prod' ? 'css/[name].[contenthash:8].css' : '[name].css',
			chunkFilename: env == 'prod' ? 'css/[name].[contenthash:8].css' : '[name].css',
			allChunks: true
		})
  ],
}