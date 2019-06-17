const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router  = require( '../router')
const sent  = require( '../utils/ret')
const hello  = require( '../utils/hello.js')
const checkAuth = require( '../utils/checkAuth.js')

module.exports = function (app) {
  app.use(cors({
    origin: function (ctx) {
      if (ctx.method.toLowerCase() === 'get' ||
        (ctx.method.toLowerCase() === 'post' && ctx.url === '/login')) {
        return "http://localhost:3002"; // 允许来自所有域名请求
      }
      return 'http://localhost:3002';
    },
    allowMethods: ['GET', 'POST'],
/*  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],*/
  }))
  app.use(bodyParser())
  app.use(sent())
  app.use(hello.errorHandle)
  app.use(checkAuth)
  app.use(router.routes()).use(router.allowedMethods())
}
