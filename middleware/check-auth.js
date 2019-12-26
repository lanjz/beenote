// import fetch from '@/utils/client/fetch/fetch.js'

import axios from 'axios'

const decodeLoginTypeJwt = process.server && require('jwt-simple')

function cookeyToJson(req) {
  const Cookies = {};
  req.headers.cookie && req.headers.cookie.split(';').forEach(function (Cookie) {
    const parts = Cookie.split('=');
    Cookies[parts[0].trim()] = (parts[1] || '').trim();
  });
  return Cookies
}

export default async function ({ store, redirect, req, app, params }) {
  if(process.server) {
    const { helloToken } = cookeyToJson(req)
    if(!helloToken) return
    const response = await axios({
      url: `http://${req.headers.host}/api/getUserInfoInSerer?token=${helloToken}`
    })
    if(response.data.retCode === 1) {
      store.commit('user/USER_SAVE', response.data.data)
    }
  }
}
