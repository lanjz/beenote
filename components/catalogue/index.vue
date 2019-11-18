<template>
  <div v-if="catalogList.length" class="note-catalogue">
    <NoteItem
      v-for="(item, index) in catalogList"
      :key="index"
      :curNode="item"
      :treeChain="[item['name']]"
    ></NoteItem>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import NoteItem from './catalogueItem'

  export default {
    name: 'Tree',
    components: {
      NoteItem
    },
    computed: {
      ...mapState({
        noteCatalogue: state => state.notes.noteCatalogue,
        curNote: state => state.notes.curNote,
      }),
      catalogList() {
        if(!this.noteCatalogue || !this.curNote) return []
        const getTree = this.noteCatalogue[this.curNote]
        console.log('this.curNote', this.curNote)
        console.log('this.noteCatalogue', this.noteCatalogue)
        console.log('getTree', getTree)
        return getTree[this.curNote] || []
      }
    },
  }
</script>
<style lang="less" scoped>
  .note-catalogue{
    position: fixed;
    right: 10px;
    top: 100px;
  }
</style>
