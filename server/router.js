const Router = require('koa-router')
const userCtl = require('./controller/User.js')
const bookCtl = require('./controller/Book.js')
const schematasCtl = require('./controller/SchematasCtl.js')
const catalogCtl = require('./controller/Catalog.js')
const articleCtl = require('./controller/Article.js')
const noteCtl = require('./controller/Notes.js')
const BaseCtl = require('./controller/BaseCtl.js')
const baseCtl = new BaseCtl()
const router = new Router({ prefix: '/api' })

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

router.get('/notes', noteCtl.find)
router.get('/note/:id', noteCtl.findById)
router.get('/notes/:id', noteCtl.findNotesById)
router.delete('/note', noteCtl.deleteById)
router.delete('/notes', noteCtl.deleteByIds)
router.put('/note', noteCtl.modify)
router.post('/note', noteCtl.add)
router.get('/recently_notes', noteCtl.findRecentNotes)

router.get('/books', bookCtl.find)
router.get('/book/:id', bookCtl.findById)
router.delete('/book', bookCtl.deleteById)
router.put('/book', bookCtl.modify)
router.post('/book', bookCtl.add)

router.get('/schematas', schematasCtl.find)
router.get('/schemata/:id', schematasCtl.findById)
router.delete('/schemata', schematasCtl.deleteById)
router.put('/schemata', schematasCtl.modify)
router.post('/schemata', schematasCtl.add)
router.post('/schemataField', schematasCtl.addField)
router.put('/schemataField', schematasCtl.modifyField)
router.delete('/schemataField', schematasCtl.delField)
router.get('/catalogs', catalogCtl.find)
router.get('/catalog/:id', catalogCtl.findById)
router.delete('/catalog', catalogCtl.deleteById)
router.put('/catalog', catalogCtl.modify)
router.post('/catalog', catalogCtl.add)

// router.get('/copy', articleCtl.copy)
router.get('/articles', articleCtl.find)
router.get('/article/:id', articleCtl.findById)
router.delete('/article', articleCtl.deleteById)
router.put('/article', articleCtl.modify)
router.post('/article', articleCtl.add)
router.post('/article_content', articleCtl.addContent)
router.put('/article_content', articleCtl.modifyContent)
router.delete('/article_content', articleCtl.delContent)
router.get('/article_content', articleCtl.findContent)
router.get('/recently_articles', articleCtl.findRecentContent)
router.get('/favicon.ico', async function (ctx, next) {
  ctx.send(1, 1, '')
  await next()
})
router.get('/', async function (ctx, next) {
  console.log('未后期')
  ctx.send(1, 1, '')
  await next()
})



router.get('/qa', async (ctx, next) => {
  ctx.body = 'Hello World2222!'
})
router.get('/qa/:id', async (ctx, next) => {
  ctx.body = 'Hello World2222!'
})
router.delete('/qa', async (ctx, next) => {
  ctx.body = 'Hello World2222!'
})
router.put('/qa/:id', async (ctx, next) => {
  ctx.body = 'Hello World2222!'
})
router.post('/qa', async (ctx, next) => {
  ctx.body = 'Hello World2222!'
})

module.exports =  router
