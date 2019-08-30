import BaseCtl  from './BaseCtl'
import bookModel from '../model/Book'
import hello from '../utils/hello'
import catalogCtl from './Catalog';

interface bookItem {
  _id: String;
  name: String,
  isPrivate: 0|1
}

class BookCtl extends (BaseCtl as { new(): any; }) {
  defaultBook: bookItem
  constructor() {
    super()
    this.defaultBook = {
      _id: 'default',
      name: '默认',
      isPrivate: 0
    }
  }
  getAlias() {
    return '本子'
  }
  getModel() {
    return bookModel
  }
  async todoPreDelete(arg, ctx){
    const { id } = arg
    const res = { err: null, data: {}}
    if(id.indexOf('default') > -1) {
      res.err = new Error('默认本子不可删除')
      return res
    }
    const findBook = await catalogCtl.Model.list({bookId: id})
    if(findBook.length) {
      res.err = new Error('当前本中存在目录，无法删除')
    }
    return res

  }
  async todoPreAdd(arg){
    const res = { err: null, data: arg }
    const { name, userId } = arg
    if(name === this.defaultBook.name || name === this.defaultBook._id) {
      res.err = new Error(`${name}不可使用`)
      return res
    }
    const findBooks = await this.Model.findOne({ name, userId })
    if(findBooks) {
      res.err = new Error(`${name}已存在`)
      return res
    }
    return res
  }
  async find(ctx, next) {
    const { start = 0, limit = 0 } = ctx.request.query
    const dbQuery = this.dbQuery(ctx)
    // 如果没有提供start和limit则查找全部
    const findFn = this.Model.listWithPaging({ start, limit, dbQuery })
    try{
      const result = await Promise.all([findFn, this.Model.listCount(dbQuery)])
      let bookList = result[0] || []
      bookList.unshift(this.defaultBook)
      ctx.send(1, {
        list: bookList,
        count: result[1] + 1
      }, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e))
    }finally {
      await next()
    }
  }
}
const bookCtl = new BookCtl()

export default bookCtl
