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

// 去除文件后缀名 如 .md
export function slitSuffix(path) {
  return path.substring(0, path.lastIndexOf('.'))
}

// 最底的文件夹名
export function getLastName(path) {
  const findPath = path.lastIndexOf('/')
  return slitSuffix(path.substring(findPath))
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

export function getCurTime() {
  const getDate = new Date()
  return `${getDate.getFullYear()}-${formatNum(getDate.getMonth()+1)}-${formatNum(getDate.getDay())} ${formatNum(getDate.getHours())}:${formatNum(getDate.getMinutes())}:${formatNum(getDate.getSeconds())}`
}

export function formatNum(num) {
  if(!num) return num
  return (num*1) < 10 ? '0' + num : num
}

export function filterTxt(txt) {
  if(!txt) return txt
  const filterReg = /(#|##)\s(.+)\n/g
  const filterLink = /\[(.+)\]\(.+\)/g
  let getText = txt.replace(filterReg, function () {
    return arguments[2]
  })
  getText = getText.replace(filterLink, function () {
    if(arguments[1]) {
      return arguments[1]
    }
  })
  getText = getText.replace('`', '')
  getText = getText.replace(' ', '')
  return getText
}
export function createCatalogue(title, test) {
  if(!test) return test
  let parentTitle = title
  const obj = {
    [title]: []
  }
  const reg = /(#|##)\s(.*)\n/g
  const find = test.match(reg)
  if(find && find.length) {
    find.forEach(item => {
      const t = filterTxt(item)
      if(item[0] === '#' && item[1] != '#') {
        obj[title].push({
          name: t,
          parent: title,
          fullPath: t,
          path: t,
          type: '#'
        })
        parentTitle = t
      } else if(item[0] === '#' && item[1] == '#') {
        const curParent = parentTitle || title
        if(!obj[curParent]) {
          obj[curParent] = []
        }
        obj[curParent].push(
          {
            name: t,
            parent: curParent,
            fullPath: t,
            path: t,
            type: '##'
          }
        )
      }
    })
  }
  return obj
}
