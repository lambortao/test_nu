<template>
  <div class="swiper-box">
    <SwiperMain
      ref="videoSwiper"
      class="swiper_inner"
      :options="swiperOption"
    >
      <slot name="default" />
      <div class="swiper-button-prev" />
      <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
      <div class="swiper-button-next" />
    </SwiperMain>
  </div>
</template>

<script>
export default {
  data () {
    const self = this
    return {
      swiperOption: {
        loop: false,
        // autoplay: true,
        effect: 'fade',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChange () {
            self.activeIndex = this.realIndex
          }
        }
      },
      activeIndex: 0
    }
  },
  watch: {
    activeIndex () {
      this.$emit('slideChage', this.activeIndex)
    }
  },
  methods: {
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
  width: 48px;
  height: 24px;
  right: 160px;
  span {
    width: 48px;
    height: 100%;
    margin-right: 27px;
  }
}
:deep(.swiper-button-prev) {
  position: absolute;
  left: 64px;
}
:deep(.swiper-button-next) {
  right: 64px;
}
:deep(.swiper-button-prev)::after {
  content: "";
  width: 18px;
  height: 32px;
  background: url("~/assets/images/home/icon-arrow.png") no-repeat;
  background-size: 100% 100%;
}
:deep(.swiper-button-next)::after {
  content: "";
  width: 18px;
  height: 32px;
  background: url("~/assets/images/home/icon-arrow.png") no-repeat;
  background-size: 100% 100%;
  transform: rotate(180deg);
}
</style>
