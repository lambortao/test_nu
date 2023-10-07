<template>
  <div class="container">
    <section class="anchor-main">
      <div :class="{ 'is-center': isCenter }">
        <img ref="selectedImg" :src="anchorGroup[selectedIndex].img" alt="">
        <div
          v-if="anchorGroup[selectedIndex].anchor && anchorGroup[selectedIndex].anchor.length && anchorGroup[selectedIndex].anchor[0].top"
          class="anchor-box"
          :style="anchorBoxStyle"
        >
          <span v-for="item in anchorGroup[selectedIndex].anchor" :key="item.top" :style="{ top: item.top, left: item.left }">
            <span :class="parseInt(item.left) < 10 ? 'left' : 'left'" :style="{ width: `120px` }">{{ item.option.title_en }}</span>
          </span>
        </div>
      </div>
    </section>
    <div v-if="anchorGroup && anchorGroup.length" class="main-select">
      <div class="button" :style="{ width: `${anchorGroup.length * 16.54}vw` }">
        <div
          v-for="(items, ind) in anchorGroup"
          :key="items.img"
          :class="['icons', { active: selectedIndex === ind }]"
          @click="$store.commit('case/setDetailIndex', ind)"
        >
          <img :src="items.img" class="img">
        </div>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <h5>
          {{ caseDetail.subtitle_en }}        {{ caseDetail.title_en }}
        </h5>
      </div>
      <div class="area">
        <span>
          {{ caseDetail.city_en }}
          <span class="city">
            {{ caseDetail.country_en }}
          </span>
        </span>
      </div>
      <div v-if="caseDetail.label" class="label-area">
        <div v-for="(item, indexs) in caseDetail.label" :key="indexs" class="labels">
          <div class="label">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="article">
        <p v-html="caseDetail.content_en" />
      </div>
    </div>
    <div
      v-if="
        anchorGroup[selectedIndex].anchor
          && Array.isArray(anchorGroup[selectedIndex].anchor)
          && anchorGroup[selectedIndex].anchor.length
          && anchorGroup[selectedIndex].anchor[0].option
      "
    >
      <div class="titles">
        <h5>Products</h5>
      </div>
      <div class="product">
        <div v-for="item in anchorGroup[selectedIndex].anchor" :key="item.left" class="children">
          <NuxtLink
            :to="`/en/product/detail?id=${item.option.id}`"
          >
            <div @click="caseTracking({event:'view_product', mode:'Products', label:item.option.title_en,items:[{CMSId:item.option.id,source:'Inspiration'}]})">
              <div v-if="item.top" :style="{ backgroundImage: `url(${item.option.images[0]})` }" class="img-product" />
              <div class="name">
                <h5>{{ item.option.title_en }}</h5>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import getInputSize from '~/utils/calcStringWidth'
import loadImg from '~/utils/loadImg'

export default {
  name: 'ShowPage',
  data: () => ({
    /** 锚点容器的样式，该样式实时计算 */
    anchorBoxStyle: {},
    /** 侧边栏的高度 */
    AnchorGroupHeight: 0,
    /** 是否开启图片居中 */
    isCenter: true
  }),
  computed: {
    ...mapState('case', {
      /** 详情页数据 */
      caseDetail: state => state.detail
    }),
    /** 锚点数据 */
    anchorGroup () { return this.$store.getters['case/getAnchorGroup'] },
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
    }, 100)
  },
  methods: {
    /** 根据文字获取图片宽度 */
    getTextWidth (str = '') {
      return getInputSize(str, 17)
    },
    /** 重新加载图片 */
    async useImages () {
      if (this.anchorGroup.length) {
        this.$store.commit('site/setLoading', true)
        /** 图片异步加载 */
        await loadImg(this.anchorGroup[this.selectedIndex].img)
        this.isCenter = !(this.$refs.selectedImg.clientWidth > window.innerWidth)
        this.$nextTick(() => {
          /** 获取图片宽高赋值给同级别锚点框体 */
          this.anchorBoxStyle = {
            width: `${this.$refs.selectedImg.clientWidth}px`,
            height: `${this.$refs.selectedImg.clientHeight}px`,
            left: `${this.$refs.selectedImg.offsetLeft}px`,
            top: `${this.$refs.selectedImg.offsetTop}px`
          }
        })
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
@import '~/assets/scss/mobile/brand-show.scss';

img {
  width: 100%;
  object-fit: contain;
}
.container {
  padding-bottom: mvw(30);
}
</style>
