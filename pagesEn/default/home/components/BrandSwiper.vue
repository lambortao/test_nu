<template>
  <div class="swiper-box">
    <SwiperMain
      class="swiper_inner"
      :options="swiperOption"
      :reverse="reverse"
      @onSwiper="onSwiper"
    >
      <slot name="default" />
    </SwiperMain>
  </div>
</template>

<script>
export default {
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        direction: 'vertical',
        spaceBetween: 50,
        wdith: 450,
        height: 450,
        speed: 5000, // 匀速时间
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: true,
          reverseDirection: this.reverse
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

.swiper-box {
  position: relative;
  .swiper_inner {
    width: 100%;
    padding: 0;
  }
}
:deep(.swiper-wrapper){
-webkit-transition-timing-function: linear; /*之前是ease-out*/
    -moz-transition-timing-function: linear;
    -ms-transition-timing-function: linear;
    -o-transition-timing-function: linear;
    transition-timing-function: linear;
}
:deep(.swiper-slide){
  overflow: hidden;
  display: flex;
  align-items: center;
}
</style>
