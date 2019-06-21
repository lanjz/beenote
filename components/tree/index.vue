<template>
  <div>
    <TreeItem
      v-for="(item, index) in catalogList"
      :key="item._id"
      :curNode="item"
      :treeChain="[item['_id']]"
    ></TreeItem>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import constKey from '../../utils/const'
  import TreeItem from './TreeItem'
  export default {
    name: 'Tree',
    data() {
      return {
      }
    },
    components: {
      TreeItem
    },
    computed: {
      ...mapState({
        curBook: state => state.books.curBook
      }),
      catalogList() {
        return [
          {  _id: constKey.recentlyArticlesKey, name: '最近文档', hasChild: false, icon: 'icon-wendang' },
          { _id: this.curBook+'_root', name: '我的文件夹', hasChild: true },
        ]
      }
    },
  }
</script>
<style lang="less" scoped>

</style>
