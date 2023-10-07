<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <client-only>
      <div class="container site-is-default ">
        <div ref="wrapper" class="anchor-main">
          <div ref="anchorMain" class="anchor-main-box">
            <div>
              <img ref="selectedImg" :src="anchorGroup[selectedIndex].img" alt="">
              <div
                v-if="anchorGroup[selectedIndex].anchor && anchorGroup[selectedIndex].anchor.length && anchorGroup[selectedIndex].anchor[0].top"
                class="anchor-box"
                :style="anchorBoxStyle"
              >
                <span v-for="item in anchorGroup[selectedIndex].anchor" :key="item.top" :style="{ top: item.top, left: item.left }">
                  <span :class="parseInt(item.left) < 50 ? 'right' : 'left'" :style="{ width: `${getTextWidth(item.option.title_en)}px` }">{{ item.option.title_en }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="selected-img">
            <div
              :class="['prev-button', 'arrow-btn', { disabled: selectedIndex === 0}]"
              style="cursor: pointer"
              @click="$store.commit('case/stepByIndex', -1)"
            >
              <img src="~/assets/images/case/arraw.png" alt="">
            </div>
            <div ref="AnchorGroupMain" class="selected-img-content" :style="{ height: getAnchorGroupHeight }">
              <section>
                <figure
                  v-for="(items, ind) in anchorGroup"
                  :key="items.img"
                  class="swiper-singin-img"
                  :class="[{ active: selectedIndex === ind }]"
                  @click="$store.commit('case/setDetailIndex', ind)"
                >
                  <img :src="items.img" alt="">
                </figure>
              </section>
            </div>
            <div
              :class="['nuxt-button', 'arrow-btn', { disabled: selectedIndex === anchorGroup.length - 1}]"
              style="cursor: pointer"
              @click="$store.commit('case/stepByIndex', 1)"
            >
              <img src="~/assets/images/case/arraw.png" alt="">
            </div>
          </div>
        </div>
        <div class="main">
          <div class="title">
            <h5>{{ caseDetail.subtitle_en }}      {{ caseDetail.title_en }}</h5>
          </div>
          <div class="area">
            <div class="country">
              {{ caseDetail.city_en }}
            </div>
            <div class="region">
              {{ caseDetail.country_en }}
            </div>
          </div>
          <div v-if="caseDetail.label && caseDetail.label.length" class="pan">
            <div v-for="(label, index1) in caseDetail.label" :key="index1" class="label-area">
              <div class="label">{{ label }}</div>
            </div>
          </div>
          <div class="artlice">
            <p v-if="caseDetail.content_en" v-html="caseDetail.content_en" />
          </div>
          <div
            v-if="
              anchorGroup[selectedIndex].anchor
                && Array.isArray(anchorGroup[selectedIndex].anchor)
                && anchorGroup[selectedIndex].anchor.length
                && anchorGroup[selectedIndex].anchor[0].option
            "
            class="anchor-products-list"
          >
            <h5>Products</h5>
            <div class="product-list">
              <div v-for="item in anchorGroup[selectedIndex].anchor" :key="item.option.id" class="product-singin">
                <nuxt-link
                  v-if="item.option.images && Array.isArray(item.option.images) && item.option.images.length"
                  :to="`/en/product/detail?id=${item.option.id}`"
                  class="product_item"
                >
                  <div class="product_item_box" @click="caseTracking({ event:'view_product', mode:'Products', label:`${item.option.title_en}`,items:[{CMSId:item.option.id,source:'Inspiration'}]})">
                    <div class="img_box" :style="{ backgroundImage: `url(${item.option.images[0]})` }" />
                    <p class="content">
                      {{ item.option.title_en }}
                    </p>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <mobile-show class="site-is-mobile" />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import MobileShow from '~/pagesEn/mobile/case/detail/index.vue'
import getInputSize from '~/utils/calcStringWidth'
import loadImg from '~/utils/loadImg'

export default {
  name: 'CaseDetailPage',
  components: {
    MobileShow
  },
  async asyncData ({ store, query }) {
    /** 获取详情页数据 */
    await store.dispatch('case/useDetail', query.brandId)
  },
  data: () => ({
    /** 锚点容器的样式，该样式实时计算 */
    anchorBoxStyle: {},
    /** 侧边栏的高度 */
    AnchorGroupHeight: 0
  }),
  head () {
    return { title: `Nine United-CASE-${this.caseDetail.title}` }
  },
  computed: {
    ...mapState('case', {
      /** 详情页数据 */
      caseDetail: state => state.detail
    }),
    /** 锚点数据 */
    anchorGroup () { return this.$store.getters['case/getAnchorGroup'] },
    /** 计算侧边栏的高度 */
    getAnchorGroupHeight () { return this.$store.getters['case/getAnchorGroupHeight'] },
    /** 当前选中的下标 */
    selectedIndex: {
      get () { return this.$store.state.case.detailIndex },
      set (value) { this.$store.commit('case/setDetailIndex', value) }
    }
  },
  watch: {
    selectedIndex () {
      this.useImages()
    }
  },
  mounted () {
    /** mounted 并不能获取到 ref，这里加一个宏任务确保 */
    setTimeout(() => {
      this.useImages()
      this.openBScroll()
    }, 100)
    /** 如果有浏览器窗口变化的事件也需要重新计算图片的宽高 */
    window.addEventListener('resize', this.useImages)
  },
  methods: {
    openBScroll () {
      /** 如果当前已经有图片滚动的实例就重新加载，没有就新增实例 */
      if (this.AnchorGroupMain) {
        this.AnchorGroupMain.refresh()
      } else {
        this.AnchorGroupMain = new BScroll(this.$refs.AnchorGroupMain, {
          startY: 0,
          click: true,
          scrollY: true
        })
      }
    },
    /** 根据文字获取图片宽度 */
    getTextWidth (str = '') {
      return getInputSize(str, 15)
    },
    /** 重新加载图片 */
    async useImages () {
      if (this.anchorGroup.length) {
        this.$store.commit('site/setLoading', true)
        /** 图片异步加载 */
        await loadImg(this.anchorGroup[this.selectedIndex].img)
        /** 获取图片宽高赋值给同级别锚点框体 */
        this.anchorBoxStyle = {
          width: `${this.$refs.selectedImg.clientWidth}px`,
          height: `${this.$refs.selectedImg.clientHeight}px`,
          left: `${this.$refs.selectedImg.offsetLeft}px`,
          top: `${this.$refs.selectedImg.offsetTop}px`
        }
        /** 如果当前已经有图片滚动的实例就重新加载，没有就新增实例 */
        if (this.anchorMain) {
          this.anchorMain.refresh()
        } else {
          this.anchorMain = new BScroll(this.$refs.anchorMain, {
            scrollX: true
          })
        }
        this.$store.commit('site/setLoading', false)
      }
    },
    caseTracking ({ event, mode, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Inspiration_detail', event, mode, label, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/case.scss";
@import '~/assets/scss/_fonts.scss';
.container{
  font-family: 'WorkSans-Regular';
}
</style>
