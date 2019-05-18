const BaseCtl  = require('./BaseCtl')
const contentModel  = require('../model/Article')
const bookCtl  = require('./Book')
const catalogCtl  = require('./Catalog')
const schematasCtl  = require('./SchematasCtl')
const validator  = require('../utils/validator')
const hello  = require('../utils/hello')
const noteCtl  = require('./Notes')

class ArticleCtl extends BaseCtl {
  constructor() {
    super()
    this.stringConValid = this.stringConValid.bind(this)
    this.dateConValid = this.dateConValid.bind(this)``
    this.radioConValid = this.radioConValid.bind(this)
    this.selectConValid = this.selectConValid.bind(this)
    this.addContent = this.addContent.bind(this)
    this.addContentBefore = this.addContentBefore.bind(this)
    this.modifyContent = this.modifyContent.bind(this)
    this.findContent = this.findContent.bind(this)
    this.delContent = this.delContent.bind(this)
    this.contentCount = this.contentCount.bind(this)
    this.findSchema = this.findSchema.bind(this)
    this.findRecentContent = this.findRecentContent.bind(this)
    this.copy = this.copy.bind(this)
    this.contentValidator = {
      input: this.stringConValid,
      date: this.dateConValid,
      textarea: this.stringConValid,
      markdown: this.stringConValid,
      radio: this.radioConValid,
      select: this.selectConValid
    }
  }

  getAlias() {
    return '文章'
  }

  getModel() {
    return contentModel
  }

  stringConValid(con, schema) {
    return this.validType(con, schema, validator.isStringType)
  }

  dateConValid(con, schema) {
    return this.validType(con, schema, validator.isTypeNumber)
  }

  radioConValid(con, schema) {
    const res = {err: null, data: con}
    const {err} = this.validType(con, schema, validator.isStringType)
    if (err) {
      res.err = err
      return res
    }
    if (!schema.options && !schema.options.length) {
      res.err = new Error(`未找到${schema.name}的options选项`)
      return res
    }
    if (con) {
      const itemRes = schema.options.some(inItem => (inItem.id === con))
      if (!itemRes) {
        res.err = new Error(`${schema.name}的options${JSON.stringify(schema.options)}没找到${con}`)
        return res
      }
    }
    return res
  }

  selectConValid(con = [], schema) {
    const res = {err: null, data: con}
    const {err} = this.validType(con, schema, validator.isArrayType)
    if (err) {
      res.err = err
      return res
    }
    if (!schema.options && !schema.options.length) {
      res.err = new Error(`未找到${schema.name}的options选项`)
      return res
    }
    const isArrayValid = validator.isArrayType(con)
    if (isArrayValid.err) {
      res.err = `${schema.name}${isArrayValid.err}`
      return res
    }
    if (con && con.length) {
      con.every((item) => {
        const itemRes = schema.options.some(inItem => (inItem.id === item))
        if (itemRes) {
          return true
        }
        const options = {
          options: schema.options
        }
        res.err = new Error(`${schema.name}的options${JSON.stringify(options)}没找到${item}`)
        return false
      })
    }
    if (res.err) {
      return res
    }
    return res
  }

  validType(con, schema, validFn) {
    const res = {err: null, data: con}
    const {err, data} = validFn(con)
    if (err) {
      res.err = err
      return res
    }
    res.data = data
    return res
  }

  /**
   * 根据Book的schemata来验证con的内容是否正确
   * @param <Object> con
   * @return <Object> {err, obj}
   * */
  content(con, schemata = []) {
    const obj = {}
    const res = {err: null, data: con}
    schemata.every((item) => {
      if (con[item._id]) {
        const tempFn = this.contentValidator[item.type]
        const {err, data} = tempFn(con[item._id], item)
        if (err) {
          res.err = err
          return false
        }
        obj[item._id] = data
      }
      return true
    })
    res.data = obj
    return res
  }

  async filterCon(con, getSchemata) {
    let filterData = con
    return new Promise(async (resolve) => {
      try {
        filterData = await this.content(con, getSchemata)
        resolve({err: filterData.err, data: filterData.data})
      } catch (e) {
        resolve({err: e, data: filterData})
      }
    })
  }

  async todoPreModify(arg, ctx) {
    return this.todoPreAdd(arg, ctx)
  }

  async todoPreAdd(arg, ctx) {
    const isPost = ctx.method.toUpperCase() === 'POST'
    const res = { err: null, data: ''}
    const getParams = JSON.parse(JSON.stringify(arg))
    const { bookId, catalogId, schemaId } = getParams
    const tempPromise = [Promise.resolve(true), Promise.resolve(true), Promise.resolve(true)]
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
    if (isPost && !schemaId) {
      res.err = new Error('schemaId不能为空')
      return res
    }
    if(schemaId) {
      // 查看schema
      const findSchema = this.findSchema(ctx, schemaId)
      tempPromise[2] = findSchema
    }
    const response = await Promise.all(tempPromise)
    if (!response[0]) {
      res.err = new Error('未找到对应的Book')
    } else if (!response[1]) {
      res.err = new Error(`${response[0].name}下未找到对应的目录`)
    } else if (!response[2]) {
      res.err = new Error('未找到对应的Schema')
    }
    if (res.err) {
      return res
    }
    if (!getParams.title) {
      res.err = new Error('title不能为空')
      return res
    }
    if(isPost){
      if (!getParams.content) {
        getParams.content = {}
      }
      const isObj = validator.isObjectType(getParams.content)
      if (isObj.err) {
        res.err = isObj.err
        return res
      }
      const con = JSON.parse(JSON.stringify(getParams.content))
      const getSchemata = response[2].fields
      const { err, data } = await this.filterCon(con, getSchemata)
      if (err) {
        res.err = err
        return res
      }
      getParams.content = data
    } else {
      delete getParams.contents
    }
    res.data = getParams
    return res
  }
  async findSchema(ctx, schemaId) {
    const findBuiltInSchema = schematasCtl.buitInSchema.find(item => item._id === schemaId)
    const findResult = findBuiltInSchema ?
      Promise.resolve(findBuiltInSchema) :
      schematasCtl.Model.findById({ id: schemaId, query: this.dbQuery(ctx) })
    return findResult
  }
  async findById(ctx, next) {
    const {id} = ctx.params
    if (!id) {
      ctx.send(2, '', 'id不能为空')
      return
    }
    try {
      const dbQuery = this.dbQuery(ctx)
      const result = await this.Model.findById({ id, query: dbQuery, addLean:　true })
      if (result.schemaId) {
        const findSchema = await this.findSchema(ctx, result.schemaId)
        result.schema = findSchema
      }
      ctx.send(1, result, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, id))
    } finally {
      await next()
    }
  }

  async add(ctx, next) {
    try {
      const merge = {...ctx.request.body, ...this.dbQuery(ctx)}
      const {err, data: getParams} = await this.todoPreAdd(merge, ctx)
      if (err) {
        ctx.send(2, ctx.request.body, err.message)
        return
      }
      const helloRes = await hello.filterParams(getParams, {
        ...this.Model.getSchema(),
        content: {}
      })
      if (helloRes.err) {
        ctx.send(2, ctx.request.body, helloRes.err.message)
      } else {
        if (helloRes.data.content) {
          helloRes.data.content._id = hello.createObjectId()
          helloRes.data.content.createTime = (new Date()).getTime()
          helloRes.data.content.updateTime = (new Date()).getTime()
        }
        helloRes.data.contents = helloRes.data.content ? [helloRes.data.content] : []
        const result = await this.Model.save(helloRes.data)
        // const infoResult = await this.Model.findById({ id: result._id })
        // ctx.send(1, infoResult, '')
        // ctx.send(1, { id: result._id }, '')
        await this.doAfterAdd(ctx, next, result)
      }
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ctx.request.body.username))
    } finally {
      await next()
    }
  }

  async addContentBefore(ctx) {
    const res = {err: null, data: ''}
    const merge = {...ctx.request.body, ...this.dbQuery(ctx)}
    const isObj = validator.isObjectType(merge.content)
    if (isObj.err) {
      res.err = isObj.err
      return res
    }
    if (!Object.keys(merge.content).length) {
      res.err = new Error('content无内容')
      return res
    }
    if (!merge._id) {
      res.err = new Error('缺少_id(article)')
      return res
    }
    const findArticle = await this.Model.findById({id: merge._id })
    if (!findArticle) {
      res.err = new Error(`${merge._id}不存在`)
      return res
    }
    const findBuiltInSchema = schematasCtl.buitInSchema
      .find(item => item._id === findArticle.schemaId)
    const findSchema = findBuiltInSchema ? findBuiltInSchema :
      await schematasCtl.Model.findById({ id: findArticle.schemaId, query: this.dbQuery(ctx)})
    const {err, data} = await this.filterCon(merge.content, findSchema.fields)
    if (err) {
      res.err = err
      return res
    }
    res.data = data
    return res
  }

  async addContent(ctx, next) {
    try {
      const merge = {...ctx.request.body, ...this.dbQuery(ctx)}
      const {err, data: getParams} = await this.addContentBefore(ctx)
      if (err) {
        ctx.send(2, '', hello.dealError(err))
        return
      }
      getParams._id = hello.createObjectId()
      getParams.createTime = (new Date()).getTime()
      getParams.updateTime = (new Date()).getTime()

      const result = await this.Model.update(
        {
          _id: merge._id,
          ...this.dbQuery(ctx)
        },
        {
          $push: {
            contents: {
              $each: [getParams],
              $position: 0  // 插入到首位
            }
          },
        }
      )
      if (!result.ok) {
        ctx.send(2, result, '添加失败')
      }
      ctx.send(1, result, '添加成功')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ctx.request.body.username))
    } finally {
      await next()
    }
  }

  async modifyContent(ctx, next) {
    try {
      const merge = { ...ctx.request.body, ...this.dbQuery(ctx) }
      const { err, data: getParams } = await this.addContentBefore(ctx)
      if (err) {
        ctx.send(2, '', hello.dealError(err))
        return
      }
      if (!merge.content._id) {
        ctx.send(2, '', '缺少_id(content)')
        return
      }
      const findContent = await this.Model.findOne(
        {
          _id: merge._id,
          contents: { $elemMatch: { _id: hello.strToObjectId(merge.content._id) } },
          ...this.dbQuery(ctx)
        },
        {"contents.$": 1}
      )
      if (!findContent) {
        ctx.send(2, '', `${merge.content._id}不存在`)
        return
      }
      const mergeContent = {
        ...findContent.contents[0],
        ...getParams
      }
      mergeContent.updateTime = (new Date()).getTime()

      const projection = {}
      Object.keys(mergeContent).forEach(item => {
        if (item !== '_id') {
          projection[`contents.$.${item}`] = mergeContent[item]
        }
      })

      const result = await this.Model.update(
        {
          _id: merge._id,
          contents: {
            $elemMatch: {_id: hello.strToObjectId(merge.content._id)}
          },
          ...this.dbQuery(ctx)
        },
        {
          $set: projection
        }
      )
      if (!result.ok) {
        ctx.send(2, result, '没有需要修改的数据')
      }
      ctx.send(1, result, '修改成功')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ctx.request.body.username))
    } finally {
      await next()
    }
  }

  async delContent(ctx, next) {
    try {
      const {articleId, contentId} = ctx.request.body
      if (!articleId) {
        ctx.send(2, '', 'articleId is request')
        return
      }
      if (!contentId) {
        ctx.send(2, '', 'contentId is request')
        return
      }
      const result = await this.Model.update(
        {
          _id: articleId,
          ...this.dbQuery(ctx)
        },
        {
          $pull: {
            contents: { _id: hello.strToObjectId(contentId) }
          }
        })
      if (result && !result.ok) {
        ctx.send(2, result, '没有需要删除的数据')
        return
      }
      ctx.send(1, result, '删除成功')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ctx.request.body))
    } finally {
      await next()
    }
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
  async findContent(ctx, next) {
    try {
      const { _id, start = 0, limit = 20 } = ctx.request.query
      if (!_id) {
        ctx.send(2, '', '缺少_id')
        return
      }
      const findContent = this.Model.list(
        {
          _id,
          ...this.dbQuery(ctx)
        },
        {
          contents: {
            $slice: [parseInt(start), parseInt(limit)]
          }
        }
      )
      const findCount = this.contentCount(hello.strToObjectId(_id))
      const result = await Promise.all([findContent, findCount])
      const getCount = (result[1] && result[1].length) ? result[1][0].count : 0
      ctx.send(1, {
        data: result[0],
        count: getCount
      }, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ctx.request.body.username))
    } finally {
      await next()
    }
  }
  async findRecentContent(ctx, next) {
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
  contentCount(articleId) {
    return this.Model.doAggregate([
      {
        $match: { _id: articleId },
      },
      {
        $project: { _id: 0, count: { $size: '$contents' } }
      }
    ])
  }
  async copy(ctx) {
    const findFn = await this.Model.listWithPaging({})
    const copyD = []
    findFn.forEach(async item =>{
      let con = ''
      if(item.contents){
        item.contents.forEach(async inC => {
          const content = Object.keys(inC)
          var temValu = []
          content.forEach(item2 => {

            if(item2 !== '_id' && item2 !== 'createTime'&& item2 !== 'updateTime'){
              console.log('item2', item2)
              temValu.push(inC[item2])
            }
          })
          con = temValu.join('----------------------------------------')
          console.log('item', item)
          const copyData = {
            content: con,
            title: item.title,
            userId: item.userId,
            bookId: item.bookId,
            catalogId: item.catalogId,
            createTime: item.createTime,
            updateTime: item.updateTime
          }
          const result = await noteCtl.Model.save(copyData)
          copyD.push(copyData)
        })

      }

      // await noteCtl.Model.save(copyData)
      // console.log('copyData', copyData)
    })
    ctx.send(1, {
      findFn,
      copyD
    }, '')
  }
}

const articleCtl = new ArticleCtl()
module.exports = articleCtl
