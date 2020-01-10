<template>
  <div class="absolute-full flex direction-column">
    <div class="cur-catalog">{{curBlog || curBook}}</div>
    <div class="flex-1 relative">
      <div class="absolute-full catalog-content" :class="{'visitor': isVisitor}">
        <TreeItem
          v-for="(item, index) in catalogList"
          :key="item.name"
          :curNode="item"
          :treeChain="[item['name']]"
          v-if="curBlog"
        ></TreeItem>
        <div v-else>
          <div
            class="blog-item"
            v-for="(item, index) in blogList"
            :class="{'act': curCatalog.indexOf(item.fullPath) === 0}"
            @click="goto(item)"
            :key="index">
            <i class="iconfont icon-shuji"></i>{{item.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
 <!-- <div  v-if="false">
    <div class="cur-catalog">{{curBlog}}</div>
    <NoteItem
      v-for="(item, index) in catalogList"
      :key="item.name"
      :curNode="item"
      :treeChain="[item['name']]"
    ></NoteItem>
  </div>-->
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as ACTIONS from '@/store/const/actions'
  import constKey from '../../utils/client/const'
  import bus from '../../utils/client/global/eventBus'
  import TreeItem from './TreeItem'
  import NoteItem from './NoteItem'
  import { findDirPath } from '../../utils/client/blackHole'

  export default {
    name: 'Tree',
    data() {
      return {}
    },
    components: {
      TreeItem,
      NoteItem
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalogs.list,
        curCatalog: state => state.catalogs.curCatalog,
        curBlog: state => state.catalogs.curBlog,
        curBook: state => state.books.curBook,
        catalogMapNotes: state => state.catalogs.catalogMapNotes,
      }),
      ...mapGetters('user', ['isVisitor', 'githubName']),
      blogList: function () {
        return (this.catalogs[this.curBook] || {}).childNodes || []
      },
      catalogList() {
        const curNotePath = `${this.curBook}/${this.curBlog}`
        const child = (this.catalogs[curNotePath] || {}).childNodes || []
        let files = []
        if(this.isVisitor){
          files = this.catalogMapNotes[curNotePath] || []
        }
        return [ ...files, ...child]
      }
    },
    methods: {
      goto(item) {
        this.$router.push(`/${this.githubName}/${item.fullPath}?type=dir`)
      }
    },
  }
</script>
<style lang="less" scoped>
  .is-visitor-catalog{
    overflow: auto;
    padding-bottom: 100px;
    padding-top: 50px;

  }
  .catalog-content{
    overflow: auto;
    padding-bottom: 20px;
  }
  .catalog-content.visitor:after{
    content: '';
    height: 70px;
    display: block;
  }
  .cur-catalog{
    font-weight: bold;
    font-size: 25px;
    border-bottom: solid 1px @border-color;
    padding: 10px 0 10px 25px;
  }
  .blog-item{
    cursor: pointer;
    .iconfont{
      margin-right: 5px;
      font-size: 20px;
    }
    padding: 7px 15px 7px 30px;
  }
  .blog-item.act{
    color: @visitor-font-primary-color;
  }
</style>
