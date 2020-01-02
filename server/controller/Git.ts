import * as httpProxy from 'koa-better-http-proxy'
import axios from 'axios'
import { Context, IRequestOption } from 'koa'
const proxyOptions = {
  // preserveHostHdr: true,
  proxyReqOptDecorator: function (proxyReqOpts: IRequestOption, ctx: Context): any{
    // console.log('proxyReqOpts')
    return proxyReqOpts
  },
  proxyReqBodyDecorator: function(bodyContent, ctx) {
    // console.log('bodyContent', bodyContent)
    return bodyContent;
  },
  proxyReqPathResolver: function (ctx) {
    const getPath = getFetchPath(ctx)
    return getPath
  },
  userResDecorator: function (proxyRes, proxyResData, ctx: Context): any {
    return proxyResData
  }
}

function getFetchPath(ctx: Context) {
  let getPath = require('url').parse(ctx.url).path.replace(/^\/git/, '')
  const findShortPath = getPath.substring(0, getPath.indexOf('?'))
  const { gitName } = ctx.request.query
  const isAccessToken = !!(ctx.state.curUser&&ctx.state.curUser.gitToken&&(ctx.state.curUser.gitName === gitName))
  // 获取仓库有两个api，一个是游客访问使用，一个自己访问使用（可访问私有仓库），
  // 前端默认使用自己使用的api，如果判断是没有登录态，则把api改成游客的
  if(findShortPath === '/user/repos' && !isAccessToken) {
    getPath = `/users/${gitName}/repos`
  }
  if(isAccessToken) {
    const tokenQuery = `access_token=${ctx.state.curUser.gitToken}`
    getPath = `${getPath}${getPath.indexOf('?') > 0 ? '&': '?'}${tokenQuery}`
  }
  return getPath
}

function dealPrefixResult(ctx: Context, response: any) {
  ctx.send(1, response.data, '')
}
async function fetchGit(ctx: Context, path) {
  const resource = path + getFetchPath(ctx)
  console.log('resourcey', ctx.request.body)
  let response:any = await axios({
    url: resource, //需要访问的资源链接
    method: ctx.method.toLowerCase(),
    // params: ctx.request.query, //需要传的参数
    data: ctx.request.body, //需要传的参数
  })
  dealPrefixResult(ctx, response)
}
export async function prefixGit(ctx: Context) {
  await fetchGit(ctx, 'http://api.github.com')
}
export async function prefixRow(ctx: Context) {
  await fetchGit(ctx, 'http://raw.githubusercontent.com')
  // return httpProxy('http://raw.githubusercontent.com', proxyOptions)
}


