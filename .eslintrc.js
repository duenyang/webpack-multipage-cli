module.exports = {
  //此项指定环境的全局变量
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  // 默认推荐风格
  extends: 'eslint:recommended',
  //此项是用来指定javaScript语言类型和风格
  parserOptions: {
    sourceType: 'module',//设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
    //想使用的额外的语言特性:
    "ecmaFeatures": {
        // 允许在全局作用域下使用 return 语句
        "globalReturn": true,
        // impliedStric
        "impliedStrict": true,
        // 启用 JSX
        // "jsx": true,
        "modules": true
    }
  },
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {//  一些基本的规则，其它规则 http://eslint.cn/docs/rules/
    //  对象内元素使用逗号分隔(不是最后一个元素)
    'comma-dangle': ['error', 'always-multiline'],
    //  禁用console(off为关闭)
    'no-console': 'off',
    //  缩进两个空格
    "indent": ['error', 2],
    //  强制使用一致的换行风格(unix)
    'linebreak-style': ['error', 'unix'],
    //  单引号字符串
    "quotes": ['error', 'single'],
    //  需要分号
    "semi": ['error', 'always'],
    //  禁止不必要的分号
    'no-extra-semi':'error',
    //  存在使用的声明的声明时警告
    'no-unused-vars': ['warn']
  },
};
