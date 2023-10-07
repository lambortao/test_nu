<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'BrandPage',
  computed: {
    isMobile () {
      return this.$store.state.site.isMobile
    }
  }
}
</script>
