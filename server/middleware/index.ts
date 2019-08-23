import * as bodyParser from 'koa-bodyparser'
import * as koaBody from'koa-body'
import router from '../router'
import { errorHandle } from '../utils/hello'
import checkAuth from  '../utils/checkAuth'

import  sent from '../utils/ret'

const host = process.env.NODE_ENV === 'development' ? '*' : 'localhost:3002'
export default function (app) {
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
  app.use(errorHandle)
  app.use(checkAuth)
  app.use(router.routes()).use(router.allowedMethods())
}
