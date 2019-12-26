// 前端直接访问git
/*const ApiBase = {
  base: 'https://api.github.com',
  raw: 'https://raw.githubusercontent.com'
}*/

// 跨域访问git
/*
axios.defaults.withCredentials = true
const ApiBase = {
  base: 'http://192.168.31.250:8080/git',
  api: 'http://192.168.31.250:8080',
  raw: 'https://raw.githubusercontent.com',
}
*/

// node直接访问
const ApiBase = {
  base: '/git',
  api: '',
  raw: '/raw',
}

export {
  ApiBase
}
