

export default async function ({ store, redirect, req, app, params, route }) {
  const { user, pathMatch } = params
  if(user) {
    store.commit('user/CUR_USER_INFO_SAVE', {
      gitName: user
    })
  }
  if(pathMatch) {
    const blog = pathMatch.substring(0, Math.max(pathMatch.indexOf('/'), 0) || pathMatch.length)
    console.log('blog', blog)
    store.commit('catalogs/CATALOGS_CUR_BLOG', blog)
  }
  const { visitor } = route.query
  if(visitor) {
    store.commit('user/VIEW_STATUS_SAVE', true)
  }
}
