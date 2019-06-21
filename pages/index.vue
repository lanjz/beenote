<template>
  <div class="flex flex-1 no-data flex direction-column justify-content-center align-items-center">
    <i class="iconfont icon-jingdian"></i>
    <div>从左侧选择你的书架</div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../store/const/mutaions'
  import * as ACTIONS from '../store/const/actions'
  import bus from '../utils/global/eventBus'
  import TreeItem from '../components/tree/index.vue'
  import NoteBrief from '../components/note/NoteBrief.vue'
  import noteDes from '../components/note/noteDes.vue'
  import articleFixed from '../components/article/articleFixed.vue'
  import constKey from '../utils/const'

  export default {
    components: {
      TreeItem,
      NoteBrief,
      noteDes,
      articleFixed
    },
    data: function () {
      return {
        createToCatalogId: ''
      }
    },
    computed: {
      ...mapState({
        schemaList: state => state.schema.list,
        noteList: state => state.notes.list,
        curBook: state => state.books.curBook,
        curNote: state => state.notes.curNote,
        showDir: state => state.config.showDir,
        curCatalog: state => state.catalogs.curCatalog
      }),
      ...mapGetters('catalogs',['treeChainList']),
      curNoteList: function () {
        if(this.curCatalog && this.noteList && this.curBook){
          return this.noteList[this.curBook+'_'+this.curCatalog] || []
        }
        return []
      },
      curEditNote: function () {
        const findNote = this.curNoteList.find(item => item._id === this.curNote)
        if(!findNote) {
          return {
            _id: 'new'
          }
        }
        return findNote
      }
    },
    methods: {
      ...mapMutations('catalogs',[MUTATIONS.CATALOGS_CUR_SAVE,]),
      ...mapMutations('notes',[MUTATIONS.NOTE_CUR_UPDATE,]),
      ...mapActions('books',[ACTIONS.BOOK_LIST_GET]),
      ...mapActions('notes', [
        ACTIONS.NOTES_RECENTLY_GET,
        ACTIONS.NOTES_GET,
      ]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET,
      ]),
      /**
       * 初始化的时候，获取note列表 最近文章
       * */
      async getNoteData() {
        Promise.all([
          this[ACTIONS.BOOK_LIST_GET](),
          this[ACTIONS.CATALOGS_GET]({
            parentId: 'root',
            bookId: this.curBook
          })
        ])
          .then(() => {
            this[ACTIONS.NOTES_RECENTLY_GET]()
          })
          .catch(err => {
            console.log('err', err)
            this.$alert({
              title: 'getBookData',
              content: err.message
            })
          })
      },
      /**
       *  获取文章详情 设置编辑内容 editId设为articleId
       *  如果是创建笔记，则_id为new
       *  @param <Object> arg
       *  */
      async chooseCurNote(arg) {
        this[MUTATIONS.NOTE_CUR_UPDATE](arg._id)
      },
      toCreateNote(arg) {
        this.createToCatalogId = arg.catalogId
        this.chooseCurNote({
          _id: 'new'
        })
      },
      /**
       * @param <String> id 如果有则指定为当前id
       * */
      async doUpdateNote(arg = {}) {
        const { id, force } = arg
        if(this.curCatalog === constKey.recentlyArticlesKey) {
          await this[ACTIONS.NOTES_RECENTLY_GET]({ force })
        } else {
          await this[ACTIONS.NOTES_GET]({
            force
          })
        }

        if(id) {
          this.chooseCurNote({
            _id: id
          })
        }
      },
      async init() {
        this.getNoteData()
        /**
         * @params <Object> arg 包含schemaId字段id和当前articleId(如果是添加则为'new')
         * */
        bus.$on('emitToCreateArticle', (arg) => {
          this.toCreateNote(arg)
        })
        bus.$on('emitFromCatalog', (arg) => {
          const { isNew } = arg
          if(isNew) {
            this.toCreateNote({
              catalogId: arg.catalogId
            })
          } else {
            this.doUpdateNote(arg)
          }
        })
        bus.$on('updateCurBooks', () => {
          this[MUTATIONS.CATALOGS_CUR_SAVE](constKey.recentlyArticlesKey)
          this.getNoteData()
        })
      },
    },
    mounted() {
      this[ACTIONS.BOOK_LIST_GET]()
    }
  }
</script>
<style lang="less" scoped>
  .book-slider-layout{
    padding: 15px;
    background: @bg-second-color;
  }
  .book-layout{
    margin-top: 40px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    .book-icon-layout{
      line-height: 38px;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;
      position: relative;
    }
    .iconfont{
      font-size: 26px;
    }
    .book-list-layout{
      max-width: 300px;
      padding:7px 20px;
      background: @bg-second-color;
      position: absolute;
      left: 100%;
      top: 0;
      transition: .3s;
      transform: scale(0);
      transform-origin: 0 15px;
      .book-list-item-layout{
        color: #fff;
        text-align: center;
        .icon{
          width: 25px;
          height: 25px;
          line-height: 22px;
          border: solid 1px #fff;
          border-radius: 50%;
          .iconfont{
            font-size: 16px;
          }
        }
        .book-name{
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .book-list-item-layout:not(:last-child) {
        margin-bottom: 10px;
      }
      .book-list-item-layout.act{
        .icon{
          border:solid 1px @highlight-color;
          background: @highlight-color;
        }
      }
    }
  }

  .show-book-list:hover  .book-list-layout{
    transform: scale(1);
  }
  .book-layout.act{
    transform: scale(1.2);
    .book-icon-layout{
      background: @highlight-color;
      .iconfont{
        color: #fff;
      }
    }
  }
  .book-layout:not(:last-child) {
    margin-bottom: 10px;
  }
  .catalog-layout{
    padding: 15px 2px;
    overflow: auto;
    background: @tree-bg-color;
    color: @tree-color;
    width: 200px;
    max-width: 200px;
    transition: .3s ;
  }
  .hidden-catalog{
    padding: 15px 0;
    max-width: 0;
    overflow: hidden;
  }
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
