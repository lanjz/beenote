<template>
  <div class="code-mirror absolute-full flex direction-column markdown-layout">
    <!--    <div class="code-mirror-tags flex align-items-center justify-content-space-between">
          <div>
            <div class="tags-item" @click="editMirror" :class="{'act': editMode !== 2}">Edit file</div>
            <div class="tags-item" @click="prviewsMirror":class="{'act': editMode === 2}">Preview</div>
          </div>
          <div class="tags-item-2 default-btn" @click="editAndPre":class="{'act': editMode === 3}" >Edit | Pre</div>
        </div>-->
    <div class="flex-1 flex absolute-full" :class="{'hideSplit': editMode !== 3}">
      <div class="markdown-operate-layout" v-if="!onlyView">
        <div class="icon-layout" @click="toggleEdit" :class="{'act': isEdit}"><i class="iconfont icon-bianji2"></i>
        </div>
        <div class="icon-layout" @click="togglePreview" :class="{'act': isPreview}"><i class="iconfont icon-yulan"></i>
        </div>
      </div>
      <div class="flex-1 relative" v-if="isEdit">
        <textarea class="markdown-edit-box box-shadow-inset" v-model="markDownValue"></textarea>
      </div>
      <div class="flex-1 md-body-layout edit-layout relative" v-if="isPreview">
        <div class="absolute-full markdown-style" :class="{'black-theme' :onlyView}">
          <div class="markdown-content-style" v-html="markdownHTML"></div>
        </div>

        <!--<div :class="onlyView ? 'markdown-edit-box box-shadow-inset' : 'markdown-style'" v-html="markdownHTML"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
  /*
    // let MarkdownItVue = () => import('./test.vue')
    let MarkdownItVue = require('./test.vue')
    // import MarkdownItVue from 'markdown-it-vue'
    if (process.browser) {
      // MarkdownItVue = () => import('markdown-it-vue')
      MarkdownItVue = require('markdown-it-vue')
    }
  */
  import marked from 'marked'
  // import hljs from 'highlight.js'

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
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

  function DIYMarked(text) {
    const result = text
      .replace(/C\(N\)/g, '<span class="marked-checkBox"></span>')
      .replace(/C\(Y\)/g, '<span class="marked-checkBox"><i class="iconfont icon-gou1"></i></span>')
      .replace(/\((.*?)\)\?(\((.*?)\))?/g, function($1, $2, $3, $4){
        if($4)  {
          return `<div class="marked-issue">${$2}<i class="iconfont icon-wenhao color"> <span class="marked-issue-tip">${$4}</span></i> </div>`
        }
        return `<div class="marked-issue">${$2}<i class="iconfont icon-wenhao"></i></div>`
      })
      .replace(/(<a .*?<\/a>)/g, function ($1, $2, $3, $4) {
        return `${$2}<span class="marked-iconfont-link">(<i class="iconfont icon-lianjie2"></i>)</span>`
      })
    return result
  }

  export default {
    model: {
      prop: 'data',
      event: 'update'
    },
    props: {
      data: String,
      showEdit: {
        default() {
          return false
        }
      },
      onlyView: {
        default() {
          return true
        }
      }
    },
    data() {
      const markdownHTML = DIYMarked(marked(this.data))
      return {
        split: 0.5,
        markDownValue: '',
        editMode: 1, // 编辑模式
        isEdit: this.showEdit,
        isPreview: true,
        markdownHTML: markdownHTML || ''
      }
    },
    /*    components: {
          MarkdownItVue
        },*/

    watch: {
      data: function (val) {
        this.markDownValue = this.data || ''
      },
      markDownValue: function (val) {
        if (this.isPreview) {
          clearTimeout(this.timeOut)
          this.timeOut = setTimeout(() => {
            this.markdownHTML = DIYMarked(marked(val))
          }, 500)
        }
        this.$emit('update', val)
      }
    },
    methods: {
      toggleEdit() {
        this.isEdit = !this.isEdit
        if (!this.isEdit) {
          this.isPreview = true
        }
        if(window) {
          window._markdownEdit = this.isEdit
        }
      },
      togglePreview() {
        this.isPreview = !this.isPreview
        if (!this.isPreview) {
          this.isEdit = true
        }
        if(window) {
          window._markdownEdit = this.isEdit
        }
      }
    },
    mounted() {
      if(window._markdownEdit) {
        this.isEdit = true
      }
      this.markDownValue = this.data || ''
    /*  if (this.isEdit) {
        this.isEdit = false
      }*/
    }
  }
</script>
<style scoped lang="less">
  .showCompileMarkdownBox, #codeMirror {
    width: 100%;
    height: 100%;
  }

  .code-mirror {
    .demo-split-pane {
      padding: 10px;
      overflow: auto;
    }
    .showCompileMarkdownBox {
      padding: 0 @padding-size;
      overflow: auto;
      word-break: break-all;
    }
    .ivu-split-horizontal {
      height: 100%;
    }
    .code-mirror-tags {
      background: @bg-color;
      position: relative;
      .tags-item {
        border-bottom: 1px solid #fff;
        position: relative;
        display: inline-block;
        padding: 12px 15px;
        cursor: pointer;
      }
      .tags-item.act {
        color: @font-primary-color;
        background: #fff;
        z-index: 2;
      }
      .tags-item:hover {
        color: @font-pre-color;
      }
      .tags-item-2 {
        display: inline-block;
        float: right;
        cursor: pointer;
      }
      .tags-item-2.act {
        background: @primary-color;
        color: #fff;
      }
    }
    .code-mirror-tags:after {
      content: '';
      height: 1px;
      background: @border-color;
      position: absolute;
      width: 100%;
      left: 0;
      z-index: 1;
      bottom: 0;
    }
  }

  .markdown-layout {
    .markdown-edit-box {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 20px;
      background: @bg-color;
      color: @tree-color;
      border: none;
      outline: none;
      font-size: 14px;
    }
    .md-body-layout {
      overflow: auto;
      background: #fff;
      padding: 0;
      box-shadow: 0 0 4px 1px #e7eaef inset;
    }
    .markdown-operate-layout {
      position: absolute;
      z-index: 2;
      right: 20px;
      top: 10px;
      color: #fff;
      .icon-layout {
        display: inline-block;
        background: rgba(0, 0, 0, 0.7);
        padding: 3px 5px;
        cursor: pointer;
        border-radius: 3px;
        text-align: center;
      }
      .icon-layout.act {
        background: rgba(57, 141, 238, 0.7);
      }
    }
  }
</style>
