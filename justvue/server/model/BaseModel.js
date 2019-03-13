import * as mongoose from 'mongoose';
import dbModel from '../db/index'
import { VALIDA_ERR_MSG } from '../utils/CONST'

class baseModel {
  constructor() {
    this.name = this.getName()
    this.filterFields = [...this.banUpdateFields(), 'createTime', 'updateTime']
    this.schema = new mongoose.Schema(this.getSchema())
    this.schema.pre('save', function (next){
      if(!this.createTime) this.createTime = (new Date()).getTime()
      next()
    })
    const _this = this
    this.schema.pre(/updateOne|findOneAndUpdate/, function (next){
      const getUpdate = this.getUpdate()
      const getFields = _this.getValidateFields(getUpdate)
      this.setUpdate({ $set: getFields })
      next()
    })
    this.Model = dbModel(this.name, this.schema)
    this.baseSchema = {
      createTime: { type: Number },
      updateTime: { type: Number, default: (new Date()).getTime() },
    }
  }
  baseModel() {
    return {
      createTime: { type: Number },
      updateTime: { type: Number, default: (new Date()).getTime() }
    }
  }
  /**
   * 获取collection的schema结构
   */
  getSchema() {
    console.log('Model Class need getSchema function', 'error');
  }
  /**
   * 获取collection的Model名称
   */
  getName() {
    console.log('Model Class need name', 'error');
  }
  /**
   * 修改数据库时，需要过滤的字段，防止误修改
   * */
  banUpdateFields() {
    return []
  }
  getValidateFields(fields) {
    this.filterFields.forEach((item) => {
      if(fields[item]) {
        delete fields[item]
      }
    })
    fields.updateTime = (new Date()).getTime()
    return fields
  }
  listCount(query) {
    return this.Model.countDocuments(query);
  }
  save(data) {
    const model = new this.Model(data)
    const error = model.validateSync()
    if (error) {
      return Promise.reject(error.message)
    }
    // model.markModified('content')
    return model.save()
  }

  /**
   * 查找符合条件的一条记录，没有则返回null
   * @param <Object> query 查询条件
   * @param <Object> projection 返回结果过滤
   * */
  findOne(query, projection = null) {
    return this.Model.findOne(query, projection)
  }
  findById(id, query, addLean) {
    let fn = this.Model.findOne({ _id: id, ...query })
    if(addLean){
      fn = fn.lean()
    }
    return fn.select(this.assectPath).exec()
  }
  update(query, projection = null) {
    return this.Model.update(
      query,
      projection)
  }
  updateOneById(id, data) {
    return this.Model.updateOne({ _id: id }, data);
  }
  findOneAndUpdate(id, data, query = {}) {
    return this.Model.findOneAndUpdate({ _id: id, ...query }, data, { new: true })
      .select(this.assectPath).exec();
  }
  list(...args) {
    return this.Model.find(...args).select(this.assectPath).exec()
  }
  listLean(...args) {
    return this.Model.find(...args).lean().select(this.assectPath).exec()
  }
  listWithPaging({ start = 0, limit = 0, dbQuery = {}, addLean = false, sort }) {
    start = parseInt(start);
    limit = parseInt(limit);
    sort = sort ? sort : { _id: -1 }
    let fn = this.Model.find(dbQuery)
    if(addLean){
      fn = fn.lean()
    }
    return fn
      .sort(sort)
      .skip(start)
      .limit(limit)
      .select(this.assectPath)
      .exec()
  }
  del(id, query) {
    return this.Model.deleteOne({ _id: Object(id), ...query })
  }
  delMany(ids, query) {
    return this.Model.deleteMany({ _id: { $in: ids }, ...query })
  }
  doAggregate(...query) {
    return this.Model.aggregate(...query)
  }
}

/**
 * @param {Function} f 校验函数
 * @return <Object> mongoose.Schema.validate
 * */
export function definedValidate(f) {
  return {
    validator(v) {
      return f(v)
    },
    message(props) {
      if(props.reason && props.reason.message){
        return props.reason.message
      }
      return `${props.path} = ${props.value} : Format error`
    }
  }
}

export default baseModel
