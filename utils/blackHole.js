export function returnCatalog(str, bookId) {
  if(bookId) {
    return str === 'root' ? `${bookId}_root` : str
  }
  return str.indexOf('root') > -1 ? 'root' : str
}
