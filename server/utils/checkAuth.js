const userCtrl = require('../controller/User')
const hello = require('./hello')


function passValidAuth(ctx = {}) {
  if(ctx.url.indexOf('/api') < 0) {
    return true
  }
  const passPath = {
    get: [''],
    post: ['/api/login', '/api/user']
  }
  const getMethod = ctx.method.toLowerCase()
  if(!getMethod || !passPath[getMethod]) {
    return false
  }
  return passPath[getMethod].indexOf(ctx.url) > -1 ? true : false
}


async function checkAuth(ctx, next) {
  try{
    if(!passValidAuth(ctx)) {
      const getHelloToken = ctx.cookies.get('helloToken')
      if(!getHelloToken) {
        ctx.send(4, '', '请登录')
        return
      }
      const { clientUser } = hello.decodeLoginTypeJwt(getHelloToken)
      if(!clientUser) {
        ctx.send(4, '', 'token无效请重新登录')
        return
      }
      const result = await userCtrl.userAuth(clientUser)
      // const result = {}
      if(!result) {
        ctx.send(4, result, `请重新登录`)
        return
      }
      ctx.state.curUser = result
      await next()
    } else {
      await next()
    }
  } catch(e) {
    ctx.send(2, '', hello.dealError(e))
  }
}

module.exports = checkAuth
