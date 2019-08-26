import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0897e516 = () => interopDefault(import('..\\pages\\articles.vue' /* webpackChunkName: "pages_articles" */))
const _68550d42 = () => interopDefault(import('..\\pages\\bookList.vue' /* webpackChunkName: "pages_bookList" */))
const _29762a61 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _555d66d9 = () => interopDefault(import('..\\pages\\schema.vue' /* webpackChunkName: "pages_schema" */))
const _5fce874a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _71f50327 = () => interopDefault(import('..\\pages\\_bookId\\index.vue' /* webpackChunkName: "pages__bookId_index" */))
const _4d7f9372 = () => interopDefault(import('..\\pages\\_bookId\\_catalogId\\index.vue' /* webpackChunkName: "pages__bookId__catalogId_index" */))
const _3637e596 = () => interopDefault(import('..\\pages\\_bookId\\_catalogId\\_noteId\\index.vue' /* webpackChunkName: "pages__bookId__catalogId__noteId_index" */))

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
      path: "/:bookId",
      component: _71f50327,
      name: "bookId"
    }, {
      path: "/:bookId/:catalogId",
      component: _4d7f9372,
      name: "bookId-catalogId"
    }, {
      path: "/:bookId/:catalogId/:noteId",
      component: _3637e596,
      name: "bookId-catalogId-noteId"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
