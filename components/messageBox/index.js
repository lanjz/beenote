import messageBox from './messageBox.js'

export default {
  install(Vue, args = {}) {
    Vue.prototype.$alert = messageBox
  }
}
