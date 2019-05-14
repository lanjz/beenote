<template>

</template>

<script>
  export default {
    mounted() {
      const {bookId} = $nuxt._route.params
      this.$router.push(`/${bookId}/recently/`)
    }
  }
</script>

<style scoped>

</style>
