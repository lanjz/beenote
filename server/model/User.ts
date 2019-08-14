import { Document, Schema, Model } from 'mongoose'
import baseModel, { BaseDocument } from './BaseModel'
const definedValidate  = require('./DefinedValidate')
const validator = require('./validator')

interface UserDocement extends Document, BaseDocument {
  username: string
  nickname: string
  password: string
  email: string
  avatar: string

}

class UserModel extends (baseModel as { new(): any; }){
  assectPath: string;
  constructor() {
    super()
    this.assectPath = '_id username email sex createTime updateTime'
    this.findByEmail = this.findByEmail.bind(this)
  }
  getName() {
    return 'users'
  }
  banUpdateFields() {
    return ['username']
  }
  getSchema(): Schema  {
    return {
      username: {
        type: String,
        unique: true,
        required: true,
        validate: definedValidate(validator.username)
      },
      nickname: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true,
        validate: definedValidate(validator.password)
      },
      email: {
        type: String,
        required: true,
        validate: definedValidate(validator.email)
      },
      sex: {
        type: Number,
        required: true,
        validate: definedValidate(validator.sex)
      },
      avatar: {
        type: String,
      },
      ...this.baseModel(),
    }
  }

  findByEmail(email) {
    return this.Model.findOne({ email }).select(this.assectPath).exec()
  }
}

export default UserModel

