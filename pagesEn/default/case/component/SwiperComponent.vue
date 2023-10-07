<template>
  <div class="swiper-box">
    <SwiperMain
      class="swiper_inner"
      :options="swiperOption"
      @onSwiper="onSwiper"
    >
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
        loop: true,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
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
