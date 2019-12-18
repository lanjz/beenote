<template>
  <div class="flex flex-1 direction-column">
    <div class="flex-1 form-bg bg-fff">
      <div class="form-layout">
        <div class="register-layout"  v-if="userLayoutStatus==='reg'">
          <div class="form-group flex">
            <div class="form-label-layout">
              用户名：
            </div>
            <div class="flex flex-1 align-items-center">
              <input class="form-input" v-model.trim="username"/>
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
          <div class="form-group flex">
            <div class="form-label-layout">
              确认密码：
            </div>
            <div class="flex flex-1 align-items-center">
              <input class="form-input" type="password" v-model.trim="rePassword"/>
            </div>
          </div>
        </div>
        <div class="form-group flex">
          <div class="form-label-layout">
            昵称：
          </div>
          <div class="flex flex-1 align-items-center">
            <input class="form-input" v-model.trim="nickname"/>
          </div>
        </div>
        <div class="form-group flex">
          <div class="form-label-layout">
            Github-Token：
          </div>
          <div class="flex flex-1 align-items-center">
            <input class="form-input" v-model.trim="gitToken"/>
          </div>
        </div>
        <!--radios默认值-->
        <div class="form-group flex">
          <div class="form-label-layout">
            性别：
          </div>
          <div class="flex flex-1 align-items-center">
            <div
              class="add-options-item radio-style"
              :class="{'act':sex === 1}"
            >
              <input type="radio" class="form-radio" :value=1 v-model="sex">男
            </div>
            <div
              class="add-options-item radio-style"
              :class="{'act':sex === 2}"
            >
              <input type="radio" class="form-radio" :value=2  v-model="sex">女
            </div>
          </div>
        </div>
        <div class="form-group submit-layout" v-if="userLayoutStatus==='reg'">
          <div class="btn" @click.stop="todoRegister">保存</div>
          <div class="btn second-btn" @click.stop="doReset" >重置</div>
        </div>
        <div class="form-group submit-layout" v-else>
          <div class="btn" @click="doEdit">提交</div>
        </div>

        <div class="show-err" v-show="errMsg">{{errMsg}}</div>
      </div>
    </div>
    <div class="other-label" @click="gotoLogin" v-if="userLayoutStatus==='reg'">前往登录>></div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as ACTIONS from '../../store/const/actions'
  import * as MUTATIONS from '../../store/const/mutaions'
  const defaultData = {
    nickname: '',
    email: '',
    username: '',
    password: '',
    rePassword: '',
    sex: 1,
    avatar: '',
  }
  export default {
    data(){
      return {
        ...defaultData,
        errMsg: ''
      }
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.loginUserInfo,
        userLayoutStatus: state => state.user.userInfoStatus,
      }),
    },
    methods: {
      ...mapMutations('user', [MUTATIONS.CUR_USER_LAYOUT_SAVE]),
      ...mapActions('user', [ACTIONS.USER_POST, ACTIONS.USER_PUT]),
      todoRegister() {
        if(!this.username){
          this.errMsg = '用户名不能为空'
          return
        }
        if(!this.nickname){
          this.errMsg ='昵称不能为空'
          return
        }
        if(!this.password){
          this.errMsg = '密码不能为空'
          return
        }
        if(this.password !== this.rePassword){
          this.errMsg = '再次密码输入不一致'
          return
        }
        this.doRegister()
      },
      async doRegister() {
        const data = {}
        Object.keys(defaultData).forEach(item => {
          data[item] = this[item]
        })
        this.$showLoading()
        const result = await this[ACTIONS.USER_POST](data)
        this.$hideLoading()
        if(!result.err){
          this.toDoCloseUserLayout()
          this.$toast({
            title: '注册成功'
          })
        } else {
          this.$toast({
            title: result.err.message
          })
        }
      },
      doReset() {
        Object.keys(defaultData).forEach(item => {
          this[item] = defaultData[item]
        })
      },
      initData() {
        this.gitToken = this.userInfo.gitToken
        this.nickname = this.userInfo.nickname
      },
      toDoCloseUserLayout() {
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE]()
      },
      gotoLogin() {
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE]('login')
      },
      todoEdit() {
        this.nickname = this.userInfo.nickname
        this.email = this.userInfo.email
        this.sex = this.userInfo.sex
      },
      async doEdit() {
        this.$showLoading()
        const data = {
          nickname: this.nickname,
          gitToken: this.gitToken,
          sex: this.sex
        }
        this[ACTIONS.USER_PUT](data)
          .then(res => {
            this.$toast({
              title: '修改成功'
            })
           this.toDoCloseUserLayout()
          })
          .catch((err) => {
            this.$toast({
              title: err.message
            })
            this.edit = false
          })
          .finally(() => {
            this.$hideLoading()

          })
      },
    },
    mounted() {
      if(this.userLayoutStatus==='reg') {
        this.doReset()
      } else {
        this.doReset()
        this.initData()
      }
    }
  }
</script>

<style scoped lang="less">
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
  .user-layout .form-group{
    margin-top: 30px;
  }
  .other-label{
    position: absolute;
    z-index: 1;
    right: 40px;
    top: 20px;
    color: @highlight-color;
    cursor: pointer;
  }
  .submit-layout{
    padding-left: 100px;
  }
  .show-err{
    color: @warn-color;
    text-align: right;
    padding-right: 50px;
  }
</style>
