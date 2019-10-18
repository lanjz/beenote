import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0897e516 = () => interopDefault(import('..\\pages\\articles.vue' /* webpackChunkName: "pages_articles" */))
const _68550d42 = () => interopDefault(import('..\\pages\\bookList.vue' /* webpackChunkName: "pages_bookList" */))
const _29762a61 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _555d66d9 = () => interopDefault(import('..\\pages\\schema.vue' /* webpackChunkName: "pages_schema" */))
const _5fce874a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
const _4029c542 = () => interopDefault(import('..\\pages\\_book\\index.vue' /* webpackChunkName: "pages__book_index" */))
const _19eb08a8 = () => interopDefault(import('..\\pages\\_book\\_catalog\\index.vue' /* webpackChunkName: "pages__book__catalog_index" */))
const _4a5ded20 = () => interopDefault(import('..\\pages\\_book\\_catalog\\_noteId\\index.vue' /* webpackChunkName: "pages__book__catalog__noteId_index" */))

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
      path: "/:book",
      component: _4029c542,
      name: "book"
    }, {
      path: "/:book/:catalog",
      component: _19eb08a8,
      name: "book-catalog"
    }, {
      path: "/:book/:catalog/:noteId",
      component: _4a5ded20,
      name: "book-catalog-noteId"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
