<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="mobile-store">
    <div class="all">
      <div v-if="showSearch">
        <span class="return-store" @click="returnStore"><i><img src="~/assets/images/AAmobile/store/arrow-left.png" class="arr-img"></i>返回门店列表</span>
      </div>
      <div v-if="showSearch" class="search-area">
        <div class="input-area">
          <input
            v-model="searchData"
            class="inp"
            placeholder="搜索..."
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
            <p>我们无法获取您目前的位置。<br>请检查您的设置或升级您的浏览器或使用其他浏览器。</p>
          </div>
        </div>
        <div class="store-info">
          <div class="store-area">
            <h1 class="store-titile">门店信息</h1>
            <p class="explore">以下店铺为官方授权门店</p>
          </div>
          <div class="search-icon" @click="goSearch()">
            <img src="~/assets/images/AAmobile/store/Frame.png">
          </div>
        </div>
        <div class="region-info">
          <div class="country">
            <div class="brandnames">
              <span class="country-text colorGray">{{ selectedCountry || '中国' }}</span>
              <i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i>
            </div>
            <select v-if="false" v-model="selectedCountry">
              <option
                v-for="(item, key) in countryListData"
                :key="key.value"
                :value="item.value"
              >
                {{ item.value }}
              </option>
            </select>
          </div>
          <div class="region">
            <div class="brandnames">
              <span class="region-text">{{ selectedCity || '地区' }}</span>
              <i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i>
            </div>
            <select id="" v-model="selectedCity" name="">
              <option v-for="item in cityListData" :key="item.value" :value="item.value">{{ item.value }}</option>
            </select>
          </div>
          <div class="brand">
            <div class="brandnames">
              <span class="brand-text">{{ (selectedBrand && Array.isArray(selectedBrand) && selectedBrand.length) ? selectedBrand.join(',') : '品牌' }}</span>
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
            <div class="brand-logo">
              <div class="logo-icon">
                <img src="~/assets/images/home/logo.png">
              </div>
              <div class="logo-name">
                <h4>{{ item.title }}</h4>
              </div>
            </div>
            <div class="detail-area">
              <span class="detail-text">详情<i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow"></i></span>
            </div>
          </div>
          <div class="address-info">
            <div class="address" @click="goAddress(item)">
              <p>{{ item.address }}</p>
            </div>
            <div class="phone-area" @click.stop="callnumber(item.mobile)">
              <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone"></i>致电</span>
            </div>
          </div>
          <div class="open-times">
            <div class="opentimes">营业时间: {{ item.content[0].value }}</div>
            <div class="distances">
              <span v-if="item.distance">小于{{ item.distance }}</span>
            </div>
          </div>
          <div class="content" />
        </div>
        <!-- 其他展厅 -->
        <div v-if="storeListData.modileRetailShowroom && storeListData.modileRetailShowroom.length" class="other-store">
          <h4 class="title">零售展厅</h4>
          <store-singin :store-list="storeListData.modileRetailShowroom" type="retail" @tracking="storeTracking" />
        </div>
        <div v-if="storeListData.projectShowroom && storeListData.projectShowroom.length" class="other-store">
          <h4 class="title">项目展厅</h4>
          <store-singin :store-list="storeListData.projectShowroom" type="project" @tracking="storeTracking" />
        </div>
        <div v-if="!emptyStore" class="empty-area">
          <div class="empty">
            <img src="~/assets/images/AAmobile/store/empty.png">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import storeSingin from './storeSingin.vue'
import filterChineseMainlandStore from '~/utils/filterChineseMainlandStore'
function getCNStoreCiytList (store) {
  return store && store.length
    ? Array.from(new Set(store.map(item => item.city)))
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
        btnText: '使用当前所在位置'
      }
    }
  },
  head: {
    title: 'Nine United官网-门店信息'
  },
  computed: {
    emptyStore () {
      return this.storeListData &&
      (this.storeListData.hotModule.length ||
      this.storeListData.modileRetailShowroom.length ||
      this.storeListData.projectShowroom.length)
    },
    /** 定位数据 */
    position () {
      return this.$store.state.store.position
    },
    /** 门店数据 */
    storeListData () {
      const { projectShowroom, hotModule, modileRetailShowroom } = this.$store.getters['store/getStoreListData']
      return {
        projectShowroom: filterChineseMainlandStore(projectShowroom),
        hotModule: filterChineseMainlandStore(hotModule),
        modileRetailShowroom: filterChineseMainlandStore(modileRetailShowroom)
      }
    },
    /** 品牌列表 */
    brandListData () {
      return this.$store.state.store.brandListData
    },
    /** 地区列表 */
    countryListData () {
      const objData = this.$store.state.store.countryListData
      const newData = []
      for (const key in objData) {
        if (Object.hasOwnProperty.call(objData, key) && key === '中国') {
          newData.push({
            value: key
          })
        }
      }
      return newData
    },
    getStoreCityList () {
      // 可以通过数据变化 重新渲染模板
      const data = this.storeListData
      console.log(1)
      let storeList = {}
      return () => {
        if (!(Object.keys(storeList).length)) {
          storeList = JSON.parse(JSON.stringify({ ...data }))
          // storeList = JSON.parse(JSON.stringify({ ...this.storeListData }))
        }
        return storeList
      }
    },
    /** 城市列表 */
    cityListData () {
      /** 当前显示的门店列表 */
      const { projectShowroom, hotModule, modileRetailShowroom } = this.getStoreCityList()
      const nowShowStoreList = [...projectShowroom, ...hotModule, ...modileRetailShowroom]
      /** 当前列表上所有的城市 */
      const nowShowAllCityList = [...getCNStoreCiytList(nowShowStoreList)]
      const selectedData = nowShowAllCityList.filter(item => this.$store.state.store.storeCityList.includes(item))
      if (selectedData && selectedData.length) {
        return selectedData.map(item => ({
          value: item,
          label: item
        }))
      } else {
        return []
      }
    },
    /** 双相绑定品牌数据 */
    selectedBrand: {
      get () { return this.$store.state.store.selectedData.brand },
      set (value) { this.$store.commit('store/setSelected', { key: 'brand', value }); this.storeTracking({ event: 'filter_store', mode: 'Store', label: value, filterLabel: 'Brands' }) }
    },
    /** 双相绑定国家数据 */
    selectedCountry: {
      get () { return this.$store.state.store.selectedData.country },
      set (value) { this.$store.commit('store/setSelected', { key: 'country', value }); this.storeTracking({ event: 'filter_store', mode: 'Store', label: value, filterLabel: 'Country' }) }
    },
    /** 双相绑定城市数据 */
    selectedCity: {
      get () { return this.$store.state.store.selectedData.city }, // City
      set (value) { this.$store.commit('store/setSelected', { key: 'city', value }); this.storeTracking({ event: 'filter_store', mode: 'Store', label: value, filterLabel: 'City' }) }
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
      this.$store.dispatch('store/useSearchData')
    }
  },
  created () {
    this.showSearch = false
    if (this.$route.query.search) {
      this.$store.commit('store/setSearchData', this.$route.query.search)
      this.showSearch = true
    }
  },
  methods: {
    goAddress (item) {
    },
    callnumber (mobile) {
      /* 拨打电话 */
      window.location.href = 'tel:' + mobile
    },
    /* 点击搜索跳搜索页面 */
    goSearch () {
      this.showSearch = true
    },
    goDetail (item) {
      if (item.qrcode !== '' || item.images !== '' || item.online !== '') {
        this.$router.push({ path: '/storedetail', query: { method: item.alias, latitude: this.position.latitude, longitude: this.position.longitude } }, () => {}, () => {})
        this.storeTracking({ event: 'view_store', mode: 'Store', label: '点击详情' })
      }
    },
    /** 返回门店列表 */
    returnStore () {
      this.showSearch = false
      this.$router.push({ path: '/store' }, () => {}, () => {})
      this.clearSearchData()
    },
    /** 清除搜索数据 */
    clearSearchData () {
      this.$store.commit('store/setSearchData', '')
    },
    /** 定位 */
    async getLoacl () {
      try {
        this.local.error = false
        this.local.btnText = '获取定位中...'
        this.local.disabled = true
        await this.$store.dispatch('store/useLocal')
        await this.$store.dispatch('store/useStoreList')
      } catch (error) {
        this.local.error = true
      } finally {
        this.local.disabled = false
        this.local.btnText = '使用当前所在位置'
      }
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
