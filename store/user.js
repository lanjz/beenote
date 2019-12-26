import fetch from '../utils/client/fetch/fetch.js'
import * as MUTATIONS from './const/mutaions'
import * as ACTIONS from './const/actions'
const baseUseInfo = {
  nickname: '',
  email: '',
  username: '',
  password: '',
  sex: 1,
  avatar: '',
  gitName: '',
  gitToken: ''
}
const state = () => (
  {
    loginUserInfo: baseUseInfo,
    curUserInfo: baseUseInfo,
    onlyView: false,
    userInfoStatus: '' // info:个人信息，modify:修改，reg:注册，login：登录
  }
)
const getters = {
  isVisitor: state => {
    // 手动设置的游客模式
    if(state.onlyView){
      return true
    }
    // 没有登录状则为游客
    if(!state.loginUserInfo['_id']){
      return true
    }
    // 有登录状且有当前页面所属用户则判断他们是否相等
    return state.loginUserInfo['gitName'] !== state.curUserInfo['gitName']
  },
  githubName: state => state.curUserInfo.gitName
}
const mutations = {
  [MUTATIONS.USER_SAVE](state, data) {
    state.loginUserInfo = {
      ...state.loginUserInfo,
      ...data
    }
  },
  [MUTATIONS.CUR_USER_INFO_SAVE](state, info) {
    state.curUserInfo = {
      ...state.curUserInfo,
      ...info
    }
  },
  [MUTATIONS.CUR_USER_LAYOUT_SAVE](state, info = '') {
    state.userInfoStatus = info
  },
  [MUTATIONS.VIEW_STATUS_SAVE](state, status) {
    state.onlyView = status
  }
}

const actions = {
  async [ACTIONS.USER_PUT]({ state, commit, dispatch }, data) {
    const result = await fetch({
      url: '/api/user',
      method: 'put',
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
  async [ACTIONS.USER_POST]({ state, commit, dispatch }, data) {
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
    if(state.loginUserInfo.username) {
      return {
        err: null,
        data: state.loginUserInfo
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
