<template>
  <div class="controller-layout-fixed">
    <div
      class="controller-layout-item"
      @click.stop="doSetConfig('showDir')"
      :class="{'act' : showDir}"><i class="iconfont icon-neirong"></i></div>
    <div
      class="controller-layout-item"
      @click.stop="doSetConfig('showBrief')"
      :class="{'act' : showBrief}"><i class="iconfont icon-shujia1"></i></div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import * as MUTATIONS from '../../store/const/mutaions'
  export default {
    name: 'articleFixed',
    computed: {
      ...mapState({
        showDir: state => state.config.showDir,
        showBrief: state => state.config.showBrief,
      })
    },
    methods: {
      ...mapMutations([
        MUTATIONS.CONFIG_TOGGLE_SAVE
      ]),
      doSetConfig(tar) {
        this[MUTATIONS.CONFIG_TOGGLE_SAVE]({
          tar,
          val: !this[tar]
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .controller-layout-fixed{
    position: fixed;
    bottom: 50px;
    left: 0;
    z-index: 10;
    .controller-layout-item{
      width: 30px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      background: @tree-color;
      border-radius: 0 20px 20px 0;
      margin-bottom: 10px;
      text-align: center;
    }
    .iconfont{
      font-size: 18px;
    }
    .controller-layout-item.act{
      background:#FFF;
    }
  }
</style>
