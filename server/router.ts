import * as Router from 'koa-router'
import BaseCtl from './controller/BaseCtl'
import userCtl from './controller/User'
import bookCtl from './controller/Book'
import noteCtl from './controller/Notes'
import catalogCtl from './controller/Catalog'

/*
const schematasCtl = require('./controller/SchematasCtl.js')
const articleCtl = require('./controller/Article.js')
*/

const baseCtl = new BaseCtl()
const router = new Router({ prefix: '/api' })

router.post('/csrf', function (ctx) {
  console.log('csrf-post', ctx.state)
})
router.get('/csrf', function (ctx) {
  console.log('method', ctx.request.method)
  console.log('csrf-get', ctx.state)
})

router.post('/uploadImg', baseCtl.uploadImg)
router.post('/uploadImgCdn', baseCtl.uploadImgCdn)

router.post('/login', userCtl.login)

router.get('/users', userCtl.find)
router.get('/user/:id', userCtl.findById)
router.delete('/user', userCtl.deleteById)
router.delete('/users', userCtl.deleteByIds)
router.put('/user', userCtl.modify)
router.post('/user', userCtl.add)
router.get('/getUserInfo', userCtl.findByCookie)
router.get('/getUserInfoInSerer', userCtl.getUserInfoInSerer.bind(userCtl))


router.get('/books', bookCtl.find)
router.get('/book/:id', bookCtl.findById)
router.delete('/book/:id', bookCtl.deleteById)
router.put('/book', bookCtl.modify)
router.post('/book', bookCtl.add)

router.get('/notes', noteCtl.find)
router.get('/note/:id', noteCtl.findById)
router.get('/notes/:id', noteCtl.findNotesById)
/**
 * 使用del不能使用delete
 * 不能使用像post那样使用body参数，要不然取不到参数，也不懂为啥
 * */
router.del('/note/:id', noteCtl.deleteById)
router.delete('/notes', noteCtl.deleteByIds)
router.put('/note', noteCtl.modify)
router.post('/note', noteCtl.add)
router.get('/recently_notes', noteCtl.findRecentNotes)

router.get('/catalogs', catalogCtl.find)
router.get('/catalog/:id', catalogCtl.findById)
router.delete('/catalog/:id', catalogCtl.deleteById)
router.put('/catalog', catalogCtl.modify)
router.post('/catalog', catalogCtl.add)

router.get('/favicon.ico', async function (ctx, next) {
  ctx.send(1, 1, '')
  await next()
})

router.get('/', async function (ctx, next) {
  console.log('未后期')
  ctx.send(1, 1, '')
  await next()
})

export default router
