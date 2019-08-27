export function returnCatalog(str, bookId) {
  if(bookId) {
    return str === 'root' ? `${bookId}_root` : str
  }
  return str.indexOf('root') > -1 ? 'root' : str
}


export function setTitle(str = '') {
  return `${str}-黑洞笔记-BlackHook`
}
