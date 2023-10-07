<template>
  <div class="container">
    <Menu />
    <section>
      <NuxtChild />
    </section>
    <Footer />
  </div>
</template>

<script>
import Menu from '~/componentsEn/AAMobile/Menu/index.vue'
import Footer from '~/componentsEn/AAMobile/Footer/index.vue'
export default {
  name: 'IndexPage',
  components: {
    Menu,
    Footer
  }
}
</script>
