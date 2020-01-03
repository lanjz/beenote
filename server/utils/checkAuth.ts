import { Context } from 'koa'
import { decodeLoginTypeJwt, dealError } from './hello'
import userCtrl from '../controller/User'


function passValidAuth(ctx: Context) {
  const passPath = {
    get: ['/api/getUserInfo'],
    post: ['/api/login', '/api/user']
  }
  const getMethod = ctx.method.toLowerCase()
  if(!passPath[getMethod]) {
    return false
  }
  return passPath[getMethod].indexOf(ctx.request.path) > -1 ? true : false
}


async function checkAuth(ctx: Context, next) {
  try{
    if(ctx.request.path.indexOf('/testapi/') > -1) {
      await next()
      return
    }
    if(ctx.method.toLowerCase() === 'options') {
      ctx.send('', '', '准了')
      return
    }
    const getHelloToken = ctx.cookies.get('helloToken')
    // 如果有token则验证并保存到state中
    if(getHelloToken) {
      const { clientUser } = decodeLoginTypeJwt(getHelloToken)
      const result = await userCtrl.userAuth(clientUser)
      if(!result) {
        userCtrl.clearUserCookie(ctx)
        ctx.send(-5, result, `当前登录态无效请重新登录`)
        return
      }
      ctx.state.curUser = result
    }

    // 不需要验证登录态
    if(passValidAuth(ctx) || ctx.method.toLowerCase() === 'get') {
      await next()
      return
    }
    // 否则如果没有获取到登录态
    if(!ctx.state.curUser) {
      ctx.send(-5, '', `未登录`)
      return
    }
    await next()
  } catch(e) {
    ctx.send(-1, '', dealError(e))
  }
}

export async function checkAuthGit(ctx: Context, next) {
  // 非get请求且是访问git接口，需要验证是否有gitToken
  if(ctx.method.toLowerCase() !== 'get') {
    if(!ctx.request.query.gitName) {
      ctx.send(-1, '', '缺少gitName参数')
      return
    }
    const { gitToken = '', gitName = '' } = ctx.state.curUser || {}
    if(!gitToken) {
      ctx.send(-6, '', `求设置gitToken`)
      return
    }
    // 还得验证是当前登录的用户态与操作的git用户是否一致
    if(!gitName || gitName !== ctx.request.query.gitName) {
      ctx.send(-6, '', '当前用户与github不匹配')
      return
    }
  }
  await next()
}

export default checkAuth
