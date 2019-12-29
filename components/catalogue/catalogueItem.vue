<template>
  <div class="catalogs-layout">
    <div
      class=""
    >
      <div class="catalogs-name" :class="{'act': act, 'actDot': actDot}">
        <a :href="'#'+curNode.name.toLowerCase()" @click="chooseHash">{{curNode.name}}</a>
      </div>
    </div>
    <div
      v-if="childList.length">
      <TreeItem
        v-for="(item, index) in childList"
        :key="index"
        :curNode="item"
        :actHash="actHash"
      ></TreeItem>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import bus from '../../utils/client/global/eventBus'
  export default {
    name: 'TreeItem',
    props: {
      curNode: {
        type: Object,
        require: true
      },
      actHash: {
        type: Object
      },
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        noteCatalogue: state => state.notes.noteCatalogue,
        curNote: state => state.notes.curNote,
      }),
      childList() {
        return this.noteCatalogue[this.curNote][this.curNode.name] || []
      },
      act() {
        let curName = this.actHash.name
        return curName && curName.toLowerCase() === this.curNode.name.toLowerCase()
      },
      actDot() {
        let curName = this.actHash.type === '##' ? this.actHash.parent : this.actHash.name
        return curName && curName.toLowerCase() === this.curNode.name.toLowerCase()
      }
    },
    methods: {
      chooseHash() {
        bus.$emit('chooseHash', this.curNode)
      }
    },
  }
</script>
<style lang="less" scoped>
  .catalogs-layout {
    font-size: 15px;
    position: relative;
    .catalogs-layout {
      padding-left: 20px;
      .catalogs-name:after {
        display: none;
      }
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    .catalogs-name {
      position: relative;
      padding: 7px 7px 7px 20px;
      max-width: 200px;
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    /*.catalogs-name:after {
      content: '';
      width: 7px;
      height: 7px;
      background:  #3eaf7c;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(1px, -50%);
      border-radius: 50%;
      opacity: 0.5;
    }*/
    .catalogs-name.act{
      color: #3eaf7c;
    }
    .catalogs-name.actDot:after{
      width: 10px;
      height: 10px;
      transform: translateY(-50%);
      opacity: 1;
    }
  }
  /*.catalogs-layout:before {
    content: '';
    width: 1px;
    background: #3eaf7c;
    position: absolute;
    left: 4px ;
    height: 100%;
    opacity: 0.5;
  }*/
  .catalogs-layout:last-child:before{
    /*transform: translateY(-50%);*/
  }

  .catalogs-layout:first-child:before{
    /*transform: translateY(50%);*/
  }


</style>
