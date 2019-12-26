

export default async function ({ store, redirect, req, app, params, route }) {
  const { user } = params
  if(user) {
    store.commit('user/CUR_USER_INFO_SAVE', {
      gitName: user
    })
    console.log('中间件', store.state.user.curUserInfo.gitName)
  }
  const { visitor } = route.query
  if(visitor) {
    store.commit('user/USER_SAVE', {
      visitor: true
    })
  }
}
