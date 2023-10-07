<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <div class="mobile-store">
    <div class="all">
      <div v-if="showSearch">
        <span class="return-store" @click="returnStore"><i><img src="~/assets/images/AAmobile/store/arrow-left.png" class="arr-img"></i>Return to Store List</span>
      </div>
      <div v-if="showSearch" class="search-area">
        <div class="input-area">
          <input
            v-model="searchData"
            class="inp"
            placeholder="Search..."
            type="search"
          >
        </div>
        <div v-if="false" class="clear" @click="clearSearchData">
          <img src="~/assets/images/AAmobile/store/clear.png">
        </div>
      </div>
      <!-- 顶部信息及搜索 -->
      <header v-if="!showSearch">
        <!-- 定位内容 -->
        <div v-if="local.visible" class="local-button-box">
          <div class="local-button" :style="[{ disabled: local.disabled }]" @click="getLoacl">
            <img src="~/assets/images/AAmobile/store/position.png" alt="">
            <span>{{ local.btnText }}</span>
          </div>
          <div v-if="local.error" class="local-error">
            <img src="~/assets/images/AAmobile/store/close.png" alt="">
            <p>We are unable to locate you.<br>Please verify your configuration or try upgrading to another version or browser.</p>
          </div>
        </div>
        <div class="store-info">
          <div class="store-area">
            <h1 class="store-titile">Store information</h1>
            <p class="explore">The following stores are officially<br>authorized stores
            </p>
          </div>
          <div class="search-icon" @click="goSearch()">
            <img src="~/assets/images/AAmobile/store/Frame.png">
          </div>
        </div>
        <div class="region-info">
          <div class="country">
            <div class="brandnames">
              <span class="country-text coum">{{ selectedCountry || 'Country' }}</span>
              <i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i>
            </div>
            <select v-model="selectedCountry">
              <option
                v-for="(item) in countryListFilterData"
                :key="item.value"
                :value="item.value"
              >{{ item.value }}</option>
            </select>
          </div>
          <div class="region">
            <div class="brandnames">
              <span class="region-text">{{ selectedCity || 'City' }}</span>
              <i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i>
            </div>
            <select id="" v-model="selectedCity" name="">
              <option v-for="item in cityListData" :key="item.value" :value="item.value">{{ item.value }}</option>
            </select>
          </div>
          <div class="brand">
            <div class="brandnames">
              <span class="brand-text">{{ (selectedBrand && Array.isArray(selectedBrand) && selectedBrand.length) ? selectedBrand.join(',') : 'Brand' }}</span>
              <i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i>
            </div>
            <select id="" v-model="selectedBrand" name="" multiple>
              <option v-for="item in brandListData" :key="item.alias" :value="item.name">{{ item.name }}</option>
            </select>
          </div>
        </div>
      </header>
      <section class="store-list-box">
        <!-- 热门展厅 -->
        <div v-for="item in storeListData.hotModule" :key="item.alias" class="main-info" @click="goDetail(item)">
          <div class="brand-detail">
            <img :src="item.thumbnail">
          </div>
          <div class="brand-name">
            <!-- <nuxt-link
              class="brand-name"
              :to="`/en/storedetail?method=${item.alias}&latitude=${position.latitude}&longitude=${position.longitude}`"
            > -->
            <div class="brand-logo">
              <div class="logo-icon">
                <img src="~/assets/images/home/logo.png">
              </div>
              <div class="logo-name">
                <h4>{{ item.title_en }}</h4>
              </div>
            </div>
            <div class="detail-area">
              <span class="detail-text">details<i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow"></i></span>
            </div>
          </div>
          <!-- </nuxt-link> -->
          <div class="address-info">
            <div class="address">
              <p>{{ item.address_en }}</p>
            </div>
            <div class="phone-area" @click.stop="callnumber(item.mobile)">
              <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone"></i>Tel</span>
            </div>
          </div>
          <div class="open-times">
            <div class="opentimes">Store Hours: {{ item.content_en[0].value }}</div>
            <div v-if="item.distance" class="distances">
              <span>Less {{ item.distance }}</span>
            </div>
          </div>
          <div class="content" />
        </div>
        <!-- 其他展厅 -->
        <div v-if="storeListData.modileRetailShowroom && storeListData.modileRetailShowroom.length" class="other-store">
          <h4 class="title">Retail store</h4>
          <store-singin :store-list="storeListData.modileRetailShowroom" type="retail" @tracking="storeTracking" />
        </div>
        <div v-if="storeListData.storeShowroom && storeListData.storeShowroom.length" class="other-store">
          <h4 class="title">Contract showroom</h4>
          <store-singin :store-list="storeListData.storeShowroom" type="project" :is-near="false" @tracking="storeTracking" />
        </div>
        <!-- <div v-if="!emptyStore" class="empty-area">
          <div class="empty">
            <img src="~/assets/images/AAmobile/store/empty.png">
          </div>
        </div> -->
        <div
          v-if="!emptyStore"
          class="empty-area"
        >
          <div class="empty">
            <img src="~/assets/images/store/empty.png">
          </div>
          <div class="empty-text">No Results</div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import storeSingin from './storeSingin.vue'
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
    storeSingin
  },
  data () {
    return {
      /** 显示搜索框 */
      showSearch: false,
      /** 定位数据 */
      local: {
        visible: true,
        disabled: false,
        error: false,
        btnText: 'Use my current location'
      },
      countryListFilterData: []
    }
  },
  head: {
    title: 'Nine United官网-门店信息'
  },
  computed: {
    emptyStore () {
      return this.storeListData && (this.storeListData.hotModule.length ||
      this.storeListData.modileRetailShowroom.length ||
      this.storeListData.storeShowroom.length)
    },
    /** 定位数据 */
    position () {
      return this.$store.state.store.position
    },
    /** 门店数据 */
    storeListData () {
      // return this.$store.state.store.storeListData
      return this.$store.getters['store/getStoreListData']
    },
    /** 品牌列表 */
    brandListData () {
      return this.$store.state.store.brandListData
    },
    getStoreCityList () {
      // 可以通过数据变化 重新渲染模板
      const data = this.storeListData
      let storeList = {}
      return () => {
        if (!(Object.keys(storeList).length)) {
          storeList = JSON.parse(JSON.stringify({ ...data }))
        }
        return storeList
      }
    },
    // countryListFilterData () {
    //   /** 当前显示的门店列表 */
    //   const { storeShowroom, hotModule, modileRetailShowroom } = this.getStoreCityList()
    //   const nowShowStoreList = [...hotModule, ...modileRetailShowroom, ...storeShowroom]
    //   /** 当前列表上所有的城市 */
    //   const nowShowAllCityList = sortEn([...getEnStoreCountryList(nowShowStoreList)])
    //   return nowShowAllCityList.filter(item => this.countryListData.includes(item)).map(item => ({
    //     value: item,
    //     label: item
    //   }))
    // },
    /** 地区列表 */
    countryListData () {
      return Object.keys(this.$store.state.store.countryListData)
    },
    /** 城市列表 */
    cityListData () {
      /** 当前显示的门店列表 */
      const { storeShowroom, hotModule, modileRetailShowroom } = this.getStoreCityList()
      const nowShowStoreList = [...storeShowroom, ...hotModule, ...modileRetailShowroom]
      // if (this.selectedCountry) {
      //   nowShowStoreList = nowShowStoreList.filter(item => item.country_en === this.selectedCountry)
      // }
      /** 当前列表上所有的城市 */
      const nowShowAllCityList = [...getEnStoreCityList(nowShowStoreList)]
      const selectedData = nowShowAllCityList.filter(item => this.$store.state.store.storeEnCityList.includes(item))
      return selectedData && selectedData.length
        ? selectedData.map(item => ({
          value: item,
          label: item
        }))
        : []
    },
    /** 双相绑定品牌数据 */
    selectedBrand: {
      get () { return this.$store.state.store.selectedData.brand },
      set (value) { this.$store.commit('store/setSelected', { key: 'brand', value }); this.storeTracking({ event: 'filter_store', mode: 'Store', label: value, filterLabel: 'Brands' }) }
    },
    /** 双相绑定国家数据 */
    selectedCountry: {
      get () { return this.$store.state.store.selectedData.country },
      set (value) {
        this.$store.commit('store/setSelected', { key: 'country', value })
        this.storeTracking({ event: 'filter_store', mode: 'Store', label: value, filterLabel: 'Country' })
      }
    },
    /** 双相绑定城市数据 */
    selectedCity: {
      get () { return this.$store.state.store.selectedData.city },
      set (value) {
        this.$store.commit('store/setSelected', { key: 'city', value }); this.storeTracking({ event: 'filter_store', mode: 'Store', label: value, filterLabel: 'City' })
      }
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
      this.showSearch = true
      // this.$router.push({ path: '/en/store' }, () => {}, () => {})
      // this.$store.dispatch('store/useSearchData')
    }
  },
  created () {
    this.showSearch = false
    if (this.$route.query.search) {
      this.$store.commit('store/setSearchData', this.$route.query.search)
      this.showSearch = true
    }
  },
  mounted () {
    this.useCountryList()
  },
  methods: {
    callnumber (mobile) {
      /* 拨打电话 */
      window.location.href = 'tel:' + mobile
    },
    /* 点击搜索跳搜索页面 */
    goSearch () {
      this.showSearch = true
    },
    /** 返回门店列表 */
    returnStore () {
      this.showSearch = false
      this.clearSearchData()
    },
    /** 清除搜索数据 */
    clearSearchData () {
      this.showSearch = false
      this.$router.push({ path: '/en/store' }, () => {}, () => {})
      this.$store.commit('store/setSearchData', '')
    },
    goDetail (item) {
      if (item.qrcode !== '' || item.images !== '' || item.online !== '') {
        this.$router.push({ path: '/en/storedetail', query: { method: item.alias, latitude: this.position.latitude, longitude: this.position.longitude } }, () => {}, () => {})
        this.storeTracking({ event: 'view_store', mode: 'Store', label: 'view' })
      }
    },
    /** 定位 */
    async getLoacl () {
      try {
        this.local.error = false
        this.local.btnText = 'Getting Positioning...'
        this.local.disabled = true
        await this.$store.dispatch('store/useLocal')
        await this.$store.dispatch('store/useStoreList')
      } catch (error) {
        this.local.error = true
      } finally {
        this.local.disabled = false
        this.local.btnText = 'Use my current location'
      }
    },
    useCountryList () {
      setTimeout(() => {
      /** 当前列表上所有的城市 */
      /** 当前显示的门店列表 */
        const { storeShowroom, hotModule, modileRetailShowroom } = this.getStoreCityList()
        const nowShowStoreList = [...hotModule, ...modileRetailShowroom, ...storeShowroom]
        /** 当前列表上所有的城市 */
        const nowShowAllCityList = sortEn([...getEnStoreCountryList(nowShowStoreList)])
        this.countryListFilterData = nowShowAllCityList.filter(item => this.countryListData.includes(item)).map(item => ({
          value: item,
          label: item
        }))
        // console.log(this.countryListFilterData, '362')
      }, 400)
    },
    storeTracking ({ event, mode, label, filterLabel, items }) {
      this.$store.dispatch('site/tracker', { page: 'Store', event, mode, label, filterLabel, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/store-info.scss';
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.other-store .title {
  font-size: mrem(36);
  margin-top: mvw(30);
}
</style>
