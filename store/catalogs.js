import fetch from '../utils/client/fetch/fetch.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'
import constKey from '../utils/client/const'

const state = () => (
  {
    list: {
      root: {
        _id: 'root',
        parentId: '',
        bookId: 'default'
      }
    },
    curCatalog: constKey.recentlyArticlesKey,
    isOpen: [],
    catalogMapNotes: {}
  }
)
const getters = {
  treeChainList: state => {
    if(state.curCatalog === constKey.recentlyArticlesKey) {
      return [constKey.recentlyArticlesKey]
    }
    const tempArr = []
    let curTree = state.list[state.curCatalog] || {}
    if(!curTree._id) return []
    tempArr.unshift(curTree._id)
    while (curTree.parentId) {
      tempArr.unshift(curTree.parentId)
      curTree = state.list[curTree.parentId]
    }
    return tempArr
  }
}
const mutations = {
  [MUTATIONS.CATALOGS_NOTE_MAP_SAVE](state, { data, start, key }) {
    console.log('data', data)
    state.catalogMapNotes[key] = data
    state.catalogMapNotes = { ...state.catalogMapNotes }
  },
  [MUTATIONS.CATALOGS_SAVE](state, { key, data, bookName }) {
    const list = {
      ...{ [key]: {
          ...state.list[key],
          updateTime: (new Date()).getTime(),
          childNodes: data
      } }
    }
    data.forEach((item) => {
      list[item.name] = {
        ...item
      }
    })
    state.list = {
      ...state.list,
      ...list
    }
  },
  [MUTATIONS.CATALOGS_CUR_SAVE](state, id) {
    state.curCatalog = id
  },
  /**
   * 创建临时的目录
   * @param <String> parentId
   * */
  [MUTATIONS.CATALOGS_TEMPLATE_CREATE](state, id) {
    const newDir = {
      name: '新建文件夹',
      isNew: true,
      parentId: id
    }
    // 将临时目录插入到目标文件夹最前面，并更新state
    const getCatalog = state.list[id] ? state.list[id] : []
    const addCatalog = [ newDir, ...getCatalog ]
    state.list = {
      ...state.list,
      ...{ [id]: addCatalog }
    }
  },
  [MUTATIONS.CATALOGS_OPEN_TOGGLE](state, { id, force }) {
    const findInd = state.isOpen.indexOf(id)
    if(findInd < 0) {
      state.isOpen = [ ...state.isOpen, id]
    } else if(!force && findInd > -1 ){
      state.isOpen.splice(findInd, 1)
    }
    state.isOpen = [ ...state.isOpen ]
  },
  [MUTATIONS.CATALOGS_OPEN_RESET](state, id) {
    state.isOpen = []
  },
}

const actions = {
  async [ACTIONS.CATALOGS_GET]({ state, commit, rootState, dispatch }, params = {
    force: false,
    bookName: rootState.books.curBook
  }) {
    let { force, path, bookName, parentId } = params
    if(!force && parentId && state.list[params.parentId] && state.list[params.parentId].childNodes) {
      return {
        err: null,
        data: state.list[params.parentId]
      }
    }
    const githubName = rootState.user.userInfo.githubName
    const result = await fetch({
      url: path ? `/repos/${githubName}/${bookName}/contents/${path}` : `/repos/${githubName}/${bookName}/contents`
    })
    const { err, data } = result
    if(!err) {
      const findDirs = data
        .filter(item => item.type === 'dir')
        .map(item => {
          return {
            ...item,
            _id: item.name+'_'+item.sha
          }
        })
      const findFiles = data.filter(item => item.type === 'file')
      const key = (params.parentId === 'root' || !params.parentId) ? bookName+'_root' : params.parentId
      commit(MUTATIONS.CATALOGS_SAVE, { key, data: findDirs, bookName: rootState.books.curBook })
      commit(MUTATIONS.CATALOGS_NOTE_MAP_SAVE, { key, data: findFiles })
      findDirs.forEach(item => {
        dispatch(ACTIONS.CATALOGS_GET, {
          path: item.path,
          bookName,
          force,
          parentId: item._id
        })
      })
    }
    return result
  },
  /* eslint-disable no-unused-vars */
  async [ACTIONS.CATALOGS_POST]({ commit }, data) {
    const result = await fetch({
      url: '/api/catalog',
      method: 'post',
      data
    })
    return result
  },
  async [ACTIONS.CATALOGS_DELETE]({ commit }, data) {
    const result = await fetch({
      url: `/api/catalog/${data._id}`,
      method: 'delete',
    })
    return result
  },
  async [ACTIONS.CATALOGS_PUT]({ commit }, data) {
    const result = await fetch({
      url: '/api/catalog',
      method: 'PUT',
      data
    })
    return result
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
