export function jsonToParams(data = {}) {
  const getKeys = Object.keys(data)
  if(!getKeys.length) return ''
  const arr = []
  getKeys.forEach(item => {
    arr.push(`${item}=${data[item]}`)
  })
  return arr.join('&')
}

export function getCurTime() {
  const getDate = new Date()
  return `${getDate.getFullYear()}-${formatNum(getDate.getMonth()+1)}-${formatNum(getDate.getDay())} ${formatNum(getDate.getHours())}:${formatNum(getDate.getMinutes())}:${formatNum(getDate.getSeconds())}`
}

export function formatNum(num) {
  if(!num) return num
  return (num*1) < 10 ? '0' + num : num
}
