<template>
  <div class="no-data flex direction-column justify-content-center align-items-center">
    <i class="iconfont icon-wushuju"></i>
    <div>还没任何有笔记，<span class="create-btn" @click="toCreateNote">快速创建</span></div>
  </div>
</template>
<script>
  import constKey from '../../utils/client/const'
  export default {
    data() {
      return {
      }
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
    color: #7e8896;
    background: #faf9f9;
    .iconfont{
      font-size: 100px;
    }
    .create-btn{
      color: @highlight-color;
      cursor: pointer;
    }
  }
</style>
