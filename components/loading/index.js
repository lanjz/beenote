import loading from './loading.js'

export default {
  install(Vue, args = {}) {
    Vue.prototype.$showLoading = loading.show
    Vue.prototype.$hideLoading = loading.hide
  }
}
