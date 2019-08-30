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
    isOpen: []
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
  [MUTATIONS.CATALOGS_SAVE](state, { curNode, data, bookId }) {
    const key = curNode.parentId === 'root' ? bookId+'_root' : curNode.parentId
    const list = {
      ...{ [key]: {
          ...state.list[curNode.parentId],
          updateTime: (new Date()).getTime(),
          childNodes: data
      } }
    }
    data.forEach((item) => {
      list[item._id] = {
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
    parentId: rootState.books.curBook+'_root',
    bookId: rootState.books.curBook
  }) {
    let { force, parentId, bookId } = params
    if(!force && state.list[params.parentId] && state.list[params.parentId].childNodes) {
      return {
        err: null,
        data: state.list[params.parentId]
      }
    }
    const result = await fetch({
      url: '/api/catalogs',
      data: {
        parentId: parentId.indexOf('root') > 0 ?  'root' : parentId,
        bookId
      }
    })
    const { err, data } = result
    if(!err) {
      commit(MUTATIONS.CATALOGS_SAVE, { curNode: params, data: data, bookId: rootState.books.curBook })
      data.forEach(item => {
        if(item.hasChild) {
          dispatch(ACTIONS.CATALOGS_GET, {
            parentId: item._id,
            bookId: item.bookId,
            force
          })
        }
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
