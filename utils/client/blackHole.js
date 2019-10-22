export function returnCatalog(str, bookId) {
  if(bookId) {
    return str === 'root' ? `${bookId}_root` : str
  }
  return str.indexOf('root') > -1 ? 'root' : str
}


export function setTitle(str = '') {
  return `${str}-黑洞笔记-BlackHook`
}

export function findDirPath(path) {
  const findTag = path.lastIndexOf('/')
  return path.substring(0, findTag)
}


export function slitSuffix(path) {
  return path.substring(0, path.lastIndexOf('.'))
}

export function getPath(path) {
  if (!path) return path
  if(path[0] === '/') {
    path = path.substring(1)
  }
  if(path[path.length - 1] === '/') {
    path = path.substring(0, path.length - 1)
  }
  return path
}
