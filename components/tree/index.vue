<template>
  <div>
    <TreeItem
      v-if="!isVisitor"
      v-for="(item, index) in catalogList"
      :key="item.name"
      :curNode="item"
      :treeChain="[item['name']]"
  ></TreeItem>
    <NoteItem
      v-else
      v-for="(item, index) in catalogList"
      :key="item.name"
      :curNode="item"
      :treeChain="[item['name']]"
    ></NoteItem>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import constKey from '../../utils/client/const'
  import TreeItem from './TreeItem'
  import NoteItem from './NoteItem'

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
        cacheCatalogMapNotes: state => state.catalogs.cacheCatalogMapNotes,
        catalogs: state => state.catalogs.list,
        curCatalog: state => state.catalogs.curCatalog,
        curBook: state => state.books.curBook,
      }),
      ...mapGetters('user', ['isVisitor', 'githubName']),
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
  }
</script>
<style lang="less" scoped>

</style>
