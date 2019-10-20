import fetch from '../../utils/client/fetch/fetch.js'
import * as MUTATIONS from '../const/mutaions'
import * as ACTIONS from '../const/actions'

const state = () => (
  {
    userInfo: {
      githubName: 'lanjz'
    },
    curUserInfo: {},
    userInfoStatus: '' // info:个人信息，modify:修改，reg:注册，login：登录
  }
)
const getters = {
  isVisitor: state => {
    return false
    // 有登录状且没有当前页面所属用户则非游客
    if(state.userInfo['_id'] && !state.curUserInfo['_id']){
      return false
    }
    // 没有登录状则为游客
    if(!state.userInfo['_id']){
      return true
    }
    // 有登录状且有当前页面所属用户则判断他们是否相等
    return state.userInfo['_id'] !== state.curUserInfo['_id']
  },
  githubName: state => state.userInfo.githubName
}
const mutations = {
  [MUTATIONS.USER_SAVE](state, data) {
    state.userInfo = {
      ...data
    }
  },
  [MUTATIONS.CUR_USER_INFO_SAVE](state, info) {
    state.curUserInfo = {
      ...info
    }
  },
  [MUTATIONS.CUR_USER_LAYOUT_SAVE](state, info = '') {
    state.userInfoStatus = info
  }
}

const actions = {
  async [ACTIONS.USER_PUT]({ state, commit }, data) {
    const result = await fetch({
      url: '/api/user',
      method: 'put',
      data: {
        _id: state.userInfo._id,
        ...data
      },
      notAlert: true
    })
    if(!result.err) {
      commit(MUTATIONS.USER_SAVE, result.data)
    }
    return result
  },
  async [ACTIONS.USER_POST]({ commit }, data) {
    const result = await fetch({
      url: '/api/user',
      method: 'post',
      data: {
        ...data
      },
      notAlert: true
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
      data,
      notAlert: true
    })
    if(!result.err) {
      commit(MUTATIONS.USER_SAVE, result.data)
    }
    return result
  },
  async [ACTIONS.USER_INFO_GET]({ state, commit }, data) {
    if(state.userInfo.username) {
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
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
