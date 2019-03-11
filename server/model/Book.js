import baseModel, { definedValidate } from './BaseModel'
import validator from './validator'


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

export default new BookModel()

