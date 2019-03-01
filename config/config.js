/**
 * 全局配置文件
 */

// 项目中的html文件，不需要后缀
const HTMLDirs = [
  "a",
  "b"
]
const devServer = {
  port: 8080,
  contentBase: '../dist',
  open: true,
  openPage: `/${HTMLDirs[0]}.html`
}
module.exports = {
  HTMLDirs,
  devServer
}