import * as Router from 'koa-router'
import { prefixGit, prefixRow, fetchRowApi, fetchGitApi } from './controller/Git'
import { checkAuthGit } from './utils/checkAuth'

const router = new Router()
// 使用代理的方法请求git接口
router.all('/git/*', checkAuthGit, prefixGit())
router.all('/raw/*', checkAuthGit, prefixRow())
// 使用请求的方式获取git接口
/*router.all('/git/!*', checkAuthGit, fetchGitApi)
router.all('/raw/!*', checkAuthGit, fetchRowApi)*/

export default router
