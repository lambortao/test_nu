<template>
  <div class="container">
    <div class="container site-is-default ">
      detail
    </div>
    <mobile-detail class="site-is-mobile" />
  </div>
</template>
<script>
import MobileDetail from '~/pagesEn/mobile/case/detail/detail.vue'
export default {
  name: 'DetailPage',
  components: {
    MobileDetail
  }
}
</script>
