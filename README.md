# webpack-template

### 用webpack构建的前端项目模板(架构)

* 根据官方文档 `https://doc.webpack-china.org/` 进行配置(webpack3)

* 具有自动编译、打包、热更新、代码检查、服务器环境预览等功能

* 待补充
  1.  ~~html-loader~~
  2.  自动部署
  3.  ~~使用说明~~

> **2017-01-08新增`html-loader`** ,你可以在html中引入src相对路径，比如:

```
<img src="../image/a.jpg">
```
> webpack的`url-loader`或者`file-loader`会把图片链接自动打包为`/image/[name].[hash].[ext]`形式，并且放到`dist`目录下，当然，这些都是可以自定义的;

>**对于css文件，建议使用官方推荐的在js文件中使用 `import '../css/a.css`  这种形式**; 使用此模板在开发环境下`(npm run dev)`，css会以`style`标签的形式插入到`html`中，在生产环境中`(npm run build)`时，css会被`extract-text-webpack-plugin`这个插件提取出来，生成对应的`css/[name].[hash].css`文件，以`link`标签的形式插入的`html->head`中;

---

### 使用说明  

```bash
  /* 以下命令均可在package.json中进行配置 */

  //  开发环境下运行
  npm run dev

  //  使用Eslint进行代码检测
  npm run lint

  //  打包构建
  npm run build

  //  服务器环境下预览
  npm run serve
```


