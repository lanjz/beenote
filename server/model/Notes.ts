import baseModel from './BaseModel'

class NoteModel extends (baseModel as { new(): any}) {
  assectPath: String;
  constructor() {
    super()
    this.assectPath = '_id bookId catalogId title list content createTime updateTime'
  }

  getName() {
    return 'notes'
  }

  banUpdateFields() {
    return ['userId', 'createTime']
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
      title: {
        type: String,
        required: true
      },
      content: {
        type: String
      },
      ...this.baseModel()
    }
  }
}

export default new NoteModel()


