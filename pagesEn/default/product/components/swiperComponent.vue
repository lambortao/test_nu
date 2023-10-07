<template>
  <div class="swiper-box">
    <SwiperMain class="swiper_inner" :options="swiperOption" @onSwiper="onSwiper">
      <slot name="default" />
    </SwiperMain>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 65,
        grabCursor: true
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

.swiper_inner{
  padding: 0 150px;
}
:deep(.swiper-pagination) {
  span {
    background-color: rgba($color: #fff, $alpha: 0.4);
    opacity: 1;
    border-radius: vw(2.5);
    width: vw(5);
    height: vw(5);
    transition: all 300ms ease;
    margin: 0 vw(2) !important;
  }
  span.swiper-pagination-bullet-active {
    width: vw(16);
    background-color: rgba($color: #fff, $alpha: 1);
  }
}
</style>
