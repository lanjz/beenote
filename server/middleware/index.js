const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const router  = require( '../router')
const sent  = require( '../utils/ret')
const hello  = require( '../utils/hello.js')
const checkAuth = require( '../utils/checkAuth.js')

const host = process.env.NODE_ENV === 'development' ? '*' : 'localhost:3002'
module.exports = function (app) {
/*  app.use(cors({
    origin: function (ctx) {
 /!*     if (ctx.method.toLowerCase() === 'get' ||
        (ctx.method.toLowerCase() === 'post' && ctx.url === '/login')) {
        return "http://localhost:3002"; // 允许来自所有域名请求
      }*!/
      return '*';s
    },
    allowMethods: ['GET', 'POST', 'options'],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))*/
  app.use(koaBody({ multipart: true }))
  app.use(async function(ctx, next) {
    if(process.env.NODE_ENV === 'development') {
      ctx.set("Access-Control-Allow-Methods", "*");
      ctx.set("Access-Control-Allow-Origin", 'http://localhost:3002')
      ctx.set("Access-Control-Allow-Credentials", true);
      ctx.set("Access-Control-Max-Age", 86400000);
      ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    }
    await next()
  })
  app.use(bodyParser())
  app.use(sent())
  app.use(hello.errorHandle)
  app.use(checkAuth)
  app.use(router.routes()).use(router.allowedMethods())
}
