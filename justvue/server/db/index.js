import * as mongoose from 'mongoose'

const dbName = {
  dev: 'beenotetest',
  pro: 'beenote'
}
const getDBName = process.env.DEV ? dbName.dev : dbName.pro

const DBURL = `mongodb://127.0.0.1:27017/${getDBName}`

mongoose.connect(DBURL, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
function dbModel(tar, schema) {
  if (schema instanceof mongoose.Schema === false) {
    schema = new mongoose.Schema(schema);
  }
  return mongoose.model(tar, schema)

}

export default dbModel
