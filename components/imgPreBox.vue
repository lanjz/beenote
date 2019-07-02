<template>
  <div class="hello-message-box-bg" v-if="showBox">
    <div class="hello-message-box">
      <div class="hello-content">
        <div class="hello-des flex flex-all-center">
          <img :src="imgUrl">
        </div>
        <div>
          <div>
            <!--<div class="readonly-input">地址：{{imgUrl}}点击复制</div>-->
            <textarea :value="imgUrl" class="readonly-input" readonly ref="preInput" />
            <textarea :value="'![avatar]('+imgUrl+')'" class="readonly-input" readonly ref="preInputMarkDown" />
          </div>
        </div>
      </div>
      <div class="showUrl" v-if="showUrl">
        <div class="item">{{imgUrl}}</div>
        <div class="item">![avatar]({{imgUrl}})</div>
      </div>
      <div class="hello-btn-operate">
        <div class="hello-btn confirm" @click="toCopy('preInput')">复制地址</div>
        <div class="hello-btn confirm" @click="toCopy('preInputMarkDown')">复制MarkDown</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        imgUrl: '',
        showBox: false,
        showUrl: false
      }
    },
    methods: {
      cancel(arg) {
        // this.callback(arg)
      },
      open(url){
        this.imgUrl = url
        this.showBox = true
      },
      toCopy(tar) {
        const inputDOM = this.$refs[tar];
        inputDOM.select();
        try{
          //进行复制到剪切板
          if(document.execCommand("Copy","false",null)){
            //如果复制成功
            this.$toast({
              title: '复制成功'
            })
          }else{
            //如果复制失败
            this.$toast({
              title: '复制失败'
            })
          }
          setTimeout(() => {
            this.showBox = false
          }, 1500)

        }catch(err){
          //如果报错
          this.$toast({
            title: '复制错误'
          })
          this.showUrl = true
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="less">
  .hello-message-box-bg{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .1);
    left: 0;
    top: 0;
    z-index: 10;
  }
  .hello-message-box{
    position: absolute;
    left: 50%;
    top:50%;
    background: #fff;
    border-radius: 8px;
    transform: translate(-50%,-50%);
    width: 500px;
    box-shadow: 0 0 3px 1px #c7c7c7;
    color: #333;
  }
  .hello-message-box .hello-title{
    text-align: center;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 5px;
  }
  .hello-content{
    padding: 15px;
    text-align: center;
  }
  .hello-des{
    word-break: break-all;
    img{
      max-width: 300px;
      max-height: 200px;
    }
  }

  .hello-btn-operate{
    text-align: right;
    display: flex;
    border-top: solid 1px #c7c7c7;
  }
  .hello-btn-operate .hello-btn{
    flex: 1;
    text-align: center;
    padding: 10px 0;
    cursor: pointer;
    font-size: 17px;
  }
  .hello-btn-operate .confirm{
    color: dodgerblue;
  }
  .hello-btn-operate .hello-btn.cancel{
  }
  .hello-btn:not(:last-child) {
    border-right: solid 1px #c7c7c7;
  }
  textarea.readonly-input{
    opacity: 0;
    height: 0;
  }
  div.readonly-input{
    word-break: break-all;
    font-size: 18px;
    width: 80%;
    margin: 0 auto;
    color: @highlight-color;
  }
  .showUrl{
    width: 80%;
    margin: 0 auto;
    color: @highlight-color;
    .item{
      margin-bottom: 10px;
    }
  }
</style>
<style lang="less">
  .hello-message-box-bg{
    img{
      max-width: 200px;
      max-height: 500px;
    }
  }
</style>
