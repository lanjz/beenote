<template>
  <div class="flex flex-1">
    <div class="catalog-layout box-shadow" :class="{'hidden-catalog': !showDir}" v-if="!isVisitor">
      <TreeItem></TreeItem>
    </div>
    <NoteBrief
      @emitToCreateNote="toCreateNote"
      :list="curNoteList"
      @emitUpdateNote="doUpdateNote"
    ></NoteBrief>
    <note-des
      :curNote="curEditNote"
      :createToCatalogId="createToCatalogId"
      @emitUpdateNote="doUpdateNote"
      :curNoteContent="curNoteContent"
      v-if="!noData"
    ></note-des>
    <noNotes v-else></noNotes>
    <articleFixed v-if="!isVisitor"></articleFixed>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as MUTATIONS from '@/store/const/mutaions'
  import * as ACTIONS from '@/store/const/actions'
  import bus from '../../../../utils/client/global/eventBus'
  import TreeItem from '@/components/tree/index.vue'
  import NoteBrief from '@/components/note/NoteBrief.vue'
  import noteDes from '@/components/note/noteDes.vue'
  import noNotes from '@/components/note/noNotes.vue'
  import articleFixed from '@/components/article/articleFixed.vue'
  import constKey from '../../../../utils/client/const'
  import {returnCatalog, setTitle} from '../../../../utils/client/blackHole'
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
    async fetch({store, params}) {
      console.log('fetch2')
      const {noteId, book, catalog} = params
      store.commit('books/BOOK_CUR_UPDATE', book)
      store.commit('catalogs/CATALOGS_CUR_SAVE', catalog)
      store.commit('notes/NOTE_CUR_UPDATE', noteId)
      if (store.state.notes.list[`${book}_${catalog}`]) {
        return
      }
      // const result = await store.dispatch('catalogs/CATALOGS_GET')
      /*
    const { extend } = result.data
    if(extend && extend.user) {
      store.commit('user/CUR_USER_INFO_SAVE', extend.user)
    }
    if(extend && extend.books) {
      store.commit('books/BOOK_LIST_SAVE', {
        data: extend.books,
        start: 0
      })
    }
    if(extend && extend.catalogMap){
      store.commit('config/CONFIG_EXTEND_SAVE', {
        tar: 'catalogMap',
        val: extend.catalogMap
      })
    }*/
    },
    components: {
      TreeItem,
      NoteBrief,
      noteDes,
      articleFixed,
      bookId: '',
      catalogId: '',
      noteId: '',
      noNotes
    },
    data: function () {
      return {
        createToCatalogId: '',
        noData: false,
        curNoteContent: {}
//        curEditNote: {}
      }
    },
    head() {
      /*      let baseKey = [this.curEditNote.title]
            if(this.pageExtend.catalogMap) {
              baseKey = [...baseKey, this.pageExtend.catalogMap]
            }
            const documentTitle = [ ...baseKey, this.curUserInfo.username ]
            let des = ''
            if(this.curEditNote.content) {
              des = this.curEditNote.content.slice(0, 150)
            }
            return {
              title: setTitle(documentTitle.join('-')),
              meta: [
                { hid: 'keywords', name: 'keywords', content: baseKey.join(',') },
                { hid: 'description', name: 'description', content: des }
              ]
            }*/

    },
    computed: {
      ...mapState({
        schemaList: state => state.schema.list,
        noteList: state => state.notes.list,
        notesMap: state => state.notes.notesMap,
        curBook: state => state.books.curBook,
        curNote: state => state.notes.curNote,
        showDir: state => state.config.showDir,
        curCatalog: state => state.catalogs.curCatalog,
        catalogMapNotes: state => state.catalogs.catalogMapNotes,
        curUserInfo: state => state.user.curUserInfo,
        pageExtend: state => state.config.extend,
      }),
      ...mapGetters('catalogs', ['treeChainList']),
      ...mapGetters('user', ['isVisitor']),
      curNoteList: function () {
        if (this.curCatalog && this.catalogMapNotes) {
          return this.catalogMapNotes[this.curCatalog] || []
        }
        return []
      },
      curEditNote: function () {
        const findNote = this.notesMap[this.curNote]
        if (!findNote) {
          return {
            _id: 'new'
          }
        }
        return findNote
      }
    },
    methods: {
      ...mapMutations('catalogs', [MUTATIONS.CATALOGS_CUR_SAVE,]),
      ...mapMutations('notes', [MUTATIONS.NOTE_CUR_UPDATE,]),
      ...mapMutations('books', [MUTATIONS.BOOK_CUR_UPDATE,]),
      ...mapActions('books', [ACTIONS.BOOK_LIST_GET]),
      ...mapActions('notes', [
        ACTIONS.NOTES_RECENTLY_GET,
        ACTIONS.NOTES_GET,
        ACTIONS.NOTE_DES_GET
      ]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET,
      ]),
      ...mapActions('user', [
        ACTIONS.USER_INFO_GET
      ]),
      /**
       * 初始化的时候，获取note列表 最近文章
       * */
      /*      async getNoteData() {
              const getCatalogsData = this.catalogId === constKey.recentlyArticlesKey ?
                this[ACTIONS.NOTES_RECENTLY_GET]() : this[ACTIONS.NOTES_GET]()
              Promise.all([
                getCatalogsData,
                this[ACTIONS.BOOK_LIST_GET](),
                this[ACTIONS.CATALOGS_GET]()
              ])
                .then((res) => {
                  const data = res[0].data.list
                  if (data.length && !this.noteId) {
                    this.$router.push(`/${this.bookId}/${this.catalogId}/${data[0]._id}`)
                  } else {
                    if (!this.noteId) {
                      this.noData = true
                    }
                  }
                  // this[ACTIONS.NOTES_RECENTLY_GET]()
                })
                .catch(err => {
                  this.$alert({
                    title: 'getBookData',
                    content: err.message
                  })
                })
            },*/
      /**
       * 初始化的时候，获取note列表 最近文章
       * */
      async getNoteData() {
        const getCatalogsData = this.catalogId === constKey.recentlyArticlesKey ?
          this[ACTIONS.NOTES_RECENTLY_GET]() : this[ACTIONS.NOTES_GET]()
        Promise.all([
          getCatalogsData,
          this[ACTIONS.BOOK_LIST_GET](),
          this[ACTIONS.CATALOGS_GET]()
        ])
          .then((res) => {
            const data = res[0].data.list
            if (data.length && !this.noteId) {
              this.$router.push(`/${this.bookId}/${this.catalogId}/${data[0]._id}`)
            } else {
              if (!this.noteId) {
                this.noData = true
              }
            }
            if (this.noteId) {
              this.$nextTick(() => {
                const getBriefItem = document.getElementById(this.noteId)
                const getBriefBox = document.getElementById('article-item-box')
                if (getBriefItem && getBriefBox) {
                  const totalH = getBriefItem.offsetTop + getBriefItem.clientHeight
                  const dis = totalH - getBriefBox.clientHeight
                  if (dis) {
                    getBriefBox.scrollTop = dis * 2
                  }
                }
              })

            }
            // this[ACTIONS.NOTES_RECENTLY_GET]()
          })
          .catch(err => {
            this.$alert({
              title: 'getBookData',
              content: err.message
            })
          })
      },
      toCreateNote(arg) {
        this.$router.push(`/${this.curBook}/${returnCatalog(arg.catalogId)}/new`)
      },
      /**
       * @param <String> id 如果有则指定为当前id
       * */
      async doUpdateNote(arg = {}) {
        const {id, force, catalogId} = arg
        let getData = ''
        if (this.curCatalog === constKey.recentlyArticlesKey) {
          getData = await this[ACTIONS.NOTES_RECENTLY_GET]({force})
        } else {
          getData = await this[ACTIONS.NOTES_GET]({
            force
          })
        }
        let cusNodeId = id
        if (getData.data.list.length && !cusNodeId) {
          cusNodeId = getData.data.list[0]._id
        }

        this.$router.push(`/${this.curBook}/${returnCatalog(catalogId || this.curCatalog)}/${cusNodeId || ''}`)
      },
      initEmitOn() {
        /**
         * @params <Object> arg 包含schemaId字段id和当前articleId(如果是添加则为'new')
         * */
        bus.$off("emitToCreateArticle")
        bus.$off("updateCurBooks")
        bus.$off("emitFromCatalog")

        bus.$on('emitToCreateArticle', (arg) => {
          this.toCreateNote(arg)
        })
        bus.$on('emitFromCatalog', (arg) => {
          const {isNew} = arg
          if (isNew) {
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
      async init() {
        // await this[ACTIONS.USER_INFO_GET]()
        if (this.isVisitor && this.noteId) return
        this[MUTATIONS.BOOK_CUR_UPDATE](this.book)
        this[MUTATIONS.CATALOGS_CUR_SAVE](this.catalog)
        // this.getNoteData()
        // this.initEmitOn()
      },
      async dealParams() {
        const {user, book, pathMatch} = $nuxt._route.params
        this.book = book
        // this.catalog = catalog
        this.noteId = pathMatch
        this.pathMatch = pathMatch
        // this.createToCatalog = catalog
        this[ACTIONS.CATALOGS_GET]()
        const fullPath = `${user}/${book}/master/${pathMatch}.md`
        this[ACTIONS.NOTE_DES_GET]({
          fullPath,
          path: pathMatch,
          user,
          repo: book
        })
        this[MUTATIONS.NOTE_CUR_UPDATE](fullPath)
        this.init()
      }
    },
    mounted() {
      console.log('this', this)
      this.dealParams()
    }
  }
</script>
<style lang="less" scoped>
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
  }

  .hidden-catalog {
    padding: 15px 0;
    max-width: 0;
    overflow: hidden;
  }

</style>
