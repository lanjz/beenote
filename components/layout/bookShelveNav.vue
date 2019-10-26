<template>
  <div class="left-layout flex">
    <div class="book-slider-layout">
      <div
        v-if="false"
        class="book-layout"
        :class="{'act':　item._id === curBook}"
        @click="todoSetCurBook(item)"
        v-for="(item, index) in bookList">
        <div>
          <svg class="icon shelve-svg-icon" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia1"></use>
          </svg>
        </div>
        <div class="book-layout-name">{{item.name}}</div>
      </div>
      <div class="tool-box">
<!--        <div
          class="book-layout">
          <div>
            <svg class="icon shelve-svg-icon" aria-hidden="true">
              <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
          </div>
          <input
            ref="inputer"
            type="file"
            class="file-input-hide"
            @change="uploadFile('inputer')"/>
        </div>-->
        <div class="book-layout"></div>
        <div
          class="book-layout">
          <div>
            <svg class="icon shelve-svg-icon" aria-hidden="true">
              <use xlink:href="#icon-tubiaozhizuomoban"></use>
            </svg>
          </div>
          <input
            ref="inputerCdn"
            type="file"
            class="file-input-hide"
            @change="uploadFile('inputerCdn')"/>
        </div>
      </div>
    </div>
    <div class="preview-img"></div>
    <imgPreBox ref="imgPreBox"></imgPreBox>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import { uploadFile } from '../../utils/client/fetch/fetch'
  import * as MUTATIONS from '../../store/const/mutaions'
  import * as ACTIONS from '../../store/const/actions'
  import bus from '../../utils/client/global/eventBus'
  import imgPreBox from '../imgPreBox'
  export default {
    computed: {
      ...mapState({
        treeChain: state => state.catalogs.treeChain,
        curBook: state => state.books.curBook,
        bookList: state => Object.values(state.books.list),
        userInfo: state => state.user.userInfo,
      }),
      ...mapGetters('books', [
        'curBookInfo'
      ]),
      ...mapGetters('user', ['isVisitor', 'githubName']),
      ...mapActions('notes', [
        ACTIONS.NOTE_PUT
      ])
    },
    components: {
      imgPreBox
    },
    methods: {
      ...mapMutations('books',[
        MUTATIONS.BOOK_CUR_UPDATE
      ]),
      goArticle() {
        this.$router.push('/')
      },
      goBook() {
        this.$router.push('/BookList')
      },
      goSchema() {
        this.$router.push('/Schema')
      },
      goTest() {
        this.$router.push('/Bar')
      },
      todoSetCurBook(item) {
        this.$router.push(`/${item.name}`)
      },
      uploadFile(tar = 'inputer') {
        const inputDOM = this.$refs[tar];
        if(!inputDOM.files.length) return
        const getFile = inputDOM.files[0];
        if(getFile.type.indexOf('image') < 0 ) {
          this.$alert({
            title: '请上传图片',
          })
          return
        }
        if(getFile.type.indexOf('image') > -1 && getFile.size > 1048576 * 5) {
          this.$alert({
            title: '上传图片失败',
            content: '图片不应大于5M'
          })
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(inputDOM.files[0])
        reader.onloadend = function (e) {
          let base64 = e.target.result;
          const str = 'base64,'
          const pre = base64.indexOf(str) + str.length
          const curDateStamp = (new Date()).getTime()
          uploadFile({
            path: `${this.githubName}/${this.curBook}/contents/static/images/${curDateStamp}_${inputDOM.files[0].name}`,
            content: base64.substring(pre)
          })
            .then(res => {
              if(res.err) {
                this.$toast({
                  title: res.err.message
                })
                return
              }
              if(!res.err) {
                this.$refs.imgPreBox.open(res.data.content.download_url)
              }
            })
        }.bind(this);
      }
    }
  }
</script>
<style lang="less" scoped>
  .book-slider-layout{
    padding: 15px;
    background: @bg-color;
  }
  .book-layout:not(:first-child) {
    margin-top: 15px;
  }
  .book-layout{
    width: 38px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 5px 0;
    transition: .2s;
    .shelve-svg-icon{
      border-radius: 50%;
      font-size: 28px;
    }
    .book-layout-name{
      text-align: center;
      color: #fff;
      height: 20px;
      line-height: 20px;
      width: 40px;
      font-size: 12px;
    }
  }
  .book-layout:hover{
    border-radius: 4px;
    box-shadow: 0 0 2px 1px #171717 inset;
  }
  .book-layout.act{
    background: @bg-second-color;
    border-radius: 4px;
    box-shadow: 0 0 3px 1px #100f0f inset;
  }
  .tool-box{
    margin-top: 20px;
    border-top: solid 1px #000;
  }
</style>
