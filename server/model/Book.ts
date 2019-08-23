import baseModel from './BaseModel'
import { definedValidate }  from './DefinedValidate'
import validator from './validator'

class BookModel extends baseModel{
  assectPath: string;
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

