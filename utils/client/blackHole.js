
export function setTitle(str = '') {
  return `${str ? str+'-': ''}黑洞笔记-BlackHook`
}

// path的最后个节点是文件名，那么最后一个'/'前是对应的目录
export function findDirPath(path) {
  const findTag = path.lastIndexOf('/')
  return path.substring(0, findTag)
}

// 去除文件后缀名 如 .md
export function slitSuffix(path) {
  return path.substring(0, path.lastIndexOf('.'))
}

// 获取文件夹名(不包含路径)
export function getFileNameInPath(path) {
  const findPath = path.lastIndexOf('/')
  return slitSuffix(path.substring(findPath))
}

// 去除前后'/'
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

// 获取文件h1、h2标题作为索引
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

// 从当前目录开始逐级查找有文件的目录

export function findHasFileDir(catalogMapNotes, path) {
  while(path && !(catalogMapNotes[path])){
    path = findDirPath(path)
  }
  return path
}

export function _Error(msg = {}) {
  this.code = msg.code || '';
  this.message = msg.message || '';
  this.type = msg.type || 'api';
  this.stack = (new Error()).stack;
}
_Error.prototype = Object.create(Error.prototype);
_Error.prototype.constructor = _Error;
