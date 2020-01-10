<template>
  <div>
    <div v-if="blogList&&blogList.childNodes&&!blogList.childNodes.length">
      暂无博客
    </div>
    <div v-else>
      <div
        v-for="(item, index) in blogList.childNodes"
        :key="index"
        @click="gotoBlogPath(item)"
      >
        {{item.name}}
      </div>
    </div>
    <div @click="todoAddBlog">添加博客</div>
    <div v-if="showEdit">
      <input v-model="blogName"/>
      <div @click="submit">确定</div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '@/store/const/mutaions'
  import * as ACTIONS from '@/store/const/actions'
  // import noteIndex from './_blog/_/index'
  export default {
    name: "index",
    async fetch(context) {
      return
      const { store } = context
      await store.dispatch('catalogs/CATALOGS_GET_CUR', {
        getChild: false
      })
    },
    data() {
      return {
        showEdit: false,
        blogName: ''
      }
    },
    computed: {
      ...mapState({
        curBook: state => state.books.curBook,
        catalogs: state => state.catalogs.list,
      }),
      ...mapGetters('user', ['isVisitor', 'githubName']),
      blogList: function () {
        return this.catalogs[this.curBook] || {}
      }
    },
    components: {
      // noteIndex
    },
    methods: {
      ...mapMutations('catalogs', [MUTATIONS.CATALOGS_CUR_BLOG]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET_CUR,
      ]),
      ...mapActions('notes', [
        ACTIONS.NOTE_PUT,
      ]),
      async submit(){
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_PUT](
          {
            content: {
              "summary": ''
            },
            path: `${this.blogName}/_blackhook.conf.json`,
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
          this.showEdit = false
          this.getBlog(true)
        }
      },
      todoAddBlog() {
        this.showEdit = true
      },
      async getBlog(force = false) {
        await this[ACTIONS.CATALOGS_GET_CUR]({
          getChild: false,
          force
        })
      },
      gotoBlogPath(item) {
        this[MUTATIONS.CATALOGS_CUR_BLOG](item.name)
        this.$router.push(`/${this.githubName}/${item.fullPath}?type=dir`)
      },
      init() {
        if(!this.catalogs[this.curBook] || !this.catalogs[this.curBook].childNodes) {
          this.getBlog()
        }
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped>

</style>
