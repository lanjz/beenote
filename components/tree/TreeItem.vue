<template>
  <div class="catalogs-layout" :class="isVisitor?'visitor':'edit'">
    <div
      class="flex align-items-center catalogs-item-layout"
      @click.left="chooseCatalog(null)"
      @click.right.stop.prevent="(e) => showOperateMenu(e)"
      :class="{
        'act': isInChin,
        'catalogs-item-hover': !(isNewDir || renameCatalog)
      }"
    >
      <!--左边三角-->
      <div
        class="has-child"
        :class="{
        'in-chain': isOpen,
      }"
        @click.stop="toggleOpenDir(false)"
        v-if="hasChild"></div>
      <i
        class="iconfont"
        :class="isInChin?'icon-wenjianjia':'icon-wendang1'"
        v-if="!isVisitor"></i>
      <!--   <div class="iconfont" v-else>
           <svg class="icon icon-close" aria-hidden="true">
             <use xlink:href="#icon-wenjian2"></use>
           </svg>
           <svg class="icon  icon-open" aria-hidden="true">
             <use xlink:href="#icon-wenjian-"></use>
           </svg>
         </div>-->
      <input
        v-if="curNode.isNew||renameCatalog"
        v-model.trim="renameValue"
        class="edit-catalogs-input line-ellipsis"
        @blur="doRename"
        @click="(e) => e.stopPropagation()"
        v-focus:select

      />
      <div v-else class="catalogs-name line-ellipsis" :class="curNode.type">{{curNode.name}}</div>
      <div class="operate-triangle-btn"
           @click.left.stop="(e) => showOperateMenu(e)"
           v-if="!curNode.icon"
      >
        <i class="iconfont icon-tianjiajiahaowubiankuang"></i>
      </div>
      <div class="catalog-operate-layout" v-click-outside="closeMenu" :style="operateMenuStyle"
           v-if="operateMenuStyle.left !== -1">
        <div class="catalog-operate-item" @click.stop="todoCreateFile()">
          新建笔记
        </div>
        <div class="catalog-operate-item" @click.stop="doCreateTemDir">新建文件夹</div>
        <!--<div class="catalog-operate-item" @click.stop="todoRename" v-if="curNode.path !== 'root'">重命名</div>-->
        <!--<div class="catalog-operate-item" @click.stop="todoDelete" v-if="curNode.path !== 'root'">删除</div>-->
      </div>
    </div>
    <div
      v-if="childList.length">
      <TreeItem
        v-show="isOpen"
        v-for="(item, index) in childList"
        :key="index"
        :curNode="item"
        @toInitOpenCatalog="initOpenCatalog"
      ></TreeItem>
    </div>
    <TreeItem
      v-if="doNewDir"
      :curNode="newDir"
      @emitExitNewDir="exitNewDir"
      :isNewDir="doNewDir"
    ></TreeItem>
    <div class="loading-tree" v-if="isLoading">
      <svg class="loading-circular" viewBox="25 25 50 50">
        <circle class="loading-circular-path" cx="50" cy="50" r="20" fill="none"/>
      </svg>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  import * as ACTIONS from '../../store/const/actions'
  import bus from '../../utils/client/global/eventBus'
  import constKey from '../../utils/client/const'
  import {findDirPath} from "../../utils/client/blackHole";

  export default {
    name: 'TreeItem',
    props: {
      curNode: {
        type: Object,
        require: true
      },
      isNewDir: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data() {
      return {
        renameCatalog: false,
        operateMenuStyle: {left: -1, top: '50%'},
        renameValue: '',
        newDir: {
          name: '新建文件夹',
          show: false,
          isNew: true
        },
        clickOpen: '',
        doNewDir: false,
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        catalogs: state => state.catalogs.list,
        catalogsIsOpen: state => state.catalogs.isOpen,
        actCatalog: state => state.catalogs.curCatalog,
        schemaList: state => Object.values(state.schema.list).filter(item => item.fields.length),
        curBook: state => state.books.curBook,
        curNote: state => state.notes.curNote,
        catalogMapNotes: state => state.catalogs.catalogMapNotes
      }),
      ...mapGetters('catalogs', ['treeChainList']),
      ...mapGetters('user', ['githubName', 'isVisitor']),
      hasChild() {
        if(this.isVisitor) {
          return this.curNode.type === 'dir'
        }
        return this.childList && this.childList.length
        const path = `${this.curNode['repo']}/${this.curNode['path']}`
        return this.catalogs[path]
          && this.catalogs[path]['childNodes']
          && this.catalogs[path]['childNodes'].length
      },
      isOpen() {
        if(!this.clickOpen) {
          return this.isInChin
        }
        return this.clickOpen === 1 ? false : true
      },
      isInChin() {
        if(this.curNode.type === 'dir') {
          return this.actCatalog && this.actCatalog.indexOf(this.curNode.fullPath) > -1
        }
        return `${this.githubName}/${this.curNode.fullPath}` === this.curNote
      },
      childList() {
        if(this.curNode.type !== 'dir') return []
        const files = (this.catalogMapNotes || {})[this.curNode['fullPath']] || []
        const child = (this.catalogs[this.curNode['fullPath']] || {}).childNodes || []
        return [...files, ...child]
      }
    },
    watch: {
      curNode: {
        handler() {
//          this.getDate()
        },
        deep: true
      }
    },
    methods: {
      ...mapMutations('catalogs', [
        MUTATIONS.CATALOGS_CUR_SAVE,
        MUTATIONS.CATALOGS_TEMPLATE_CREATE,
        MUTATIONS.CATALOGS_OPEN_TOGGLE,
        MUTATIONS.CATALOGS_OPEN_RESET,
        MUTATIONS.CATALOGS_SAVE,
        MUTATIONS.CATALOGS_NOTE_MAP_SAVE,
      ]),
      ...mapMutations('notes', [
        MUTATIONS.NOTE_CUR_UPDATE,
      ]),
      ...mapActions('catalogs', [
        ACTIONS.CATALOGS_GET,
        ACTIONS.CATALOGS_GET_CUR,
        ACTIONS.CATALOGS_PUT,
        ACTIONS.CATALOGS_POST,
        ACTIONS.CATALOGS_DELETE
      ]),
      ...mapActions('articles', [
        ACTIONS.ARTICLE_RECENTLY_LIST_GET,
      ]),
      ...mapActions('notes', [
        ACTIONS.NOTE_DELETE
      ]),
      async toggleOpenDir(force = false, catalogId) {
        if(force) {
          this.clickOpen = 2
          return
        }
        if(this.clickOpen !== 2) {
          // 通过是否有文件即使是空数组还判断是否已经请求过该目录
          if(!this.catalogMapNotes[this.curNode.fullPath]) {
            this.isLoading = true
            await this[ACTIONS.CATALOGS_GET_CUR]({
              getChild: false,
              path: this.curNode.path
            })
            this.isLoading = false
          }
        }
        this.clickOpen = this.clickOpen === 2 ? 1 : 2
      },
      async chooseCatalog(item) {
        if(this.isVisitor) {
          this.toggleOpenDir()
          return
        }
        this.toggleOpenDir(true)
        this[MUTATIONS.CATALOGS_CUR_SAVE](`${this.curNode.fullPath}`)
        bus.$emit('emitFromCatalog', item || {
          ...this.curNode,
        })
      },
      async getRecentlyArticles() {
        this.$showLoading()
        await this[ACTIONS.ARTICLE_RECENTLY_LIST_GET]()
        this.$hideLoading()
        this[MUTATIONS.CATALOGS_CUR_SAVE]('recently')
      },
      showOperateMenu(e) {
        // if (this.curNode.icon) return
        const {clientX, clientY} = e
        this.operateMenuStyle = {
          top: `${clientY}px`,
          left: `${clientX}px`
        }
      },
      closeMenu() {
        this.operateMenuStyle.left = -1
      },
      todoRename() {
        this.renameValue = this.curNode.name
        this.closeMenu()
        this.renameCatalog = true
      },
      todoCreateFile() {
        this.closeMenu()
        this[MUTATIONS.CATALOGS_CUR_SAVE](this.curNode.fullPath)
        bus.$emit('emitFromCatalog', {
          isNew: 1
        })
        // this.$router.push(`/${this.githubName}/${this.actCatalog}?type=dir&new=1`)
      },
      todoDelete() {
        this.closeMenu()
        console.log(11)
        const combine = [
          ...(this.catalogMapNotes[this.curNode.fullPath] || []),
          ...(this.catalogs[this.curNode.fullPath].childNodes || [])
        ]
        if(combine.length){
          this.$alert(
            {
              title: '该目录存在文件，不可删除',
              showCancel: false
            }
          )
          return
        }
        this.$alert({
          title: `你确认要删除"${this.curNode.name}"`
        })
          .then(async res => {
            this.doDeleteCatalog()
          })
      },
      async doDeleteCatalog() {
        this.$showLoading()
        const result = await this[ACTIONS.NOTE_DELETE](this.curNode)
        if (!result.err) {
          this.$toast({
            title: '删除成功'
          })
          await this[ACTIONS.CATALOGS_GET]({
            force: true,
            path: findDirPath(this.curNode.path),
            getChild: false
          })
        }
        this.$hideLoading()
      },
      /**
       * 重命名input失去焦点时
       * */
      doRename() {
        this.renameCatalog = false
        if (this.isNewDir) {
          this.addCatalog(this.renameValue, this.curNode.parentPath)
          return
        }
        if (this.renameValue && this.renameValue !== this.curNode.name) {
          this.modifyCatalogName(this.renameValue, this.curNode)
        }
      },
      submitCatalogName(name, item) {
        const {isNew} = item
        if (!isNew) {
          this.modifyCatalogName(name, item)
          return
        }
        this.addCatalog(name, item)
      },
      async modifyCatalogName(name, item) {
        const {_id, parentId} = item
        const result = await this[ACTIONS.CATALOGS_PUT]({
          _id: _id,
          name,
          parentId
        })
        if (!result.err) {
          this.getDate(item, true, true)
        }
      },
      async addCatalog(name, parentPath) {
        const getData = (this.catalogs[parentPath] && this.catalogs[parentPath].childNodes) ?
          this.catalogs[parentPath].childNodes : []
        const curPath = `${parentPath.substring(this.curBook.length+1)}/${name}`
        const data = [
          ...getData,
          {
            path: curPath,
            fullPath: `${parentPath}/${name}`,
            name: `${name}`,
            type: 'dir',
            rootModifyPath: this.curNode.rootModifyPath
          }
        ]
        this[MUTATIONS.CATALOGS_SAVE]({
          key: parentPath,
          data
        })
        this[MUTATIONS.CATALOGS_NOTE_MAP_SAVE]({
          key: `${parentPath}/${name}`,
          data: []
        })
        this.$emit('emitExitNewDir')
      },
      exitNewDir() {
        this.newDir.parentPath = ''
        this.doNewDir = false
      },
      doCreateTemDir() {
        this.toggleOpenDir(true)
        this.closeMenu()
        this.doNewDir = true
        console.log('this.curNode.fullPath', this.curNode.fullPath)
        this.newDir.parentPath = this.curNode.fullPath
        this.newDir.rootModifyPath = this.curNode.rootModifyPath || this.curNode.path
      },
      async getDate(treeNode, isParentId, force) {
        const params = treeNode || this.curNode
        await this[ACTIONS.CATALOGS_GET]({
          parentId: isParentId ? params.parentId || 'root' : params._id,
          bookId: this.curBook,
          force
        })
      },
      initOpenCatalog() {
        // this.toggleOpenDir(true, this.curNode.parentId)
      },
      init() {
        const {catalogId} = $nuxt._route.params
        if (catalogId === this.curNode._id) {
          this.initOpenCatalog()
          this.$emit('toInitOpenCatalog')
        }
        // 如果就新建文件夹则直接执行todoRename函数
        if (this.isNewDir) {
          this.todoRename()
        }
        document.addEventListener('click', (e) => {
          !this.$el.contains(e.target)
        })
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
<style lang="less" scoped>
  .catalogs-layout {
    .catalogs-layout {
      padding-left: 20px;
      margin-top: 1px;
    }
  }

  .iconfont {
    font-size: 25px;
    position: relative;
  }

  .catalogs-item-layout {
    cursor: pointer;
    padding: 7px 25px;
    position: relative;
    transition: .3s;

    .icon-open {
      display: none;
    }

    .icon-close {
      display: block;
    }
  }

  .catalogs-item-layout:after {
    content: '';
    background: transparent;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: -100%;
    transition: .3s;
  }

  .operate-triangle-btn {
    display: none;
    position: absolute;
    /*    border-left: solid 6px @tree-color;
        border-top: solid 5px transparent;
        border-bottom: solid 5px transparent;*/
    width: 16px;
    height: 16px;
    right: 12px;
    top: 50%;

    .iconfont {
      font-size: 15px;
    }

    transform: translateY(-50%);
  }

  // 有子文件夹且未打开
  .catalogs-item-layout .has-child {
    position: absolute;
    border-left: solid 6px @tree-color;
    border-top: solid 5px transparent;
    border-bottom: solid 5px transparent;
    width: 0;
    height: 0;
    left: 12px;
    top: 50%;
    transform: translateY(-6px);
    transition: .2s;
  }

  .catalogs-item-layout .has-child:after {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  // 有子目录且打开状态
  .catalogs-item-layout .has-child.in-chain {
    transform: translateY(-6px) rotate(90deg);
  }

  /*  .catalogs-item-layout.act.has-child:before{
      border-left: solid 6px @tree-light-color;
    }*/


  .visitor{
    .act {
      .catalogs-name{
        color: #7eb59c;
      }
      .catalogs-name.file{
        color: #3eaf7c;
      }
    }
  }
  .edit{
    .catalogs-item-hover:hover {
      background: @tree-hover-bg-color;
      color: @tree-light-color;
    }

    .catalogs-item-hover:hover .operate-triangle-btn {
      display: block;
      color: @tree-light-color;
    }

    .catalogs-item-hover:hover:after {
      background: @tree-hover-bg-color;
    }
    .catalogs-item-layout.act {
      background: @tree-light-bg-color;
      color: @tree-light-color;

      .icon-open {
        display: block;
      }

      .icon-close {
        display: none;
      }
    }
    .catalogs-item-layout.act:hover {
      background: @tree-light-bg-color;
    }

    .catalogs-item-layout.act:hover:after {
      background: @tree-light-bg-color;
    }

    .catalogs-item-layout.act:after {
      background: @tree-light-bg-color;
    }

  }
  .catalogs-name {
    position: relative;
    max-width: 150px;
    padding: 0 5px;
  }

  .edit-catalogs-input {
    position: relative;
    z-index: 1;
    max-width: 150px;
    background: transparent;
    vertical-align: bottom;
    border: none;
    color: inherit;
    font-size: inherit;
    height: 25px;
    padding: 0 5px;
  }

  // 右键类型菜单
  .catalog-operate-layout {
    position: fixed;
    background: rgba(0, 0, 0, 0.8);
    left: 50%;
    top: 50%;
    color: #fff;
    z-index: 999;
    border-radius: 5px;

    .catalog-operate-item {
      width: 150px;
      padding: 10px 20px;
      position: relative;
    }

    .catalog-operate-item:not(:last-child) {
      border-bottom: solid 1px rgba(255, 255, 255, .2);
    }

    .catalog-operate-item.hadChild:after {
      content: '';
      position: absolute;
      border-left: solid 4px #fff;
      border-top: solid 4px transparent;
      border-bottom: solid 4px transparent;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .catalog-operate-item:hover .operate-item-child {
      display: block;
    }

    .operate-item-child {
      position: absolute;
      left: 100%;
      top: 0;
      width: 100%;
      border-radius: 0 5px 5px 0;
      background: rgba(0, 0, 0, 0.8);
      border-left: solid 1px rgba(255, 255, 255, .2);
      display: none
    }

    .catalog-operate-item.builtIn {
      border-bottom: solid 1px rgba(255, 255, 255, .6);
    }
  }

  #hello_recent {
    font-size: 24px;
  }
  .loading-tree{
    padding-left: 25px;
  }
</style>
