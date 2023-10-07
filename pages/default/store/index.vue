<template>
  <div>
    <div class="site-is-default">
      <div class="store" @click.stop="storeBodyClick">
        <div class="store_container">
          <div class="title">
            <p>{{ pageTitle==='Dealers'?'经销商':'门店' }}</p>
            <p>以下店铺为官方授权门店</p>
          </div>
          <div class="content">
            <div class="select-all">
              <div class="select-box">
                <singin-select
                  ref="singinSeleceOne"
                  v-model="selectedCountry"
                  label="国家"
                  class-name="country"
                  :list="countryListData"
                  :defaultselect="true"
                  @tracking="storeTracking"
                />
                <singin-select
                  ref="singinSeleceTwo"
                  v-model="selectedCity"
                  class-name="city"
                  label="城市"
                  :list="cityListData"
                  @tracking="storeTracking"
                />
                <brand-select
                  ref="singinSeleceThree"
                  v-model="selectedBrand"
                  label="品牌"
                  :list="brandListData"
                  @tracking="storeTracking"
                />
              </div>
              <div>
                <div class="search-area">
                  <div class="input-area">
                    <input v-model="searchData" class="inp" placeholder="搜索" type="search">
                  </div>
                </div>
              </div>
            </div>
            <v-placeholder v-if="$fetchState.pending" mode="loading" />
            <div
              v-if="!$fetchState.pending && storeListData.hotModule.length === 0 && storeListData.retailShowroom.length === 0 && storeListData.storeShowroom.length === 0"
              class="empty-area"
            >
              <div class="empty">
                <img src="~/assets/images/store/empty.png">
              </div>
              <div class="empty-text">
                暂无搜索结果
              </div>
            </div>
            <div>
              <div v-if="pageTitle !== 'Dealers'" class="store_list">
                <div v-if="storeListData.hotModule.length > 0" class="retail-showroom">
                  <store-item :store-list="storeListData.hotModule" @tracking="storeTracking" />
                </div>
                <div v-if="storeListData.retailShowroom.length > 0" class="retail-showroom">
                  <store-item :store-list="storeListData.retailShowroom" @tracking="storeTracking" />
                </div>
              </div>
              <div v-else class="store_list">
                <div v-if="storeListData.storeShowroom.length > 0" class="retail-showroom">
                  <store-item :store-list="storeListData.storeShowroom" @tracking="storeTracking" />
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
import MobileStore from '~/pages/mobile/store/index.vue'
import filterChineseMainlandStore from '~/utils/filterChineseMainlandStore'

function getCNStoreCiytList (store) {
  return store && store.length
    ? Array.from(new Set(store.map(item => item.city)))
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
    cityListData: []
  }),
  async fetch () {
    /** 获取城市数据 */
    await this.$store.dispatch('store/useCountryList', 'cn')
    /** 获取品牌数据 */
    await this.$store.dispatch('store/useBrandList')
    /** 获取门店数据 */
    await this.$store.dispatch('store/useStoreList')
    await this.useCityList()
  },
  head: {
    title: 'Nine United官网-门店信息'
  },
  computed: {
    /** 门店数据 */
    storeListData () {
      const { storeShowroom, hotModule, retailShowroom } = this.$store.getters['store/getStoreListData']
      // console.log('测试数据', storeShowroom, hotModule, retailShowroom)
      return {
        storeShowroom: filterChineseMainlandStore(storeShowroom),
        hotModule: filterChineseMainlandStore(hotModule),
        retailShowroom: filterChineseMainlandStore(retailShowroom)
      }
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
      const objData = this.$store.state.store.countryListData
      const newData = []
      for (const key in objData) {
        if (Object.hasOwnProperty.call(objData, key) && key === '中国') {
          newData.push({
            value: key,
            label: key
          })
        }
      }
      return newData
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
      this.$router.push({
        query: queryData
      })
    },
    async $route (data, oldData) {
      const { storeType } = data.query
      const oldStoreType = oldData.query.storeType
      this.pageTitle = storeType || 'Our Stores'
      if (oldStoreType !== storeType) {
        // 需要先清空城市筛选到的数据
        await this.$refs.singinSeleceTwo.handleOptions('')
      }

      // 然后再改变城市数据列表
      this.useCityList()
    },
    /** 监听国家 */
    selectedCountry () {
      this.$store.dispatch('store/useSelected')
    },
    /** 监听城市 */
    selectedCity () {
      this.$store.dispatch('store/useSelected')
    },
    /** 监听搜索 */
    searchData () {
      this.$store.dispatch('store/useSearchData')
    },
    pageTitle () {
      this.$store.commit('store/setSelected', { key: 'brand', value: [] })
      this.$store.commit('store/setSelected', { key: 'country', value: '' })
      this.$store.commit('store/setSelected', { key: 'city', value: '' })
    }
  },
  created () {
    const { storeType, brand } = this.$route.query
    this.pageTitle = storeType || 'Our Stores'
    if (brand) {
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
    // 获取城市列表
    useCityList () {
      const { storeShowroom, hotModule, retailShowroom } = JSON.parse(JSON.stringify(this.storeListData))
      const nowShowStoreList = this.pageTitle === 'Dealers' ? [...storeShowroom] : [...hotModule, ...retailShowroom]
      /** 当前列表上所有的城市 */
      const nowShowAllCityList = [...getCNStoreCiytList(nowShowStoreList)]
      const selectedData = nowShowAllCityList.filter(item => this.$store.state.store.storeCityList.includes(item))
      let data = []
      if (selectedData && selectedData.length) {
        data = selectedData.map(item => ({
          value: item,
          label: item
        }))
      }
      this.cityListData = data
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
    storeTracking ({ event, mode, label, filterLabel, items }) {
      this.$store.dispatch('site/tracker', { page: 'Store', event, mode, label, filterLabel, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/storeIndex.scss";
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
