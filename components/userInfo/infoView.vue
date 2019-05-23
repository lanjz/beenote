<template>
 <div v-show="userInfo.username">
   <div v-if="userLayoutStatus==='info'" class="pre-info">
     <div><span class="username">{{userInfo.username}}</span><span>（{{userInfo.email}}）</span></div>
     <div class="todo-edit-layout" @click="todoEdit">
       <i class="iconfont icon-biji1"></i>
     </div>
   </div>
 </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as ACTIONS from '../../store/const/actions'
  import * as MUTATIONS from '../../store/const/mutaions'
  export default {
    name: "info-view",
    data(){
      return {
      }
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo,
        userLayoutStatus: state => state.user.userInfoStatus,
      }),
    },
    methods: {
      ...mapMutations('user', [MUTATIONS.CUR_USER_LAYOUT_SAVE]),
      todoEdit() {
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE]('modify')
      }
    }
  }
</script>

<style scoped lang="less">
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
</style>
