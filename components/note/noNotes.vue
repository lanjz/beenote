<template>
  <div class="no-data flex direction-column justify-content-center align-items-center">
    <i class="iconfont icon-wushuju"></i>
    <div>还没任何有笔记，<span class="create-btn" @click="toCreateNote">快速创建</span></div>
  </div>
</template>
<script>
  export default {
    methods: {
      toCreateNote(arg) {
        const {bookId, catalogId} = $nuxt._route.params
        this.$router.push(`/${bookId}/${catalogId}/new`)
      },
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
