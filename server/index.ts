import * as Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import middleware from './middleware/index'
const config = require( '../nuxt.config')
const consola = require ('consola')
const app = new Koa()
config.dev = !(app.env === 'production')
async function start(){
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  // @ts-ignore
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 如果不是接口返回页面
  app.use(async (ctx, next) => {
    if(!(ctx.url.indexOf('/api') == 0 || ctx.url.indexOf('/git') === 0 || ctx.url.indexOf('/row') === 0)) {
      ctx.status = 200
      ctx.respond = false // Bypass Koa's built-in response handling
      ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
      nuxt.render(ctx.req, ctx.res)
      return
    }
    await next()
  })
  middleware(app)
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
