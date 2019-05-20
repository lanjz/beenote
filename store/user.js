import fetch from '../util/fetch/fetch.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'

const state = () => (
  {
    userInfo: {},
    curUserInfo: {}
  }
)
const getters = {
  isVisitor: state => {
    if(!state.userInfo['_id']){
      return true
    }
    return state.userInfo['_id'] !== state.curUserInfo['_id']
  }
}
const mutations = {
  [MUTATIONS.USER_SAVE](state, data) {
    state.userInfo = {
      ...data
    }
  },
  [MUTATIONS.ISVISITOR_SAVE](state, bol) {
    state.isVisitor = bol
  },
  [MUTATIONS.CUR_USER_INFO_SAVE](state, info) {
    state.curUserInfo = {
      ...info
    }
  }
}

const actions = {
  async [ACTIONS.USER_POST]({ commit }, data) {
    const result = await fetch({
      url: '/api/user',
      method: 'post',
      data: {
        ...data
      }
    })
    if(!result.err) {
      commit(MUTATIONS.USER_SAVE, result.data)
    }
    return result
  },
  async [ACTIONS.LOGIN_POST]({ commit }, data) {
    const result = await fetch({
      url: '/api/login',
      method: 'post',
      data
    })
    if(!result.err) {
      commit(MUTATIONS.USER_SAVE, result.data)
    }
    return result
  },
  async [ACTIONS.USER_INFO_GET]({ state, commit }, data) {
    if(state.userInfo._id) {
      return {
        err: null,
        data: state.userInfo
      }
    }
    const result = await fetch({
      url: '/api/getUserInfo'
    })
    if(!result.err) {
      commit(MUTATIONS.USER_SAVE, result.data)
    }
    return result
  },
}
export default {
  state,
  getters,
  mutations,
  actions
}
