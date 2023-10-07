<template>
  <div>
    <div class="site-is-default">
      <div
        class="store"
        @click.stop="storeBodyClick"
      >
        <div class="store_container">
          <div class="title">
            <p>{{ pageTitle }}</p>
            <!-- <p>The following stores are officially authorized stores</p> -->
          </div>
          <div class="content">
            <div class="select-all">
              <div class="select-box">
                <singin-select
                  ref="singinSeleceOne"
                  v-model="selectedCountry"
                  label="Country"
                  class-name="country"
                  :list="countryListFilterData"
                  @ctiySelectFn="useCityList"
                  @tracking="storeTracking"
                />
                <singin-select
                  ref="singinSeleceTwo"
                  v-model="selectedCity"
                  class-name="city"
                  label="City"
                  :list="cityListData"
                  @tracking="storeTracking"
                />
                <brand-select
                  ref="singinSeleceThree"
                  v-model="selectedBrand"
                  label="Brand"
                  :list="brandListData"
                  @tracking="storeTracking"
                />
              </div>
              <div>
                <div class="search-area">
                  <div class="input-area">
                    <input
                      v-model="searchData"
                      class="inp"
                      placeholder="Search"
                      type="search"
                    >
                  </div>
                </div>
              </div>
            </div>
            <v-placeholder
              v-if="$fetchState.pending"
              mode="loading"
            />
            <div>
              <div
                v-if="!$fetchState.pending && storeListData.hotModule.length === 0 && storeListData.retailShowroom.length === 0 && storeListData.storeShowroom.length === 0"
                class="empty-area"
              >
                <div class="empty">
                  <img src="~/assets/images/store/empty.png">
                </div>
                <div class="empty-text">
                  No Results
                </div>
              </div>
            </div>
            <div>
              <div v-if="pageTitle!=='Dealers'" class="store_list">
                <div
                  v-if="storeListData.hotModule.length>0"
                  class="retail-showroom"
                >
                  <store-item :store-list="storeListData.hotModule" />
                </div>
                <div v-if="storeListData.retailShowroom.length > 0" class="retail-showroom">
                  <store-item :store-list="storeListData.retailShowroom" />
                </div>
              </div>
              <div v-else class="store_list">
                <div v-if="storeListData.storeShowroom.length > 0" class="retail-showroom">
                  <store-item :store-list="storeListData.storeShowroom" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-store class="site-is-mobile" />
  </div>
</template>

<script>
import SinginSelect from './components/SinginSelect.vue'
import BrandSelect from './components/BrandSelelct.vue'
import StoreItem from './components/StoreItem.vue'
import MobileStore from '~/pagesEn/mobile/store/index.vue'
import sortEn from '~/utils/sortEn'

function getEnStoreCityList (store) {
  return store && store.length
    ? Array.from(new Set(store.map(item => item.city_en)))
    : []
}

function getEnStoreCountryList (store) {
  return store && store.length
    ? Array.from(new Set(store.map(item => item.country_en)))
    : []
}

export default {
  name: 'StorePage',
  components: {
    MobileStore,
    SinginSelect,
    StoreItem,
    BrandSelect
  },
  data: () => ({
    pageTitle: '',
    cityListData: [],
    countryListFilterData: []
  }),
  async fetch () {
    /** 获取门店数据 */
    await this.$store.dispatch('store/useStoreList')
    /** 获取城市数据 */
    await this.$store.dispatch('store/useCountryList', 'en')
    /** 获取品牌数据 */
    await this.$store.dispatch('store/useBrandList')
    this.useCountryList()
    this.useCityList()
  },
  head: {
    title: 'Nine United-Store'
  },
  computed: {
    /** 门店数据 */
    storeListData () {
      return this.$store.getters['store/getStoreListData']
    },
    /** 品牌列表 */
    brandListData () {
      return this.$store.state.store.brandListData.map(item => ({
        value: item.name,
        label: item.name
      }))
    },
    /** 地区列表 */
    countryListData () {
      return Object.keys(this.$store.state.store.countryListData)
    },
    /** 双相绑定品牌数据 */
    selectedBrand: {
      get () { return this.$store.state.store.selectedData.brand },
      set (value) { this.$store.commit('store/setSelected', { key: 'brand', value }) }
    },
    /** 双相绑定国家数据 */
    selectedCountry: {
      get () { return this.$store.state.store.selectedData.country },
      set (value) { this.$store.commit('store/setSelected', { key: 'country', value }) }
    },
    /** 双相绑定城市数据 */
    selectedCity: {
      get () { return this.$store.state.store.selectedData.city },
      set (value) { this.$store.commit('store/setSelected', { key: 'city', value }) }
    },
    /** 双相绑定搜索数据 */
    searchData: {
      get () { return this.$store.state.store.searchData },
      set (value) { this.$store.commit('store/setSearchData', value) }
    }
  },
  watch: {
    /** 监听品牌 */
    selectedBrand () {
      this.$store.dispatch('store/useSelected')
      const queryData = this.selectedBrand.length ? { brand: this.selectedBrand.join(',') } : {}
      if (this.pageTitle === 'Dealers') {
        queryData.storeType = 'Dealers'
      }
      // this.$router.push({
      //   query: queryData
      // })
    },
    $route (data, oldData) {
      const { storeType } = data.query
      const oldStoreType = oldData.query.storeType
      // 如果交互是在同一个页面，就不需要清空数据
      if (oldStoreType !== storeType) {
        this.$store.commit('store/setSelected', { key: 'brand', value: [] })
        this.$store.commit('store/setSelected', { key: 'country', value: '' })
        this.$store.commit('store/setSelected', { key: 'city', value: '' })
        this.$store.commit('store/setSearchData', '')
      }
      this.pageTitle = storeType || 'Our Stores'
      this.useCountryList()
      this.useCityList()
      // this.storeBodyClick()
    },
    /** 监听国家 */
    selectedCountry () {
      this.$store.dispatch('store/useSelected')
      this.$store.commit('store/setSelected', { key: 'city', value: '' })
    },
    /** 监听城市 */
    selectedCity () {
      this.$store.dispatch('store/useSelected')
    },
    /** 监听搜索 */
    searchData () {
      this.$store.dispatch('store/useSearchData')
    }
  },
  mounted () {
    const { storeType } = this.$route.query
    this.pageTitle = storeType || 'Our Stores'
  },
  created () {
    if (this.$route.query.brand) {
      this.$store.commit('store/setSelected', {
        key: 'brand',
        value: this.$route.query.brand.split(',')
      })
    }
  },
  beforeDestroy () {
    this.$store.commit('store/setSelected', { key: 'brand', value: [] })
    this.$store.commit('store/setSelected', { key: 'country', value: '' })
    this.$store.commit('store/setSelected', { key: 'city', value: '' })
  },
  methods: {
    /**
     * useCountryList 和 useCityList 这两个函数为什么都要加一个定时器？
     * 因为修改国家的事件和 this.storeListData 的数据更新是代码上同步进行
     * 但是在实际的使用过程中却发现该事件在触发的时候 this.storeListData 并未取得更新
     * 因为该方法之前是由 this.storeListData 的响应来驱动的
     * 因为一些历史原因被改成手动触发更新，如果要改回去会涉及到一些无法预知的工作和问题
     * 所以就在事件触发后给了 100ms 的宏任务以保证 this.storeListData 也已经被正确的更新
     */
    useCountryList () {
      setTimeout(() => {
        /** 当前显示的门店列表 */
        const { storeShowroom, hotModule, retailShowroom } = this.storeListData
        const nowShowStoreList = this.pageTitle === 'Dealers' ? [...storeShowroom] : [...hotModule, ...retailShowroom]
        /** 当前列表上所有的城市 */
        const nowShowAllCityList = sortEn([...getEnStoreCountryList(nowShowStoreList)])
        this.countryListFilterData = nowShowAllCityList.filter(item => this.countryListData.includes(item)).map(item => ({
          value: item,
          label: item
        }))
      }, 400)
    },
    // 获取城市列表
    useCityList () {
      setTimeout(() => {
        const { storeShowroom, hotModule, retailShowroom } = this.storeListData
        let nowShowStoreList = this.pageTitle === 'Dealers' ? [...storeShowroom] : [...hotModule, ...retailShowroom]
        if (this.selectedCountry) {
          nowShowStoreList = nowShowStoreList.filter(item => item.country_en === this.selectedCountry)
        }
        /** 当前列表上所有的城市 */
        const nowShowAllCityList = [...getEnStoreCityList(nowShowStoreList)]
        const selectedData = nowShowAllCityList.filter(item => this.$store.state.store.storeEnCityList.includes(item))
        this.cityListData = selectedData && selectedData.length
          ? selectedData.map(item => ({
            value: item,
            label: item
          }))
          : []
      }, 400)
    },
    storeBodyClick () {
      this.$refs.singinSeleceOne.dropVisible = false
      this.$refs.singinSeleceTwo.dropVisible = false
      this.$refs.singinSeleceThree.dropVisible = false
    },
    /** 设置下拉菜单的显示状态 */
    selectSection (data) {
      this.classifySection = data === this.classifySection ? null : data
    },
    goInto (url) {
      window.open(url)
    },
    storeTracking ({ event, mode, label, filterLabel }) {
      this.$store.dispatch('site/tracker', { page: 'Store', event, mode, label, filterLabel })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/storeIndex.scss";
@import "~/assets/scss/_fonts.scss";
.store {
  font-family: "WorkSans-Regular";
}
.retail-showroom {
  h3 {
    margin-top: 40px;
    font-size: 24px;
    color: #333;
  }
}
.store_list {
  padding-bottom: 220px;
}
</style>
