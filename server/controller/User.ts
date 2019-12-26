import { Context } from 'koa'
import BaseCtl from './BaseCtl'
import {dealError, decodeLoginTypeJwt, encodeLoginTypeJwt} from '../utils/hello'
import UserModel from '../model/User'
class UserCtl extends (BaseCtl as { new(): any; }) {
  constructor(){
    super()
    this.userAuth = this.userAuth.bind(this)
    this.login = this.login.bind(this)
    this.findByCookie = this.findByCookie.bind(this)
  }
  /**
   * @POST：'/login' 登录验证
   * */
  getModel() {
    return new UserModel()
  }
  dbQuery() {
    return {}
  }
  userAuth(id) {
    return this.Model.findById({ id })
  }
  setUserCookie(ctx, result) {
    const userTokenInfo = { clientUser: result._id, }
    ctx.cookies.set(
      'helloToken',
      encodeLoginTypeJwt(userTokenInfo),
      {
        path: '/'
      }
    )
  }
  clearUserCookie(ctx: Context) {
    ctx.cookies.set('helloToken','',{signed:false,maxAge:0})
  }
  async login(ctx, next) {
    const { username, password } = ctx.request.body
    if(!username) {
      ctx.send(2, '', '用户名不能为空')
      return
    }
    if(!password) {
      ctx.send(2, '', '密码不能为空')
      return
    }
    try {
      const result = await this.Model.findOne({ username, password })
      if(!result) {
        ctx.send(3, '', '登录失败：账号或密码错误')
      } else {
        this.setUserCookie(ctx, result)
        ctx.send(1, result, '登录成功')
      }
    } catch (e) {
      ctx.send(2, '', dealError(e))
    } finally {
      next()
    }
  }
  async doAfterAdd(ctx, next, result) {
    const infoResult = await this.Model.findById({ id: result._id })
    this.setUserCookie(ctx, infoResult)
    ctx.send(1, infoResult, '')
  }
  async findByCookie(ctx, next) {
    console.log('getUserInfo')
    if(ctx.state.curUser && ctx.state.curUser._id) {
      ctx.send(1, ctx.state.curUser, '')
    } else {
      ctx.send(1, {
        userId: '未登录'
      }, '')
    }
    await next()
  }
  async getUserInfoInSerer(ctx) {
    const { token } = ctx.request.query
    console.log('clientUser', token)
    const { clientUser } = decodeLoginTypeJwt(token)
    const result = await this.userAuth(clientUser)
    ctx.send(1, result, '')
  }
}

const userCtl = new UserCtl()

export default userCtl
