<template>
  <div class="article-layout box-shadow flex direction-column" :class="{'hidden-article': !showBrief}">
    <div class="flex-1 flex direction-column article-min-width relative">
      <div class="article-layout-input-box align-items-center">
        <input type="text" class="article-layout-input" v-model="filterKeys"/>
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="flex-1 relative">
        <div class="absolute-full article-item-box" id="article-item-box">
          <div
            :id="item._id"
            class="article-item"
            v-for="(item, index) in filterList"
            :key="index"
            :class="{'act': item._id === curNote}"
            @click="chooseNote(item)">
            <div class="article-item-title">{{item.title}}</div>
            <div class="article-label">
              <span class="article-label-item">{{item.bookId|getBookName(bookList)}}</span>
            </div>
            <div class="article-item-mark">{{item.createTime | timestampToBriefTime}}~{{item.updateTime | timestampToBriefTime}}</div>
            <div class="operate-icon" @click.stop="todoDelete(item)">
              <i class="iconfont icon-shanchu1"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="shortcut-add-layout" @click="shortcutAdd" v-if="notesMap[curNote] && !isVisitor">
        <i class="iconfont icon-tianjiawenjian"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import * as ACTIONS from '../../store/const/actions'

  import bus from '../../utils/client/global/eventBus'
  import constKey from '../../utils/client/const'
  import { returnCatalog } from '../../utils/client/blackHole'

  export default {
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        filterKeys: '',
      }
    },
    computed: {
      ...mapState({
        curCatalog: state => state.catalogs.curCatalog,
        showBrief: state => state.config.showBrief,
        bookList: state => state.books.list,
        schemaList: state => state.schema.list,
        curNote: state => state.notes.curNote,
        notesMap: state => state.notes.notesMap,
        filterList: function () {
          if(!this.filterKeys) {
            return this.list
          }
          return this.list.filter((item) => item.title.indexOf(this.filterKeys) > -1)
        }

      }),
      ...mapGetters('user', ['isVisitor']),
    },
    watch: {
      list: function (val) {
        if(val.length && (!this.curNode || this.curNode === 'new')) {
//          this.chooseNote(val[0])
        }
      }
    },
    filters: {
      getBookName: function (id, bookList) {
        return bookList[id] ? bookList[id].name : ''
      },
      getCatalogsName: function(id, schemaList) {
        return schemaList[id] ? schemaList[id].name : ''
      }
    },
    methods: {
      ...mapActions('notes', [
        ACTIONS.NOTE_DELETE,
      ]),
      ...mapMutations('notes',[MUTATIONS.NOTE_CUR_UPDATE]),
      chooseNote: function (item) {
         this.$router.push(`/${item.bookId}/${returnCatalog(this.curCatalog)}/${item._id}`)
      },
      todoDelete(item) {
        this.$alert({
          title: `你确认要删除"${item.title}"`,
        })
          .then(async res => {
            if(res) {
              this.doDeleteNote(item)
            }
          })
      },
      async doDeleteNote(item = {}) {
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_DELETE]({
          _id: item._id
        })
        this.$hideLoading()
        if(!result.err) {
          this.$toast({
            title: '删除成功'
          })
        }
        if(this.curNote === item._id) {
          this[MUTATIONS.NOTE_CUR_UPDATE]('')
        }
        this.$emit('emitUpdateNote', {force: true})
      },
      shortcutAdd() {
        const catalogId = this.notesMap[this.curNote].catalogId
        if(!catalogId){
          this.$alert({
            title: 'shortcutAdd',
            content: '缺少catalogId，无法创建笔记'
          })
          return
        }
        this.$emit('emitToCreateNote', {
          _id: 'new',
          catalogId
        })
        /*this.chooseCatalog({
          schemaId: item._id,
          catalogId: this.curNode._id,
          isNew: true
        })
        bus.$emit('emitFromCatalog', item || {
          ...this.curNode,
          catalogId: this.curNode._id
        })*/
      }
    }
  }
</script>
<style lang="less" scoped="">
  .article-item {
    padding: 10px 20px;
    width: 100%;
    cursor: pointer;

    position: relative;
    border-bottom: solid 1px #000;
    .article-item-title {
      font-size: 17px;
      color: @tree-light-color;
    }
    .article-item-mark {
      margin-top: 7px;
      font-size: 12px;
    }
    .operate-icon{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      right: 7px;
      top: 7px;
      position: absolute;
      z-index: 1;
      background: #5f5f5f;
      opacity: 0;
      transform: scale(0);
      transition: .3s;
      text-align: center;
      line-height: 30px;
      color: @article-brief-light-bg;
      .iconfont{
        font-size: 18px;
      }
    }
    .operate-icon:hover{
      background: @warn-color;
      color: #fff;
    }
  }
  .article-item:hover .operate-icon{
    opacity: 1;
    transform: scale(1);
  }
  .article-item.act {
    background: @article-brief-light-bg;
  }
  .article-item.act:after{
    content: '';
    position: absolute;
    width: 4px;
    height: 100%;
    left: 0;
    top: 0;
    background: #afb0b1;
  }
  .article-layout {
    padding: 15px 0;
    background: @bg-second-color;
    color: @tree-color;
    max-width: 500px;
    transition: .3s ;
    .article-min-width{
      min-width: 200px;
    }
  }
  .article-layout.hidden-article{
    max-width: 0;
    overflow: hidden;
  }

  .article-layout-input-box{
    background: @tree-light-bg-color;
    color: @tree-light-color;
    width: 90%;
    height: 40px;
    padding: 0 10px;
    position: relative;
    margin: 0 auto;
    margin-bottom: 10px;
    .iconfont{
      display: block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .article-layout-input {
    height: 100%;
    border: none;
    background: transparent;
    display: inline-block;
    color: @tree-light-color;
    outline: #fff;
    padding-right: 46px;
  }
  .article-label{
    margin: 7px 0;
  }
  .article-label-item{
    display: inline-block;
    padding: 2px 5px;
    background: #5f5f5f;
    color: @bg-color;
    border-radius: 2px;
    margin-bottom: 3px;
    font-size: 12px;
  }
  .article-item-box{
    overflow-y: auto;
    overflow-x: hidden;
  }
  .shortcut-add-layout{
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: @highlight-color;
    z-index: 5;
    width: 42px;
    height: 42px;
    border-radius: 42px;
    cursor: pointer;
    text-align: center;
    line-height: 44px;
    .iconfont{
      font-size: 30px;
      color: #2D2D2D;
    }
  }
</style>
