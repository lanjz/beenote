<template>
  <div v-if="catalogList.length" class="note-catalogue">
    <NoteItem
      v-for="(item, index) in catalogList"
      :key="index"
      :curNode="item"
      :actHash="actHash"
    ></NoteItem>
  </div>
  <div v-else>无</div>
</template>
<script>
  import {mapState} from 'vuex'
  import NoteItem from './catalogueItem'
  import bus from '../../utils/client/global/eventBus'

  export default {
    name: 'Tree',
    components: {
      NoteItem
    },
    data() {
      return {
        actHash:{},
      }
    },
    computed: {
      ...mapState({
        noteCatalogue: state => state.notes.noteCatalogue,
        curNote: state => state.notes.curNote,
      }),
      catalogList() {
        if(!this.noteCatalogue || !this.curNote) return []
        const getTree = this.noteCatalogue[this.curNote] || {}
        return getTree[this.curNote] || []
      },
    },
    methods: {
      getActTree(name, type = '#') {
        const getTree = this.noteCatalogue[this.curNote]
        Object.values(getTree).flat(Infinity)
          .forEach(item => {
            if(item.name.toLowerCase() === name && item.type === type){
              this.actHash = item
            }
          })
      },
      getScroll(e) {
        clearTimeout(this.timeOut)
        this.timeOut = setTimeout(() => {
          this.markdownEl = this.markdownEl ||
            [...document.querySelector('.markdown-content-style').querySelectorAll('h1'),
              ...document.querySelector('.markdown-content-style').querySelectorAll('h2')
            ]
          let dis = this.markdownEl[0]
          this.markdownEl.forEach(item => {
            if(dis) {
              let cusDis = window.scrollY - item.offsetTop
              if(cusDis < 0) return
              if(cusDis < (window.scrollY - dis.offsetTop)) {
                dis = item
              }
            }
          })
          if(dis && dis.getAttribute&&location.hash !== dis.getAttribute('id')) {
            location.hash = dis.getAttribute('id')
            const type = dis.tagName === 'H1' ? '#' : '##'
            this.getActTree(dis.getAttribute('id'), type)
          }
        }, 500)
      }
    },
    mounted() {
      this.actHash = {
        name: decodeURI(this.$route.hash).substring(1)
      }
      bus.$off("chooseHash")
      bus.$on('chooseHash', (arg) => {
        this.actHash = arg
      })
      window.addEventListener('scroll', this.getScroll)
    }
  }
</script>
<style lang="less" scoped>
  .note-catalogue{
    position: relative;
    padding-left: 15px;
  }
</style>
