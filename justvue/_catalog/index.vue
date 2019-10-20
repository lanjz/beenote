<template>
  <notedCom></notedCom>
</template>

<script>
  import notedCom from '../../pages/_user/_book/_/index.vue'

  export default {
    components: {
      notedCom
    },
      fetch () {
        console.log('fetch1')
      },
      mounted() {
        console.log(1)
      }
  }
</script>

<style scoped>

</style>
