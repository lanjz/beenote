<template>
  <div v-if="!isVisitor" class="absolute-full">
    <TreeItem
      v-for="(item, index) in catalogList"
      :key="item.name"
      :curNode="item"
      :treeChain="[item['name']]"
    ></TreeItem>
  </div>
  <div  v-else>
    <div class="cur-catalog">{{curParent}}</div>
    <NoteItem
      v-for="(item, index) in catalogList"
      :key="item.name"
      :curNode="item"
      :treeChain="[item['name']]"
    ></NoteItem>
  </div>
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
      return {
        actHash: ''
      }
    },
    components: {
      TreeItem,
      NoteItem
    },
    computed: {
      ...mapState({
        cacheCatalogMapNotes: state => state.catalogs.cacheCatalogMapNotes,
        catalogs: state => state.catalogs.list,
        curCatalog: state => state.catalogs.curCatalog,
        curBook: state => state.books.curBook,
      }),
      ...mapGetters('user', ['isVisitor', 'githubName']),
      curParent() {
        if(!this.curCatalog) return []
        return this.curCatalog.substring(this.curCatalog.lastIndexOf('/')+1)
      },
      catalogList() {
        if(this.isVisitor) {
          const getNotes = this.cacheCatalogMapNotes[this.curCatalog] || []
          return getNotes
        }
        // return this.catalogs[this.curBook] ? this.catalogs[this.curBook].childNodes : []
        return [
          {  path: '/', fullPath: this.curBook, name: this.curBook,icon: 'icon-wendang' },
          // { _id: this.curBook+'_root', name: '我的文件夹', hasChild: true },
        ]
      }
    },
    methods: {
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET_CUR,
      ]),
      async init() {
        const {user, book, pathMatch} = $nuxt._route.params
        const isDir = $nuxt._route.query.type === 'dir'
        let pathMatchArr = pathMatch && pathMatch.split('/')
        if(pathMatchArr.length && !isDir) {
          pathMatchArr = pathMatchArr.splice(0, pathMatchArr.length - 1)
        }
        this.$showLoading()
        this[ACTIONS.CATALOGS_GET_CUR]({
          pathMatchArr
        })
          .finally(() => {
            this.$hideLoading()
          })
       /* if(!this.isVisitor) return
        const {user, book, pathMatch} = $nuxt._route.params
        const getDirPath = findDirPath(pathMatch)
        const params = {
          path: getDirPath,
          getChild: false,
          bookName: book
        }
        this[ACTIONS.CATALOGS_GET](params)*/
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .cur-catalog{
    font-weight: bold;
    font-size: 32px;
    padding-left: 25px;
    border-bottom: solid 1px @border-color;
    padding-bottom: 8px;

  }
</style>
