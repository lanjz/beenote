<template>
  <div class="user-layout" v-if="userLayoutStatus" v-click-outside="toDoCloseUserLayout">
    <!--<imgCrop></imgCrop>-->
    <div class="avatar-layout flex-all-center" v-if="userLayoutStatus==='reg' || userLayoutStatus==='login'"><span><span>Black</span><br/> Hook -N</span></div>
    <div class="avatar-layout flex-all-center" v-else>
      <img src="http://s2.sinaimg.cn/mw690/006VYTdfzy7pano0kENd1&690" />
    </div>

    <infoView v-if="userLayoutStatus==='info'"></infoView>
    <login v-if="userLayoutStatus==='login'"></login>
    <modify v-if="userLayoutStatus==='reg' || userLayoutStatus==='modify'"></modify>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as ACTIONS from '../../store/const/actions'
  import * as MUTATIONS from '../../store/const/mutaions'
  import imgCrop from './../imgCrop'
  import login from './login'
  import infoView from './infoView'
  import modify from './modify'
	export default {
		name: "user-layout",
    data(){
      return {
        user: {
          username: '',
          email: '',
          sex: 1
        },
        edit: false
      }
    },
    components: {
      imgCrop,
      login,
      infoView,
      modify
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo,
        userLayoutStatus: state => state.user.userInfoStatus,
      }),
    },
    methods: {
      ...mapMutations('user', [MUTATIONS.CUR_USER_LAYOUT_SAVE]),
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
      },
      toDoCloseUserLayout() {
        this[MUTATIONS.CUR_USER_LAYOUT_SAVE]()
      }
    }
	}
</script>

<style lang="less">
  .user-layout{
    .avatar-layout{
      margin: 80px auto 60px auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      color: @bg-panel-color;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .form-group{
      margin-top: 40px;
    }
  }

</style>
<style scoped lang="less">
  .user-layout{
    position: fixed;
    width: 500px;
    height: 100%;
    right: 0;
    top: 0;
    background: #fff;
    z-index: 10;
    box-shadow: 1px 1px 5px #7f828b;
    overflow-y: auto;
    padding-bottom: 20px;
  .submit-layout{
    margin-top: 50px;
    padding-left: 100px;
  }
  }
  .user-layout .avatar-layout{
    background: @bg-color;
    /*margin: 60px auto 40px auto;*/
  }
</style>
