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

## typescript


