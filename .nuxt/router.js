import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6fdf3330 = () => interopDefault(import('../pages/bookList.vue' /* webpackChunkName: "pages/bookList" */))
const _8566fc10 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _35da6eae = () => interopDefault(import('../pages/resume.vue' /* webpackChunkName: "pages/resume" */))
const _3c520222 = () => interopDefault(import('../pages/schema.vue' /* webpackChunkName: "pages/schema" */))
const _18b6423e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _08fc867c = () => interopDefault(import('../pages/_user/index.vue' /* webpackChunkName: "pages/_user/index" */))
const _764e4f75 = () => interopDefault(import('../pages/_user/_book/index.vue' /* webpackChunkName: "pages/_user/_book/index" */))
const _5393488d = () => interopDefault(import('../pages/_user/_book/index2.vue' /* webpackChunkName: "pages/_user/_book/index2" */))
const _15dd59f6 = () => interopDefault(import('../pages/_user/_book/_/index.vue' /* webpackChunkName: "pages/_user/_book/_/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/bookList",
      component: _6fdf3330,
      name: "bookList"
    }, {
      path: "/login",
      component: _8566fc10,
      name: "login"
    }, {
      path: "/resume",
      component: _35da6eae,
      name: "resume"
    }, {
      path: "/schema",
      component: _3c520222,
      name: "schema"
    }, {
      path: "/",
      component: _18b6423e,
      name: "index"
    }, {
      path: "/:user",
      component: _08fc867c,
      name: "user"
    }, {
      path: "/:user/:book",
      component: _764e4f75,
      name: "user-book"
    }, {
      path: "/:user/:book/index2",
      component: _5393488d,
      name: "user-book-index2"
    }, {
      path: "/:user/:book/*",
      component: _15dd59f6,
      name: "user-book-all"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
