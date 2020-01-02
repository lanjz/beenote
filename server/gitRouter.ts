import * as Router from 'koa-router'
import { prefixGit, prefixRow } from './controller/Git'
import { checkAuthGit } from './utils/checkAuth'

const router = new Router()
router.all('/git/*', checkAuthGit, prefixGit)
router.all('/raw/*', checkAuthGit, prefixRow)

export default router
