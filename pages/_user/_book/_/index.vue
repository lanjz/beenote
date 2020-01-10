<template>
  <div class="flex" :class="{'flex-1': !isVisitor, 'visitor-content': isVisitor}">
    <div class="page-left flex" :class="{'visitor-left': isVisitor}">
      <div
        class="catalog-layout"
        :class="{'hidden-catalog': !showDir, 'catalog-layout-isVisitor': isVisitor, 'box-shadow': !isVisitor}">
        <TreeItem></TreeItem>
      </div>
      <NoteBrief
        v-if="!isVisitor"
        @emitToCreateNote="todoCreateNewFile"
        :list="curNoteList"
        @emitUpdateNote="doUpdateNote"
      ></NoteBrief>
      <div class="page-left-visitor" v-if="isVisitor"></div>
    </div>

    <div class="flex-1 flex">
      <note-des
        :curNote="curEditNote"
        @emitUpdateNote="doUpdateNote"
        v-if="!noData"
      ></note-des>
      <noNotes v-else @toCreateFile="todoCreateNewFile"></noNotes>
    </div>
   <!-- <div class="page-right" v-if="isVisitor">
      <Catalogue></Catalogue>
    </div>-->
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as MUTATIONS from '@/store/const/mutaions'
  import * as ACTIONS from '@/store/const/actions'
  import bus from '../../../../utils/client/global/eventBus'
  import TreeItem from '@/components/tree/index.vue'
  import VisitorTreeItem from '@/components/tree/tem/index.vue'
  import Catalogue from '@/components/catalogue/index.vue'
  import NoteBrief from '@/components/note/NoteBrief.vue'
  import noteDes from '@/components/note/noteDes.vue'
  import noNotes from '@/components/note/noNotes.vue'
  import constKey from '../../../../utils/client/const'
  import {returnCatalog, setTitle, findDirPath, slitSuffix} from '../../../../utils/client/blackHole'
  import { jsonToParams}  from '../../../../utils/helper'
  import fetch from '../../../../utils/client/fetch/fetch'

  export default {
    /* async asyncData ({ params }) {
       const { noteId } = params
       const result = await fetch({
         url: `/api/note/${noteId}`,
       })
 //      console.log('result', result)
       return { curNoteContent: result.data, noData: false }
     },*/
    async fetch(context) {
      const {store, params} = context
      const {user, book, pathMatch} = params
      // 如果是新建文件，直接渲染
      if(context.route.query.new){
        return
      }
      store.commit('books/BOOK_CUR_UPDATE', book)
      // 如果当前type是dir说明是访问是目录级
      if(context.route.query.type === 'dir') {
        store.commit('catalogs/CATALOGS_CUR_SAVE', `${book}/${pathMatch}`)
        return
      }
      // 如果当前文件级，取先目录
      const getDirPath = findDirPath(pathMatch)
      const fullPath = `${user}/${book}/${pathMatch}.md`
      store.commit('catalogs/CATALOGS_CUR_SAVE', `${book}/${getDirPath}`)
      store.commit('notes/NOTE_CUR_UPDATE', fullPath)
      if (store.state.notes.notesMap && store.state.notes.notesMap[fullPath]) {
        return
      }
      const fetchArr = [store.dispatch('notes/NOTE_DES_GET',{
        fullPath,
        path: pathMatch+'.md',
        user,
        repo: book
      })]
      // 如果当前只是浏览当前文件，则不需要获取目录了
      const isVisitor = store.state.user.curUserInfo.gitName !== store.state.user.loginUserInfo.gitName
      if(!context.route.query.view && !isVisitor) {
       /* fetchArr.push( store.dispatch('catalogs/CATALOGS_GET',{
          path: getDirPath,
          getChild: false,
          bookName: book
        }))*/
      }
      if(context.route.query.view) {
        store.commit('user/VIEW_STATUS_SAVE', true)
      }
      await Promise.all(fetchArr)
    },
    components: {
      TreeItem,
      NoteBrief,
      noteDes,
      noNotes,
      Catalogue,
      VisitorTreeItem
    },
    data: function () {
      return {
        noData: false,
        newFileNode: null,
        routerParams: {}
//        curEditNote: {}
      }
    },
    head() {
      const {user, book, pathMatch} = this.routerParams
      let baseKey = [pathMatch || book]
      const documentTitle = [ ...baseKey, this.curUserInfo.username ]
      let des = ''
      if(this.curEditNote.contentMD) {
        des = this.curEditNote.contentMD.slice(0, 150)
      }
      return {
        title: setTitle(documentTitle.join('-')),
        meta: [
          { hid: 'keywords', name: 'keywords', content: baseKey.join(',') },
          { hid: 'description', name: 'description', content: des }
        ]
      }

    },
    computed: {
      ...mapState({
        notesMap: state => state.notes.notesMap,
        curBook: state => state.books.curBook,
        curNote: state => state.notes.curNote,
        showDir: state => state.config.showDir,
        curCatalog: state => state.catalogs.curCatalog,
        catalogs: state => state.catalogs.list,
        catalogMapNotes: state => state.catalogs.catalogMapNotes,
        curUserInfo: state => state.user.curUserInfo,
        onlyView: state => state.user.onlyView,
      }),
      ...mapGetters('catalogs', ['treeChainList']),
      ...mapGetters('user', ['isVisitor', 'githubName']),
      curNoteList: function () {
        if (this.curCatalog && this.catalogMapNotes) {
          return this.catalogMapNotes[this.curCatalog] || []
        }
        return []
      },
      curEditNote: function () {
        if(this.newFileNode) {
          return { ...this.newFileNode }
        }
        const findNote = this.notesMap[this.curNote]
        return { ...findNote } || {}
      }
    },
    methods: {
      ...mapMutations('catalogs', [
        MUTATIONS.CATALOGS_CUR_SAVE,
        MUTATIONS.CATALOGS_CACHE_SAVE,
        MUTATIONS.CATALOGS_CUR_BLOG,
        MUTATIONS.CATALOGS_REMOVE]),
      ...mapMutations('notes', [MUTATIONS.NOTE_CUR_UPDATE,]),
      ...mapMutations('books', [MUTATIONS.BOOK_CUR_UPDATE,]),
      ...mapMutations('user', [MUTATIONS.CUR_USER_INFO_SAVE]),
      ...mapActions('books', [ACTIONS.BOOK_LIST_GET]),
      ...mapActions('notes', [
        ACTIONS.NOTES_RECENTLY_GET,
        ACTIONS.NOTES_GET,
        ACTIONS.NOTE_DES_GET
      ]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET,
        ACTIONS.CATALOGS_GET_CUR
      ]),
      ...mapActions('user', [
        ACTIONS.USER_INFO_GET
      ]),
      getPathMatch() {
        const {pathMatch = ''} = $nuxt._route.params
        const isDir = $nuxt._route.query.type === 'dir'
        let pathMatchArr = pathMatch && pathMatch.split('/')
        if(pathMatchArr.length && !isDir) {
          pathMatchArr = pathMatchArr.splice(0, pathMatchArr.length - 1)
        }
        return pathMatchArr
      },
      /**
       * 获取仓库列表和当前仓库的文件目录
       * */
      async getNoteData() {
        const {user, book, pathMatch = ''} = $nuxt._route.params
        let pathMatchArr = this.getPathMatch()
        const fetchArr = [
          this[ACTIONS.BOOK_LIST_GET](),
          this[ACTIONS.CATALOGS_GET_CUR]({pathMatchArr})
        ]
        // 如果当前是访问的文章不存在如需要获取当前文章
        if($nuxt._route.query.type !== 'dir' && !this.notesMap[this.curNote]) {
          const fullPath = `${user}/${book}/${pathMatch}`
          fetchArr.push(this[ACTIONS.NOTE_DES_GET]({
            fullPath,
            path: pathMatch+'.md',
            user,
            repo: book
          }))
        }
        this.$showLoading()
        Promise.all(fetchArr)
          .then((res) => {
            const findErr = res.find(item => item.err)
            if(findErr && findErr.err) {
              this.$alert({
                title: 'getNoteData',
                content: findErr.err.message
              })
              return
            }
            if($nuxt._route.query.type === 'dir' ) {
              // 如果带有new参数，说明当前是要新建笔记
              if($nuxt._route.query.new){
                this.todoCreateNewFile()
                // 如果当前目录下没有笔记
              } else if (!this.catalogMapNotes[this.curCatalog] || !this.catalogMapNotes[this.curCatalog].length) {
                this.noData = true
              } else {
                // 否则跳到该目录下第一篇笔记
                this.$router.push(`/${this.githubName}/${slitSuffix(this.catalogMapNotes[this.curCatalog][0].fullPath)}`)
              }
            }
          })
          .catch(err => {
            this.$alert({
              title: 'getBookData',
              content: err.message
            })
          })
          .finally(() => {
            this.$hideLoading()
          })
      },
      /**
       * 仓库新的笔记
       * */
      todoCreateNewFile() {
        this.noData = false
        this.newFileNode = {
          repo: this.curBook,
          path: this.curCatalog === this.curBook ? '' : this.curCatalog.replace(`${this.curBook}/`, ''),
          newFile: true
        }
        this[MUTATIONS.NOTE_CUR_UPDATE]('NEW')
      },
      gotoCreateNewFilePage(rootModifyPath) {
        const params = {
          type: 'dir',
          new: 1
        }
        if(rootModifyPath) {
          params.rootModifyPath = 1
        }
        this.$router.push(`/${this.githubName}/${this.curCatalog}?${jsonToParams(params)}`)
      },
      /**
       * 选择了目录
       * */
      doChooseCatalog(arg){
        if(this.catalogMapNotes[arg.fullPath] && this.catalogMapNotes[arg.fullPath].length) {
          this.$router.push(`/${this.githubName}/${slitSuffix(this.catalogMapNotes[arg.fullPath][0].fullPath)}`)
        } else {
          this.$router.push(`/${this.githubName}/${arg.fullPath}?type=dir`)
        }
        return
      },
      /**
       * @param <String> id 如果有则指定为当前id
       * */
      async doUpdateNote(arg = {}) {
        const { force } = arg
        let fetchArr = [Promise.resolve({})]
        // 如果是新增文件或修改文件，重新拉这个文件的数据
        if(arg.newFile || arg.modify) {
          fetchArr.push(
            this[ACTIONS.NOTE_DES_GET]({
              force,
              user: this.githubName,
              repo: this.curBook,
              path: arg.path, // path是包含后缀的路径
            })
          )
        }
        // 如果新增或删除，需要更新一下所在目录
        if(arg.newFile || arg.delete) {
          // 要更新的目录不一定是当前目录，优先取rootModifyPath属性
          const { rootModifyPath } = (this.catalogs[this.curCatalog] || {})
          const updatePath = rootModifyPath || this.catalogs[this.curCatalog].path || ''

          let pathMatchArr = []
          if(rootModifyPath) {
            pathMatchArr = this.getPathMatch()
            const updatePathMatchArr = updatePath.split('/')
            pathMatchArr = pathMatchArr.splice(updatePathMatchArr.length)
          }
          fetchArr.push(
            this[ACTIONS.CATALOGS_GET_CUR]({
              force,
              pathMatchArr,
              path: updatePath
            })
          )
        }
        this.$showLoading()
        const getData = await Promise.all(fetchArr)
        this.$hideLoading()
        const fineErr = getData.find(item => item.err)
        if(fineErr && fineErr.err) {
          this.$toast('重新接取数失败')
        }
        if(arg.newFile) {
          this.newFileNode = null
          // 新增的话跳到新增的文件路径
          this.$router.push(`/${this.githubName}/${this.curBook}/${slitSuffix(arg.path)}`)
        } else if(arg.delete) {
          // 判断当前删除的文件是否是当前选择的文件，如果是的话需要重新自动选个当前目录下或上级目录下的文件
          if(this.curNote.indexOf(arg.path) !== this.curNote.length - arg.path.length) {
            return
          }
          // this[MUTATIONS.CATALOGS_REMOVE]({ key: `${this.curBook}/${findDirPath(arg.path)}` })
          this[MUTATIONS.CATALOGS_CACHE_SAVE]()
          const getGoPath = this.findHasFileDir(`${this.curBook}/${findDirPath(arg.path)}`)
          this.$router.push(`/${this.githubName}/${getGoPath}?type=dir`)
        }
      },
      findHasFileDir(path){
        while(path && !(this.catalogMapNotes[path])){
          path = findDirPath(path)
        }
        return path
      },
      initEmitOn() {
        bus.$off("updateCurBooks")
        bus.$off("emitFromCatalog")
        bus.$on('emitFromCatalog', (arg) => {
          const {isNew, rootModifyPath} = arg
          if (isNew) {
            this.gotoCreateNewFilePage(rootModifyPath)
          } else {
            this.doChooseCatalog(arg)
          }
        })
        bus.$on('updateCurBooks', () => {
          this[MUTATIONS.CATALOGS_CUR_SAVE](constKey.recentlyArticlesKey)
          this.getNoteData()
        })
      },
      /**
       * 初始化函数
       * 因为文章是服务端渲染的，所以是游客模式下就不需要获取其它的数据了
       * */
      async init() {
        const { new: isNewFile, rootModifyPath} = $nuxt._route.query
        // 如果是多级目录下创建新的文件，直接执行创建文件方法，不拉取数据
        if(rootModifyPath && isNewFile) {
          this.todoCreateNewFile()
          return
        }
        this.getNoteData()
        if(this.isVisitor) return
        this.initEmitOn()
      },
      /**
       * 根据URL上的参数进行初始化配置
       * 存储当前是哪个仓库、哪个git用户、路径
       * */
      async dealParams() {
        const { type } = $nuxt._route.query
        this.routerParams = $nuxt._route.params
        const {user, book, pathMatch = ''} = $nuxt._route.params
        this[MUTATIONS.BOOK_CUR_UPDATE](book)
        this[MUTATIONS.CUR_USER_INFO_SAVE]({
          gitName: user
        })
        if(pathMatch){
          const blog = pathMatch.substring(0, Math.max(pathMatch.indexOf('/'), 0) || pathMatch.length)
          this[MUTATIONS.CATALOGS_CUR_BLOG](blog)
        }

        if(type === 'dir') {
          // 如果当前是文件夹，而直接保存当前路径
          this[MUTATIONS.CATALOGS_CUR_SAVE](`${book}/${pathMatch}`)
        } else {
          // 如果是文件，则需要获取上一层目录做为当前目录
          this[MUTATIONS.CATALOGS_CUR_SAVE](`${book}/${findDirPath(pathMatch)}`)
          // 为了保证切换用户时的唯一性，所以加上user，考虑到
          this[MUTATIONS.NOTE_CUR_UPDATE](`${user}/${book}/${pathMatch}.md`)
        }
        this.pathMatch = pathMatch
        this.init()
      }
    },
    mounted() {
      this.dealParams()
    }
  }
</script>
<style lang="less" scoped>
  .visitor-content{
    padding-top: @head-height;
  }
  .book-slider-layout {
    padding: 15px;
    background: @bg-second-color;
  }

  .book-layout {
    margin-top: 40px;
    width: 38px;
    height: 38px;
    cursor: pointer;
    position: relative;
    z-index: 1;

    .book-icon-layout {
      line-height: 38px;
      width: 100%;
      height: 100%;
      text-align: center;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;
      position: relative;
    }

    .iconfont {
      font-size: 26px;
    }

    .book-list-layout {
      max-width: 300px;
      padding: 7px 20px;
      background: @bg-second-color;
      position: absolute;
      left: 100%;
      top: 0;
      transition: .3s;
      transform: scale(0);
      transform-origin: 0 15px;

      .book-list-item-layout {
        color: #fff;
        text-align: center;

        .icon {
          width: 25px;
          height: 25px;
          line-height: 22px;
          border: solid 1px #fff;
          border-radius: 50%;

          .iconfont {
            font-size: 16px;
          }
        }

        .book-name {
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .book-list-item-layout:not(:last-child) {
        margin-bottom: 10px;
      }

      .book-list-item-layout.act {
        .icon {
          border: solid 1px @highlight-color;
          background: @highlight-color;
        }
      }
    }
  }

  .show-book-list:hover .book-list-layout {
    transform: scale(1);
  }

  .book-layout.act {
    transform: scale(1.2);

    .book-icon-layout {
      background: @highlight-color;

      .iconfont {
        color: #fff;
      }
    }
  }

  .book-layout:not(:last-child) {
    margin-bottom: 10px;
  }

  .catalog-layout {
    padding: 15px 2px;
    overflow: auto;
    background: @bg-color;
    color: @tree-color;
    width: 200px;
    max-width: 200px;
    transition: .3s;
    position: relative;
    height: 100%;
  }
  .catalog-layout-isVisitor{
    position: fixed;
    left: 0;
    width: 280px;
    max-width: 280px;
    top: @head-height;
    bottom: 0;
    background: #fff;
    color: #777;
    border-right: solid 1px #e9e7e7;
    z-index: 2;
  }
  .hidden-catalog {
    padding: 15px 0;
    max-width: 0;
    overflow: hidden;
  }

  .page-left-visitor{
    width: 280px;
  }
  .page-right{
    width: 280px;
  }
  .visitor-left{
    padding-right: 6px;
  }
</style>
