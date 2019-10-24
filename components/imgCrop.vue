<template>
  <div>
    <input type="file" @change="changFile" ref="inputer"/>
    <img :src="previewSrc"/>
    <div class="crop-layout"></div>
  </div>
</template>

<script>
  export default {
    data() {
      const fileReader = new FileReader()
      return {
        fileReader,
        previewSrc: ''
      }
    },
    methods: {
      changFile() {
        const inputDOM = this.$refs.inputer;
        if(!inputDOM.files.length) return
        const getFile = inputDOM.files[0];
        if(getFile.type.indexOf('image') > -1 && getFile.size > 1048576 * 5) {
          this.$alert({
            title: '上传图片失败',
            content: '图片不应大于5M'
          })
        }
        this.fileReader.readAsDataURL(inputDOM.files[0])
        this.fileReader.onload = (event) => {
          console.log('onload', inputDOM.files[0], event)
          this.previewSrc = event.target.result;
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .crop-layout{
    position: fixed;
    z-index: 12;
    width: 500px;
    height: 500px;
    background: #fff;
    border: solid 1px red;
  }
</style>
