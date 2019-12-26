import { Base64 } from 'js-base64'
import fetch from '../utils/client/fetch/fetch.js'
import constKey from '../utils/client/const.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'
import { getCurTime, createCatalogue } from '../utils/client/blackHole'

const state = () => (
  {
    list: {},
    curNote: "",
    notesMap: {},
    curNoteContent: {},
    noteCatalogue: {}
  }
)
const getters = {
  curNoteInfo: state => {
    return state.list[state.curNote] || {}
  },
}
const mutations = {
  [MUTATIONS.NOTE_LIST_SAVE](state, {data, start, key}) {
    state.list[key] = data
    state.list = {...state.list}
    /*    state.list = JSON.parse(JSON.stringify(state.list))
        data.forEach(item => {
          state.notesMap[item._id] = item
        })*/
  },
  [MUTATIONS.NOTE_CUR_UPDATE](state, data) {
    state.curNote = data
  },
  [MUTATIONS.NOTE_MAP_SAVE](state, {data, key}) {
    state.notesMap[key] = data
    state.notesMap = {...state.notesMap}
  },
  [MUTATIONS.NOTE_CUR_CONTENT_UPDATE](state, data) {
    state.curNoteContent = data
  },
  [MUTATIONS.NOTE_CATALOGUE_SAVE](state, {data, key}) {
    state.noteCatalogue[key] = data
    state.noteCatalogue = {...state.noteCatalogue}
  }
}

const actions = {
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTES_GET]({state, commit, rootState}, arg = {}) {
    const {limit = 0, start = 0, force = false} = arg
    const bookId = rootState.books.curBook
    const catalogId = rootState.catalogs.curCatalog
    const key = `${bookId}_${catalogId}`
    if (!force && state.list[key]) {
      return {err: null, data: {list: state.list[key]}}
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
    const {err, data} = result
    if (!err) {
      commit(MUTATIONS.NOTE_LIST_SAVE, {data: data.list, start, key})
    }
    return result
  },
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTE_DES_GET]({state, commit, rootState}, arg = {}) {
    const {
      user,
      repo,
      path,
      force = false
    } = arg
    const fullPath = `${user}/${repo}/${path}`
    if (!force && state.notesMap[fullPath]) {
      return {err: null, data: state.notesMap[fullPath]}
    }
    const findInfo = fetch({
      url: `/repos/${user}/${repo}/contents/${path}`
    })
    // 可以直接解码出原来的数据，所以不需要在获取内容了
   /* const getContent = fetch({
      url: `/${user}/${repo}/master/${path}`,
      baseUrl: 'raw'
    })*/
    const result = await Promise.all([findInfo])
    console.log('result', result)
    if (!result[0].err) {
      const curData = {
        ...result[0].data,
        contentMD: Base64.decode(result[0].data.content)
      }
      commit(MUTATIONS.NOTE_MAP_SAVE,
        {
          data: curData,
          key: fullPath
        })
      commit(MUTATIONS.NOTE_CATALOGUE_SAVE, {
        data: createCatalogue(`${user}/${repo}/${path}`, curData.contentMD),
        key: fullPath
      })
    }
    return result
  },
  /**
   * @params <Object> force 是否强制重新获取数据
   * */
  async [ACTIONS.NOTE_GET_BY_ID]({state, commit, rootState}, arg = {}) {
    const {id, bookId, catalogId} = arg
    const key = `${bookId}_${catalogId}`
    if (state.list[key]) {
      return {err: null, data: {list: state.list[key]}}
    }
    const result = await fetch({
      url: `/api/notes/${id}`,
      data: {
        bookId,
        catalogId
      }
    })
    const {err, data} = result
    if (!err) {
      commit('NOTE_LIST_SAVE', {data: data.list, start: 0, key})
    }
    return result
  },
  /* eslint-disable no-unused-vars */
  async [ACTIONS.NOTE_POST]({commit, rootState}, data) {
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
  async [ACTIONS.NOTE_DELETE]({commit, rootState}, data) {
    const { user, books } = rootState
    const result = await fetch({
      url: `/repos/${user.curUserInfo.githubName}/${books.curBook}/contents/${data.path}`,
      method: 'DELETE',
      data: {
        message: `DELETE: ${books.curBook}/${data.path} At ${getCurTime()}`,
        sha: data.sha
      }
    })
    return result
  },
  async [ACTIONS.NOTE_PUT]({commit, rootState}, data) {
    const { user, books } = rootState
    const result = await fetch({
      url: `/repos/${user.curUserInfo.githubName}/${books.curBook}/contents/${data.path}`,
      method: 'put',
      data: {
        message: `${data.newFile ? 'ADD: ' : 'UPDATE: '}${books.curBook}/${data.path} At ${getCurTime()}`,
        sha: data.sha,
        content: Base64.encode(data.content)
      }
    })
    return result
  },
  async [ACTIONS.NOTES_RECENTLY_GET]({state, commit, rootState}, arg = {}) {
    const {force = false} = arg
    const key = rootState.books.curBook + '_' + constKey.recentlyNoteKey
    if (!force && state.list[key]) {
      return {err: null, data: {list: state.list[key]}}
    }
    const result = await fetch({
      url: '/api/recently_notes',
      method: 'get',
      data: {
        bookId: rootState.books.curBook
      }
    })
    const {err, data} = result
    if (!err) {
      commit(MUTATIONS.NOTE_LIST_SAVE, {data, key})
    }
    return {err: null, data: {list: data}}
  },

}
export default {
  state,
  mutations,
  actions,
  getters,
  strict: false
}
