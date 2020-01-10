<template>
  <div class="no-data">
    <i class="iconfont icon-wushuju"></i>
    <div v-if="!isVisitor">还没任何有{{name}}，<span class="create-btn" @click="toCreateNote">快速创建</span></div>
    <div v-else>当前还没有任何{{name}}</div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import constKey from '../../utils/client/const'
  export default {
    props: {
      name: {
        default() {
          return '笔记'
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters('user', ['isVisitor']),
    },
    methods: {
      toCreateNote(arg) {
        this.$emit('toCreateFile')
      },
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .no-data{
    flex: 1;
    font-size: 20px;
    padding: 20px;
    text-align: center;
    color: #7e8896;
    padding-top: 25%;
    .iconfont{
      font-size: 100px;
    }
    .create-btn{
      color: @highlight-color;
      cursor: pointer;
    }
  }
</style>
