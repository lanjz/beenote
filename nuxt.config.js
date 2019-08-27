const pkg = require('./package')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// #ts-ignore
module.exports = {
  mode: 'universal',
  router: {
    middleware: 'check-auth'
  },
  modules: [
    '@nuxtjs/style-resources',
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '//at.alicdn.com/t/font_992689_xpg7lvpyl88.css'},
    ],
    script: [
  /*    {
        type: 'script',
        src: '//at.alicdn.com/t/font_992689_pswgkexoa3.js'
      }*/
    ]
  },
  
  /*
  ** Customize the progress-bar color
  */
  loading: {color: 'blue'},
  
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/app.less',
    '@/utils/client/hightlight/hightlight.css',
  ],
  
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/loading',
    '~/plugins/messageBox',
    '~/plugins/toast',
    '~/plugins/filters',
    '~/plugins/directive',
    '~/plugins/route'
  ],
  /*
  ** Build configuration
  */
  build: {
    analyze: false
    /*
    ** You can extend webpack config here
    */
    
  },
  styleResources: {
    less: 'assets/styles/global.less'
  },
  extend(config, ctx) {
  },
  env: {
    MOCK: process.env.MOCK
  },
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost
  }
}
