<template>
  <div>
    <div class="container default-width site-is-default">
      <div class="case_box">
        <div class="case_box_title pages-title">
          <h3>Inspiration</h3>
        </div>
        <div class="case-content">
          <header class="case-content-header">
            <div class="header-case-list">
              <div
                v-for="item in caseChannelList.channel"
                :key="item.alias"
                :class="['channel-tab',{ active: item.alias === selectedCase }]"
                @click="caseTracking({event:'filter_inspiration',mode:'Inspiration',label:item.name_en,filterLabel:'default'})"
              >
                <nuxt-link
                  :to="`/en/case?id=${item.alias}`"
                >
                  {{ item.name_en }}
                </nuxt-link>
              </div>
            </div>
            <div class="middle-line" />
            <div class="totalcase">
              <div class="brand-lists">
                <nuxt-link
                  v-for="item in brandList"
                  :key="item.name"
                  :class="[{ active: item.name === selectedBrand}]"
                  :to="`/en/case?id=${selectedCase}&brand=${encodeURIComponent(item.name)}`"
                  class="brand-tab"
                >
                  <span @click="brandSelect(item.name)">{{ item.name }}</span>
                </nuxt-link>
              </div>
              <!-- <div v-if="caseLists.total" class="totals">
                {{ caseLists.total?caseLists.total:0 }} Cases
              </div>
              <div v-if="!caseLists.total" class="totals">
                0 Cases
              </div> -->
            </div>
          </header>
          <v-placeholder v-if="$fetchState.pending" mode="loading" />
          <div class="cases">
            <case-list :case-list="caseLists" @tracking="caseTracking" />
          </div>
          <div
            v-if="!caseLists.total && !$fetchState.pending"
            class="empty-area"
          >
            <div class="empty">
              <img src="~/assets/images/store/empty.png">
            </div>
            <div class="empty-text">
              No Results
            </div>
          </div>
          <button v-if="showMoreBtn" class="get-more" @click="getMore">
            load more
          </button>
        </div>
      </div>
    </div>
    <mobile-case class="site-is-mobile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CaseList from './component/CaseList.vue'
import MobileCase from '~/pagesEn/mobile/case/index.vue'

export default {
  name: 'CasePage',
  components: {
    CaseList,
    MobileCase
  },
  data () {
    return {
      postData: {},
      page: 1
    }
  },
  async fetch () {
    /**
     * 过程
     * 1. 从 route 内获取 case 和 brand
     * 2. 拿到 case 和 brand 设置 vuex this.$store.commit('case/setSelectedCase', case)
     * 3. 调用 useCaseList 获取案例列表，将数据赋值进 vuex
     */
    let brands = []
    brands = brands.concat(this.caseChannelList.brand)
    brands.unshift({
      alias: '',
      name: 'ALL'
    })
    this.$store.commit('case/setBrandList', brands)
    await this.$store.dispatch('case/useBrandList', brands)
    this.postData = {
      method: this.$route.query.id || this.caseChannelList.channel[0].alias,
      brand: this.$route.query.brand || '',
      page: this.page
    }
    if (!this.$route.query.brand || (Array.isArray(this.$route.query.brand) && !this.$route.query.brand.length)) {
      delete this.postData.brand
    }
    this.$store.commit('case/setSelectedCase', this.postData.method)
    this.$store.commit('case/setSelectedBrand', this.postData.brand)
    this.$store.commit('case/setSelectedPage', this.postData.page)
    await this.$store.dispatch('case/useCaseList', this.postData)
  },
  head: {
    title: 'Nine United-Inspiration'
  },
  computed: {
    ...mapState({
      selectedCase: state => state.case.selectedCase,
      selectedBrand: state => state.case.selectedBrand,
      selectedPage: state => state.case.selectedPage,
      brandList: state => state.case.brandList
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
    /** 监听路由变化的操作 */
    '$route.query': '$fetch'
  },
  mounted () {
  },
  methods: {
    goBrand (name) {
      this.$router.push({ path: '/en/case', query: { id: this.selectedCase, brand: name } }, () => {}, () => {})
    },
    getMore () {
      this.$store.dispatch('case/getMore', this.postData)
    },
    brandSelect (data) { // ALL HAY &Tradition Frandsen Verpan
      this.caseTracking({ event: 'filter_inspiration', mode: 'Inspiration', label: data, filterLabel: 'Brands' })
    },
    caseTracking ({ event, mode, label, filterLabel, items }) {
      this.$store.dispatch('site/tracker', { page: 'Inspiration', event, mode, label, filterLabel, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/caseIndex.scss";
@import '~/assets/scss/_fonts.scss';
.case_box{
    font-family: 'WorkSans-Regular';
}
</style>
