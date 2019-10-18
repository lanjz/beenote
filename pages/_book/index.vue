<template>

</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import * as ACTIONS from '@/store/const/actions'
  import * as MUTATIONS from '@/store/const/mutaions'
  export default {
    computed: {
      ...mapState({
        catalogList: state => state.catalogs.list
      }),
    },
    methods: {
      ...mapMutations('books', [MUTATIONS.BOOK_CUR_UPDATE]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET,
      ]),
    },
    async mounted() {
      const {book} = $nuxt._route.params
      this[MUTATIONS.BOOK_CUR_UPDATE](book)
      await this[ACTIONS.CATALOGS_GET]()
      const fistName = this.catalogList[`${book}_root`].childNodes[0].name
      // this.$router.push(`/${book}/recently/${fistName}`)
    }
  }
</script>

<style scoped>

</style>
