<template>
  <div :class="['container', { theme }]">
    <Menu />
    <section>
      <Nuxt />
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style lang="scss">

</style>
