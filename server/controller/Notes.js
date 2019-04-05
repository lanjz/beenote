const hello  = require('../utils/hello')
const BaseCtl  = require('./BaseCtl.js')
const bookCtl  = require('./Book')
const catalogCtl  = require('./Catalog')
const noteModel  = require('../model/Notes')

class NoteCtl extends BaseCtl {
  constructor(){
    super()
  }
  getModel() {
    return noteModel
  }
  getAlias() {
    return '笔记'
  }
  async todoPreAdd(arg, ctx) {
    const isPost = ctx.method.toUpperCase() === 'POST'
    const res = { err: null, data: ''}
    const getParams = JSON.parse(JSON.stringify(arg))
    const { bookId, catalogId } = getParams
    const tempPromise = [Promise.resolve(true), Promise.resolve(true)]
    if (isPost && !bookId) {
      res.err = new Error('bookId不能为空')
      return res
    }
    if(bookId) {
      // 查看Book
      const findBook = bookId === bookCtl.defaultBook._id ?
        bookCtl.defaultBook :
        bookCtl.Model.findById(bookId, this.dbQuery(ctx))
      tempPromise[0] = findBook
    }
    if (isPost && !catalogId) {
      res.err = new Error('catalogId不能为空')
      return res
    }
    if(catalogId) {
      // 查找catalog
      const findCatalogParams = { bookId, _id: catalogId, ...this.dbQuery(ctx) }
      const findCatalog = catalogId === 'root' ?
        Promise.resolve('root') :
        catalogCtl.Model.findOne(findCatalogParams)
      tempPromise[1] = findCatalog
    }
    const response = await Promise.all(tempPromise)
    if (!response[0]) {
      res.err = new Error('未找到对应的Book')
    } else if (!response[1]) {
      res.err = new Error(`${response[0].name}下未找到对应的目录`)
    }
    if (res.err) {
      return res
    }
    if (isPost && !getParams.title) {
      res.err = new Error('title不能为空')
      return res
    }
    res.data = getParams
    return res
  }
  todoPreModify(arg, ctx) {
    return this.todoPreAdd(arg, ctx)
  }
}

module.exports = new NoteCtl()
