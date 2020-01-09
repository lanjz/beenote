export function jsonToParams(data = {}) {
  const getKeys = Object.keys(data)
  if(!getKeys.length) return ''
  const arr = []
  getKeys.forEach(item => {
    arr.push(`${item}=${data[item]}`)
  })
  return arr.join('&')
}
