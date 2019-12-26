<template>
  <div class="flex flex-1 direction-column" v-if="userLayoutStatus==='login'">
    <div class="flex-1 form-bg bg-fff">
      <div class="login-cue">还没登录喔~</div>
      <div class="form-layout">
        <div class="form-group flex">
          <div class="form-label-layout">
            用户名：
          </div>
          <div class="flex flex-1 align-items-center">
            <input class="form-input" v-model="username"/>
          </div>
        </div>
        <div class="form-group flex">
          <div class="form-label-layout">
            密码：
          </div>
          <div class="flex flex-1 align-items-center">
            <input class="form-input" type="password" v-model.trim="password"/>
          </div>
        </div>
        <div class="form-group submit-layout">
          <div class="login-btn" @click="todoLogin">登录</div>
          <div class="go-reg-btn" @click="todoGet">前往注册</div>
          <br/>
        </div>
        <div class="show-err" v-show="errMsg">{{errMsg}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as ACTIONS from '../../store/const/actions'
  import * as MUTATIONS from '../../store/const/mutaions'
  export default {
    data(){
      return {
        username: '',
        password: '',
        errMsg: '',
      }
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo,
        userLayoutStatus: state => state.user.userInfoStatus,
      }),
    },
    methods: {
      ...mapMutations('user', [MUTATIONS.CUR_USER_LAYOUT_SAVE, MUTATIONS.CUR_USER_INFO_SAVE]),
      ...mapActions('user', [ACTIONS.LOGIN_POST,]),
      async todoLogin() {
        if(!this.username){
          this.errMsg = '用户名不能为空'
          return
        }
        if(!this.password){
          this.errMsg = '密码不能为空'
          return
        }
        this.$showLoading()
        const result = await this[ACTIONS.LOGIN_POST]({
          username: this.username,
          password: this.password
        })
        this.$hideLoading()
        if(!result.err){
          // window.location.reload()
          // this[MUTATIONS.CUR_USER_INFO_SAVE]({_id: ''})
          this.toDoCloseUserLayout()
        } else {
          this.$toast({
            title: result.err.message
          })
        }
      },
      toDoCloseUserLayout() {
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE]()
      },
      todoGet() {
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE]('reg')
      }
    }
  }
</script>

<style scoped lang="less">
  .avatar-layout{
    background: @bg-color;
  }
  .login-btn{
    width: 200px;
    line-height: 40px;
    color: #fff;
    background: @highlight-color;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 2px;
    display: inline-block;
    margin-left: 100px;
  }
  .go-reg-btn{
    display: inline-block;
    color: @tree-color;
    position: relative;
    top: 10px;
    margin-left: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
  .login-cue{
    color: @highlight-color;
    text-align: center;
  }
  .show-err{
    color: @warn-color;
    text-align: right;
    padding-right: 50px;
  }
</style>
