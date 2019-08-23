import * as MUTATIONS from './const/mutaions'

const state = () => {
  return {
    showDir: true,
    showBrief: true,
    extend: {}
  }
}
const mutations = {
  [MUTATIONS.CONFIG_TOGGLE_SAVE] (state, { tar, val} ) {
    state[tar] = val
    const temVar = val ? '1' : '0'
    // console.log('temVar', temVar, process.client)
    if(process.client) {
      window.localStorage.setItem(tar, temVar)
    }
  },
  [MUTATIONS.CONFIG_EXTEND_SAVE] (state, { tar, val} ) {
    state.extend[tar] = val
  }
}

export default {
  state,
  mutations
}
