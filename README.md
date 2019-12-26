# beenote

> beenote

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

服务器启动项目


先 `yarn build` 后` pm2 start npm -- run start`

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

服务器的配置太低，所以执行的build的时候直接出错了，所以只能先build这后再提交到服务器，服务器直接 ` pm2 start npm -- run start`

## 参考

[ 一篇文章搞定Github API 调用 (v3）](https://www.jianshu.com/p/a0c7d0482415)

[v3版API的官方教程](https://developer.github.com/v3/guides/getting-started/)


# 登录态

在nuxt的中间件中会尝试获取cookie，如果信息正确，就把用户信息保存到store中

因为中间件是js写的，用户Modal是有的ts，暂时不知如何在js文件中`import`ts模块方法
所以添加了额外获取用户信息的接口，在中间件通过这个接口读取cookie中的用户信息
