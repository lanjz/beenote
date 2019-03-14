const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: '//at.alicdn.com/t/font_992689_pswgkexoa3.js'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'blue' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/app.less',
   
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/loading',
    '~/plugins/messageBox',
    '~/plugins/toast',
    '~/plugins/filters',
    '~/plugins/directive'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    styleResources:{
      less:'assets/styles/global.less'
    },
    extend(config, ctx) {
    },
  },
  env: {
    MOCK: process.env.MOCK
  }
}
