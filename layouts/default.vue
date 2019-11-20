<template>
  <div class="app flex direction-column absolute-full" v-if="!isVisitor">
    <Header/>
    <div class="flex flex-1">
      <bookShelveNav></bookShelveNav>
      <div class="flex flex-1">
        <nuxt />
      </div>
    </div>
    <!--<Footer/>-->
  </div>
  <div v-else class="visitor-box" :class="{'visitor-box-view': onlyView}">
    <div class="visitor-box-header">
      <Header/>
    </div>
    <nuxt />
  </div>
</template>
<script>
  import * as MUTATIONS from '@/store/const/mutaions'
  import * as ACTIONS from '@/store/const/actions'
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import Header from '../components/layout/Header'
  import bookShelveNav from '../components/layout/bookShelveNav'
  import constKey from '../utils/client/const'
  export default {
    components: {
      Header,
      bookShelveNav
    },
    computed: {
      ...mapState({
        onlyView: state => state.user.onlyView,
      }),
      ...mapGetters('user', ['isVisitor']),
    },
    methods: {
      ...mapActions('user', [
        ACTIONS.USER_INFO_GET
      ]),
      async init(){
        // this[ACTIONS.USER_INFO_GET]()
      }
    },
    mounted() {
      this.init()

    }
  }
</script>
<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
  .visitor-box{
    padding: 66px 0 0 280px;
    .visitor-box-header{
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 2;
      border-bottom: solid 1px #e9e7e7;
    }
  }
  .visitor-box-view{
    padding: 66px 0 0 0;
  }
</style>
