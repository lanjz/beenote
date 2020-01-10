<template>
  <div class="flex-1 ">
    <div v-if="showEdit" class="blog-edit">
      <div class="form-panel">
        <div class="edit-title">创建一个博客</div>
        <div class="form-tips">一个博客对应该仓库的一个根目录文件,名称请勿带有 ' / ' 等特殊符号</div>
        <div class="label-line"></div>
        <div class="form-layout-layout">
          <div class="label-name">名称</div>
        </div>
        <div class="form-layout-content">
          <div class="label-edit-box">
            <input class="form-input" v-model.trim="blogName"/>
          </div>
        </div>
        <div class="label-line"></div>
        <div class="form-tips">以下配置将存到当前目录下的_blackhook.conf.json文件中，所以请谨慎删除这个文件</div>
        <div class="form-layout-layout" style="margin-top: 10px">
          <div class="label-name">简介</div>
        </div>
        <div class="form-layout-content">
          <div class="label-edit-box">
            <textarea class="form-input" v-model.trim="summary"/>
          </div>
        </div>
        <div class="form-group submit-layout">
          <div class="btn" @click.stop="submit" :class="{'disable-btn': !validForm}">保存</div>
          <div class="btn second-btn" @click.stop="doReset" >取消</div>
        </div>
        <div class="show-err" v-show="errMsg">{{errMsg}}</div>
      </div>
    </div>
    <div v-else class="blog-content">
      <div class="blog-total">
        <div class="name">共有 <b>{{blogList.childNodes.length}}</b> 个博客</div>
        <div class="add-btn" @click="todoAddBlog"><i class="iconfont icon-wendang"></i>New</div>
      </div>
      <div v-if="noData">
        <noNotes name="博客" @toCreateFile="todoAddBlog"></noNotes>
      </div>
      <div class="blog-list" v-else>
        <div
          v-for="(item, index) in blogList.childNodes"
          :key="index"
          class="blog-item flex"
          @click="gotoBlogPath(item)"
        >
          <i class="iconfont icon-shuji"></i>
          <div class="flex-1">
            <div class="name">{{item.name}}</div>
            <div class="summary">博客简介</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '@/store/const/mutaions'
  import * as ACTIONS from '@/store/const/actions'
  import noNotes from '@/components/note/noNotes.vue'
  // import noteIndex from './_blog/_/index'
  export default {
    name: "index",
    async fetch(context) {
      const { store } = context
      await store.dispatch('catalogs/CATALOGS_GET_CUR', {
        getChild: false
      })
    },
    data() {
      return {
        showEdit: false,
        blogName: '',
        summary: '',
        errMsg: ''
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
      },
      noData: function () {
        return this.blogList&&this.blogList.childNodes&&!this.blogList.childNodes.length
      },
      validForm: function () {
        return !!this.blogName
      }
    },
    components: {
      noNotes
    },
    methods: {
      ...mapMutations('catalogs', [MUTATIONS.CATALOGS_CUR_BLOG]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET_CUR,
      ]),
      ...mapActions('notes', [
        ACTIONS.NOTE_PUT,
      ]),
      initForm() {
        this.errMsg = false
        this.blogName = ''
        this.summary = ''
      },
      async submit(){
        if(!this.blogName || this.blogName.indexOf('/') > -1) {
          this.errMsg = '名称不能包含"/"'
          return
        }
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_PUT](
          {
            content: JSON.stringify({
              "summary": this.summary
            }),
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
        this.initForm()
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
      doReset() {
        this.showEdit = false
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

<style scoped lang="less">
  .blog-content{
    padding: 20px 50px;
  }
  .blog-total{
    padding: 10px 0;
    position: relative;
    .name{
      color: #333;
      font-size: 20px;
    }
    .add-btn{
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 5px 10px;
      background: @visitor-font-primary-color;
      color: #fff;
      border-radius: 4px;
      .iconfont{
        margin-right: 5px;
      }
    }
  }
  .blog-list{
    margin: 0 auto;
    .blog-item{
      background: #fff;
      border-radius: 4px;
      padding: 20px 30px;
      margin-top: 10px;

    }
    .name{
      color: #333;
      font-size: 20px;
      padding-top: 6px;
    }
    .iconfont{
      font-size: 60px;
      margin-right: 10px;
    }
    .summary{
      font-size: 14px;
      color: #999;
    }
  }
  .blog-edit{
    padding: 40px 80px;
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .edit-title{
    font-size: 25px;
    padding-bottom: 15px;
    color: #333;
  }
</style>
