import * as MUTATIONS from './const/mutaions'

const state = () => {
  return {
    showDir: true,
    showBrief: true
  }
}
const mutations = {
  [MUTATIONS.CONFIG_TOGGLE_SAVE] (state, { tar, val} ) {
    state[tar] = val
    const temVar = val ? '1' : '0'
    console.log('temVar', temVar, process.client)
    if(process.client) {
      window.localStorage.setItem(tar, temVar)
    }
  }
}

export default {
  state,
  mutations
}
