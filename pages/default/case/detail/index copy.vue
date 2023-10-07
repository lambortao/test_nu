<template>
  <div>
    <client-only>
      <div class="container site-is-default ">
        <div class="lunbo">
          <div ref="wrapper" class="anchor-main">
            <div class="maina">
              <swiper v-if="group" ref="swiperTop" class="swiper swiper-b" :options="swiperOption2">
                <swiper-slide v-for="(items, ind) in group" :key="ind">
                  <div :style="`background: url(${items.img}) no-repeat`" class="img" :class="index === ind ? 'active': '' " @click="getUrl(items.img,ind)" />
                </swiper-slide>
              </swiper>
              <div slot="button-prev" class="swiper-button-prev prev" :aria-disabled="false" @click="prev()">
                <div class="arrow-img1" />
              </div>
              <div slot="button-next" class="swiper-button-next next" :aria-disabled="false" @click="next()">
                <div class="arrow-img" />
              </div>
            </div>
            <div ref="personTab" class="anchor-main-box" :style="{ width: `${anchorImgWidth}px` }">
              <div v-if="anchor" class="anchor-box">
                <div v-for="(item, inds) in anchor" :key="inds">
                  <div v-if="item.top !== undefined" :style="{ top: item.top, left: item.left }" class="crile-area">
                    <div v-if="item.top != ''" ref="cr" class="big-cr" @click="showDescribe(item)">
                      <div class="alit">
                        <div class="names">
                          {{ item.option.title_en }}{{ item.option.title }}
                        </div>
                      </div>
                      <div class="small-cr" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="anchor-img">
                <img ref="anchor" :src="url" class="big">
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <div v-if="detailList.label" class="pan">
            <div v-for="(label, index1) in detailList.label" :key="index1" class="label-area">
              <div class="label">
                {{ label }}
              </div>
            </div>
          </div>
          <div class="title">
            <h5>{{ detailList.subtitle }}      {{ detailList.title }}</h5>
          </div>
          <div class="area">
            <div class="country">
              {{ detailList.city }}
            </div>
            <div class="region">
              {{ detailList.country }}
            </div>
          </div>
          <div class="about">
            <h5>关于</h5>
          </div>
          <div class="artlice">
            <p v-if="detailList.content" v-html="detailList.content" />
          </div>
          <div v-if="anchor && anchor.length !== 0" class="titles">
            <h5>相关产品</h5>
          </div>
          <div v-if="anchor && anchor.length !== 0" class="product">
            <div v-for="(item, inds) in anchor" :key="inds" class="pro">
              <NuxtLink
                :to="`/product/detail?id=${item.option.id}`"
              >
                <div v-if="item.top">
                  <div v-if="item.top" :style="{ backgroundImage: `url(${item.option.images[0]})` }" class="img-product" />
                  <div class="name-product">
                    {{ item.option.title_en }}   {{ item.option.title }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <mobile-show class="site-is-mobile" />
    </client-only>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import MobileShow from '~/pages/mobile/case/detail/index.vue'
export default {
  name: 'CaseDetailPage',
  components: {
    MobileShow,
    Swiper,
    SwiperSlide
  },
  data: () => ({
    show: false,
    offsetWidth: '',
    product: [],
    option: {},
    detailList: '',
    url: '',
    group: '',
    index: 0,
    anchor: '',
    title: '',
    isShow: false,
    anchorImgWidth: 0,
    swiperOption: {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    swiperOption2: {
      // loop: true,
      direction: 'vertical',
      slidesPerView: 6,
      mousewheel: true,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'my-button-disabled'
      }
    }
  }),
  async fetch () {
    await this.$store.dispatch('caseDetail/useDetail', this.$route.query.brandId)
    this.getDetailList()
    document.title = document.title + this.titles
  },
  head () {
    return { title: 'Nine United官网-' + this.titles }
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
  },
  methods: {
    personScroll () {
      // this.$refs.personTab.style.width = this.anchorImgWidth + 'px'
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0,
            // click: true,
            scrollX: true,
            maxScrollX: this.anchorImgWidth
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    getImgWidth (url) {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          this.offsetWidth = this.$refs.anchor.offsetWidth
          resolve(this.offsetWidth)
          console.log(this.offsetWidth, 'an')
        }
      })
    },
    async getDetailList () {
      this.detailList = JSON.parse(JSON.stringify(this.Detail))
      this.group = this.detailList.AnchorGroup
      this.url = this.group[0].img
      this.anchorImgWidth = await this.getImgWidth(this.url)
      this.$nextTick(() => {
        this.personScroll()
      })
      this.anchor = this.group[this.index].anchor
      console.log(this.anchorImgWidth, 'ssss')
      console.log(this.$refs.sw, 'hhhhh')
    },
    async getUrl (url, index) {
      console.log(index, 'indddddd')
      this.url = url
      this.anchorImgWidth = await this.getImgWidth(this.url)
      this.$nextTick(() => {
        this.personScroll()
      })
      this.index = index
      this.anchor = await this.group[index].anchor
      console.log(this.anchor, 'aaannannnnsddfdd')
      this.product = []
      this.title = ''
    },
    async next () {
      console.log(this.group.length, 'lengthhhhhhhhhhhhhhhhhh')
      if (this.index < this.group.length - 1) {
        this.index++
      } else {
        this.index = this.group.length - 1
      }
      this.url = this.group[this.index].img
      this.anchorImgWidth = await this.getImgWidth(this.url)
      this.anchor = await this.group[this.index].anchor
      this.$nextTick(() => {
        this.personScroll()
      })
      this.product = []
      this.title = ''
      console.log(this.url, 'url')
    },
    async prev () {
      if (this.index > 1) {
        this.index--
      } else {
        this.index = 0
      }
      this.url = this.group[this.index].img
      this.anchorImgWidth = await this.getImgWidth(this.url)
      this.anchor = await this.group[this.index].anchor
      this.product = []
      this.title = ''
      this.$nextTick(() => {
        this.personScroll()
      })
    },
    getIndex () {
      const sw = this.$refs.swiperTop.$swiper
      console.log(sw.realIndex, 'ddd')
    },
    showDescribe (item) {
      if (item.option.length !== 0) {
        this.product = item.option
        this.title = item.option.title
      } else {
        this.product = []
        this.title = ''
      }
    },
    close () {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/case.scss";
</style>
