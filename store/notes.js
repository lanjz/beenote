import fetch from '../utils/client/fetch/fetch.js'
import constKey from '../utils/client/const.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'

const state = () => (
  {
    list: {},
    curNote: "",
    notesMap: {},
    curNoteContent: {},
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
    data.forEach(item => {
      state.notesMap[item._id] = item
    })
  },
  [MUTATIONS.NOTE_CUR_UPDATE](state, data) {
    state.curNote = data
  },
  [MUTATIONS.NOTE_MAP_SAVE](state, { data, id }) {
    state.notesMap[id] = data
  },
  [MUTATIONS.NOTE_CUR_CONTENT_UPDATE](state, data) {
    state.curNoteContent = data
  }
}

const actions = {
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTES_GET]({ state, commit, rootState }, arg = {}) {
    const { limit = 0, start = 0, force = false } = arg
    const bookId = rootState.books.curBook
    const catalogId = rootState.catalogs.curCatalog
    const key = `${bookId}_${catalogId}`
    if(!force && state.list[key]){
      return { err: null, data: { list: state.list[key] } }
    }
    const result = await fetch({
      url: '/api/notes',
      data: {
        limit,
        start,
        bookId,
        catalogId: catalogId.indexOf('root') > -1 ? 'root' : catalogId
      }
    })
    const { err, data } = result
    if(!err) {
      commit(MUTATIONS.NOTE_LIST_SAVE, { data: data.list, start, key })
    }
    return result
  },
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTE_DES_GET]({ state, commit, rootState }, arg = {}) {
    const { id, force = false } = arg
    if(!force && state.notesMap[id]){
      return { err: null, data: state.notesMap[id] }
    }
    const result = await fetch({
      url: `/api/note/${id}`,
    })
    const { err, data } = result
    if(!err) {
      commit(MUTATIONS.NOTE_MAP_SAVE, { data, id })
  }
    return result
  },
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTE_GET_BY_ID]({ state, commit, rootState }, arg = {}) {
    const { id, bookId, catalogId } = arg
    const key = `${bookId}_${catalogId}`
    if(state.list[key]){
      return { err: null, data: { list: state.list[key] } }
    }
    const result = await fetch({
      url: `/api/notes/${id}`,
      data: {
        bookId,
        catalogId
      }
    })
    const { err, data } = result
    if(!err) {
      commit('NOTE_LIST_SAVE', { data: data.list, start: 0, key })
    }
    return result
  },
  /* eslint-disable no-unused-vars */
  async [ACTIONS.NOTE_POST]({ commit, rootState }, data) {
    const result = await fetch({
      url: '/api/note',
      method: 'post',
      data: {
        ...data,
        catalogId: data.catalogId || rootState.catalogs.curCatalog,
        bookId: rootState.books.curBook
      }
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
  async [ACTIONS.NOTES_RECENTLY_GET]({ state, commit, rootState }, arg = {}) {
    const { force = false } = arg
    const key = rootState.books.curBook+'_'+constKey.recentlyNoteKey
    if(!force && state.list[key]){
      return { err: null, data: { list: state.list[key] } }
    }
    const result = await fetch({
      url: '/api/recently_notes',
      method: 'get',
      data: {
        bookId: rootState.books.curBook
      }
    })
    const { err, data } = result
    if(!err) {
      commit(MUTATIONS.NOTE_LIST_SAVE, { data, key })
    }
    return { err: null, data: { list: data } }
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}
