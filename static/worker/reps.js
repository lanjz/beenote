console.log('delf', self.addEventListener, this)

/*onmessage = function(e) {
    console.log('Worker: Message received from main script', e);
    doWorker(e)
}*/
function fetch(url) {
  // var data = new formatDate()
  // data.append('username', 'lanjz')
  var xhr = new XMLHttpRequest()
  xhr.open('get', url, true) // 第三个参数表示异步执行
  // xhr.setRequestHeader()
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.timeout = 10000 // 请求过期时间
  // xhr.responseType = 'json'
  xhr.onreadystatechange = stateChange
  function stateChange() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        // postMessage(JSON.parse(`{"data": ${xhr.responseText}}`))
        JSON.parse(xhr.responseText).forEach(item => {
          console.log('item', item)
          postMessage(item)
        })
        // postMessage({a: 33})
      } else {
        close()
      }
    }
  }
  xhr.ontimeout = function (e) {
    postMessage('请求超时', e)
  }
  xhr.onerror = function (e) {
    postMessage('请求发生错误', e)
  }
  xhr.upload.onprogress = function (e) {
    postMessage('当前进度', e)
  }
  xhr.send()
}
function doWorker(e) {
  if(e.data === 'start') {
    /*let count = 0
    setInterval(() => {
      postMessage(count++)
    }, 1000)*/
    fetch('/git/user/repos?gitName=lanjz&type=all&test=1')
  } else if(e.data === 'end') {
    close()
  }
}
self.addEventListener('message', function (e) {
  console.log('addEventListener: Message received from main script', e);
  doWorker(e)
})
