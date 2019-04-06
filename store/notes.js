import fetch from '../util/fetch/fetch.js'
import constKey from '../util/const.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'

const state = () => (
  {
    list: {},
    curNote: "",
  }
)
const getters = {
  curNoteInfo: state => {
    return state.list[state.curNote] || {}
  }
}
const mutations = {
  [MUTATIONS.NOTE_LIST_SAVE](state, { data, start, key }) {
    state.list[key] = data
    state.list = JSON.parse(JSON.stringify(state.list))
  },
  [MUTATIONS.NOTE_CUR_UPDATE](state, data) {
    state.curNote = data
  }
}

const actions = {
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTES_GET]({ state, commit }, arg = {}) {
    const { limit = 0, start = 0, force = false, bookId, catalogId } = arg
    const key = `${bookId}_${catalogId}`
    if(!force && state.list[key]){
      return { err: null, data: { list: state.list[key] } }
    }
    const result = await fetch({
      url: '/api/notes',
      data: {
        limit,
        start
      }
    })
    const { err, data } = result
    if(!err) {
      commit(MUTATIONS.NOTE_LIST_SAVE, { data: data.list, start, key })
    }
    return result
  },
  /* eslint-disable no-unused-vars */
  async [ACTIONS.NOTE_POST]({ commit }, data) {
    const result = await fetch({
      url: '/api/note',
      method: 'post',
      data
    })
    return result
  },
  async [ACTIONS.NOTE_DELETE]({ commit }, data) {
    const result = await fetch({
      url: '/api/note',
      method: 'delete',
      data
    })
    return result
  },
  async [ACTIONS.NOTE_PUT]({ commit }, data) {
    const result = await fetch({
      url: '/api/note',
      method: 'put',
      data
    })
    return result
  },
  async [ACTIONS.NOTES_RECENTLY_GET]({ commit, rootState }) {
    const result = await fetch({
      url: '/api/recently_notes',
      method: 'get',
      data: {
        bookId: rootState.books.curBook
      }
    })
    const { err, data } = result
    if(!err) {
      const key = constKey.recentlyNoteKey
      commit(MUTATIONS.NOTE_LIST_SAVE, { data, key })
    }
    return result
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}
