<template>
  <div class="swiper-box">
    <SwiperMain :options="swiperOption" @onSwiper="onSwiper">
      <slot name="default" />
      <div slot="pagination" class="swiper-pagination" />
    </SwiperMain>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
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
:deep(.swiper-pagination) {
  span {
    background-color: rgba($color: #fff, $alpha: 0.4);
    opacity: 1;
    border-radius: mvw(2.5);
    width: mvw(5);
    height: mvw(5);
    transition: all 300ms ease;
    margin: 0 mvw(2) !important;
  }
  span.swiper-pagination-bullet-active {
    width: mvw(16);
    background-color: rgba($color: #fff, $alpha: 1);
  }
}
</style>
