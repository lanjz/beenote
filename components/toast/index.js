import toast from './toast.js'

export default {
  install(Vue, args = {}) {
    Vue.prototype.$toast = toast
  }
}
