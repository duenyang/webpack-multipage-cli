# webpack-template

### 用webpack构建的多页应用前端项目模板(架构)

* 根据[官方文档](https://doc.webpack-china.org/)进行配置(webpack3)

* 具有自动编译、打包、热更新、代码检查、服务器环境预览、自动部署等功能

* 你可以在此项目中正常使用[vue](https://github.com/vuejs/vue)、[react](https://github.com/facebook/react)等前端框架

* 待补充
  1.  ~~html-loader~~
  2.  ~~自动部署~~
  3.  ~~使用说明~~

---

### 2017-01-09新增自动部署(shell脚本)，你可以在命令行中直接执行对应的命令:

```bash
  #不需要运行 npm run build，此脚本会自动帮你运行

  #自动打包部署到测试环境
  sudo sh ./deploy.sh build dev

  #自动打包部署到生产环境
  sudo sh ./deploy.sh build prod

  #如果服务器中没有对应的目录，你可以运行下面的代码在部署时自动在服务器上生成一个目录
  sudo sh ./deploy.sh build prod(or dev) newDir

```
当然，以上命令均可在此项目的`./deploy.sh` 脚本文件中进行个性化配置</br>
需要**注意**的是，当你每次执行以上命令时，系统都会提示你输入远程服务器密码，你可以把你本地的ssh公钥`（~/.ssh/id_rsa.pub）`配置到对应服务器`（~/.ssh/authorized_keys）`中就可以不需要每一次都输入密码了

---

### 2017-01-08新增`html-loader` ,你可以在html中引入src相对路径，比如:

```html
<img src="../image/a.jpg">
```
`url-loader`或者`file-loader`会把图片链接自动打包为`/image/[name].[hash].[ext]`形式，并且放到`dist`目录下，当然，这些都是可以自定义的;

**对于css文件，建议使用官方推荐的在js文件中使用 `import '../css/a.css`  这种形式**; </br>
使用此模板在开发环境下`(npm run dev)`，css会以`style`标签的形式插入到`html`中，在生产环境中`(npm run build)`时，css会被`extract-text-webpack-plugin`这个插件提取出来，生成对应的`css/[name].[hash].css`文件，以`link`标签的形式插入的`html->head`中;

---

### 使用说明  

```bash
  #以下命令均可在package.json中进行配置

  #开发环境下运行
  npm run dev

  #使用Eslint进行代码检测
  npm run lint

  #打包构建
  npm run build

  #服务器环境下预览
  npm run serve
```


