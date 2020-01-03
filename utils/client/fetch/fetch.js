import axios from 'axios'
import helloAlert from '../../../components/messageBox/messageBox'
import {getCurTime} from '../blackHole';
import {Base64} from 'js-base64';
import { ApiBase } from './fetchConfig'

// axios.delete('/testapi/user',{data: {abc: 134}})
if(process.client) {
  console.log('context', window)
}
const gitToken = 'e0ed39f163363a5b3d5eb9f658cdffba25c4e72a'

function dealRetCode(response = {}, reqOptions) {
  // 没有retCode说明不是自己的接口返回的，并且如果请求的是git的不对retCode做处理
  if(/\/(git|raw)\//.test(reqOptions.url) && !response.retCode) {
    return { err: null, data: response }
  }
  const res = { err: null, data: response.data }
  if(response.retCode === -5){
    res.notAlert = true
    res.err = new Error('未登录')
    if(process.client) {
      window.$nuxt.$store.commit('user/CUR_USER_LAYOUT_SAVE', 'login')
    }
    return res
  }
  if(response.retCode !== 1) {
    res.err = new Error(response.retMsg)
  }
  return res
}
function fetchData(options) {
  const res = { err: null, data: '' }
  let { url, baseUrl = 'base' } = options
  if (!url) {
    res.err = new Error('没有请求地址')
    return res
  }
  // 如果是请求的gitapi，有区分git还是raw
  if(url.indexOf('/api') !== 0) {
    url = `${ApiBase[baseUrl]}${url}`
  }
  if(process.client) {
    const { user } = window.$nuxt.context.params
    if(user) {
      url = `${url}${url.indexOf('?') > 0 ? '&' : '?'}gitName=${user}`
    }
  }

  /* if(token) {
	 url = `url${url.indexOf('?') > 0 ? '&' : '?'}token=${token}`
   }*/
  options.url = encodeURI(url)
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  // 自己的接口使用formData，git使用json
  if(options.url.indexOf('/api') === 0 && process.client) {
    options.headers = { 'Content-Type': 'multipart/form-data' }
    const formData = new FormData();
    const forDataKeys = Object.keys(options.data || {})
    forDataKeys.forEach((value) => {
      formData.append(value, options.data[value]);
    })
    options.data = formData
  }
  // options.url = `http://127.0.0.1:3001${options.url}`
/*  options.url = process.env.NODE_ENV === 'development' ?
    `http://localhost:3001${options.url}` : `http://127.0.0.1:3001${options.url}`*/
  return axios(options)
}

function showHelloAlert(msg) {
  if(process.client) {
    helloAlert({
      title: msg,
      showCancel: false
    })
  }

}
const doFetchData = function (options) {
  const res = { err: null, data: '' }
  return new Promise((resolve) => {
    fetchData(options)
      .then((response) => {
        const result = dealRetCode(response.data, options)
        if(result.err) {
          res.err = result.err
          if(!result.notAlert && !options.notAlert) {
            showHelloAlert(res.err.message)
          }
          resolve(res)
          return
        }
        res.data = result.data
        // res.data = response.data
        resolve(res)
      })
      .catch((err) => {
        if(err.message === 'Request failed with status code 409') {
          showHelloAlert('sha无效,刷新页面重试')
          resolve({ err: new Error('sha无效,刷新页面重试'), data: '' })
        }
        if(err.message === 'Request failed with status code 401') {
          showHelloAlert('github Token无效')
          resolve({ err: new Error('github Token无效'), data: '' })
        }
        resolve({ err, data: '' })
      })
  })
}

const uploadFile = function (data) {
  const options = {
    url: `/repos/${data.path}`,
    method: 'put',
    transformRequest: [function (data) {
      // 对 data 进行任意转换处理
    
      return data;
    }],
    data: {
      message: `ADD: images At ${getCurTime()}`,
      content: data.content
    }
  }
  return doFetchData(options)
}

export default doFetchData

export {
  fetchData,
  uploadFile
}
