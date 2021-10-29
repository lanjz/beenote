const axios = require('axios')
const prefix = 'https://api.github.com'
function getReps(content){
  axios.get(`${prefix}${content}`)
    .then(res => {
      console.log('res', res)
      getContent(`/repos/lanjz/Hello-Word/contents/`)
    })
    .catch(err => {
      console.log('err', err)
    })
}
function getContent(content){
  axios.get(`${prefix}${content}`)
    .then(res => {
      console.log('res', res)
      if(res.data) {
        res.data.forEach(item => {
          if(item.type === 'dir'){
            getContent(`${content}${item.name}/`)
            console.log(item.name)
          }
        })
      }
    })
    .catch(err => {
      console.log('err', err)
    })
}

getReps('/users/lanjz/repos')
