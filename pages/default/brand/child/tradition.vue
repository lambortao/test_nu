<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
          <img
            src="~/assets/images/brand/tradition-big.jpg"
            alt=""
          >
        </div>
      </div>
      <div class="content_box default-width">
        <div>
          <div class="tabs_box">
            <div class="tab_list">
              <div
                v-for="(item,index) in tabList"
                :key="index"
                :class="index==activeIndex?'tab_pane active':'tab_pane'"
                @click="tabChange(index)"
              >
                {{ item }}
              </div>
            </div>
            <NuxtLink class="tab_product" to="/product?form=brand&method=ac0140b2459f13b3&page=1">
              <div @click="brandsTracking({event:'view_product_list',mode:'Products',label:'相关产品'})">
                相关产品
              </div>
            </NuxtLink>
          </div>
          <div class="tradition tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="tradition_tab1_content">
                <div class="content_box">
                  <div class="content_box_left">
                    <div class="item_title">
                      <h3>
                        关于 &Tradition
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        ＆Tradition 成立于2010年，是一家将传统与创新相结合的丹麦设计公司。我们独特的家具和灯具设计组合从20世纪30年代到现在，涵盖了国际一流设计师的著名设计作品。<br><br>
                        &Tradition旨在将北欧传统融入当代设计，承前启后，创造出具有永恒魅力的家具、灯具和饰品。<br><br>
                        通过与国际知名设计师合作，将昔日大师们的标志性设计重新定义为当代的创新经典。功能与外观相辅、工艺与创意相成，塑造出具有实用性的精心设计。<br><br>
                        满怀崇敬，持之以恒。
                      </p>
                      <a class="brank_link" href="https://www.andtradition.com" target="_blank">www.andtradition.com</a>
                    </div>
                  </div>
                  <div class="content_box_right">
                    <img
                      src="~/assets/images/AAmobile/brand/tradition.jpg"
                      alt=""
                    >
                  </div>
                </div>
                <div class="content_box">
                  <div class="content_box_right flex_img">
                    <img src="~/assets/images/AAmobile/brand/trad-left.png">
                    <img src="~/assets/images/AAmobile/brand/trad-right.png">
                  </div>
                  <div class="content_box_left">
                    <div class="item_title">
                      <h3>
                        经典设计，跨越百年
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        &Tradition旨在将北欧传统融入当代设计，承前启后，<br>
                        创造出具有永恒魅力的家具、灯具和饰品。通过与国<br>
                        际知名设计师合作，将昔日大师们的标志性设计重新<br>
                        定义为当代的创新经典。功能与外观相辅、工艺与创意相成,塑造出具有实用性的精心设计。
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tool">
                  <div class="tool-img">
                    <img
                      src="~/assets/images/AAmobile/brand/trad-tion.png"
                      class="tool-pic"
                    >
                  </div>
                </div>
                <div class="trad_imgs">
                  <div class="flex-box">
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-three.png">
                      </div>
                      <p>Little Petra Lounge Chair 手绘稿</p>
                    </div>
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-four.png">
                      </div>
                      <p>Rely Chair 手绘稿</p>
                    </div>
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-one.png">
                      </div>
                      <p>Boomerang Lounge Chair 手绘稿</p>
                    </div>
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-two.png">
                      </div>
                      <p>Drop Leaf Table 手绘稿</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="contact">
                <div class="follow-us">
                  <div class="follow-we">
                    关注我们
                  </div>
                </div>
                <div class="contact-all">
                  <div class="contact-info">
                    <div
                      class="contact_item"
                      @click="copyText ('ANDTRANDITION')"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/wechat.jpg">
                      </div>
                      微信公众号: andtrandition
                    </div>
                    <div class="contact_item" @click="weibo()">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/weibo.jpg">
                      </div>
                      微博: andtrandition
                    </div>
                    <div class="contact_item" @click="redBook()">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/red.jpg">
                      </div>
                      小红书: andtrandition
                    </div>
                    <div class="contact_item" @click="goodHome()">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/danmai.jpg">
                      </div>
                      好好住: andtrandition
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==1?'tab_content active':'tab_content'">
              <div class="designer_box">
                <div class="designer_title">
                  <h3>TRADITION & 设计师</h3>
                </div>
                <div class="designer_list">
                  <div
                    v-for="(item, index) in designerList"
                    :key="index"
                    class="designer_list_item"
                  >
                    <NuxtLink :to="`/stylist?designerId=${item.alias}&brand=TRADITION&count=${count}`">
                      <div class="designer_img">
                        <figure>
                          <img
                            :src="item.thumbnail"
                            class="des-img"
                          >
                        </figure>
                      </div>
                      <p>{{ item.name }}</p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==2?'tab_content active':'tab_content'">
              <div class="sustain_box">
                <div class="sustain_box_left">
                  <img
                    src="~/assets/images/brand/tradition_img1.png"
                    alt=""
                  >
                </div>
                <div class="sustain_box_right">
                  <div class="item_title">
                    <h3>社会责任 & 可持续设计</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      过去的十多年以来，&Tradition与斯堪的纳维亚和国际设计师共同合作，重新发行大师级经典作品，创造未来的新经典作品。&Tradition致力于经久耐用和长久吸引力的产品设计，多样化的产品系列跨越一个世纪，从1920年代延续至今。<br>
                      我们坚持可持续设计的承诺，并保持始终如一的责任感：使用可持续、可循环使用的原材，最大限度地减少包装浪费，设计经久耐用、耐看的产品外观。<br>
                      &Tradition为支持材料的循环使用，进行了持续性的努力：使用可持续的皮革和羊皮、经羽绒责任标准（RDS）认证的羽毛，不再使用任何有毒化学品，改进和完善材质回收流程，使用 FSC® 认证的可持续木材、达到 EU Ecolabel 标准和 Oeko-Tex® 认证的材料。
                    </p>
                    <div class="img_box">
                      <div class="item_content_img">
                        <img
                          src="~/assets/images/brand/tradition_img3.png"
                          alt=""
                          class="Small"
                        >
                      </div>
                      <div class="item_content_img">
                        <img
                          src="~/assets/images/brand/tradition_img2.png"
                          alt=""
                          class="big"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-brand-tradition class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandTradition from '~/pages/mobile/brand/child/tradition/index.vue'
export default {
  name: 'TraditionPage',
  components: {
    MobileBrandTradition
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: '',
    count: 0,
    postData: ''
  }),
  async fetch () {
    this.postData = { brand: 'TRADITION' }
    await this.$store.dispatch('designer/useDesignerList', this.postData)
    this.designerList = this.designer
    this.count = this.designer.length
  },
  head: {
    title: 'Nine United官网-&Tradition'
  },
  computed: {
    designer () {
      return this.$store.getters['designer/getDesignerList']
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    tabChange (index) {
      this.activeIndex = index
    },
    async getList () {
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'TRADITION' })
      this.designerList = list
      this.count = list.length
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
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '公众号' })
      return res
    },
    weibo () {
      window.open('https://weibo.com/n/andtradition')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '微博' })
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5f192584000000000101d1f4?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663126152')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '小红书' })
    },
    goodHome () {
      window.open('https://m.haohaozhu.cn/user/azI0OU9FMjIzRnluL0NXVis2Q1MrQT09OjM3NTE0ZDEyNmFmOGVlOWZhMTY0MzkzZWUxN2I0ZWUz.html?is_share_activity=1&?is_share_activity=1&&hz_dev=ios&hz_share_plfm=link&hz_share_uid=d2RRQUYxZG5xOGVTcXFUdEIvY3N6UT09OmU5NzRmNzM1YWY0N2EzNjQ5MzE3Y2QzOTVjMDk1MWZi')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '好好住' })
    },
    brandsTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-&Tradition', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
