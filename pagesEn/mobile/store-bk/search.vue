<template>
    <div>
        <div class="search-area">
          <div class="input-area">
              <input class="inp"  placeholder="搜索..." type="search" v-model="defaultvalue"   @input ="getVA($event)" />
          </div>
          <div class="clear" v-show="showClear" @click="clear()">
              <img src="~/assets/images/AAmobile/store/clear.png" />
          </div>
        </div>
        <div v-if="storeList.length === 0" class="empty-area">
          <div class="empty">
            <img src='~/assets/images/AAmobile/store/empty.png' />
          </div>
        </div>
        <div v-for="(item,ind) in storeList" :key="ind" class="all" >
        <div class="main-info" v-if="item.hot === 1" @click="godetail(item)">
        <div class="brand-detail">
          <img :src="item.images[0]" />
        </div>
        <div class="brand-name">
          <div class="brand-logo">
            <div class="logo-icon" >
              <img src="~/assets/images/home/logo.png" />
            </div>
            <div class="logo-name">
              <h4>{{item.title}}</h4>
            </div>
          </div>
          <div class="detail-area" @click="godetail(item)">
            <span class="detail-text">详情<i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow" /></i></span>
          </div>
        </div>
        <div class="address-info">
          <div class="address">
            <p>{{item.address}}</p>
          </div>
          <div class="phone-area" @click.stop="callnumber(item.mobile)">
            <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone" /></i>致电</span>
          </div>
        </div>
        <div class="open-times">
          <div class="opentimes">营业时间: {{item.content[0].value}}</div>
          <div class="distances">小于{{item.distance}}</div>
        </div>
        <div class="content"></div>
      </div>
      <div class="foot" v-if="item.hot === 0" @click="godetail(item)">
        <div class="verpan-area">
          <div class="verpan">
            <div class="titiles">
              <h4>{{item.title}}</h4>
            </div>
            <div class="near" v-if="ind === nearindex">
              <div class="nearly">离你最近</div>
            </div>
          </div>
          <div>
            <div class="detail-area">
              <span class="detail-text"><label v-if="ind === nearindex">详情</label><i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow" /></i></span>
            </div>
          </div>
        </div>
        <div v-if="item.brandids.length>0">
          <div class="label-info" >
          <div class="label-text" v-for="(items,index) in item.brandids" :key="index">
            <p class="label">{{items}}</p>
          </div>
        </div>
        </div>
        <div class="dress">
          <div class="addressarea">
          <div class="arrows">
            <img src="~/assets/images/AAmobile/store/arrowbig.png" class="arrowbig" />
          </div>
          <div class="addre">
            <span class="address-detail">{{item.address}}</span>
          </div>
          </div>
          <div class="phone-area" @click.stop="callnumber(item.mobile)">
            <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone" /></i>致电</span>
          </div>
        </div>
        <div class="open-time">
          <div class="opentime">营业时间: {{item.content[0].value}}</div>
          <div class="distance">小于{{item.distance}}</div>
        </div>
        <div class="line" v-if="ind !== lastindex"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'searchPage',
  data () {
    return {
      showClear: false,
      defaultvalue: '',
      storeList: [],
      lastindex: '',
      temp: '',
      nearindex: 0,
      // 搜索关键词
      kw: '',
      list: [],
      city: [],
      oldlist: [],
      newArr: []
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    /* 获取搜索框值进行搜素操作 */
    async getVA (e) {
      this.showClear = true
      this.storeList = this.oldlist
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
      this.nearindex = this.newArr.length
      console.log(this.list, 'ee', this.kw)
    },
    /* 获取门店列表 */
    async getList () {
      const list = await this.$axios.$post('/getStoreList', { lnglat: '116.536499,39.987725' })
      const all = list
      this.storeList = list
      this.lastindex = this.storeList.length - 1
      for (let k = 0; k < this.storeList.length; k++) {
        if (this.storeList[k].hot === 1) {
          this.newArr.push(this.storeList[k])
        }
      }
      console.log(this.newArr, 'aaa')
      this.storeList = all.sort(function (a, b) {
        return parseFloat(a.distance.slice(0, -2)) - parseFloat(b.distance.slice(0, -2))
      })
      for (let k = 0; k < this.storeList.length; k++) {
        if (this.storeList[k].hot === 1) {
          this.storeList.splice(k, 1)
        }
      }
      this.storeList = this.newArr.concat(this.storeList)
      this.nearindex = this.newArr.length
      this.oldlist = this.storeList
      console.log('list', this.distanceList)
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
    /* 清除搜索框值 */
    clear () {
      this.defaultvalue = ''
      this.storeList = this.oldlist
      this.showClear = false
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '~/assets/scss/mobile/store-search.scss';
    img {
      width: 100%;
      object-fit: contain;
    }
</style>
