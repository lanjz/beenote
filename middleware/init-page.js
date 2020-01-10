

export default async function ({ store, redirect, req, app, params, route }) {
  const { user, pathMatch, book } = params
  if(user) {
    store.commit('user/CUR_USER_INFO_SAVE', {
      gitName: user
    })
  }
  if(book) {
    store.commit('books/BOOK_CUR_UPDATE', book)
  }
  if(pathMatch) {
    const blog = pathMatch.substring(0, Math.max(pathMatch.indexOf('/'), 0) || pathMatch.length)
    store.commit('catalogs/CATALOGS_CUR_BLOG', blog)
  }
  const { view } = route.query
  if(view) {
    store.commit('user/VIEW_STATUS_SAVE', true)
  }
}
