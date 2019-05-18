const hello  = require('../utils/hello')
const BaseCtl  = require('./BaseCtl.js')
const bookCtl  = require('./Book')
const catalogCtl  = require('./Catalog')
const noteModel  = require('../model/Notes')

class NoteCtl extends BaseCtl {
  constructor(){
    super()
    this.findRecentNotes = this.findRecentNotes.bind(this)
    this.findNotesById = this.findNotesById.bind(this)
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
        bookCtl.Model.findById({ id: bookId, query: this.dbQuery(ctx) })
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
  async find(ctx, next) {
    const { start = 0, limit = 0, catalogId, bookId } = ctx.request.query
    if(!catalogId) {
      ctx.send(2, '', '缺少catalogId')
      return
    }
    if(!bookId) {
      ctx.send(2, '', '缺少bookId')
      return
    }
    const dbQuery = {
      ...this.dbQuery(ctx),
      catalogId,
      bookId
    }
    // 如果没有提供start和limit则查找全部
    const findFn = this.Model.listWithPaging({ start, limit, dbQuery })
    try{
      const result = await Promise.all([findFn, this.Model.listCount(dbQuery)])
      ctx.send(1, {
        list: result[0],
        count: result[1]
      }, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e))
    }finally {
      await next()
    }
  }
  async findRecentNotes(ctx, next) {
    const { start = 0, limit = 20, bookId } = ctx.request.query
    if (!bookId) {
      ctx.send(2, '', '缺少bookId')
      return
    }
    const dbQuery = {
      ...this.dbQuery(ctx),
      bookId
    }
    try{
      // 如果没有提供start和limit则查找全部
      const result = await this.Model.listWithPaging({ start, limit, dbQuery, sort: { updateTime: -1 } })
      ctx.send(1, result, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e))
    }finally {
      await next()
    }
  }
  async findNotesById(ctx, next) {
    const { id } = ctx.params
    if(!id) {
      ctx.send(2, '', 'id不能为空')
      return
    }
    try{
      const dbQuery = this.dbQuery(ctx)
      const note = await this.Model.findById({ id, query: dbQuery, assectPath: false })
      // 获取这个笔记应对所有分类的所有笔记
      const {
        bookId,
        catalogId,
        userId
      } = note
      const findNotesParams = {
        bookId,
        catalogId,
        userId
      }
      const findFn = this.Model.listWithPaging({ start: 0, limit: 0, dbQuery:findNotesParams })
      const result = await Promise.all([findFn, this.Model.listCount(findNotesParams)])
      const isVisitor = (ctx.state.curUser &&
        ctx.state.curUser._id.toString() === userId.toString()) ?
        false : true
      ctx.send(1, {
        list: result[0],
        count: result[1],
        extends: {
          isVisitor,
        }
      }, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, id))
    } finally {
      await next()
    }
  }
}

module.exports = new NoteCtl()
