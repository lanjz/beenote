import fetch from '../utils/client/fetch/fetch.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'
import constKey from '../utils/client/const'
import { getPath } from '../utils/client/blackHole'

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
  [MUTATIONS.CATALOGS_NOTE_MAP_SAVE](state, { data, key }) {
    state.catalogMapNotes[key] = data
    state.catalogMapNotes = { ...state.catalogMapNotes }
  },
  [MUTATIONS.CATALOGS_SAVE](state, { key, data }) {
    const list = {
      ...{ [key]: {
          ...state.list[key],
          updateTime: (new Date()).getTime(),
          childNodes: data
      } }
    }
    const findRepoName = key.substring(0, key.indexOf('/'))
    data.forEach((item) => {
      list[`${findRepoName}/${item.path}`] = {
        ...item
      }
    })
    state.list = {
      ...state.list,
      ...list
    }
  },
  [MUTATIONS.CATALOGS_CUR_SAVE](state, id) {
    state.curCatalog = getPath(id)
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
  }) {
    let { force, path, bookName = rootState.books.curBook, getChild = true } = params
    // bookName: 仓库名
    const fullPath = path ? `${bookName}/${path}` : `${bookName}` // 保存目录做为key使用
    let result = {}
    if(!force && fullPath && state.list[fullPath] && state.list[fullPath].childNodes) {
      result = {
        err: null,
        data: [
          ...state.list[fullPath].childNodes,
          ...state.catalogMapNotes[fullPath]
        ]
      }
    } else {
      const githubName = rootState.user.userInfo.githubName
      result = await fetch({
        url: path ? `/repos/${githubName}/${bookName}/contents/${path}` : `/repos/${githubName}/${bookName}/contents`
      })
    }
   
    const { err, data } = result
    if(!err) {
      const findDirs = data
        .filter(item => item.type === 'dir')
        .map(item => ({ ...item, repo: bookName, fullPath: `${bookName}/${item.path}`}))
      const findFiles = data
        .filter(item => item.type === 'file' && item.name.indexOf('.md') > -1)
        .map(item => ({ ...item, repo: bookName, fullPath: `${bookName}/${item.path}`}))
      commit(MUTATIONS.CATALOGS_SAVE, { key: fullPath, data: findDirs })
      commit(MUTATIONS.CATALOGS_NOTE_MAP_SAVE, { key: fullPath, data: findFiles })
      if(getChild) {
        findDirs.forEach(item => {
          dispatch(ACTIONS.CATALOGS_GET, {
            path: item.path,
            bookName,
            force,
            parentId: item._id
          })
        })
      }
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
