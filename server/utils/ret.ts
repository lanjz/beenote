/**
 * @retCode
 * 1： 请求成功
 * -1：普通失败
 * -3：MYSQL错误
 * -5：未登录
 * -6：gitToken或者gitName未设置
 * */

function render(retCode = 1, json = '', retMsg = '成功') {
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
