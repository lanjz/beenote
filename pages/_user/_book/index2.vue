<template>
  <div>
    <div class="book-list-layout">
      <div
        v-for="(item, index) in dirList"
        :key="item.sha"
        class="book-item-layout"
        @click.stop="gotoCatalog(item)"
      >
        <div class="delete-icon book-item-delete" v-if="item._id !== 'default'" @click.stop="todoDeleteBook(item)"></div>
        <div>
          <svg class="icon book-iconfont" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia1"></use>
          </svg>
        </div>
        {{item.name}}(文件)
        <div class="book-item-layout-edit">
          <div class="book-item-layout-in-edit" @click.stop="todoEditBook(item)">编辑</div>
        </div>
      </div>
      <div
        v-for="(item, index) in fileList"
        :key="item.sha"
        class="book-item-layout"
        @click.stop="gotoFile(item)"
      >
        <div class="delete-icon book-item-delete" v-if="item._id !== 'default'" @click.stop="todoDeleteBook(item)"></div>
        <div>
          <svg class="icon book-iconfont" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia1"></use>
          </svg>
        </div>
        {{item.name}}
        <div class="book-item-layout-edit">
          <div class="book-item-layout-in-edit" @click.stop="todoEditBook(item)">编辑</div>
        </div>
      </div>
      <div class="book-item-layout" style="padding-top: 25px">
        <div class="book-item-layout-add" @click="todoAddBook"></div>
        <div>
          <svg class="icon book-iconfont" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia1"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="modal-mark-bg" v-if="showModal">
      <div class="modal-layout">
        <div class="modal-title">{{curId? '编辑':'添加'}} <div class="modal-title-close" @click="doCloseModal"></div></div>
        <div class="form-bg bg-fff">
          <div class="form-layout">
            <div class="form-group flex">
              <div class="form-label-layout">
                名称：
              </div>
              <div class="flex flex-1 align-items-center">
                <input class="form-input" v-model.strim="editBookName">
              </div>
            </div>
            <div class="form-group flex">
              <div class="form-label-layout">
                公开：
              </div>
              <div class="flex flex-1 align-items-center">
                <div class="switch-layout" :class="{'act': isPrivate}">
                  <input type="checkbox" class="form-radio" v-model="isPrivate"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-operate">
          <div class="btn" :class="{'disable-btn': disableBtn}" @click="doSaveBook">确定</div>
          <div class="btn second-btn" @click="doCloseModal">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../../../store/const/mutaions'
  import * as ACTIONS from '../../../store/const/actions'
  import {returnCatalog, setTitle, findDirPath, slitSuffix} from '../../../utils/client/blackHole'

  export default {
    data(){
      return {
        editBookName: '',
        showModal: false,
        curId: '',
        isPrivate: 0,
        originData: ''
      }
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalogs.list,
        catalogMapNotes: state => state.catalogs.catalogMapNotes,
        curBook: state => state.books.curBook
      }),
      ...mapGetters('user', ['isVisitor', 'githubName']),
      dirList() {
        if(!this.catalogs || !this.catalogs[this.curBook]) {
          return []
        }
        return this.catalogs[this.curBook].childNodes
      },
      fileList() {
        if(!this.catalogMapNotes || !this.catalogMapNotes[this.curBook]) {
          return []
        }
        return this.catalogMapNotes[this.curBook]
      }
    },
    methods: {
      ...mapMutations('books', [MUTATIONS.BOOK_CUR_UPDATE,]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET
      ]),
      async init() {
        this.$showLoading()
        const result = await this[ACTIONS.CATALOGS_GET]({ getChild: false})
        if(result.err){
          this.$toast({
            title: result.err.message
          })
        }
        this.$hideLoading()
      },
      dealParams() {
        const { user, book } = $nuxt._route.params
        this[MUTATIONS.BOOK_CUR_UPDATE](book)
        this.init()
      },
      gotoCatalog(item) {
        this.$router.push(`/${this.githubName}/${item.fullPath}?type=dir`)
      },
      gotoFile(item) {
        this.$router.push(`/${this.githubName}/${slitSuffix(item.fullPath)}`)
      },
      todoDeleteBook(item) {
        console.log('todoDeleteBook', item)
      },
      todoEditBook(item) {
        console.log('todoEditBook', item)
      },
      todoAddBook(item) {
        console.log('todoAddBook', item)
      },
      doCloseModal(item) {
        console.log('doCloseModal', item)
      },
      doCloseModal(item) {
        console.log('doCloseModal', item)
      },
      doSaveBook(item) {
        console.log('doSaveBook', item)
      }
    },
    mounted() {
      this.dealParams()
    }
  }
</script>
<style scoped lang="less">
  .book-list-layout{
    padding: 20px;
  }
  .book-item-layout{
    padding: 10px;
    border-radius: 5px;
    border: solid 1px @border-color;
    display: inline-block;
    margin-right: 20px;
    text-align: center;
    font-size: 17px;
    position: relative;
    vertical-align: top;
    height: 110px;
    margin-bottom: 20px;
    .book-item-layout-edit{
      position: absolute;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      bottom: 0;
      left: 0;
      cursor: pointer;
      overflow: hidden;
      .book-item-layout-in-edit{
        height: 100%;
        background: rgba(0,0,0,0.5);
        color: #fff;
        transform: translateY(100%);
        transition: .2s;
      }
    }
  }
  .book-item-layout.act{
    border:solid 1px @highlight-color;
  }
  .book-item-layout:hover .book-item-layout-in-edit{
    transform: translateY(0);
  }
  .book-item-layout:hover .book-item-delete{
    display: block;
  }
  .book-iconfont{
    font-size: 60px;
  }
  .book-item-delete{
    right: -5px;
    top: -5px;
    position: absolute;
    display: none
  }
  .book-item-layout-add{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.3);
    color: #fff;
    padding-top: 25px;
    cursor: pointer;
  }
  .book-item-layout-add:after{
    content: '';
    position: absolute;
    width: 50px;
    height: 4px;
    background: #fff;
    top: 50%;
    left: 50%;
    border-radius: 2px;
    transform: translate(-50%, -50%);
  }
  .book-item-layout-add:before{
    content: '';
    position: absolute;
    width: 4px;
    height: 50px;
    background: #fff;
    top: 50%;
    left: 50%;
    border-radius: 2px;
    transform: translate(-50%, -50%);
  }
</style>
