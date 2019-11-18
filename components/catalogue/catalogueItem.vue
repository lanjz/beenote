<template>
  <div class="catalogs-layout catalogs-layout-visitor">
    <div
      class="flex align-items-center catalogs-item-layout"
      @click.left="chooseNote(null)"
      :class="{
        'act2': isInChin,
        'catalogs-item-hover': !(isNewDir || renameCatalog)
      }"
    >
      <div class="catalogs-name line-ellipsis">
        <a :href="'#'+curNode.name">{{curNode.name}}</a>
      </div>
    </div>
    <div
      v-if="childList.length">
      <TreeItem
        v-for="(item, index) in childList"
        :key="index"
        :curNode="item"
      ></TreeItem>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'TreeItem',
    props: {
      curNode: {
        type: Object,
        require: true
      },
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        noteCatalogue: state => state.notes.noteCatalogue,
      }),
      childList() {
        return this.noteCatalogue[this.curNode.name] || []
      }
    },
    methods: {

    },
    mounted() {
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

  .catalogs-name {
    position: relative;
    padding: 0 5px;
    a{
      color: inherit;
      text-decoration: none;
    }
  }

  .catalogs-name.b{
    font-weight: bold;
    font-size: 18px;
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

  .catalogs-layout-visitor{
    .catalogs-item-hover:after {
      display: none;
    }
    .catalogs-item-hover:hover {
      background: none;
      color: #3eaf7c;
    }

    .catalogs-item-layout.act2:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 6px;
      display: block;
      background: #3eaf7c;
    }
  }
  #hello_recent {
    font-size: 24px;
  }
</style>
