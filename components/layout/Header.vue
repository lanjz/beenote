<template>
  <div class="head flex">
<!--    <div class="logo">
      Black Hook - N
      <i class="iconfont icon-biji"></i>
      &lt;!&ndash;<img src="../../assets/imgs/small-LOGO.png">&ndash;&gt;
    </div>-->
    <div class="logo-test">
      <small>Black<br/>Hook </small> <big>- N</big>
    </div>
    <div class="flex flex-1 align-items-center justify-content-end">
      <div class="head-nav flex">
        <nuxt-link to="/default/recently/">
          最近笔记
        </nuxt-link>
        <nuxt-link to="/BookList">
          本子
        </nuxt-link>
      </div>
      <router-link to="/login" class="user-avatar-layout">
        <img :src="userInfo.avatar" v-if="userInfo.avatar">
      </router-link>
    </div>
    <div class="user-layout" v-if="showUserEdit">
      <!--<imgCrop></imgCrop>-->
      <div class="avatar-layout">
        <img src="http://s2.sinaimg.cn/mw690/006VYTdfzy7pano0kENd1&690" />
      </div>
      <div v-if="!edit" class="pre-info">
        <div><span class="username">{{userInfo.username}}</span><span>（{{userInfo.email}}）</span></div>
        <div class="todo-edit-layout" @click="todoEdit">
          <i class="iconfont icon-biji1"></i>
        </div>
      </div>
      <div class="flex flex-1 direction-column" v-else>
        <div class="flex-1 form-bg bg-fff">
          <div class="form-layout">
            <div class="form-group flex">
              <div class="form-label-layout">
                别名：
              </div>
              <div class="flex flex-1 align-items-center">
                <input class="form-input" v-model="user.username"/>
              </div>
            </div>
            <div class="form-group flex">
              <div class="form-label-layout">
                性别：
              </div>
              <div class="flex flex-1 align-items-center">
                <div class="radio-style" :class="{'act': user.sex === 1 }">
                  <input type="radio" class="form-radio" :value="1" v-model="user.sex"> 男
                </div>
                <div class="radio-style" :class="{'act': user.sex === 2}">
                  <input type="radio" class="form-radio" :value="2" v-model="user.sex"> 女
                </div>
              </div>
            </div>
            <div class="form-group flex">
              <div class="form-label-layout">
                邮箱：
              </div>
              <div class="flex flex-1 align-items-center">
                <input class="form-input" v-model="user.email"/>
              </div>
            </div>
            <div class="form-group submit-layout">
              <div class="btn" @click="doEdit">提交</div>
              <div class="btn second-btn" @click="cancelEdit">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as ACTIONS from '../../store/const/actions'
  import imgCrop from '../imgCrop'
  export default {
    data(){
      return {
        showUserEdit: false,
        user: {
          username: '',
          email: '',
          sex: 1
        },
        edit: false
      }
    },
    components: {
      imgCrop
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      ...mapGetters('user', ['isVisitor']),
    },
    methods: {
      ...mapActions('user', [ACTIONS.USER_PUT]),
      todoEdit() {
        this.user = {
          username: this.userInfo.username,
          email: this.userInfo.email,
          sex: this.userInfo.sex
        }
        this.edit = true
      },
      cancelEdit() {
        this.edit = false
      },
      async doEdit() {
        this.$showLoading()
        this[ACTIONS.USER_PUT](this.user)
          .then(res => {
            this.$toast({
              title: '修改成功'
            })
            this.edit = false
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
      }
    }
  }
</script>
<style lang="less" scoped>
  .head{
    padding: 15px;
    background: @bg-color;
    position: relative;

  }
  .logo{
    position: absolute;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    left: 10px;
    top: 10px;
    color: #fff;
    img{
      height: 65px;
    }
  }
  .head-nav{
    a{
      color: #fff;
      padding: 0 10px;
      text-decoration: none;
    }
    .nuxt-link-active{
      color: @highlight-color;
      text-decoration: underline;
    }
    border-right: solid 1px @border-color;
    margin-right: 20px;
  }
  .user-avatar-layout{
    width: 28px;
    height: 28px;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .icon-biji{
    font-size: 35px;
    color: #fff;
  }

  .logo-test{
    color: #fff;
    small{
      font-size: 15px;
      display: inline-block;
    }
  }
  .user-layout{
    position: fixed;
    width: 500px;
    height: 100%;
    right: 0;
    top: 0;
    background: #fff;
    z-index: 10;
    box-shadow: 1px 1px 5px #7f828b;
    .avatar-layout{
      text-align: center;
      margin: 50px auto 30px auto;
      img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .submit-layout{
      margin-top: 50px;
      padding-left: 100px;
    }
  }
  .pre-info{
    text-align: center;
    .username{
      color: @highlight-color;
      font-size: 20px;
    }
  }
  .todo-edit-layout{
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    i{
      font-size: 35px;
      border-radius: 50%;
      display: inline-block;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: @bg-color;
      color: #fff;
      cursor: pointer;
    }
  }
  .form-group{
    margin-top: 40px;
  }
</style>
