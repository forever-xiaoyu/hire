# Error Handler #

## Start ##

```bash
npm install     # 安装依赖
npm run serve   # 启动项目
npm run lint    # 代码检测
npm run test    # 单元测试
```

------------------

## Test ##

<http://127.0.0.1:8087/test.html>

------------------

## Feature ##

>* [Webpack](https://webpack.js.org/)
>* [TypeScript](https://www.typescriptlang.org/)
>* [Prettier](https://prettier.io/)
>* [Tslint](https://palantir.github.io/tslint/)
>* [Travis CI](https://travis-ci.org/)
>* [commitlint](https://commitlint.js.org/)
>* [precommit](https://pre-commit.com/)

------------------

## Structure ##

``` vim
    .
    ├── config            # webpack 配置
    ├── dist              # 打包目录
    ├── src
    │   ├── public               # 首页入口
    │   ├── types                # 类型定义
    │   ├── utils                # 工具库
    │   ├── views                # 页面目录
    │   │   ├── test                    # 测试页面
    │   ├── index.ts             # 入口文件
    ├── tests             # 单元测试
    ├── .prettierrc
    ├── .travis.yml
    ├── commitlint.config.js
    ├── husky.config.js
    ├── package.json
    ├── tsconfig.json
    └── tslint.json
```

------------------
