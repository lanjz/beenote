const util  = require('util')
const Busboy  = require('busboy')
const fs  = require('fs')
const path  = require('path')
const qiniu = require('qiniu')
const SET = require('../../utils/hide/serverSecret')
const hello  = require('../utils/hello')
const { STATIC_IMG_PATH }  = require('../utils/CONST')
const FileMapModel  = require('../model/FileMap')

class BaseCtl {
  constructor() {
    this.alias = this.getAlias()
    this.Model = this.getModel()
    this.add = this.add.bind(this)
    this.findById = this.findById.bind(this)
    this.find = this.find.bind(this)
    this.deleteById = this.deleteById.bind(this)
    this.modify = this.modify.bind(this)
    this.deleteByIds = this.deleteByIds.bind(this)
    this.findOneByQuery = this.findOneByQuery.bind(this)
    this.uploadImg = this.uploadImg.bind(this)
    this.uploadImgCdn = this.uploadImgCdn.bind(this)
    this.fileMapModel = FileMapModel
  }
  getAlias() {
    return '数据'
  }
  getModel() {
    console.log('Model need', 'error')
  }
  dbQuery(ctx) {
    if(ctx.state.curUser) {
      return { userId: ctx.state.curUser._id }
    }
    return {}
  }

  todoPreAdd(params) {
    const res = { err: null, data: params }
    return res
  }
  todoPreModify(params) {
    const res = { err: null, data: params }
    return res
  }
  doAfterAdd(ctx, next, result) {
    ctx.send(1, { id: result._id }, '')
  }
  async add(ctx, next) {
    try{
      const merge = { ...ctx.request.body, ...this.dbQuery(ctx) }
      const { err, data: getParams } = await this.todoPreAdd(merge, ctx)
      if(err) {
        ctx.send(2, ctx.request.body, err.message)
        return
      }
      const helloRes = await hello.filterParams(getParams, this.Model.getSchema())
      if(helloRes.err) {
        ctx.send(2, ctx.request.body, helloRes.err.message)
      } else {
        const result = await this.Model.save(helloRes.data)
        await this.doAfterAdd(ctx, next, result)
      }
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ctx.request.body.username))
    }finally {
      await next()
    }
  }
  async find(ctx, next) {
    const { start = 0, limit = 0 } = ctx.request.query
    const dbQuery = this.dbQuery(ctx)
    // 如果没有提供start和limit则查找全部
    const findFn = this.Model.listWithPaging({start, limit, dbQuery})
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
  async findById(ctx, next) {
    const { id } = ctx.params
    if(!id) {
      ctx.send(2, '', 'id不能为空')
      return
    }
    try{
      const dbQuery = this.dbQuery(ctx)
      const result = await this.Model.findById({ id, query: dbQuery })
      ctx.send(1, result, '')
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, id))
    } finally {
      await next()
    }
  }
  async deleteById(ctx, next) {
    const { _id } = ctx.request.body
    const dbQuery = this.dbQuery(ctx)
    if(!_id) {
      ctx.send(2, '', 'id不能为空')
      return
    }
    try{
      const result = await this.Model.del(_id, dbQuery)
      if(result.n){
        ctx.send(1, '', '删除成功')
      } else {
        ctx.send(2, '', `没有要删除的${this.alias}`)
      }
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, _id))
    } finally {
      await next()
    }
  }
  async deleteByIds(ctx, next) {
    const { ids } = ctx.request.body
    const idsArr = ids.split(',')
    const dbQuery = this.dbQuery(ctx)
    try{
      const result = await this.Model.delMany(idsArr, dbQuery)
      if(result.n) {
        ctx.send(1, '', `成功删除${result.n}条数据`)
      } else {
        ctx.send(2, '', `没有要删除的${this.alias}`)
      }
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, ids))
    } finally {
      await next()
    }
  }
  async modify(ctx, next) {
    const { _id } = ctx.request.body
    if(!_id){
      ctx.send(2, '', '_id不能为空')
      return
    }
    try {
      const merge = { ...ctx.request.body, ...this.dbQuery(ctx) }
      const { err, data } = await this.todoPreModify(merge, ctx)
      if(err) {
        ctx.send(2, ctx.request.body, err.message)
        return
      }
      const getParams = data
      const dbQuery = this.dbQuery(ctx)
      const result = await this.Model.findOneAndUpdate(_id, getParams, dbQuery)
      if (!result) {
        ctx.send(2, '', `没有要修改的${this.alias}`)
      } else {
        ctx.send(1, result, '')
      }
    } catch (e) {
      ctx.send(2, '', hello.dealError(e, _id))
    } finally {
      await next()
    }
  }
  async findOneByQuery(query) {
    return this.Model.findOne(query)
  }
  async uploadImg(ctx, next){
    const result = await this.saveFileToLocal(ctx)
    if(result.err) {
      ctx.send(2, '', hello.dealError(result.err, id))
      return
    }
    ctx.send(1, result.data.imgUrl, '')
  }
  getFullFileUrl(result){
    const imgResult = []
    const curNet = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : `http://${SET.base.proHost}`
    result.forEach((item) => {
      const realUrl = item.replace(`${process.cwd()}${path.sep}static`, curNet)
      imgResult.push(realUrl)
    })
    return imgResult
  }
  // 保存到本地
  async saveFileToLocal(ctx, saveCatalog = 'common') {
    const res = {
      err: null,
      data: ''
    }
    try{
      const file = ctx.request.files.file;
      const reader = fs.createReadStream(file.path);
      const filePath = path.join(STATIC_IMG_PATH, saveCatalog)
      hello.mkdirsSync( filePath )
      let fileName = Math.random().toString(16).substr(2) + '_'  + ctx.state.curUser._id + '_' + file.name
      let saveTo = path.join(filePath, fileName)
      const stream = fs.createWriteStream(saveTo);
      reader.pipe(stream);
      res.data = {
        imgUrl: this.getFullFileUrl([stream.path])
      }
      await this.fileMapModel.save({
        filePath: res.data.imgUrl[0],
        username: ctx.state.curUser.username,
        userId: ctx.state.curUser._id,
      })
    }catch(e) {
      res.err = e
    }
    return res
  }
  async uploadImgCdn(ctx) {
    const upToQiNiuResult = await this.upToQiniu(ctx)
    if(upToQiNiuResult.err) {
      ctx.send(2, '', upToQiNiuResult.err)
    } else {
      ctx.send(1, [upToQiNiuResult.data], '')
    }
  }
  async upToQiniu(ctx) {
    return new Promise((resolve, reject) => {
      const qiniuSrc = 'http://ptycm9s11.bkt.clouddn.com/'
      const accessKey = 'JJBGbpbd2XE-EZKfLsOGY5AbPpFeFMwUFRDp31BI'
      const secretKey = 'I-3hmK0z23yADDgTbncCWaFUXSfqFAtauMVGET4D'
      const options = {
        scope: 'blackhookimages', // 存储空间的列表名，只能小写
        expires: 720000,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)"}'
      }
      const putPolicy = new qiniu.rs.PutPolicy(options)
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      const uploadToken=putPolicy.uploadToken(mac)
      const config = new qiniu.conf.Config()
      config.zone = qiniu.zone.Zone_z0
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      // const readableStream = await this.getChunk(ctx); // 可读的流
      const file = ctx.request.files.file;
      const key= file.name
      const reader = fs.createReadStream(file.path)
      // 如果没用koaBody中间件，第三个参数可以直接使用ctx.req,但是为了获取文件名之类的其它信息，所以需要自己选解析，再转为流作为参数调用formUploader.putStream方法
      const that = this
      formUploader.putStream(uploadToken, key, reader, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        const realPath = `${qiniuSrc}${respBody.key}`
        if (respInfo.statusCode == 200) {
          that.fileMapModel.save({
            filePath: realPath,
            username: ctx.state.curUser.username,
            userId: ctx.state.curUser._id,
          })
            .then(res => {
              resolve({
                err: null,
                data: realPath
              })
            })
         
        } else {
          resolve({
            err: respBody,
            data: ''
          })
        }
      })
    })
  }
  
  // 这个方法暂时失效，因为使用了koaBody中间件
  async uploadFileByBusboy(ctx, saveCatalog = 'common'){
    const res = {
      err: null,
      data: {}
    }
    const busboy = new Busboy({ headers: ctx.req.headers })
    const filePath = path.join(STATIC_IMG_PATH, saveCatalog)
    hello.mkdirsSync( filePath )
    return new Promise((resolve) => {
      console.log('文件上传中...')
      const result = {
        formData: {},
        uploadSuccess: false,
        imgUrl: []
      }
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
          console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        let fileName = Math.random().toString(16).substr(2) + '_'  + ctx.state.curUser._id + '_' + filename
        let saveTo = path.join( filePath, fileName )
        // 文件保存到制定路径
        file.pipe(fs.createWriteStream(saveTo))
        // 文件写入事件结束
        file.on('end', function() {
          console.log('文件上传成功！')
          result.uploadSuccess = true
          result.imgUrl.push(saveTo)
        })
      })
      // 解析表单中其他字段信息
      busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
        console.log('表单字段数据 [' + fieldname + ']: value: ' + util.inspect(val));
        result.formData[fieldname] = util.inspect(val);
      });
      
      // 解析结束事件
      busboy.on('finish', function( ) {
        console.log('文件上结束')
        res.data = result
        resolve(res)
      })
      
      // 解析错误事件
      busboy.on('error', function(err) {
        res.err = err
        resolve(res)
      })
      
      ctx.req.pipe(busboy)
    })
    
  }
  async getChunk(ctx) {
    return new Promise(function(resolve,reject){//需要返回一个promise对象
      try{
        let str='';
        ctx.req.addListener('data',function(chunk){
          str+=chunk;
        })
        ctx.req.addListener('end',function(chunk){
          resolve(str);
        })
      }catch(err){
        reject(err);
      }
    })
  }
}

module.exports = BaseCtl
