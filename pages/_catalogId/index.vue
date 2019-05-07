<template>
      <h1>CatalogsId</h1>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import * as ACTIONS from '../../store/const/actions'
  import constKey from '../../util/const'
	export default {
		name: "index",
    methods: {
      ...mapMutations('catalogs',[MUTATIONS.CATALOGS_CUR_SAVE,]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET,
      ]),
      ...mapActions('notes', [
        ACTIONS.NOTES_RECENTLY_GET,
        ACTIONS.NOTES_GET,
        ACTIONS.NOTE_DES_GET
      ]),
      async dealParams() {
        const { catalogId } = $nuxt._route.params
        this[MUTATIONS.CATALOGS_CUR_SAVE](catalogId)
        if(catalogId === constKey.recentlyArticlesKey) {
          this[ACTIONS.NOTES_RECENTLY_GET]()
        } else {
          this[ACTIONS.NOTES_GET]()
        }
      }
    },
    mounted() {
      this.dealParams()
    }
	}
</script>

<style scoped>

</style>
