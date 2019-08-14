import baseModel from './BaseModel'

class FileMapModel extends (baseModel as { new(): any; }){
  assectPath: string
  constructor() {
    super()
    this.assectPath = '_id username userId filePath createTime updateTime'
  }
  getName(){
    return 'filemaps'
  }
  banUpdateFields() {
    return ['_id', 'username']
  }
  getSchema() {
    return {
      username: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      },
      filePath: {
        type: String,
        required: true
      }
    }
  }
}

module.exports = new FileMapModel()
