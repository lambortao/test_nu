<template>
  <div class="mobile-store">
    <div class="all">
      <div v-if="showSearch">
        <span class="return-store" @click="returnStore()"><i><img src="~/assets/images/AAmobile/store/arrow-left.png" class="arr-img"></i>返回门店列表</span>
      </div>
      <div v-if="showSearch" class="search-area">
        <div class="input-area">
          <input v-model="defaultvalue" class="inp" placeholder="搜索..." type="search" @input="getVA($event)">
        </div>
        <div v-show="showClear" class="clear" @click="clear()">
          <img src="~/assets/images/AAmobile/store/clear.png">
        </div>
      </div>
      <div class="local-button">
        <button :style="[{ disabled: local.disabled }]" @click="getLoacl">
          {{ local.btnText }}
        </button>
      </div>
      <div v-if="showTop" class="store-info">
        <div class="store-area">
          <h1 class="store-titile">
            门店信息
          </h1>
          <p class="explore">
            以下店铺为官方授权门店
          </p>
        </div>
        <div class="search-icon" @click="goSearch()">
          <img src="~/assets/images/AAmobile/store/Frame.png">
        </div>
      </div>
      <div v-if="showTop" class="region-info">
        <div class="country">
          <div class="brandnames">
            <span class="country-text">国家<i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i></span>
          </div>
          <select id="" v-model="selectedCountryList" name="">
            <option v-for="item in CountryList" :key="item.region" :value="item.country">
              {{ item.country }}
            </option>
          </select>
        </div>
        <div class="region">
          <div class="brandnames">
            <span class="region-text">地区<i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i></span>
          </div>
          <select id="" v-model="selectedRegionList" name="">
            <option v-for="item in RegionList" :key="item.region" :value="item.region">
              {{ item.region }}
            </option>
          </select>
        </div>
        <div class="brand">
          <div class="brandnames">
            <span class="brand-text">品牌<i><img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top"></i></span>
          </div>
          <select id="" v-model="selectedBrandList" name="" multiple>
            <option v-for="item in BrandList" :key="item.brand" :value="item.brand">
              {{ item.brand }}
            </option>
          </select>
        </div>
      </div>
      <div v-if="storeList.length === 0 && showSearch === false" class="loading">
        加载中...
      </div>
      <div v-if="showLoad" class="empty-area">
        <div class="empty">
          <img src="~/assets/images/AAmobile/store/empty.png">
        </div>
      </div>
      <div v-for="(item,ind) in showListData" :key="ind">
        <div v-if="item.hot === 1" class="main-info" @click="godetail(item)">
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
            <div class="address">
              <p>{{ item.address }}</p>
            </div>
            <div class="phone-area" @click.stop="callnumber(item.mobile)">
              <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone"></i>致电</span>
            </div>
          </div>
          <div class="open-times">
            <div class="opentimes">
              营业时间: {{ item.content[0].value }}
            </div>
            <div class="distances">
              小于{{ item.distance }}
            </div>
          </div>
          <div class="content" />
        </div>
        <div v-if="item.hot === 0" class="foot" @click="godetail(item)">
          <div v-if="ind === nearindex && typeList.length!=0" class="retail">
            零售展厅
          </div>
          <div v-if="ind === showIndex && showList.length!=0" class="retail">
            项目展厅
          </div>
          <div class="verpan-area">
            <div class="verpan">
              <div class="titiles">
                <h4>{{ item.title }}</h4>
              </div>
              <div v-if="item.title === 'HAY'" class="near">
                <div class="nearly">
                  专营店
                </div>
              </div>
              <div v-if="ind === nearindex" class="near">
                <div class="nearly">
                  离你最近
                </div>
              </div>
            </div>
            <div>
              <div class="detail-area" @click="godetail(item)">
                <span class="detail-text"><label v-if="ind === nearindex">详情</label><i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow"></i></span>
              </div>
            </div>
          </div>
          <div v-if="item.brandids.length>0">
            <div class="label-info">
              <div v-for="(items,index) in item.brandids" :key="index" class="label-text">
                <p class="label">
                  {{ items }}
                </p>
              </div>
            </div>
          </div>
          <div class="dress">
            <div class="addressarea">
              <div class="arrows">
                <img src="~/assets/images/AAmobile/store/arrowbig.png" class="arrowbig">
              </div>
              <div class="addre">
                <span class="address-detail">{{ item.address }}</span>
              </div>
            </div>
            <div class="phone-area" @click.stop="callnumber(item.mobile)">
              <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone"></i>致电</span>
            </div>
          </div>
          <div class="open-time">
            <div class="opentime">
              营业时间: {{ item.content[0].value }}
            </div>
            <div class="distance">
              小于{{ item.distance }}
            </div>
          </div>
          <div v-if="ind !== lastindex" class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StorePage',
  data () {
    return {
      isHay: false,
      showTop: true,
      showSearch: false,
      val: [],
      selectedCountryList: [],
      // 下拉选中的地区
      selectedRegionList: [],
      // 下拉选中的品牌
      selectedBrandList: [],
      // 显示在列表页的数据
      showListData: [],
      isCountry: false,
      isRegion: false,
      isBrand: false,
      List: [],
      CountryList: [],
      RegionList: [],
      BrandList: [],
      storeList: [],
      nearindex: 0,
      selectList: [],
      distanceList: [],
      detailobj: '',
      lastindex: '',
      newArr: [],
      oldlist: [],
      showClear: false,
      defaultvalue: '',
      kw: '',
      allList: [],
      orderby: [],
      order: [],
      imgList: [],
      showLoad: false,
      typeList: [],
      classList: [],
      showList: [],
      showIndex: 0,
      local: {
        disabled: false,
        btnText: '使用当前位置'
      }
    }
  },
  fetch () {
    this.showListData = this.storeList
    for (let k = 0; k < this.showListData.length; k++) {
      if (this.showListData.length !== 0 && this.showList.length !== 0) {
        if (this.showListData[k].alias === this.showList[0].alias) {
          this.showIndex = k
        }
      }
    }
    this.lastindex = this.showListData.length - 1
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
    selectedBrandList (val) {
      this.newArr = []
      this.showListData = []
      if (this.allList.length !== 0) {
        this.storeList = this.allList
      } else {
        this.storeList = this.oldlist
      }
      this.storeList.forEach((element) => {
        val.forEach((item) => {
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
    selectedCountryList (val) {
      this.showListData = []
      this.newArr = []
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
      this.showListData = []
      this.newArr = []
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
    this.showTop = true
    this.showSearch = false
    this.getList()
    // this.getSelectList()
    // this.getCountryList()
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    /* 获取门店列表 */
    getList () {
      /** 门店列表 */
      this.storeList = []
      this.storeList = this.storeList.concat(this.storeLista)
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
        return parseFloat(a.distance.slice(0, -2)) - parseFloat(b.distance.slice(0, -2))
      })
      /** this.newArr为最上面模块的排序列表,第一模块 */
      this.newArr = this.imgList.concat(arrList)
      // this.storeList = all.sort(function (a, b) { /** 整个门店列表按距离排序 */
      //   return parseFloat(a.distance.slice(0, -2)) - parseFloat(b.distance.slice(0, -2))
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
        return parseFloat(a.distance.slice(0, -2)) - parseFloat(b.distance.slice(0, -2))
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
        return parseFloat(a.distance.slice(0, -2)) - parseFloat(b.distance.slice(0, -2))
      })
      this.classList = this.typeList.concat(this.showList) /** 第二模块在第三模块上面 */
      this.storeList = this.newArr.concat(this.classList) /** 第一模块在第二模块上面 */
      this.oldlist = this.storeList
      this.nearindex = this.newArr.length
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
    },
    async getCountryList () {
      const list = await this.$axios.$post('/getStoreCityForWeb', {})
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
    },
    async getRegionList () {
      const list = await this.$axios.$post('/getStoreCity', {})
      for (let i = 0; i < list.length; i++) {
        this.RegionList.push({
          region: list[i],
          checked: true
        })
      }
    },
    callnumber (mobile) {
      /* 拨打电话 */
      window.location.href = 'tel:' + mobile
    },
    /* 点击详情跳详情页面 */
    godetail (item) {
      const list = JSON.stringify(item)
      this.$router.push({ path: '/en/storedetail', query: { list } }, () => {}, () => {})
    },
    /* 点击搜索跳搜索页面 */
    goSearch () {
      this.showTop = false
      this.showSearch = true
    },
    /* 清除输入框值 */
    clear () {
      this.defaultvalue = ''
      this.storeList = this.oldlist
      this.showListData = this.storeList
      this.showClear = false
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
    },
    returnStore () {
      this.showTop = true
      this.showSearch = false
      this.storeList = this.oldlist
      this.showListData = this.storeList
      if (this.showListData.length === 0) {
        this.showLoad = true
      } else {
        this.showLoad = false
      }
    },
    /* 获取搜索框值进行搜素操作 */
    async getVA (e) {
      this.showClear = true
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
      }
      for (let k = 0; k < this.storeList.length; k++) {
        if (this.storeList[k].hot === 1) {
          this.newArr.push(this.storeList[k])
        }
      }
      this.showListData = this.storeList
      this.nearindex = this.newArr.length
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
    async getLoacl () {
      try {
        this.local.btnText = '获取定位中...'
        this.local.disabled = true
        await this.$store.dispatch('store/useLocal')
        await this.$store.dispatch('store/useStoreList')
        await this.getList()
        this.local.btnText = '使用当前位置'
      } catch (error) {
        this.local.btnText = '定位失败'
        console.log(error)
      } finally {
        this.local.disabled = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/store-info.scss';
img {
  width: 100%;
  object-fit: contain;
}
</style>
