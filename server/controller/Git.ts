import * as httpProxy from 'koa-better-http-proxy'
import { Context, IRequestOption } from 'koa'
const proxyOptions = {
  proxyReqOptDecorator: function (proxyReqOpts: IRequestOption, ctx: Context): any{
    // console.log('proxyReqOpts')
    return proxyReqOpts
  },
  proxyReqBodyDecorator: function(bodyContent, ctx) {
    // console.log('bodyContent', bodyContent)
    return bodyContent;
  },
  proxyReqPathResolver: function (ctx) {
    let getPath = require('url').parse(ctx.url).path.replace(/^\/git/, '')
    // 获取仓库有两个api，一个是游客访问使用，一个自己访问使用（可访问私有仓库），
    // 前端默认使用自己使用的api，如果判断是没有登录态，则把api改成游客的
    const { gitName } = ctx.request.query
    if((getPath.indexOf('/user/repos') === 0 && !ctx.state.curUser)
      || !ctx.state.curUser.gitToken || (ctx.state.curUser.gitName !== gitName)) {
      getPath = `/users/${gitName}/repos`
    } else {
      const tokenQuery = ctx.state.curUser ? `access_token=${ctx.state.curUser.gitToken}` : ''
      getPath = `${getPath}${getPath.indexOf('?') > 0 ? '&': '?'}${tokenQuery}`
    }
    return getPath
  },
  userResDecorator: function (proxyRes, proxyResData, ctx: Context): any {
    return proxyResData
  }
}

export function prefixGit() {
  return httpProxy('https://api.github.com', proxyOptions)
}
export function prefixRow() {
  return httpProxy('https://raw.githubusercontent.com', proxyOptions)
}


