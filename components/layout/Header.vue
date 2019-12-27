<template>
  <div class="head flex" :class="{'isVisitor':isVisitor}">
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
        <!--<nuxt-link to="/default/recently/">
          最近笔记
        </nuxt-link>-->
        <nuxt-link to="/BookList">
          我的仓库
        </nuxt-link>
      </div>
      <div @click="toDoShowUserLayout" class="user-avatar-layout cursor">
        <img :src="userInfo.avatar" v-if="userInfo.avatar">
        <img v-else src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559558616664&di=8ca666131b7cbcd871c5cb179562284d&imgtype=0&src=http%3A%2F%2Fs2.sinaimg.cn%2Fmw690%2F006VYTdfzy7pano0kENd1%26690">
      </div>
    </div>
    <userLayout v-if="userLayoutStatus"></userLayout>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import userLayout from '../userInfo/index'
  export default {
    data(){
      return {
      }
    },
    components: {
      userLayout
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.loginUserInfo,
        userLayoutStatus: state => state.user.userInfoStatus,
      }),
      ...mapGetters('user', ['isVisitor']),
    },
    methods: {
      ...mapMutations('user', [MUTATIONS.CUR_USER_LAYOUT_SAVE]),
      toDoShowUserLayout() {
        const tar = this.userInfo.username ? 'info' : 'login'
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE](tar)
      }
    }
  }
</script>
<style lang="less">
  .head{
    padding: 8px;
    background: @bg-color;
    position: relative;
  }
  .head.isVisitor{
    padding: 8px 280px;
  }
  .visitor-box-header{
    position: relative;
    .head{
      background: none;
      color: @bg-color;
    }
    .logo-test{
      color: @bg-color;
    }
    .head-nav a{
      color: @bg-color;
    }
  }
  .visitor-box-header:after{
    content: '';
    height: 6px;
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    background: #f4f5f5;
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
</style>
