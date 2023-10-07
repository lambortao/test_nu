<template>
  <div>
    <div class="site-is-default">
      PC端
    </div>
    <mobile-detail class="site-is-mobile" />
  </div>
</template>

<script>
import MobileDetail from '~/pagesEn/mobile/store/search.vue'
export default {
  name: 'DetailPage',
  components: {
    MobileDetail
  }
}
</script>
