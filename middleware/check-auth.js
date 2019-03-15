/*const userCtrl = require('../server/controller/User')
const hello = require('../server/utils/hello')
const path = require('path')
import { getUserFromCookie } from '~/utils/auth'
console.log('userCtrl', userCtrl)

function passValidAuth(ctx = {}) {
  if(ctx.url.indexOf('/api') < 0) {
    return true
  }
  const passPath = {
    get: [''],
    post: ['/api/login', '/api/user']
  }
  const getMethod = ctx.method.toLowerCase()
  if(!getMethod || !passPath[getMethod]) {
    return false
  }
  return passPath[getMethod].indexOf(ctx.url) > -1 ? true : false
}

async function checkAuth(ctx) {
  const res = { err: null, data: '' }
  return new Promise(async (resolve, reject) => {
    try {
      if(!passValidAuth(ctx)) {
        const getHelloToken = ctx.cookies.get('helloToken')
        if(!getHelloToken) {
          res.err = false
          resolve(res)
          return
        }
   /!*     const { clientUser } = hello.decodeLoginTypeJwt(getHelloToken)
        if(!clientUser) {
          res.err = false
          resolve(res)
          return
        }*!/
        /!*        const result = await userCtrl.userAuth(clientUser)
				// const result = {}
				if(!result) {
				  res.err = false
				  resolve(res)
				  return
				}
				res.data = result*!/
        resolve(res)
      } else {
        resolve(res)
      }
    } catch (e) {
      res.err = false
      resolve(res)
    }
  })
}*/

export default async function ({ store, redirect, req }) {
  console.log('store2', req)
  if(req&&req.ctx&&req.ctx.url.indexOf('login') > 0) {
    return
  }
  console.log('store', store.state.user)
  if(!store.state.user || !Object.keys(store.state.user.userInfo).length) {
    redirect('/login')
  }

}
