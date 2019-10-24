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
    const findRepoName = key.indexOf('/')>-1 ? key.substring(0, key.indexOf('/')) : key
    // 这一步会把childNodes属性覆盖掉，所以要把之前属性加上
    data.forEach((item) => {
      const originData = state.list[`${findRepoName}/${item.path}`] || {}
      list[`${findRepoName}/${item.path}`] = {
        ...originData,
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

/**
 * @params <force> {'' || bool} 是否强行刷新数据
 * @params <path> {'' || string} 不包含仓库名的路径地址
 * @params <bookName> {'' || string} 所属仓库
 * @params <getChild> {'' || bool} 是否要获取子目录
 * */
const actions = {
  async [ACTIONS.CATALOGS_GET]({ state, commit, rootState, dispatch }, params = {
    force: false,
  }) {
    let { force, path, bookName = rootState.books.curBook, getChild = true } = params
    // bookName: 仓库名
    const fullPath = path ? `${bookName}/${path}` : `${bookName}` // 为了保存key的唯一性，所以path前加上仓库名
    let result = {}
    const { list, catalogMapNotes } = state
    // 如果list或者catalogMapNotes包含当前key的数据，说明这个数据获取过了
    const hasData = (list[fullPath] && list[fullPath].childNodes) || catalogMapNotes[fullPath]
    // 对于获取过的数据，直接返回
    // 之所以这里没直接return，是因为服务端渲染时会先获取一个目录的数据，不能确定所有的数据都加载过了，所以这里需要继续循环
    if(!force &&hasData) {
      result = {
        err: null,
        data: [
          ...state.list[fullPath].childNodes,
          ...state.catalogMapNotes[fullPath]
        ]
      }
      // 首屏渲染只会加一个key的数据的加上默认的root，如果大于两个，说明是全部加载过的，就是直接return
      if(Object.keys(list[fullPath]).length > 2) {
        return result
      }
    } else {
      const githubName = rootState.user.userInfo.githubName
      result = await fetch({
        url: path ? `/repos/${githubName}/${bookName}/contents/${path}` : `/repos/${githubName}/${bookName}/contents`
      })
    }

    console.log('ABC')
    const { err, data } = result
    let PromiseAll = [Promise.resolve({})]
    if(!err) {
      // 接口返回的数数据既包含文件夹目录也包含文件，所以过滤出来，分开保存
      const findDirs = data
        .filter(item => item.type === 'dir')
        .map(item => ({ ...item, repo: bookName, fullPath: `${bookName}/${item.path}`}))
      const findFiles = data
        .filter(item => item.type === 'file' && item.name.indexOf('.md') > -1)
        .map(item => ({ ...item, repo: bookName, fullPath: `${bookName}/${item.path}`}))
      commit(MUTATIONS.CATALOGS_SAVE, { key: fullPath, data: [ ...findDirs ] })
      commit(MUTATIONS.CATALOGS_NOTE_MAP_SAVE, { key: fullPath, data: [ ...findFiles ] })
      if(getChild) {
        findDirs.forEach(item => {
          PromiseAll.push(dispatch(ACTIONS.CATALOGS_GET, {
            path: item.path,
            bookName,
            force,
            isTree: true
          }))
        })
      }
    }
    return await Promise.all(PromiseAll)
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
