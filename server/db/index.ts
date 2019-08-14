import { Schema, Document, Model } from 'mongoose'
const mongoose = require('mongoose')
const SET = require('../../utils/hide/serverSecret')



const DBURL = SET.base.DBURL

mongoose.connect(DBURL, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
function dbModel(tar, schema): Model<any>{
  if (schema instanceof mongoose.Schema === false) {
    schema = new mongoose.Schema(schema);
  }
  return mongoose.model(tar, schema)
}

export default dbModel
