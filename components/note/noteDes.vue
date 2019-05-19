<template>
  <div class="article-layout flex direction-column flex-1 markdown">
    <div class="article-title flex ">
      <div class="flex-1 schema-title-layout relative">
        <input class="full-input" v-model.trim="articleName" @blur="todoEdit(false)" v-if="!isVisitor"/>
        <div class="full-input" v-else>{{articleName}}</div>
      </div>
      <div class="schema-operate" v-if="!isVisitor">
        <span class="schema-operate-btn"
              :class="{'disable-btn': !true}"
              v-show="curNote._id==='new'"
              @click="todoSave">保存</span>
      </div>
    </div>
    <div class="flex-1 flex">
      <div
        @click="isEditContents = true"
        v-click-outside="toDoPutNote"
        @keydown.ctrl.83.exact.prevent="toDoPutNote"
        class="article-content relative flex-1 flex"
        :class="{'noSave': dataHasChange}"
      >
        <!--<div class="noSave" v-show="dataHasChange"></div>-->
        <div class="flex-1 relative">
          <div class="form-layout theme-1">
            <markdown-edit v-model="content" :onlyView="isVisitor"></markdown-edit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import * as ACTIONS from '../../store/const/actions'
  import MarkdownEdit from '../markdownEdit.vue'

  export default {
    props: {
      curNote: {
        type: Object,
      },
      createToCatalogId: {
        type: String
      },
      curNoteContent: {
        type: Object
      }
    },
    data: function () {
      console.log('this.curNoteContent', this.curNoteContent)
      const { title = '未命名', content = '' } = this.curNoteContent || {}
      return {
        articleName: title,
        cacheName: title,
        content,
        editId: 'new',
        schemaId: '',
        catalogId: '',
        test: '123',
        fields: [],
        contentList: [],
        cacheContent: '',
        isEditContents: false,
        showList: false,
        showEditContent: false
      }
    },
    components: {
      MarkdownEdit,
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalogs.list,
        bookList: state => state.books.list,
        articles: state => state.articles.list,
      }),
      ...mapGetters('user', ['isVisitor']),
      dataHasChange() {
        return JSON.stringify(this.content) !== JSON.stringify(this.cacheContent)
      }
    },
    watch: {
      curNote: {
        handler: function (val) {
          this.setContent(val)
        },
        immediate: true
      },
      editId: function (val) {
        this[MUTATIONS.ARTICLE_CUS_SAVE](val)
      }
    },
    methods: {
      ...mapMutations('articles', [
        MUTATIONS.ARTICLE_CUS_SAVE,
      ]),
      ...mapMutations('books', [
        MUTATIONS.BOOK_CUR_UPDATE
      ]),
      ...mapActions('articles', [
        ACTIONS.ARTICLE_DES_GET,
        ACTIONS.ARTICLE_POST,
        ACTIONS.ARTICLE_PUT,
        ACTIONS.ARTICLE_CONTENT_PUT,
        ACTIONS.ARTICLE_CONTENT_POST,
        ACTIONS.ARTICLE_CONTENT_DELETE
      ]),
      ...mapActions('notes', [
        ACTIONS.NOTE_POST,
        ACTIONS.NOTE_PUT,
        ACTIONS.NOTE_DELETE,
      ]),
      setContent(val = {}) {
        if (!val._id) {
          this.$alert({
            title: 'setContent',
            content: 'val值不正确'
          })
          return
        }
        this.cacheContent = this.content = val.content || ''
        this.cacheName = this.articleName = val.title || '未命名'
      },
      async todoEdit(force = false) {
        if (!force) {
          if (
            this.curNote._id === 'new' ||
            !this.articleName ||
            this.cacheName === this.articleName
          ) {
            return
          }
        }
        this.doPutNote()
      },
      async todoSave() {
        if (!this.articleName) return
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_POST]({
          content: this.content,
          title: this.articleName,
          catalogId: this.createToCatalogId
        })
        if (!result.err) {
          this.$toast({
            title: '添加成功'
          })
          const id = result.data.id
          this.$emit('emitUpdateNote', {
            id,
            force: true
          })
        }
        this.$hideLoading()
      },
      async getData(id, force = false) {
        this.editId = id
        this.$showLoading()
        const result = await this[ACTIONS.ARTICLE_DES_GET]({
          _id: id,
          force
        })
        if (!result.err) {
          const {bookId, catalogId} = result.data
          const {MOCK} = process.env
          if (!MOCK) {
            this[MUTATIONS.BOOK_CUR_UPDATE](bookId)
          }
        }
        this.$hideLoading()
      },
      async toDoPutNote() {
        if (this.isVisitor) return
        if (!this.dataHasChange || this.curNote._id === 'new') return
        this.doPutNote()
      },
      async doPutNote() {
        this.isEditContents = false
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_PUT](
          {
            _id: this.curNote._id,
            title: this.articleName,
            content: this.content,
          }
        )
        this.$hideLoading()
        if (!result.err) {
          this.$toast({
            title: '修改成功'
          })
        }
        this.cacheName = this.articleName
        this.cacheContent = this.content
        this.$emit('emitUpdateNote',
          {
            force: true
          })
      },
      async init() {
        const {id} = this.$route.params
        if (id) {
          this.editId = id
          await this.getData(id)
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .article-layout {
    background: #eee;
    position: relative;

    .form-label-layout {
      width: 100%;
      text-align: left;
      font-size: 12px;
      color: #adabab;
      padding-left: 0;
    }
    .form-content-layout {
      background: #fff;
      padding: 7px 20px;
    }
    .add-options-item {
      margin: 5px;
    }
    .from-select, .form-input {
      border: none;
      outline: none;
      padding: 0;
    }
    .form-group:not(:first-child) {
      margin: 0;
    }
    .form-content-layout-select {
      padding-top: 18px;
      padding-bottom: 18px;
    }
    .markdown-layout {
      min-height: 500px;
      /*position: relative;*/
      padding: 10px;
    }
  }

  .article-layout-theme1 {
    .article-content {
      padding: 40px;
    }
    .form-label-layout {
      display: none;
    }
    .from-select, .form-input {
      border: none;
      outline: none;
      font-size: 20px;
    }
  }

  .article-title {
    border-bottom: solid 1px @border-color;
    background: #fff;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    .operate-list-operate {
      .iconfont {
        font-size: 20px;
        cursor: pointer;
      }
      .icon-box {
        border: solid 1px @tree-color;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        display: inline-block;
      }
      .icon-box.act {
        background: @highlight-color;
        color: #fff;
      }
    }
  }

  .article-content {
    padding: 7px;
  }

  .full-input {
    font-size: 17px;
    outline: none;
    color: @tree-light-bg-color;
  }

  .markdown {
    .form-label-layout {
      display: none;
    }
    .markdown-layout {
      padding: 0;
    }
    .article-content {
      padding: 0;
    }
    .scroll-box {
      overflow: hidden;
    }
    .form-group, .form-layout {
      height: 100%;
    }
  }

  .article-content.noSave {
    border: solid 1px @warn-color
  }

  .schema-operate-btn {
    height: 30px;
    line-height: 30px;
    width: 80px;
    text-align: center;
    background: @bg-color;
    color: #fff;
    display: inline-block;
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
