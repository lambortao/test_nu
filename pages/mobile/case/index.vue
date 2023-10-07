<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="tab-area">
      <h1 class="case-title">
        品牌案例
      </h1>
      <div class="channel-tabs">
        <div
          v-for="item in caseChannelList.channel"
          :key="item.alias"
          class="channel"
          :class="[{ active: item.alias === selectedCase }]"
        >
          <nuxt-link
            :to="`/case?id=${item.alias}`"
          ><span @click="caseTracking({ event: 'filter_inspiration', mode: 'Inspiration', label: item.name, filterLabel: 'Default' })">{{ item.name }}</span></nuxt-link>
        </div>
      </div>
      <!-- <div class="middle-line" /> -->
      <div class="button">
        <span class="from">From:<span class="select-text">{{ defualtValue }}</span><i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i></span>
        <select v-model="selectBrandList">
          <option
            v-for="(items, i) in brandList"
            :key="i"
            :value="items.name"
          >
            {{ items.name }}
          </option>
        </select>
      </div>
      <!-- <div v-if="caseLists.total" class="num">
        共计{{ caseLists.total }}条案例
      </div>
      <div v-if="!caseLists.total" class="num">
        共计 0 条案例
      </div> -->
      <div v-if="!caseLists.total" class="empty-area">
        <div class="empty">
          <img src="~/assets/images/AAmobile/store/empty.png">
        </div>
      </div>
      <div v-for="(item, indexs) in caseLists.lists" :key="indexs" class="brand-logo" @click="goDetail(item.alias)">
        <div v-if="item.thumbnail !== undefined" :style="{ backgroundImage: `url(${item.thumbnail})` }" class="case-pic" />
        <div class="label-area">
          <div v-for="(brand, ind) in item.brandids" :key="ind" class="labels">
            <div class="label">{{ brand }}</div>
          </div>
        </div>
        <div class="brand-name">
          <h5>{{ item.subtitle }}     {{ item.title }}</h5>
        </div>
        <div class="region">
          <span>{{ item.city }}<span class="city">{{ item.country }}</span></span>
        </div>
      </div>
      <button v-if="showMoreBtn" class="get-more" @click="getMore">
        加载更多
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BrandPage',
  data () {
    return {
      defualtValue: '',
      isShow: false,
      activeKey: '',
      caseList: [],
      List: {},
      showList: {},
      selectBrandList: [],
      indexz: 0,
      brandLists: [],
      postData: {},
      page: 1
    }
  },
  fetch () {
    this.postData = {
      method: this.$route.query.id || this.caseChannelList.channel[0].alias,
      brand: this.$route.query.brand || '',
      page: this.page
    }
    if (this.$route.query.brand === undefined) {
      delete this.postData.brand
    }
    if (this.$route.query.brand === undefined) {
      delete this.postData.brand
    }
  },
  head: {
    title: 'Nine United官网-案例中心'
  },
  computed: {
    ...mapState({
      selectedCase: state => state.case.selectedCase,
      selectedBrand: state => state.case.selectedBrand,
      brandList: state => state.case.brandList,
      selectedPage: state => state.case.selectedPage
    }),
    caseChannelList () {
      return this.$store.getters['site/getCaseChannel']
    },
    caseLists () {
      return this.$store.getters['case/getCaseList']
    },
    brandLista () {
      return this.$store.getters['case/getBrandList']
    },
    showMoreBtn () {
      return this.$store.getters['case/showMoreBtn']
    }
  },
  watch: {
    '$route.query': '$fetch',
    selectBrandList (val) {
      console.log(val)
      this.defualtValue = val
      this.$router.push({ path: '/case', query: { id: this.selectedCase, brand: val } }, () => {}, () => {})
      this.caseTracking({ event: 'filter_inspiration', mode: 'Inspiration', label: val, filterLabel: 'Brands' })
    }
  },
  created () {
    this.defualtValue = this.brandList[0].name
  },
  methods: {
    goBrand (brandid) {
      this.$router.push({ path: '/case', query: { id: this.selectedCase, brand: brandid } }, () => {}, () => {})
    },
    goDetail (brandId) {
      this.$router.push({ path: '/casedetail', query: { brandId } }, () => {}, () => {})
      const items = this.caseLists.lists.filter(item => item.alias === brandId)
      this.caseTracking({ event: 'view_inspiration', mode: 'Inspiration', label: items[0].title_en, items: [{ CMSId: items[0].alias }] })
    },
    getMore () {
      this.$store.dispatch('case/getMore', this.postData)
    },
    caseTracking ({ event, mode, label, filterLabel, items }) {
      this.$store.dispatch('site/tracker', { page: 'Inspiration', event, mode, label, filterLabel, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand-info.scss';
img {
  width: 100%;
  object-fit: contain;
}
</style>
