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
              v-show="curNote.newFile"
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
            <markdown-edit v-model="content" :onlyView="isVisitor" :showEdit="curNote.newFile"></markdown-edit>
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
  import { findDirPath } from '../../utils/client/blackHole'

  export default {
    props: {
      curNote: {
        type: Object,
      }
    },
    data: function () {
      const {title = '未命名', content = ''} = {}
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
        curCatalog: state => state.catalogs.curCatalog,
        catalogMapNote: state => state.catalogs.catalogMapNotes,
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
      ...mapMutations('notes', [
        MUTATIONS.NOTE_MAP_SAVE
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
      getTitle(val) {
        if (!val) return val
        return val.substring(0, val.length - 3)
      },
      setContent(val = {}) {
        this.cacheContent = this.content = val.contentMD || ''
        this.cacheName = this.articleName = this.getTitle(val.name) || '未命名'
      },
      async todoEdit(force = false) {
        if (!force) {
          if (
            this.curNote.newFile ||
            !this.articleName ||
            this.cacheName === this.articleName
          ) {
            return
          }
        }
        const curPath = `${findDirPath(this.curNote.path)}/${this.articleName}.md`
        if(this.catalogMapNote[this.curCatalog].find(item => item.path === curPath)){
          this.$toast({
            title: `该目录已经存在"${this.articleName}"`
          })
          return
        }
        const newPath = `${findDirPath(this.curNote.path)}/${this.articleName}.md`
        this.doPutNote(newPath)
      },
      async todoSave() {
        console.log(this.articleName)
        if (!this.articleName) return
        const curPath = `${this.curNote.path}/${this.articleName}.md`
        if (this.catalogMapNote[this.curCatalog]) {
          const findPath = this.catalogMapNote[this.curCatalog].find(item => item.path === curPath)
          if (findPath) {
            this.$toast({
              title: `该目录下已经存在"${this.articleName}"`
            })
            return
          }
        }
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_PUT](
          {
            content: this.content,
            path: curPath,
            newFile: true
          }
        )
        this.$hideLoading()
        if (result.err) {
          this.$toast({
            title: result.err.message
          })
          return
        } else {
          if (!result.err) {
            this.$toast({
              title: '添加成功'
            })
          }
          this.cacheName = this.articleName
          this.cacheContent = this.content
          this.$emit('emitUpdateNote',
            {
              force: true,
              path: result.data.content.path,
              newFile: true,
            })
        }

      },
      async toDoPutNote() {
        if (this.isVisitor) return
        if (!this.dataHasChange || this.curNote.newFile) return
        this.doPutNote()
      },
      /**
       * @params {path} <String || null> :如果有则说是修改文件名
       * */
      async doPutNote(path) {
        this.isEditContents = false
        this.$showLoading()
        let result = await this[ACTIONS.NOTE_PUT](
          {
            sha: this.curNote.sha,
            content: this.content,
            path: path || this.curNote.path
          }
        )
        if (result.err) {
          this.$toast({
            title: result.err.message
          })
          return
        } else {
          if(path) {
            result = await this[ACTIONS.NOTE_DELETE](this.curNote)
          }
          if (result.err) {
            this.$toast({
              title: '删除旧文件失败：'+result.err.message
            })
          } else  {
            this.$toast({
              title: '修改成功'
            })
          }
        }
        this.$hideLoading()
        this.cacheName = this.articleName
        this.cacheContent = this.content
        this.$emit('emitUpdateNote',
          {
            force: true,
            path: path || this.curNote.path,
            modify: true,
            newFile: path ? true : false
          })
      },
    },
    mounted() {
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
