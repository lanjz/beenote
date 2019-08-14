import { Context } from 'koa'
import { decodeLoginTypeJwt, dealError } from './hello'
import userCtrl from '../controller/User'


function passValidAuth(ctx: Context) {
  if(ctx.url.indexOf('/api') < 0) {
    return true
  }
  const passPath = {
    get: ['/api/getUserInfo'],
    post: ['/api/login', '/api/user']
  }
  const getMethod = ctx.method.toLowerCase()
  if(ctx.url.indexOf('/notes/') > -1) {
    return true
  }
  // 所有的delete和put都需要权限
  if(getMethod === 'delete' || getMethod === 'put') {
    return false
  }
  if(!getMethod || !passPath[getMethod]) {
    return false
  }
  return passPath[getMethod].indexOf(ctx.url) > -1 ? true : false
}


async function checkAuth(ctx: Context, next) {
  try{
    if(ctx.method.toLowerCase() === 'options') {
      ctx.send(1, '', '准了')
      return
    }
    const getHelloToken = ctx.cookies.get('helloToken')

    if(!getHelloToken) {
      // 无token且需要登录的，直接返回4
      if(!passValidAuth(ctx)) {
        ctx.send(4, '', '请登录')
        return
      }
      // 无token且不是必需登录的，直接过
      await next()
    } else {
      // 有token则验证token
      // todo 是否对不需要验证登录的跳过
      const { clientUser } = decodeLoginTypeJwt(getHelloToken)
      if(!clientUser) {
        userCtrl.clearUserCookie(ctx)
        ctx.send(4, '', 'token无效请重新登录')
        return
      }
      // 有token则存入curUser中
      const result = await userCtrl.userAuth(clientUser)
      // const result = {}
      if(!result) {
        userCtrl.clearUserCookie(ctx)
        ctx.send(4, result, `请重新登录`)
        return
      }
      ctx.state.curUser = result
      await next()
    }
  } catch(e) {
    ctx.send(2, '', dealError(e))
  }
}

export default checkAuth
