const bodyParser = require('koa-bodyparser')
const router  = require( '../router')
const sent  = require( '../utils/ret')
const hello  = require( '../utils/hello.js')
const checkAuth = require( '../utils/checkAuth.js')

module.exports = function (app) {
  app.use(bodyParser())
  app.use(sent())
  app.use(hello.errorHandle)
  app.use(checkAuth)
  app.use(router.routes()).use(router.allowedMethods())
}
