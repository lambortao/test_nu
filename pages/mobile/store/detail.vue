<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="total">
    <div class="swiper-box">
      <SwiperMain
        class="swiper_inner"
        :options="swiperOption"
        :reverse="reverse"
        @onSwiper="onSwiper"
      >
        <swiper-slide v-for="(item,ind) in detailList.images" :key="ind">
          <img :src="item">
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination" />
      </SwiperMain>
    </div>
    <div class="store-name">
      <div class="store-logo">
        <h1>{{ detailList.title }}</h1>
      </div>
      <div class="phone-area" @click="callnumber (detailList.mobile)">
        <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/phones.png" class="phone"></i>致电</span>
      </div>
    </div>
    <div class="open-info">
      <div v-if="detailList.content && detailList.content[0]">营业时间 :  {{ detailList.content[0].value }}</div>
      <div class="line">
        |
      </div>
      <div class="line">电话:  {{ detailList.mobile }}</div>
    </div>
    <div class="address-area">
      <div class="postion-img">
        <img src="~/assets/images/AAmobile/store/postions.png">
      </div>
      <div class="address">
        <div class="addre" @click="goAddress">
          <h4>{{ detailList.address }}</h4>
        </div>
        <div v-if="detailList.remarks" class="add">
          <h5>{{ detailList.remarks }}</h5>
        </div>
      </div>
      <div class="detail-area">
        <div class="detail-text">小于{{ detailList.distance }}</div>
      </div>
    </div>
    <div class="lines" />
    <div v-if="detailList.online != ''" class="online-store">
      <div v-if="detailList.online && detailList.online[0].options.length > 0" class="online">线上店铺</div>
      <div class="main-online">
        <div v-for="item in detailList.online" :key="item.label">
          <div v-if="item.options && Array.isArray(item.options) && item.options.length > 0">
            <div v-for="(items,indexz) in item.options" :key="indexz" class="stores">
              <div class="name-store">
                <div class="img-store">
                  <img v-if="item.key === '天猫'" src="~/assets/images/AAmobile/store/online.png">
                  <img v-if="item.key === '京东'" src="~/assets/images/AAmobile/store/jingdong.png">
                  <img v-if="item.key === '淘宝'" src="~/assets/images/AAmobile/store/taobao.png">
                </div>
                <div class="title-store">
                  {{ items.name }}
                </div>
              </div>
              <div v-if="items.link" class="into" @click="goInto({items,item})">
                <div class="into-store">进入店铺</div>
              </div>
              <div v-else class="into" @click="copyText(items.name)">
                <div class="into-store">复制店名</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="code">
      <div v-if="detailList.qrcode" class="code-area">
        <div class="name">
          <h3>{{ detailList.title }}</h3>
        </div>
        <div class="region">{{ detailList.city }}</div>
        <div class="code-img">
          <img :src="detailList.qrcode">
        </div>
        <div class="describe">
          <span>长按二维码添加，即可向店铺直接咨询</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goToMap from '~/utils/goToMap'
export default {
  name: 'DetailPage',
  data () {
    return {
      detailList: {
        content: [],
        online: []
      },
      reverse: true,
      swiperOption: {
        loop: true,
        spaceBetween: 0,
        wdith: 375,
        height: 320,
        speed: 500, // 匀速时间
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true // 允许点击小圆点跳转
        }
      }
    }
  },
  async fetch () {
    /** 获取城市数据 */
    const { method, latitude, longitude } = this.$route.query
    const postData = {
      method
    }
    if (longitude && latitude) {
      postData.lnglat = `${longitude},${latitude}`
    }
    this.detailList = await this.$axios.$post('/getStoreItem', postData)
  },
  mounted () {
  },
  methods: {
    goAddress () {
      goToMap({ ...this.detailList })
      this.$store.dispatch('site/tracker', { page: 'Store-detail', event: 'jump_to_url', mode: 'Store', label: 'map', items: [{ CMSId: this.detailList.alias, StoreName: this.detailList.title_en }] })
    },
    onSwiper (e) {
      console.log(e)
    },
    callnumber (mobile) {
      /* 拨打电话 */
      window.location.href = 'tel:' + mobile
    },
    goInto ({ items, item }) {
      // eslint-disable-next-line camelcase
      const { alias, title_en } = this.detailList
      const { link, name } = items
      const label = item.key === '淘宝' ? 'Taobao' : item.key === '天猫' ? 'Tmall' : item.key === '京东' ? 'JD' : item.key
      const newlink = item.key === '京东' ? `https://shop.m.jd.com/shop/home?shopId=${link}` : link
      window.open(newlink)
      // eslint-disable-next-line camelcase
      this.$store.dispatch('site/tracker', { page: 'Store-detail', event: 'jump_to_url', mode: 'Store', label, items: [{ CMSId: alias, StoreName: title_en, onlineShop: name }] })
    },
    copyText (text) {
      const textValue = document.createElement('textarea')
      textValue.setAttribute('readonly', 'readonly')
      textValue.value = text
      document.body.appendChild(textValue)
      textValue.select()
      const res = document.execCommand('copy')
      document.body.removeChild(textValue)
      document.body.oncopy = function () {
        alert('复制成功!')
      }
      return res
    }
  }
}
</script>
<style lang="scss" scoped>   @import '~/assets/scss/mobile/store-detail.scss';
    img {
      width: 100%;
      object-fit: contain;
    }
</style>
