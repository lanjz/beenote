import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0897e516 = () => interopDefault(import('..\\pages\\articles.vue' /* webpackChunkName: "pages_articles" */))
const _68550d42 = () => interopDefault(import('..\\pages\\bookList.vue' /* webpackChunkName: "pages_bookList" */))
const _29762a61 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _555d66d9 = () => interopDefault(import('..\\pages\\schema.vue' /* webpackChunkName: "pages_schema" */))
const _5fce874a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _57a71320 = () => interopDefault(import('..\\pages\\_user\\index.vue' /* webpackChunkName: "pages__user_index" */))
const _5eea5cac = () => interopDefault(import('..\\pages\\_user\\_book\\index.vue' /* webpackChunkName: "pages__user__book_index" */))
const _7e78e236 = () => interopDefault(import('..\\pages\\_user\\_book\\index2.vue' /* webpackChunkName: "pages__user__book_index2" */))
const _518ceba9 = () => interopDefault(import('..\\pages\\_user\\_book\\_\\index.vue' /* webpackChunkName: "pages__user__book___index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/articles",
      component: _0897e516,
      name: "articles"
    }, {
      path: "/bookList",
      component: _68550d42,
      name: "bookList"
    }, {
      path: "/login",
      component: _29762a61,
      name: "login"
    }, {
      path: "/schema",
      component: _555d66d9,
      name: "schema"
    }, {
      path: "/",
      component: _5fce874a,
      name: "index"
    }, {
      path: "/:user",
      component: _57a71320,
      name: "user"
    }, {
      path: "/:user/:book",
      component: _5eea5cac,
      name: "user-book"
    }, {
      path: "/:user/:book/index2",
      component: _7e78e236,
      name: "user-book-index2"
    }, {
      path: "/:user/:book/*",
      component: _518ceba9,
      name: "user-book-all"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
