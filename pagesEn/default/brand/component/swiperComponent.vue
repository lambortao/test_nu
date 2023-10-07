<template>
  <div class="swiper-box">
    <SwiperMain
      class="swiper_inner"
      :options="swiperOption"
      @onSwiper="onSwiper"
    >
      <slot name="default" />
      <div class="swiper-button-prev">
        <span>
          <img
            src="~/assets/images/icon/prev_shot.png"
            alt=""
          >
        </span>
        <p>
          WIM<br>
          RIETVELD
        </p>
      </div>
      <div class="swiper-button-next">
        <p>
          WIM<br>
          RIETVELD
        </p>
        <span>
          <img
            src="~/assets/images/icon/prev_shot.png"
            alt=""
          >
        </span>
      </div>
    </SwiperMain>
  </div>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        loop: true,
        effect: 'fade',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
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

.swiper_inner {
  padding: 0 150px;
}
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 250px;
  height: 24px;
  span {
    width: 48px;
    height: 100%;
    margin-right: 27px;
  }
  p {
    color: #000;
  }
}
// :deep(.swiper-button-prev) {
//   // left: 80px;
// }
:deep(.swiper-button-next) {
  span {
    transform: rotate(-180deg);
  }
}
:deep(.swiper-button-prev)::after,:deep(.swiper-button-next)::after{
  content: "";
}
</style>
