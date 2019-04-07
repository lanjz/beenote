const baseModel = require('./BaseModel')

class ArticleModel extends baseModel {
  constructor() {
    super()
    this.assectPath = '_id bookId catalogId userId schemaId title list contents createTime updateTime'
  }

  getName() {
    return 'articles'
  }

  banUpdateFields() {
    return ['userId']
  }

  getSchema() {
    return {
      userId: {
        type: String,
        required: true,
      },
      bookId: {
        type: String,
        required: true
      },
      catalogId: {
        type: String,
        required: true
      },
      schemaId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      list: {
        type: Boolean,
        default: false
      },
      contents: Array,
      ...this.baseModel()
    }
  }
}

module.exports = new ArticleModel()


