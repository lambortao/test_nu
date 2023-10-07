<template>
  <div>
    <div class="site-is-default">
      <div class="store" @click.stop="storeBodyClick">
        <div class="store_container">
          <div class="title">
            <p>Store Information</p>
            <p>The following stores are officially authorized stores</p>
          </div>
          <div class="content">
            <div class="select-all">
              <div class="select-box">
                <singin-select
                  ref="singinSeleceOne"
                  v-model="selectedCountry"
                  label="Conutry"
                  :list="countryListData"
                />
                <singin-select
                  ref="singinSeleceTwo"
                  v-model="selectedCity"
                  label="City"
                  :list="cityListData"
                />
                <brand-select
                  ref="singinSeleceThree"
                  v-model="selectedBrand"
                  label="Brand"
                  :list="brandListData"
                />
              </div>
              <div>
                <div class="search-area">
                  <div class="input-area">
                    <input v-model="searchData" class="inp" placeholder="Search..." type="search">
                  </div>
                </div>
              </div>
            </div>
            <v-placeholder v-if="$fetchState.pending" mode="loading" />
            <div>
              <div
                v-if="!$fetchState.pending && storeListData.hotModule.length === 0 && storeListData.retailShowroom.length === 0 && storeListData.projectShowroom.length === 0"
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
              <div class="store_list">
                <div v-if="storeListData.hotModule">
                  <div v-for="(item, inds) in storeListData.hotModule" :key="item.alias">
                    <div class="store-item">
                      <div v-if="item.thumbnail" class="store-info">
                        <div class="store-img" :style="{ backgroundImage: `url(${item.thumbnail})` }" />
                      </div>
                      <div class="right-area">
                        <div v-if="item.thumbnail !== '' " class="onelin">
                          <div class="store-title">
                            {{ item.title_en }}
                          </div>
                          <div class="store-time">
                            Store Hours: {{ item.content[0].value }}
                          </div>
                        </div>
                        <div v-if="item.thumbnail === '' " class="one">
                          <div class="store-title">
                            <h4>{{ item.title_en }}</h4>
                          </div>
                          <div class="store-time">
                            Store Hours: {{ item.content[0].value }}
                          </div>
                        </div>
                        <div v-if="item.thumbnail !== '' " class="twolin">
                          <div class="store-address">
                            {{ item.address_en }}
                          </div>
                          <div class="phone">
                            Tel:{{ item.mobile }}
                          </div>
                        </div>
                        <div v-if="item.thumbnail === '' " class="two">
                          <div class="store-address">
                            {{ item.address_en }}
                          </div>
                          <div class="phone">
                            Tel:{{ item.mobile }}
                          </div>
                        </div>
                        <div v-if="item.thumbnail !== ''" class="threelin">
                          <div v-if="item.online !== ''" class="online">
                            <div v-for="store in item.online" :key="store.key">
                              <div v-if="store.options.length > 0" class="all-name">
                                <div v-for="items in store.options" :key="items.name" class="storeName">
                                  <div class="store-icons">
                                    <img v-if="store.key === '淘宝'" src="~/assets/images/AAmobile/store/taobao.png" class="store-icon">
                                    <img v-if="store.key === '天猫'" src="~/assets/images/AAmobile/store/online.png" class="store-icon">
                                    <img v-if="store.key === '京东'" src="~/assets/images/AAmobile/store/jingdong.png" class="store-icon">
                                  </div>
                                  <div class="storeTitle">
                                    <p>{{ items.name }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else class="online" />
                          <div v-if="item.brandids.length>0" class="brand">
                            <div v-for="items in item.brandids" :key="items" class="brand-item">
                              <div class="brand-item-list">
                                {{ items }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="item.thumbnail === ''" class="three">
                          <div v-if="item.online !== ''" class="online">
                            <div v-for="(store) in item.online" :key="store.key">
                              <div v-if="store.options.length > 0" class="all-name">
                                <div v-for="(items) in store.options" :key="items.name" class="storeName">
                                  <div class="store-icons">
                                    <img v-if="store.key === '淘宝'" src="~/assets/images/AAmobile/store/taobao.png" class="store-icon">
                                    <img v-if="store.key === '天猫'" src="~/assets/images/AAmobile/store/online.png" class="store-icon">
                                    <img v-if="store.key === '京东'" src="~/assets/images/AAmobile/store/jingdong.png" class="store-icon">
                                  </div>
                                  <div class="storeTitle">
                                    <p>{{ items.name }}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div v-else class="online" />
                          <div v-if="item.brandids.length>0" class="brand">
                            <div v-for="items in item.brandids" :key="items" class="brand-item">
                              <div class="brand-item-list">
                                {{ items }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="storeListData.hotModule.length-1 !== inds" class="line" />
                  </div>
                </div>
                <div v-if="storeListData.retailShowroom.length > 0" class="retail">
                  Retailers
                </div>
                <div v-for="(item, inde) in storeListData.retailShowroom" :key="item.alias">
                  <div class="store-items">
                    <div class="right-area">
                      <div class="onelines">
                        <div class="store-title">
                          <div>
                            {{ item.title_en }}
                          </div>
                          <div v-if="item.title_en === 'HAY'" class="Franchise">
                            <div class="fran">
                              Franchise store
                            </div>
                          </div>
                        </div>
                        <div class="store-time">
                          Store Hours: {{ item.content[0].value }}
                        </div>
                      </div>
                      <div class="twolines">
                        <div class="store-address">
                          {{ item.address_en }}
                        </div>
                        <div class="phone">
                          Tel:{{ item.mobile }}
                        </div>
                      </div>
                      <div class="threelines">
                        <div v-if="item.online !== ''" class="online">
                          <div v-for="store in item.online" :key="store.key">
                            <div v-if="store.options.length > 0" class="all-name">
                              <div v-for="items in store.options" :key="items.name" class="storeName" @click="goInto(items.link)">
                                <div class="store-icons">
                                  <img v-if="store.key === '淘宝'" src="~/assets/images/AAmobile/store/taobao.png" class="store-icon">
                                  <img v-if="store.key === '天猫'" src="~/assets/images/AAmobile/store/online.png" class="store-icon">
                                  <img v-if="store.key === '京东'" src="~/assets/images/AAmobile/store/jingdong.png" class="store-icon">
                                </div>
                                <div class="storeTitle">
                                  <p>{{ items.name }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="online" />
                        <div v-if="item.brandids.length>0" class="brand">
                          <div v-for="items in item.brandids" :key="items" class="brand-item">
                            <div class="brand-item-list">
                              {{ items }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="storeListData.retailShowroom.length-1 !== inde" class="line" />
                </div>
                <div v-if="storeListData.projectShowroom.length > 0" class="retail">
                  Project exhibition hall
                </div>
                <div v-for="(item, ind) in storeListData.projectShowroom" :key="item.alias">
                  <div class="store-items">
                    <div class="right-area">
                      <div class="onelines">
                        <div class="store-title">
                          <div>
                            {{ item.title_en }}
                          </div>
                          <div v-if="item.title_en === 'HAY'" class="Franchise">
                            <div class="fran">
                              Franchise stores
                            </div>
                          </div>
                        </div>
                        <div class="store-time">
                          Store Hours: {{ item.content[0].value }}
                        </div>
                      </div>
                      <div class="twolines">
                        <div class="store-address">
                          {{ item.address_en }}
                        </div>
                        <div class="phone">
                          Tel:{{ item.mobile }}
                        </div>
                      </div>
                      <div class="threelines">
                        <div v-if="item.online !== ''" class="online">
                          <div v-for="store in item.online" :key="store.key">
                            <div v-if="store.options.length > 0" class="all-name">
                              <div v-for="items in store.options" :key="items.name" class="storeName" @click="goInto(items.link)">
                                <div class="store-icons">
                                  <img v-if="store.key === '淘宝'" src="~/assets/images/AAmobile/store/taobao.png" class="store-icon">
                                  <img v-if="store.key === '天猫'" src="~/assets/images/AAmobile/store/online.png" class="store-icon">
                                  <img v-if="store.key === '京东'" src="~/assets/images/AAmobile/store/jingdong.png" class="store-icon">
                                </div>
                                <div class="storeTitle">
                                  <p>{{ items.name }}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="online" />
                        <div v-if="item.brandids.length>0" class="brand">
                          <div v-for="items in item.brandids" :key="items" class="brand-item">
                            <div class="brand-item-list">
                              {{ items }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="storeListData.projectShowroom.length-1 !== ind" class="line" />
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
import MobileStore from '~/pagesEn/mobile/store/index.vue'

export default {
  name: 'StorePage',
  components: {
    MobileStore,
    SinginSelect,
    BrandSelect
  },
  async fetch () {
    /** 获取城市数据 */
    await this.$store.dispatch('store/useCountryList', 'en')
    /** 获取品牌数据 */
    await this.$store.dispatch('store/useBrandList')
    /** 获取门店数据 */
    await this.$store.dispatch('store/useStoreList')
  },
  head: {
    title: 'Nine United官网-门店信息'
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
      const objData = this.$store.state.store.countryListData
      const newData = []
      for (const key in objData) {
        if (Object.hasOwnProperty.call(objData, key)) {
          newData.push({
            value: key,
            label: key
          })
        }
      }
      return newData
    },
    /** 城市列表 */
    cityListData () {
      const objData = this.$store.state.store.countryListData[this.$store.state.store.selectedData.country]
      return objData && objData.length
        ? objData.map(item => ({
          value: item,
          label: item
        }))
        : []
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
      this.$router.push({
        query: this.selectedBrand.length
          ? {
              brand: this.selectedBrand.join(',')
            }
          : {}
      })
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
    }
  },
  mounted () {
    this.$store.commit('site/setTheme', 'dark')
    this.$store.commit('site/setThemeStatus', false)
    window.scrollTo(0, 0)
  },
  created () {
    if (this.$route.query.brand) {
      this.$store.commit('store/setSelected', {
        key: 'brand',
        value: this.$route.query.brand.split(',')
      })
    }
  },
  methods: {
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/storeIndex.scss";
</style>
