<template>
  <div class="flex flex-1">
    <div class="catalog-layout box-shadow" :class="{'hidden-catalog': !showDir}">
      <TreeItem></TreeItem>
    </div>
    <NoteBrief
      @emitToChooseCurNote="chooseCurNote"
      @emitToCreateNote="toCreateNote"
      :list="curNoteList"
      :cusArticle="cusArticle"
      @emitUpdateNote="doUpdateNote"
      @emitInitArticle="doShowArticleFromCatalog"
    ></NoteBrief>
    <note-des
      :curNote="curEditNote"
      :createToCatalogId="createToCatalogId"
      @emitUpdateNote="doUpdateNote"
    ></note-des>
    <articleFixed></articleFixed>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../store/const/mutaions'
  import * as ACTIONS from '../store/const/actions'
  import bus from '../util/global/eventBus'
  import TreeItem from '../components/tree/index.vue'
  import NoteBrief from '../components/note/NoteBrief.vue'
  import noteDes from '../components/note/noteDes.vue'
  import articleFixed from '../components/article/articleFixed.vue'
  import constKey from '../util/const'

  export default {
    components: {
      TreeItem,
      NoteBrief,
      noteDes,
      articleFixed
    },
    data: function () {
      return {
        editMeta: {
          editId: ''
        },
        curArticleList: [],
        cusArticle: '',
        createToCatalogId: ''
//        curNote: {}
      }
    },
    computed: {
      ...mapState({
        schemaList: state => state.schema.list,
        articleList: state => state.articles.catalogMapArticles,
        noteList: state => state.notes.list,
        curBook: state => state.books.curBook,
        curNote: state => state.notes.curNote,
        articles: state => state.articles.list,
        showDir: state => state.config.showDir,
        curCatalog: state => state.catalogs.curCatalog
      }),
      ...mapGetters('catalogs',['treeChainList']),
      curNoteList: function () {
        console.log('', this.curCatalog, this.noteList)
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
      ...mapActions('schema', [ACTIONS.SCHEMA_LIST_GET]),
      ...mapActions('articles', [
        ACTIONS.ARTICLE_RECENTLY_LIST_GET,
        ACTIONS.ARTICLE_LIST_GET,
        ACTIONS.ARTICLE_DES_GET,
      ]),
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
       * 创建新文章时， editId设为new
       * */
      async doCreateArticle(arg) {
        const { catalogId, schemaId } = arg
        await this.getArticleByCatalogId(catalogId)
        this.setEditMeta(catalogId, schemaId, 'new')
      },
      /**
       * @param <String> id 如果有则指定为当前id
       * */
      async doUpdateNote(arg = {}) {
        const { id } = arg
        console.log(1111, this.curCatalog)
        if(this.curCatalog === constKey.recentlyArticlesKey) {
          await this[ACTIONS.NOTES_RECENTLY_GET]({force: true})
        } else {
          await this[ACTIONS.NOTES_GET]({
            force: true
          })
        }

        if(id) {
          this.chooseCurNote({
            _id: id
          })
        }
      },
      /**
       * 根据catalogs和articleId获取文章
       * @param <String> catalogs
       * @param <String> articleId
       * @param <String> contentId 如果有，则用当前内容做为编辑对象
       * */
      async doShowArticleFromCatalog(arg) {
        const { catalogId, articleId, contentId = '' } = arg
        await this.getArticleByCatalogId(catalogId)
        if(this.curArticleList && this.curArticleList.length) {
          const { catalogId, schemaId } = this.curArticleList[0]
          this.chooseCurArticle({
            catalogId,
            schemaId,
            articleId: articleId || this.curArticleList[0]._id,
            contentId
          })
        }
      },
      /**
       * 设置editEeta的值
       * @param <String> catalogId
       * @param <String> catalogId
       * @param <String> editId
       * @param <String> contentId
       * */
      async setEditMeta(catalogId, schemaId, editId, contentId) {
        if(!schemaId) {
          this.$alert({
            title: '缺少schemaId',
            showCancel: false
          })
        }
        const { MOCK } = process.env
        const getSchema = (editId !== 'new' && MOCK) ? Object.values(this.schemaList)[0] : this.schemaList[schemaId]
/*        if(!getSchema) {
          this.$alert({
            title: `schemaId:${schemaId}缺少fields`
          })
        }*/
        const { fields } = getSchema
        const { tempObj, editTitle, list } = await this.initContent(editId, fields, contentId)
        const temEditMeta = {
          ...getSchema,
          catalogId,
          editId: editId,
          list,
          content: JSON.parse(JSON.stringify(tempObj)),
          title: editTitle
        }
        const validEditMetaResult = this.validEditMata(temEditMeta)
        if(validEditMetaResult) {
          this.$alert({
            title: 'editMeta的内容有错',
            content: validEditMetaResult
          })
          return
        }
        this.editMeta = temEditMeta

        this.cusArticle = editId
      },
      /**
       * 初始化编辑时的content内容
       * @param <String> editId
       * @param <Object> fields
       * @param <String> contentId
       * @return <Object> tempObj <String> editTitle
       * */
      async initContent(editId, fields, contentId) {
        const { MOCK } = process.env
        let tempObj = {}
        let editTitle = '未命名'
        let showList = false
        if(editId === 'new') {
          if(fields && fields.length) {
            fields.forEach((item) => {
              if(MOCK && item.type === 'select') {
                tempObj[item._id] = []
              } else {
                tempObj [item._id] = item.default ? item.default : ''
              }
            })
          }
        } else {
          if(!this.articles[editId]) {
            await this.getData(editId)
          }
          editTitle =  this.articles[editId].title
          showList =  this.articles[editId].list
          if(this.articles[editId].contents && this.articles[editId].contents.length){
            if(!contentId) {
              tempObj = this.articles[editId].contents[0]
            } else {
              tempObj = this.articles[editId].contents.find(item => item._id === contentId)
            }
          }
        }
        return { tempObj, editTitle, list: showList}
      },
      /**
       * 验证editMata是否有效
       * <String> editId noNull
       * <Object>fields noNull,
       * <String>_id noNull,
       * <String>catalogId noNull,
       * <String>title,
       * <Object>content
       * */
      validEditMata(data) {
        const { editId, fields, _id, catalogId, title } = data
        if(!editId) {
          return 'editId不能为空'
        } else if(!title) {
          return 'title不能为空'
        }
        if(!Object.keys(fields).length) {
          return `fields无效:${JSON.stringify(fields)}`
        }
        if(!_id) {
          return '_id(article)不能为空'
        }
        if(!catalogId) {
          return 'catalogId不能为空'
        }
        return null
      },
      /**
       * 获取具体的文章详情
       * */
      async getData(id, force = false) {
        this.editId = id
        this.$showLoading()
        const result = await this[ACTIONS.ARTICLE_DES_GET]({
          _id: id,
          force
        })
        this.$hideLoading()
      },
      /* *
       * 根据catalogId获取文章列表
       * 如果Id是‘recently’ 则是获取最近编辑文章
        * */
      async getArticleByCatalogId(catalogId) {
        if(catalogId === constKey.recentlyArticlesKey){
          this.setArticleBrief()
          return
        }
        if(!this.curBook){
          this.$alert({
            content: '缺少bookId',
            showCancel: false
          })
          return
        }
        this.$showLoading()
        const result = await this[ACTIONS.ARTICLE_LIST_GET]({
          bookId: this.curBook,
          catalogId: catalogId
        })
        this.setArticleBrief()
        this.$hideLoading()
        return result
      },
      /**
       * 根据当前catalog获取对应文章列表
       * */
      setArticleBrief() {
        if (!Object.keys(this.articleList).length) {
          this.curArticleList = []
          this.editMeta.editId = ''
          return
        }
        // 获取当前是在编辑哪个catalog
        const curCatalog = this.treeChainList[this.treeChainList.length - 1]
        const key = curCatalog === constKey.recentlyArticlesKey ?
          constKey.recentlyArticlesKey :
          `${this.curBook}_${curCatalog}`
        const getList = this.articleList[key]
        if (!getList) {
          this.curArticleList = []
          this.editMeta.editId = ''
          return
        }
        this.curArticleList = [ ...getList ]
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
      this.init()
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
</style>
