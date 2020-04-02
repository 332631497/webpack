# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


全局环境
1、安装nodejs(v12.7.0)
2、安装webpack(4.38.0)和 webpack-cli(3.3.6)
    npm install -g webpack
    npm install -g webpack-cli
3、安装vue-cli(3.10.0)
    npm install -g @vue/cli
    npm install -g @vue/cli-init

创建工程
vue init webpack [工程名]

部署配置修改
config/index.js
build: assetsPublicPath 改为 ./
utils.js 添加一个publicPath，这样在css样式可以在生产环境正常引用图片~@/assets/：

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }


在内网需要将代理地址修改为淘宝地址(临时)
npm config set registry https://registry.npm.taobao.org

#下述方法无效
#npm config edit
#将
#registry=https://registry.npmjs.org/
#改为
#registry=https://registry.npm.taobao.org/

添加/修改代理以便调试
config/index.js -> module.exports-> dev -> proxyTable

