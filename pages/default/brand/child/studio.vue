<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
          <img
            src="~/assets/images/brand/studio-big.png"
            alt=""
          >
        </div>
      </div>
      <div class="content_box default-width">
        <div>
          <div class="studio tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="tab1_content_section1">
                <div class="item_title">
                  <h3>关于 STUDIO 9</h3>
                </div>
                <div class="item_content">
                  <p>
                    Nine United 集团开创全新空间品牌 STUDIO 9——融合家居设计、创意灵感和线下体验的新型交互场所。<br><br>
                    STUDIO 9 汇集 Nine United 集团旗下丹麦设计品牌：HAY ，&Tradition ，Verpan 和 Frandsen ，四品牌分别创立于不同时代，齐集百年来丹麦现代设计史上的经典单品与大师之作，也实时更新着对当下生活方式的洞察。它们齐聚于全新空间，为不断拓展的多元文化与流动的生活形态共同呈现丰富多样的产品线，为居所与空间语境提供设计灵感与高品质的解决方案。<br><br>
                    同时，STUDIO 9 以空间为载体，在丹麦设计传统与中国文化大背景融合的大背景下，积极探索不同的品牌与产品，与创意社群交流和分享，与志趣相投的伙伴携手合作——多元导向的目的地，有别以往的全新模式，联结设计社群，带来原创创意内容与体验。<br><br>
                    灵感汇聚于此，创意迸发于此。
                  </p>
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
                    <div class="contact_item" @click="copyText('Studio9byNU')">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/wechat.jpg">
                      </div>
                      <div class="con-text">
                        微信公众号:   Studio9byNU
                      </div>
                    </div>
                    <div class="contact_item" @click="weibo()">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/weibo.jpg">
                      </div>
                      <div class="con-text">
                        微博:   Studio9byNU
                      </div>
                    </div>
                    <div class="contact_item" @click="redBook()">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/red.jpg">
                      </div>
                      <div class="con-text">
                        小红书:   Studio 9
                      </div>
                    </div>
                    <div class="contact_item" @click="goodHome()">
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/danmai.jpg">
                      </div>
                      <div class="con-text">
                        好好住:   Studio9byNU
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
    <mobile-brand-studio class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandStudio from '~/pages/mobile/brand/child/studio/studio.vue'
export default {
  name: 'StudioPage',
  components: {
    MobileBrandStudio
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: ''
  }),
  head: {
    title: 'Nine United官网-Studio 9'
  },
  created () {
  },
  mounted () {
  },
  methods: {
    tabChange (index) {
      this.activeIndex = index
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
      window.open('https://weibo.com/u/7773306742')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '微博' })
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5bbc9c1985e5bd00010c2cb1?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663125741')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '小红书' })
    },
    goodHome () {
      window.open('https://m.haohaozhu.cn/user/dnlGM0RVY1FWd2JXdFhlNVNhclFRQT09OjExMGY5NDdkYzZmN2RkNjE1MTAwOGFmY2ZmZWVmZmQz.html?is_share_activity=1&?is_share_activity=1&&hz_dev=ios&hz_share_plfm=link&hz_share_uid=ZVJDamZGSjNBMlZZZVpFUENNV0lUdz09OjkzMjI0N2M1YTMyNjA3YjkwYjgzZTljZjEyNWQzZmE3')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '好好住' })
    },
    brandsTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-STUDIO9', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
