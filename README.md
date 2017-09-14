# 主要技术栈
> react + redux + react-router + redux-saga + immutableJS + axios

# 需要环境
node.js > 6.10

# 常用命令
```
npm run dev    #开发
npm run build  #发布
```

#目录结构

```
├─ build                              # webpack打包配置项目录
├─ config                             # 项目配置文件目录
├─ dist                               # build发布目录
├─ src                                # 程序源文件目录
│   ├─ App.jsx                       # 应用主视图
│   ├─ main.js                       # 程序入口
│   ├─ assets                        # 公共资源目录（公用的js、css、图片等）
│   │   ├── i18n                    # 国际化目录
│   ├─ connection                    # 网络连接
│   ├─ store                         # Redux相关文件目录
│   │   ├── configureStore.dev.js   # 开发环境的store配置
│   │   ├── configureStore.js       # 创建store
│   │   ├── configureStore.prod.js  # 生产环境的store配置
│   │   ├── createdReducer.js       # 模块用于创建reducer的工具方法
│   │   ├── index.js                # 导出store和运行saga
│   │   ├── middlewares.js          # 单独管理redux中间件
│   │   └── configureReducers.js          # 组合模块的Reducer
│   └─ module                        # 模块目录
│       ├── reducerIndex.js         # 所有模块的reducer集合
│       ├── routerIndex.js          # 所有模块的router集合
│       ├── sagaIndex.js            # 所有模块的saga集合
│       └── demo1                   # 模块1目录
│           ├── api.js              # 模块调用api的方法
│           ├── router.js           # 模块的路由配置
│           ├── components          # 模块的React组件
│           ├── model               # 模块的model
│           └── resources           # 模块使用的静态资源（css,图片等）
└─ test                              # 测试
```

# 开发工具
+ WebStorm/sublime text 3
+ React Developer Tools  react开发调试工具
+ Redux DevTools redux开发调试工具   


# 相关文档
+ [Redux](http://cn.redux.js.org/index.html)
+ [redux-saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
+ [flex.css](https://github.com/lzxb/flex.css/blob/master/docs/zh-ch.md) [demo](http://lzxb.name/flex.css/)
+ [precss](https://jonathantneal.github.io/precss/)
+ [immutableJS](http://www.cnblogs.com/samwu/p/5457031.html) [官方](http://facebook.github.io/immutable-js/docs/#/)
+ [axios](http://www.jianshu.com/p/df464b26ae58)
+ [es6](http://es6.ruanyifeng.com/#README)
+ [eslint规则](https://standardjs.com/rules-zhcn.html)
+ [moment](http://momentjs.cn/docs/)


**为了养成良好的编码习惯和提高代码可读性，项目开启了比较严格的语法检查，请知悉。**