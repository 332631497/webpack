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


ȫ�ֻ���
1����װnodejs(v12.7.0)
2����װwebpack(4.38.0)�� webpack-cli(3.3.6)
    npm install -g webpack
    npm install -g webpack-cli
3����װvue-cli(3.10.0)
    npm install -g @vue/cli
    npm install -g @vue/cli-init

��������
vue init webpack [������]

���������޸�
config/index.js
build: assetsPublicPath ��Ϊ ./
utils.js ���һ��publicPath��������css��ʽ����������������������ͼƬ~@/assets/��

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


��������Ҫ�������ַ�޸�Ϊ�Ա���ַ(��ʱ)
npm config set registry https://registry.npm.taobao.org

#����������Ч
#npm config edit
#��
#registry=https://registry.npmjs.org/
#��Ϊ
#registry=https://registry.npm.taobao.org/

���/�޸Ĵ����Ա����
config/index.js -> module.exports-> dev -> proxyTable

