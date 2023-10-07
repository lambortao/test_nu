<template>
  <div>
    <error-alert />
    <div :class="['container', theme]">
      <Menu class="site-is-default" />
      <MobileMenu class="site-is-mobile" />
      <NuxtChild />
      <Footer class="site-is-default" />
    </div>
    <loading-page />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingPage from '~/components/PageLoading/index.vue'

import MobileMenu from '~/components/AAMobile/Menu/index.vue'

export default {
  name: 'IndexPage',
  components: {
    LoadingPage,
    MobileMenu
  },
  computed: {
    ...mapState({
      theme: state => state.site.theme,
      isMobile: state => state.site.isMobile
    })
  }
}
</script>
