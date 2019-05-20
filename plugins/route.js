export default ({ app, params, redirect, store }) => {
/*  app.router.beforeEach((to, from, next) => {
    const pathLength = to.path.split('/').length
    const { noteId } = params
    if(
      (!noteId || pathLength !== 4) &&
      (!store.state.user.userInfo['_id'] || store.state.user.userInfo['_id'] === '未登录')) {
      redirect(`/login?from=${to.path}`)
    } else {
      next(true)
    }
  })*/
/*  app.router.afterEach((to, from, next) => {
    console.log('to', to.path)
    console.log('from', from.path)
    const { noteId } = params
    console.log(!noteId && to.path !== '/login')
    console.log(store.state.user.userInfo['_id'])
    if(!noteId && to.path !== '/login' && (!store.state.user.userInfo['_id'] || store.state.user.userInfo['_id'] === '未登录')) {
      redirect(`/login?from=${to.path}`)
    }
  })*/
}
