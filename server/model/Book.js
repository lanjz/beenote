const baseModel = require('./BaseModel')
const definedValidate  = require('./DefinedValidate')
const validator = require('./validator')


class BookModel extends baseModel{
  constructor() {
    super()
    this.assectPath = ''
    // this.assectPath = '_id name isPrivate'
  }
  getName() {
    return 'books'
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
      name: {
        type: String,
        required: true,
      },
      isPrivate: {
        type: Number,
        default: 1,
        validate: definedValidate(validator.numBoolean)
      },
      ...this.baseModel()
    }
  }
}

module.exports = new BookModel()

