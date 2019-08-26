/**
 * @retCode
 * 1： 请求成功
 * 2： 一般错误
 * 3： 账号密码错误
 * 4: 未登录
 * */


function render(retCode = 0, json = '', retMsg = '成功') {
  console.log('abc')
  this.set('Content-Type', 'application/json')
  this.body = JSON.stringify({
    retCode: retCode,
    retMsg: retMsg,
    data: json
  })
}

export default function () {
  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}
