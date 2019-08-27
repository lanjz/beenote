<template>
 <div class="content-list  flex flex-1 direction-column">
  <div class="flex-1 relative">
    <div class="absolute-full scroll-auto">
      <div class="content-list-item"
           v-for="(contents, index) in contentList" v-if="contentList && contentList.length"
           :key="index"
           @click="focusContent(contents)"
           :class="{'act': curContentId === contents._id}"
      >
        <div class="operate-icon" @click.stop="todoDelete(contents)">
          <i class="iconfont icon-shanchu1"></i>
        </div>
        <div class="form-layout theme-1" v-if="fields&&fields.length">
          <div class="form-group flex" v-for="(field, index) in fields" :index="index" :class="'content-list-'+index">
            <div class="form-label-layout">
              {{field.name}}：
            </div>
            <div class="flex flex-1  align-items-center form-content-layout markdown-layout" v-if="field.type==='markdown'">
              <div class="markdown-style relative-full" v-html="markDownValue(contents[field._id])"></div>
            </div>
            <div class="flex flex-1 align-items-center form-content-layout" v-if="field.type==='input'">
              {{contents[field._id]|| '无'}}
            </div>
            <div class="flex flex-1 align-items-center form-content-layout" v-if="field.type==='textarea'"
                 v-html="textareaFormat(contents[field._id])"
            >
            </div>
            <div class="flex flex-1 align-items-center form-content-layout" v-if="field.type==='radio'">
              <div
                class="add-options-item"
                :class="{'act':optionsItem.id === contents[field._id]}"
                v-if="optionsItem.id === contents[field._id]"
                v-for="(optionsItem, optionsIndex) in field.options"
              >
                {{optionsItem.name}}
              </div>
              <div v-if="!contents[field._id]">无</div>
            </div>
            <div class=" form-content-layout flex flex-1 align-items-center " v-if="field.type==='select'">
              <div
                v-for="(optionsItem, optionsIndex) in field.options"
                :class="{
                'act':Object.prototype.toString.call(contents[field._id]) === '[object Array]'&&
                contents[field._id].indexOf(optionsItem.id) > -1
              }"
                v-if="Object.prototype.toString.call(contents[field._id]) === '[object Array]'&&
                contents[field._id].indexOf(optionsItem.id) > -1"
              >
                <div class=" flex align-items-center">
                  <div>{{optionsItem.name}}</div>
                </div>
              </div>
              <div v-if="!contents[field._id] || !contents[field._id].length">无</div>
            </div>
            <div
              v-if="findDone && findDone._id === field._id"
              class="is-done-layout"
              :class="{'is-done-y': findDone.isDone === contents[field._id]}"
            >
              <div v-if="findDone.isDone === contents[field._id]">Y</div>
              <div v-else>N</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div class="add-content-box"
        :class="{'act': curContentId === 'new'}"
        @click="todoAddContent">添加内容</div>
 </div>

</template>

<script>
  import marked from 'marked'
  // import hljs from 'highlight.js'
  // import javascript from 'highlight.js/lib/languages/javascript'
  // hljs.registerLanguage('javascript', javascript)
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      // return hljs.highlightAuto(code).value;
    }
  });
  export default {
    props: ['fields', 'contentList', 'curContentId'],
    filters: {

    },
    computed: {
      findDone: function () {
        const result = this.fields.find(item => item.isDone)
        return result
      }
    },
    methods: {
      markDownValue: function (val) {
        return marked(val)
      },
      textareaFormat(val) {
        if(!val) return ''
        return val.replace(/\n|\r\n/g,"<br>")
      },
      todoAddContent() {
        this.$emit('focusContent', )
      },
      focusContent(item) {
        this.$emit('focusContent', { ...item} )
      },
      todoDelete(item) {
        this.$alert({
          title: `你确认要删除此内容`,
        })
          .then(async res => {
            if(res) {
              this.$emit('emitDeleteItem', { ...item} )
            }
          })
      },
    }
  }
</script>

<style lang="less" scoped>
  .content-list{
    background: #fff;
    /*box-shadow: 1px 0 1px 1px #adabab inset;*/
    font-size: 13px;
    padding-bottom: 60px;
    position: relative;
    .content-list-item{
      padding: 10px;
      color: @tree-bg-color;
      border-bottom: solid 1px #adabab;
      position: relative;
      cursor: pointer;
    }
    .content-list-item.act{
      /*box-shadow: 1px 0 1px 1px #adabab inset;*/
      background: #fbfbfb;
    }
    .content-list-item:after{
      content: '';
      width: 3px;
      height: 100%;
      background: transparent;
      left: 0;
      top: 0;
      position: absolute;
      border-radius: 0 2px 2px 0;
      transition: .3s;
    }
    .content-list-item.act:after{
      background: @highlight-color;
    }
    .scroll-auto{
      overflow: auto;
    }
  }
  .add-content-box{
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: #fbfbfb;
    font-size: 16px;
    color: @tree-color;
    cursor: pointer;
    transition: .3s;
    border-left: solid 3px transparent;
  }
  .add-content-box:hover{
    background: #eee;
  }
  .add-content-box.act{
    border-left: solid 3px @highlight-color;
  }
  .form-label-layout{
    width: auto;
  }
  .form-group:not(:first-child) {
    margin-top: 10px;
  }
  .operate-icon{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    right: 7px;
    top: 7px;
    position: absolute;
    z-index: 1;
    background: #5f5f5f;
    opacity: 0;
    transform: scale(0);
    transition: .3s;
    text-align: center;
    line-height: 30px;
    color: @article-brief-light-bg;
    .iconfont{
      font-size: 18px;
      color: #fff;
    }
  }
  .operate-icon:hover{
    background: @warn-color;
    color: #fff;
  }
  .content-list-item:hover .operate-icon{
    opacity: 1;
    transform: scale(1);
  }
  .content-list-0{
    font-size: 16px;
  }
  .is-done-layout{
    position: absolute;
    border-top: solid 20px transparent;
    border-left: solid 20px transparent;
    border-right: solid 20px red;
    border-bottom: solid 20px red;
    bottom: 0;
    right: 0;
    width: 0px;
    height: 0px;
    color: #fff;
    font-size: 15px;

  }
  .is-done-y{
    border-right: solid 20px @highlight-color;
    border-bottom: solid 20px @highlight-color;
  }
  .form-group{
    overflow: hidden;
  }
</style>
