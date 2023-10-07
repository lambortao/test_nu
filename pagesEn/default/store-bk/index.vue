<template>
  <div>
    <div class="site-is-default">
      <div class="store">
        <div class="store_container">
          <div class="title">
            <p>门店信息</p>
            <p>以下店铺为官方授权门店</p>
          </div>
          <div class="content">
            <div class="select-all">
              <div class="select-areas">
                <div>
                  <div class="country">
                    <div class="title">
                      国家
                    </div>
                    <div class="total">
                      <DropDow
                        v-model="selectedCountryList"
                        :drop-list="CountryList"
                      />
                    </div>
                    <div />
                  </div>
                  <div class="bottom-line" />
                </div>
                <div class="city-area">
                  <div class="city">
                    <div class="title">
                      城市
                    </div>
                    <div class="total">
                      <!-- <div class="">
                        <select v-model="selectedRegionList">
                          <option v-for="item in RegionList" :key="item.region" :value="item.region">{{item.region}}</option>
                        </select>
                      </div> -->
                      <DropDow
                        v-model="selectedRegionList"
                        :drop-list="RegionList"
                      />
                    </div>
                    <div />
                  </div>
                  <div class="bottom-line" />
                </div>
                <div class="brands">
                  <div class="brandName">
                    <div class="title">
                      品牌
                    </div>
                    <div class="total">
                      <span class="all-total" @click="brand()">全部</span>
                      <div v-if="showBrand" class="brand-select">
                        <div class="select-border">
                          <div class="ge">
                            <input type="checkbox" :checked="allBrand" @change="selectALL()"><span class="span">全选</span>
                          </div>
                          <div v-for="item in BrandList" :key="item.brand" class="ge">
                            <input type="checkbox" :checked="item.checked" @change="selectBrand(item.brand, item.checked)"><span class="span">{{ item.brand }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="showBrand === false" class="arrow" @click="brand()">
                      <img src="~/assets/images/login/down.png" class="arrow-img">
                    </div>
                    <div v-if="showBrand === true" class="arrows" @click="brand()">
                      <img src="~/assets/images/login/down.png" class="arrow-imgs">
                    </div>
                  </div>
                  <div class="bottom-line" />
                </div>
              </div>
              <div>
                <div class="search-area">
                  <div class="input-area">
                    <input v-model="defaultvalue" class="inp" placeholder="搜索..." type="search" @input="getVA($event)">
                  </div>
                </div>
              </div>
            </div>
            <div v-if="storeList.length === 0" class="empty-area">
              <div class="empty">
                {{ loadtext }}
              </div>
            </div>
            <div v-if="showLoad" class="empty-area">
              <div class="empty">
                <img src="~/assets/images/store/empty.png">
              </div>
              <div class="empty-text">
                暂无搜索结果
              </div>
            </div>
            <div v-for="(item,ind) in showListData" :key="ind">
              <div class="store_list">
                <div v-if="item.hot === 1">
                  <div class="store-item">
                    <div v-if="item.thumbnail" class="store-info">
                      <div class="store-img" :style="{ backgroundImage: `url(${item.thumbnail})` }" />
                    </div>
                    <div class="right-area">
                      <div v-if="item.thumbnail !== '' " class="oneline">
                        <div class="store-title">
                          <h5>{{ item.title }}</h5>
                        </div>
                        <div class="store-time">
                          营业时间: {{ item.content[0].value }}
                        </div>
                      </div>
                      <div v-if="item.thumbnail === '' " class="one">
                        <div class="store-title">
                          <h5>{{ item.title }}</h5>
                        </div>
                        <div class="store-time">
                          营业时间: {{ item.content[0].value }}
                        </div>
                      </div>
                      <div v-if="item.thumbnail !== '' " class="twoline">
                        <div class="store-address">
                          {{ item.address }}
                        </div>
                        <div class="phone">
                          热线电话:{{ item.mobile }}
                        </div>
                      </div>
                      <div v-if="item.thumbnail === '' " class="two">
                        <div class="store-address">
                          {{ item.address }}
                        </div>
                        <div class="phone">
                          热线电话:{{ item.mobile }}
                        </div>
                      </div>
                      <div v-if="item.thumbnail !== ''" class="threeline">
                        <div v-if="item.online !== ''" class="online">
                          <div v-for="(store,index) in item.online" :key="index">
                            <div v-if="store.options.length > 0" class="all-name">
                              <div v-for="(items,inde) in store.options" :key="inde" class="storeName">
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
                          <div v-for="(items,index) in item.brandids" :key="index" class="brand-item">
                            <div class="brand-item-list">
                              {{ items }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div v-if="item.thumbnail === ''" class="three">
                        <div v-if="item.online !== ''" class="online">
                          <div v-for="(store,index) in item.online" :key="index">
                            <div v-if="store.options.length > 0" class="all-name">
                              <div v-for="(items,inde) in store.options" :key="inde" class="storeName">
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
                          <div v-for="(items,index) in item.brandids" :key="index" class="brand-item">
                            <div class="brand-item-list">
                              {{ items }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="item.hot === 0" class="pro-text">
                  <div v-if="ind === nearindex && typeList.length!=0" class="retail">
                    零售展厅
                  </div>
                  <div v-if="ind === showIndex && showList.length!=0" class="retail">
                    项目展厅
                  </div>
                </div>
                <div v-if="item.hot === 0" class="store-items">
                  <div class="right-area">
                    <div class="onelines">
                      <div class="store-title">
                        <div>
                          <h5>{{ item.title }}</h5>
                        </div>
                        <div v-if="item.title === 'HAY'" class="Franchise">
                          <div class="fran">
                            专营店
                          </div>
                        </div>
                      </div>
                      <div class="store-time">
                        营业时间: {{ item.content[0].value }}
                      </div>
                    </div>
                    <div class="twolines">
                      <div class="store-address">
                        {{ item.address }}
                      </div>
                      <div class="phone">
                        热线电话:{{ item.mobile }}
                      </div>
                    </div>
                    <div class="threelines">
                      <div v-if="item.online !== ''" class="online">
                        <div v-for="(store,index) in item.online" :key="index">
                          <div v-if="store.options.length > 0" class="all-name">
                            <div v-for="(items,inde) in store.options" :key="inde" class="storeName" @click="goInto(items.link)">
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
                        <div v-for="(items,index) in item.brandids" :key="index" class="brand-item">
                          <div class="brand-item-list">
                            {{ items }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="line" />
              </div>
            </div>
          </div>
        </div>
        <!-- <wechatLogin></wechatLogin> -->
      </div>
    </div>
    <mobile-store class="site-is-mobile" />
  </div>
</template>

<script>
import MobileStore from '~/pagesEn/mobile/store/index.vue'
import DropDow from '~/componentsEn/common/DropDow.vue'
export default {
  name: 'StorePage',
  components: {
    MobileStore,
    DropDow
  },
  layout: 'defaultThreeColunms',
  data () {
    return {
      loadtext: '加载中...',
      showListData: [],
      List: [],
      storeList: [],
      nearindex: 0,
      selectList: [],
      distanceList: [],
      detailobj: '',
      lastindex: '',
      newArr: [],
      oldlist: [],
      defaultvalue: '',
      kw: '',
      list: [],
      val: [],
      selectedCountryList: [],
      // 下拉选中的地区
      selectedRegionList: [],
      // 下拉选中的品牌
      selectedBrandList: [],
      CountryList: [],
      RegionList: [],
      BrandList: [],
      allRegion: true,
      showRegion: false,
      allBrand: true,
      showBrand: false,
      allList: [],
      showLoad: false,
      orderby: [],
      order: [],
      imgList: [],
      typeList: [],
      classList: [],
      showList: [],
      showIndex: 0
    }
  },
  async fetch () {
    await this.$store.dispatch('store/useStoreList')
    await this.$store.dispatch('store/useCountryList')
    await this.$store.dispatch('store/useBrandList')
    this.getList()
    this.showListData = this.storeList
    for (let k = 0; k < this.showListData.length; k++) {
      if (this.showListData.length !== 0 && this.showList.length !== 0) {
        if (this.showListData[k].alias === this.showList[0].alias) {
          this.showIndex = k
        }
      }
    }
    this.lastindex = this.showListData.length - 1
    this.CountryList.push({
      country: '全部',
      label: '全部',
      value: 'all',
      checked: true
    })
    for (let i = 0; i < this.countryLists.length; i++) {
      if (this.countryLists[i].k !== null) {
        this.CountryList.push({
          country: this.countryLists[i].k,
          label: this.countryLists[i].k,
          value: this.countryLists[i].k,
          checked: true
        })
      }
    }
    for (let i = 0; i < this.brandLists.length; i++) {
      this.BrandList.push({
        id: this.brandLists[i].alias,
        brand: this.brandLists[i].name,
        checked: true
      })
    }
  },
  head: {
    title: 'Nine United官网-门店信息'
  },
  computed: {
    theme () {
      return this.$store.state.site.theme
    },
    themeFixed () {
      return this.$store.state.site.themeFixed
    },
    storeLista () {
      return this.$store.getters['store/getStoreList']
    },
    countryLists () {
      return this.$store.getters['store/getCountryList']
    },
    brandLists () {
      return this.$store.getters['store/getBrandList']
    }
  },
  watch: {
    selectedCountryList (val) {
      this.RegionList = []
      console.log(val)
      this.showListData = []
      this.newArr = []
      this.storeList = this.oldlist
      if (val === 'all') {
        this.showListData = this.storeList
        this.getRegionList(val)
        this.showBrand = false
        this.allList = this.showListData
        this.nearindex = this.newArr.length
        this.lastindex = this.showListData.length - 1
        return ''
      }
      this.storeList.forEach((element) => {
        if (element.country === val) {
          this.showListData.push(element)
        }
      })
      if (this.showListData.length > 1) {
        for (let i = 0; i < this.showListData.length; i++) {
          for (let j = i + 1; j < this.showListData.length; j++) {
            if (this.showListData[i].alias === this.showListData[j].alias) {
              this.showListData.splice(j, 1)
              j--
            }
          }
        }
      }
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData[k].hot === 1) {
          this.newArr.push(this.showListData[k])
        }
      }
      this.getRegionList(val)
      this.showBrand = false
      this.allList = this.showListData
      this.nearindex = this.newArr.length
      this.lastindex = this.showListData.length - 1
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData.length !== 0 && this.showList.length !== 0) {
          if (this.showListData[k].alias === this.showList[0].alias) {
            this.showIndex = k
          }
        }
      }
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
    },
    selectedRegionList (val) {
      console.log(val)
      this.showListData = []
      this.newArr = []
      this.storeList = this.oldlist
      if (val === 'all') {
        this.showListData = this.storeList
        this.showBrand = false
        this.allList = this.showListData
        this.nearindex = this.newArr.length
        this.lastindex = this.showListData.length - 1
        return ''
      }
      this.storeList.forEach((element) => {
        if (element.city === val) {
          this.showListData.push(element)
        }
      })
      if (this.showListData.length > 1) {
        for (let i = 0; i < this.showListData.length; i++) {
          for (let j = i + 1; j < this.showListData.length; j++) {
            if (this.showListData[i].alias === this.showListData[j].alias) {
              this.showListData.splice(j, 1)
              j--
            }
          }
        }
      }
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData[k].hot === 1) {
          this.newArr.push(this.showListData[k])
        }
      }
      this.showBrand = false
      this.allList = this.showListData
      this.nearindex = this.newArr.length
      this.lastindex = this.showListData.length - 1
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData.length !== 0 && this.showList.length !== 0) {
          if (this.showListData[k].alias === this.showList[0].alias) {
            this.showIndex = k
          }
        }
      }
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
    }
  },
  created () {
    // this.getCountryList()
    // this.getSelectList()
  },
  mounted () {
    this.$store.commit('site/setTheme', 'dark')
    this.$store.commit('site/setThemeStatus', false)
    window.scrollTo(0, 0)
  },
  methods: {
    goInto (url) {
      window.open(url)
    },
    brand () {
      this.showBrand = !this.showBrand
      if (this.showBrand === true) {
        this.showRegion = false
      }
    },
    region () {
      this.showRegion = !this.showRegion
      if (this.showRegion === true) {
        this.showBrand = false
      }
    },
    selectALL () {
      this.allBrand = !this.allBrand
      console.log(this.allBrand, 'aaaa')
      for (let i = 0; i < this.BrandList.length; i++) {
        this.BrandList[i].checked = this.allBrand
      }
      if (this.allBrand === true) {
        if (this.allList.length !== 0) {
          this.showListData = this.allList
        } else {
          this.showListData = this.oldlist
        }
      } else {
        this.showListData = []
        if (this.allList.length !== 0) {
          this.showListData = this.allList
        } else {
          this.showListData = this.oldlist
        }
      }
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData.length !== 0 && this.showList.length !== 0) {
          if (this.showListData[k].alias === this.showList[0].alias) {
            this.showIndex = k
          }
        }
      }
    },
    regionALL () {
      this.allRegion = !this.allRegion
      for (let i = 0; i < this.RegionList.length; i++) {
        this.RegionList[i].checked = this.allRegion
      }
      if (this.allRegion === true) {
        this.showListData = this.allList
      } else {
        this.showListData = []
      }
    },
    selectRegion (region, checked) {
      this.newArr = []
      this.showListData = []
      const regionselect = []
      for (let i = 0; i < this.RegionList.length; i++) {
        if (region === this.RegionList[i].region) {
          this.RegionList[i].checked = !checked
        }
      }
      for (let j = 0; j < this.RegionList.length; j++) {
        if (this.RegionList[j].checked === true) {
          regionselect.push(this.RegionList[j].region)
        }
      }
      this.storeList.forEach((element) => {
        regionselect.forEach((item) => {
          if (element.city.includes(item)) {
            this.showListData.push(element)
          }
        })
      })
      if (this.showListData.length > 1) {
        for (let i = 0; i < this.showListData.length; i++) {
          for (let j = i + 1; j < this.showListData.length; j++) {
            if (this.showListData[i].alias === this.showListData[j].alias) {
              this.showListData.splice(j, 1)
              j--
            }
          }
        }
      }
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData[k].hot === 1) {
          this.newArr.push(this.showListData[k])
        }
      }
      const arr = this.RegionList.filter((item) => {
        return item.checked !== false
      })
      if (arr.length === this.RegionList.length) {
        this.allRegion = true
        this.showListData = this.oldlist
      } else {
        this.allRegion = false
      }
      this.nearindex = this.newArr.length
      this.lastindex = this.showListData.length - 1
    },
    selectBrand (brand, checked) {
      this.newArr = []
      this.showListData = []
      const brandselect = []
      for (let i = 0; i < this.BrandList.length; i++) {
        if (brand === this.BrandList[i].brand) {
          this.BrandList[i].checked = !checked
        }
      }
      for (let j = 0; j < this.BrandList.length; j++) {
        if (this.BrandList[j].checked === true) {
          brandselect.push(this.BrandList[j].brand)
        }
      }
      if (this.allList.length === 0) {
        this.storeList = this.oldlist
      } else {
        this.storeList = this.allList
      }
      this.storeList.forEach((element) => {
        brandselect.forEach((item) => {
          if (element.brandids.includes(item)) {
            this.showListData.push(element)
          }
        })
      })
      if (this.showListData.length > 1) {
        for (let i = 0; i < this.showListData.length; i++) {
          for (let j = i + 1; j < this.showListData.length; j++) {
            if (this.showListData[i].alias === this.showListData[j].alias) {
              this.showListData.splice(j, 1)
              j--
            }
          }
        }
      }
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData[k].hot === 1) {
          this.newArr.push(this.showListData[k])
        }
      }
      const arr = this.BrandList.filter((item) => {
        return item.checked !== false
      })
      if (arr.length === this.BrandList.length) {
        this.allBrand = true
        if (this.allList.length !== 0) {
          this.showListData = this.allList
        } else {
          this.showListData = this.oldlist
        }
      } else {
        this.allBrand = false
      }
      console.log(arr.length, 'arr', this.BrandList.length)
      this.nearindex = this.newArr.length
      this.lastindex = this.showListData.length - 1
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData.length !== 0 && this.showList.length !== 0) {
          if (this.showListData[k].alias === this.showList[0].alias) {
            this.showIndex = k
          }
        }
      }
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
    },
    async getSelectList () {
      const list = await this.$axios.$post('/getStoreBrandList', {})
      for (let i = 0; i < list.length; i++) {
        this.BrandList.push({
          id: list[i].alias,
          brand: list[i].name,
          checked: true
        })
      }
      console.log('list', this.BrandList)
    },
    async getCountryList () {
      const list = await this.$axios.$post('/getStoreCityForWeb', {})
      this.CountryList.push({
        country: '全部',
        label: '全部',
        value: 'all',
        checked: true
      })
      for (let i = 0; i < list.length; i++) {
        if (list[i].k !== null) {
          this.CountryList.push({
            country: list[i].k,
            label: list[i].k,
            value: list[i].k,
            checked: true
          })
        }
      }
      console.log('list', list)
    },
    async getRegionList (val) {
      const list = await this.$axios.$post('/getStoreCityForWeb', {})
      let arr = []
      for (let i = 0; i < list.length; i++) {
        if (val === list[i].k) {
          arr = list[i].option
        }
      }
      for (let j = 0; j < arr.length; j++) {
        this.RegionList.push({
          region: arr[j],
          label: arr[j],
          value: arr[j],
          checked: true
        })
      }
      this.RegionList.unshift({
        region: '全部',
        label: '全部',
        value: 'all',
        checked: true
      })
      console.log('regionlist', this.RegionList)
    },
    /* 获取门店列表 */
    getList () {
      /** 门店列表 */
      this.storeList = []
      this.storeList = this.storeList.concat(this.storeLista)
      console.log(this.storeList, 'all')
      for (let k = 0; k < this.storeList.length; k++) {
        if (this.storeList[k].hot === 1) { /** 筛选出hot为1的门店列表 */
          this.newArr.push(this.storeList[k])
        }
      }
      this.orderby = this.newArr.sort(function (a, b) { /** hot为1的门店列表进行orderby排序 */
        return a.orderby - b.orderby
      })
      this.newArr = this.orderby
      this.newArr.reverse()
      let arrList = []
      for (let p = 0; p < this.newArr.length; p++) { /** 有图片的排orderby排序的列表前面 */
        if (this.newArr[p].thumbnail !== '') {
          this.imgList.push(this.newArr[p])
        } else {
          arrList.push(this.newArr[p])
        }
      }
      arrList = arrList.sort(function (a, b) { /** hot为1的门店列表按距离排序 */
        return parseFloat(a.distance) - parseFloat(b.distance)
      })
      /** this.newArr为最上面模块的排序列表,第一模块 */
      this.newArr = this.imgList.concat(arrList)
      // this.storeList = all.sort(function (a, b) { /** 整个门店列表按距离排序 */
      //   return parseFloat(a.distance) - parseFloat(b.distance)
      // }
      for (let k = 0; k < this.storeList.length; k++) { /** 筛选出hot为1的门店列表删除掉，留下hot为0的列表 */
        if (this.storeList[k].hot !== 1) {
          this.classList.push(this.storeList[k])
        }
      }
      for (let x = 0; x < this.classList.length; x++) { /** this.typeList是筛选出hot为1且type为零售展厅的门店列表 */
        if (this.classList[x].type === '零售展厅') {
          this.typeList = this.typeList.concat(this.classList[x])
        }
      }
      this.typeList = this.typeList.sort(function (a, b) { /** this.typeList按距离排序 */
        return parseFloat(a.distance) - parseFloat(b.distance)
      })
      for (let x = 0; x < this.typeList.length; x++) { /** this.typeList的门店列表进行orderby排序 */
        if (this.typeList[x].orderby > 0) {
          this.order.push(this.typeList[x])
        }
      }
      this.order = this.order.sort(function (a, b) {
        return a.orderby - b.orderby
      })
      this.order.reverse() /** this.order是this.typeList经过orderby筛选的列表 */
      for (let k = 0; k < this.typeList.length; k++) {
        if (this.typeList[k].orderby > 0) { /** 筛选出有this.order的值的列表删除 */
          this.typeList.splice(k, 1)
        }
      }
      this.typeList = this.order.concat(this.typeList) /** 中间模块的列表，第二模块 */
      for (let x = 0; x < this.classList.length; x++) { /** 删除中间模块的列表,得到第三模块 */
        if (this.classList[x].type === '零售展厅') {
          this.classList.splice(x, 1)
        }
      }
      this.showList = this.classList
      this.showList = this.showList.sort(function (a, b) { /** 经过距离排序过的第三模块 */
        return parseFloat(a.distance) - parseFloat(b.distance)
      })
      this.classList = this.typeList.concat(this.showList) /** 第二模块在第三模块上面 */
      this.storeList = this.newArr.concat(this.classList) /** 第一模块在第二模块上面 */
      this.oldlist = this.storeList
      this.nearindex = this.newArr.length
    },
    /* 获取搜索框值进行搜素操作 */
    async getVA (e) {
      this.storeList = this.oldlist
      this.showListData = this.storeList
      this.list = []
      this.kw = ''
      this.newArr = []
      if (e.target.value !== '') {
        this.kw = e.target.value
        for (let i = 0; i < this.storeList.length; i++) {
          if (this.storeList[i].city.includes(this.kw) === true) {
            this.list.push(this.storeList[i])
          }
        }
        this.storeList = await this.list
        this.lastindex = this.storeList.length - 1
      } else {
        this.storeList = await this.oldlist
        this.lastindex = this.storeList.length - 1
        this.selectedCountryList = []
        this.selectedRegionList = []
      }
      for (let k = 0; k < this.storeList.length; k++) {
        if (this.storeList[k].hot === 1) {
          this.newArr.push(this.storeList[k])
        }
      }
      this.showListData = this.storeList
      for (let k = 0; k < this.showListData.length; k++) {
        if (this.showListData.length !== 0 && this.showList.length !== 0) {
          if (this.showListData[k].alias === this.showList[0].alias) {
            this.showIndex = k
          }
        }
      }
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
      this.nearindex = this.newArr.length
      console.log(this.list, 'ee', this.kw)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/storeIndex.scss";
</style>
