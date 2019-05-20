import fetch from '@/util/fetch/fetch.js'

export default function ({ store, redirect, req, isServer, isClient }) {
  if(isServer) {
  
  }
  if(isClient){
    if(store.state.user.userInfo['_id']) {
      return true
    }
    return store.dispatch('user/USER_INFO_GET')
  }

  
}
