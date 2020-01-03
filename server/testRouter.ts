import * as Router from 'koa-router'

const router = new Router({ prefix: '/testapi' })

router.delete('/user', function (ctx) {
  console.log('cxt-delete', ctx.request.body)
})


export default router
