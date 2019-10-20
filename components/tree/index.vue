<template>
  <div>
    <TreeItem
      v-for="(item, index) in catalogList"
      :key="item.name"
      :curNode="item"
      :treeChain="[item['name']]"
    ></TreeItem>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import constKey from '../../utils/client/const'
  import TreeItem from './TreeItem'

  export default {
    name: 'Tree',
    data() {
      return {}
    },
    components: {
      TreeItem
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalogs.list,
        curBook: state => state.books.curBook
      }),
      catalogList() {
        return this.catalogs[this.curBook + '_root'] ? this.catalogs[this.curBook + '_root'].childNodes : []
        /*    return [
              {  _id: constKey.recentlyArticlesKey, name: '最近文档', hasChild: false, icon: 'icon-wendang' },
              { _id: this.curBook+'_root', name: '我的文件夹', hasChild: true },
            ]*/
      }
    },
  }
</script>
<style lang="less" scoped>

</style>
