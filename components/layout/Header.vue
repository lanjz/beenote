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
        <img :src="userName.avatar" v-if="userName.avatar">
      </router-link>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetter, mapMutations, mapActions } from 'vuex'
  export default {
    computed:{
      ...mapState({
        isVisitor: state => state.user.isVisitor,
        userName: state => state.user.userInfo
      })
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
</style>
