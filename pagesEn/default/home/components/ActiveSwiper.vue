<template>
  <div class="swiper-box">
    <SwiperMain
      class="swiper_inner"
      :options="swiperOption"
      @onSwiper="onSwiper"
    >
      <slot name="default" />
    </SwiperMain>
    <div class="active-button-prev swiper-button-prev" />
    <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
    <div class="active-button-next swiper-button-next" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 50,
        navigation: {
          nextEl: '.active-button-next',
          prevEl: '.active-button-prev'
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
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  position: absolute;
  width: 48px;
  height: 24px;
  right: 160px;
  span {
    width: 48px;
    height: 100%;
    margin-right: 27px;
  }
}
:deep(.swiper-button-prev){
  left: 60px;
}
:deep(.swiper-button-next){
  right: 60px;
}
:deep(.swiper-button-prev)::after,:deep(.swiper-button-next)::after{
  content: "";
  width: 18px;
  height: 32px;
  background: url("~/assets/images/home/icon-arrow-dark.png") no-repeat;
  background-size: 100% 100%;
}
:deep(.swiper-button-next)::after{
  transform: rotate(180deg);
}
</style>
