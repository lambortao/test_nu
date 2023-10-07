<template>
  <div class="swiper-box">
    <SwiperMain
      class="swiper_inner"
      :options="swiperOption"
    >
      <slot name="default" />

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
        autoHeight: true,
        initialSlide: 1,
        autoplay: {
          delay: 3000
        },
        effect: 'fade',
        navigation: {
          nextEl: '.banner-button-next',
          prevEl: '.banner-button-prev'
        }
      }
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
:deep(.swiper-pagination) {
  box-sizing: border-box;
  padding-right: 160px;
  position: absolute;
  right: 50px;
  bottom: 75px;
  text-align: right;
  color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  .swiper-pagination-current {
    color: #fff;
    margin-right: 5px;
  }
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 80px;
  height: 80px;
  right: 30px;
  top:60%;
  transform: translateY(-50%);

  span {
    width: 48px;
    height: 100%;
    margin-right: 27px;
  }
}
:deep(.swiper-button-prev) {
  position: absolute;
  left: 30px;
}
:deep(.swiper-button-prev)::after,:deep(.swiper-button-next)::after {
  content: "";
  width: 18px;
  height: 32px;
  background: url("~/assets/images/home/icon-arrow.png") no-repeat;
  background-size: 100% 100%;
}
:deep(.swiper-button-next)::after {
  transform: rotate(180deg);
}
</style>
