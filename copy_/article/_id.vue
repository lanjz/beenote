<template>
  <div class="flex flex-1">
    <articles
      :editMeta="editMeta"
      v-show="editMeta.editId"
      @emitUpdateArticle="doUpdateArticle"
    ></articles>
    <articleFixed></articleFixed>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import * as ACTIONS from '../../store/const/actions'
  import bus from '../../util/global/eventBus'
  import TreeItem from '../../components/tree/index.vue'
  import ArticleBrief from '../../components/article/ArticleBrief.vue'
  import articles from '../../components/article/article.vue'
  import articleFixed from '../../components/article/articleFixed.vue'
  import constKey from '../../util/const'

  export default {
    components: {
      TreeItem,
      ArticleBrief,
      articles,
      articleFixed
    },
    data: function () {
      return {
        editMeta: {
          editId: ''
        },
        curArticleList: [],
        cusArticle: ''
      }
    },
    computed: {
      ...mapState({
        schemaList: state => state.schema.list,
        articleList: state => state.articles.catalogMapArticles,
        curBook: state => state.books.curBook,
        articles: state => state.articles.list,
        showDir: state => state.config.showDir,
      }),
      ...mapGetters('catalogs',['treeChainList']),
    },
    methods: {
      ...mapMutations('catalogs',[MUTATIONS.CATALOGS_CUR_SAVE,]),
      ...mapActions('books',[ACTIONS.BOOK_LIST_GET]),
      ...mapActions('schema', [ACTIONS.SCHEMA_LIST_GET]),
      ...mapActions('articles', [
        ACTIONS.ARTICLE_RECENTLY_LIST_GET,
        ACTIONS.ARTICLE_LIST_GET,
        ACTIONS.ARTICLE_DES_GET,
      ]),
      /**
       * 初始化的时候，获取book列表 字段 最近文章
       * 最近文章加载完后，显示预览列表和显示第一篇文章
       * */
      async getBookData() {
        Promise.all([this[ACTIONS.BOOK_LIST_GET](), this[ACTIONS.SCHEMA_LIST_GET]()])
          .then(() => {
            this[ACTIONS.ARTICLE_RECENTLY_LIST_GET]()
              .then(() => {
                this.doShowArticleFromCatalog({
                  catalogId: constKey.recentlyArticlesKey
                })
              })
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
       *  @param <String> catalogId
       *  @param <String> schemaId
       *  @param <String> articleId
       *  */
      async chooseCurArticle(arg) {
        const { catalogId, schemaId, articleId, contentId = '' } = arg
        this.cusArticle = articleId
        this.$router.push(`/article/${articleId}`)
        this.setEditMeta(catalogId, schemaId, articleId, contentId)
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
       * @param <String> catalogId
       * @param <String> articleId
       * @param <String> contentId 如果有则指定用哪个article的content内容作为编辑内容
       * */
      async doUpdateArticle(arg) {
        const { catalogId, articleId, contentId = '', schemaId, getData = '' } = arg
        if(getData === 'getArticleByCatalogId') {
          await this.getArticleByCatalogId(catalogId)
        }
        await this.getData(articleId, true)
        this.chooseCurArticle({
          catalogId,
          schemaId,
          articleId: articleId,
          contentId
        })
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
       * @param <String> editId || articleId
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
        if(!getSchema) {
          this.$alert({
            title: `schemaId:${schemaId}缺少fields`
          })
        }
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
      /*    if(!this.articles[editId]) {
            await this.getData(editId)
          }*/
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
          console.log('11')
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
        console.log('getList', getList)
        this.curArticleList = [ ...getList ]
      },

      async init() {
        const { articleId } = this.$route.params
        const getArticle = this.articles[articleId] ?
          this.articles[articleId] :
          await this.getData(articleId)
        const {catalogId, schemaId} = getArticle
        const contentId = (getArticle.contents&&getArticle.contents.length) ?
          getArticle.contents[0]._id :
          ''
        this.setEditMeta(catalogId, schemaId, articleId, contentId)
        // this.setEditMeta(catalogId, schemaId, articleId, contentId)
      },
    },
    mounted() {
      this.init()
    }
  }
</script>
