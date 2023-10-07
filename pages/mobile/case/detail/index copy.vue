<template>
  <div class="container">
    <swiper ref="swiperTop" class="swiper gallery-top" :options="swiperOptionTop">
      <swiper-slide v-for="(items, ind) in detailList.images" :key="ind" class="slide-1">
        <img :src="items" class="banner">
        <div v-if="false" class="more" @click="toDetail(detailList.alias)">
          <div class="cont">
            搭配细节
          </div>
          <div class="arrow">
            <img src="~/assets/images/AAmobile/case/arrow-right-line.png">
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="thumbs">
      <swiper ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs">
        <swiper-slide v-for="(items, ind) in detailList.images" :key="ind" class="slide-1">
          <div :style="{ backgroundImage: `url(${items})` }" class="case" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="main">
      <div class="title">
        <h5>
          {{ detailList.subtitle }}        {{ detailList.title }}
        </h5>
      </div>
      <div class="area">
        <span>
          {{ detailList.city }}
          <span class="city">
            {{ detailList.country }}
          </span>
        </span>
      </div>
      <div v-if="detailList.label" class="label-area">
        <div v-for="(item, indexz) in detailList.label" :key="indexz" class="labels">
          <div class="label">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="about">
        <h5>
          关于
        </h5>
      </div>
      <div class="article">
        <p v-html="detailList.content" />
      </div>
      <div class="title">
        <h5>
          相关产品
        </h5>
      </div>
    </div>
    <div>
      <div class="product">
        <div class="children">
          <img src="~/assets/images/AAmobile/case/pro1.png">
          <div class="name">
            <h5>
              Pandarine 3 Seater
            </h5>
          </div>
          <div class="brands">
            ＆Tradition
          </div>
        </div>
        <div class="children">
          <img src="~/assets/images/AAmobile/case/pro1.png">
          <div class="name">
            <h5>
              Pandarine 3 Seater
            </h5>
          </div>
          <div class="brands">
            ＆Tradition
          </div>
        </div>
        <div class="children">
          <img src="~/assets/images/AAmobile/case/pro1.png">
          <div class="name">
            <h5>
              Pandarine 3 Seater
            </h5>
          </div>
          <div class="brands">
            ＆Tradition
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'ShowPage',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      detailList: '',
      swiperOptionTop: {
        spaceBetween: 10
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  async fetch () {
    // this.getDetailList()
    await this.$store.dispatch('caseDetail/useDetail', this.$route.query.brandId)
    this.detailList = JSON.parse(JSON.stringify(this.Detail))
    document.title = document.title + this.titles
    console.log(this.detailList, 'DETAILddddd', this.Detail)
  },
  head: {
    title: 'Nine United官网-'
  },
  computed: {
    Detail () {
      return this.$store.getters['caseDetail/getDetail']
    },
    titles () {
      return this.$store.getters['caseDetail/getDetailTitle']
    }
  },
  watch: {
    /** 监听路由变化的操作 */
    '$route.query': '$fetch'
  },
  created () {
    // this.getDetailList()
  },
  mounted () {
    window.scrollTo(0, 0)
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
  methods: {
    onSwiper (e) {
      console.log(e)
    },
    tapThumbEvent () {
      console.log(this.$refs.thumbsSwiper.$swiper.realIndex)
    },
    onThumbsSwiper (swiper) {
    },
    getDetailList () {
      this.detailList = JSON.parse(JSON.stringify(this.Detail))
    },
    toDetail (brandId) {
      const url = this.detailList.images[this.$refs.swiperTop.$swiper.realIndex]
      this.$router.push({ path: '/branddetail', query: { brandId, url } }, () => { }, () => { })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand-show.scss';

img {
  width: 100%;
  object-fit: contain;
}
</style>
