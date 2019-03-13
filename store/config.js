import * as MUTATIONS from './const/mutaions'

let showDir = true
let showBrief = true
if(process.client){
  showDir = window.localStorage.getItem('showDir') === '0' ? false : true
  showBrief = window.localStorage.getItem('showBrief') === '0' ? false : true
}
const state = () => (
  {
    showDir,
    showBrief
  }
)

const mutations = {
  [MUTATIONS.CONFIG_TOGGLE_SAVE] (state, { tar, val} ) {
    state[tar] = val
    const temVar = val ? '1' : '0'
    if(process.client) {
      window.localStorage.setItem(tar, temVar)
    }
  }
}

export default {
  state,
  mutations
}
