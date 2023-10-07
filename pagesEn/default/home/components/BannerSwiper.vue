<template>
  <div class="swiper-box">
    <SwiperMain
      class="swiper_inner"
      :options="swiperOption"
      @onSwiper="onSwiper"
    >
      <slot name="default" />
      <!-- <div
        slot="pagination"
        class="swiper-pagination"
      /> -->
      <div class="swiper-button-prev banner-button-prev" />
      <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
      <div class="swiper-button-next banner-button-next" />
    </SwiperMain>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: true,
        autoHeight: true,
        effect: 'fade',
        navigation: {
          nextEl: '.banner-button-next',
          prevEl: '.banner-button-prev'
        }
      }
    }
  },
  methods: {
    onSwiper (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/home/bannerSwiper.scss';
</style>
