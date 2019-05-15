<template>
  <div class="left-layout flex">
    <div class="book-slider-layout">
      <div
        class="book-layout"
        :class="{'act':　item._id === curBook}"
        @click="todoSetCurBook(item)"
        v-for="(item, index) in bookList">
        <div>
          <svg class="icon shelve-svg-icon" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia1"></use>
          </svg>
        </div>
        <div class="book-layout-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import bus from '../../util/global/eventBus'
  export default {
    computed: {
      ...mapState({
        treeChain: state => state.catalogs.treeChain,
        curBook: state => state.books.curBook,
        bookList: state => Object.values(state.books.list),
      }),
      ...mapGetters('books', [
        'curBookInfo'
      ])
    },
    methods: {
      ...mapMutations('books',[
        MUTATIONS.BOOK_CUR_UPDATE
      ]),
      goArticle() {
        this.$router.push('/')
      },
      goBook() {
        this.$router.push('/BookList')
      },
      goSchema() {
        this.$router.push('/Schema')
      },
      goTest() {
        this.$router.push('/Bar')
      },
      todoSetCurBook(item) {
        this.$router.push(`/${item._id}/recently`)
      },
    }
  }
</script>
<style lang="less" scoped>
  .book-slider-layout{
    padding: 15px;
    background: @bg-second-color;
  }
  .book-layout{
    margin-top: 35px;
    width: 38px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 5px 0;
    transition: .2s;
    .shelve-svg-icon{
      border-radius: 50%;
      font-size: 28px;
    }
    .book-layout-name{
      text-align: center;
      color: #fff;
      height: 20px;
      line-height: 20px;
      width: 40px;
      font-size: 12px;
    }
  }
  .book-layout:hover{
    border-radius: 4px;
    box-shadow: 0 0 2px 1px #171717 inset;
  }
  .book-layout.act{
    background: @bg-color;
    border-radius: 4px;
    box-shadow: 0 0 3px 1px #171717 inset;
  }
</style>
