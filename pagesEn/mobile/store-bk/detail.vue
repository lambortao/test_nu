<template>
    <div class="total">
        <div class="swiper-box">
        <SwiperMain
        class="swiper_inner"
        :options="swiperOption"
        :reverse="reverse"
        @onSwiper="onSwiper"
        >
          <swiper-slide  v-for="(item,ind) in detailList.images" :key="ind"><img :src="item" /></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          </SwiperMain>
        </div>
        <div class="store-name">
            <div class="store-logo"><h1>{{detailList.title}}</h1></div>
            <div class="phone-area" @click="callnumber (detailList.mobile)">
                <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/phones.png" class="phone" /></i>致电</span>
            </div>
        </div>
        <div class="open-info">
            <div>营业时间 :  {{detailList.content[0].value}}</div>
            <div class="line">|</div>
            <div class="line">电话:  {{detailList.mobile}}</div>
        </div>
        <div class="address-area">
            <div class="postion-img">
                <img src="~/assets/images/AAmobile/store/postions.png" />
            </div>
            <div class="address">
                <div class="addre">
                    <h4>{{detailList.address}}</h4>
                </div>
                <div class="add" v-if="detailList.remarks">
                    <h5>{{detailList.remarks}}</h5>
                </div>
            </div>
            <div class="detail-area">
              <div class="detail-text">小于{{detailList.distance}}</div>
            </div>
        </div>
        <div class="lines"></div>
        <div class="online-store" v-if="detailList.online != ''">
          <div class="online" v-if="detailList.online && detailList.online[0].options.length > 0">线上店铺</div>
          <div class="main-online">
            <div v-for="(item,inde) in detailList.online" :key="inde">
              <div v-if="item.options.length > 0">
                <div class="stores" v-for="(items,index) in item.options" :key="index">
                  <div class="name-store">
                    <div class="img-store">
                      <img src="~/assets/images/AAmobile/store/online.png" v-if="item.key === '天猫'"/>
                      <img src="~/assets/images/AAmobile/store/jingdong.png" v-if="item.key === '京东'"/>
                      <img src="~/assets/images/AAmobile/store/taobao.png" v-if="item.key === '淘宝'" />
                    </div>
                    <div class="title-store">{{items.name}}</div>
                  </div>
                  <div class="into" @click="goInto(items.link)" v-if="items.link">
                    <div class="into-store">进入店铺</div>
                  </div>
                  <div class="into" @click="copyText(items.name)" v-else>
                    <div class="into-store">复制店名</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="code">
          <div class="code-area" v-if="detailList.qrcode">
            <div class="name">
              <h3>{{detailList.title}}</h3>
            </div>
            <div class="region">{{detailList.city}}</div>
            <div class="code-img">
              <img :src="detailList.qrcode" />
            </div>
            <div class="describe"><span>长按二维码添加，即可向店铺直接咨询</span></div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'detailPage',
  data () {
    return {
      detailList: '',
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
  created () {
    this.detailList = JSON.parse(this.$route.query.list)
    console.log(this.detailList, 'rrr')
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    onSwiper (e) {
      console.log(e)
    },
    callnumber (mobile) {
      /* 拨打电话 */
      window.location.href = 'tel:' + mobile
    },
    goInto (url) {
      window.open(url)
    },
    copyText (text) {
      const textValue = document.createElement('textarea')
      textValue.setAttribute('readonly', 'readonly')
      textValue.value = text
      document.body.appendChild(textValue)
      textValue.select()
      const res = document.execCommand('copy')
      document.body.removeChild(textValue)
      console.log('复制成功')
      document.body.oncopy = function () {
        alert('复制成功!')
      }
      return res
    }
  }
}
</script>
<style lang="scss" scoped>
    @import '~/assets/scss/mobile/store-detail.scss';
    img {
      width: 100%;
      object-fit: contain;
    }
</style>
