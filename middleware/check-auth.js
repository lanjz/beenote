// import fetch from '@/util/fetch/fetch.js'
// const decodeLoginTypeJwt = process.server && require('@/server/utils/hello').decodeLoginTypeJwt

function cookeyToJson(req) {
  const Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    const parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  return Cookies
}

export default function ({ store, redirect, req, app, params }) {
  if(store.state.user.userInfo['_id']) {
    return
  }
  return
  if(process.server) {
    const { helloToken } = cookeyToJson(req)
    if(!helloToken) return
    const { clientUser } = decodeLoginTypeJwt(helloToken)
    if(!clientUser) return
    store.commit('user/USER_SAVE', {
      _id: clientUser
    })
    // store.dispatch('books/BOOK_LIST_GET')
  }
  /*
	if(process.client){
	  if(store.state.user.userInfo['_id']) {
		return true
	  }
	  return store.dispatch('user/USER_INFO_GET')
	}
  */
  
  
}
