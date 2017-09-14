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
+ VS Code
+ React Developer Tools  react开发调试工具
+ Redux DevTools redux开发调试工具   

