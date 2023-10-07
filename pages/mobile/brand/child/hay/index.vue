<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <brand-component>
    <template slot="default">
      <!-- ~/assets/images/AAmobile/brand/Rectangle.jpg -->
      <img src="~/assets/images/AAmobile/brand/Hay-bg.png" alt="HAY">
    </template>
    <template slot="content">
      <content-tab v-model="activeKey" :center="false" style="padding-top: 0">
        <tab-pane value="1" label="关于">
          <NuxtLink
            :to="`/product?form=brand&method=ee4ab83b35f08f7f`"
          >
            <div class="product" @click="brandTracking({ event:'view_product_list',mode:'Products',label:'相关产品' })">
              <div class="pro-text">相关产品</div>
              <div class="pro-icon">
                <img src="~/assets/images/AAmobile/brand/arrow-right-line.jpg">
              </div>
            </div>
          </NuxtLink>
          <hay-about />
          <div class="contact">
            <div class="follow-us">
              <div class="left-line" />
              <div class="follow-we">关注我们</div>
              <div class="right-line" />
            </div>
            <div class="contact-all">
              <div class="contact-info">
                <div class="contact-icon">
                  <div class="con-icon">
                    <img src="~/assets/images/AAmobile/brand/wechat.jpg">
                  </div>
                  <div class="con-text">
                    HAYofficial
                  </div>
                </div>
                <div class="copy" @click="copyText('HayOfficial')">
                  <span class="copy-text">复制</span>
                </div>
              </div>
              <div class="contact-info">
                <div class="contact-icon">
                  <div class="con-icon">
                    <img src="~/assets/images/AAmobile/brand/weibo.jpg">
                  </div>
                  <div class="con-text">
                    HayOfficial
                  </div>
                </div>
                <div class="copy" @click="weibo()">
                  <span class="copy-text">关注</span>
                </div>
              </div>
              <div class="contact-info">
                <div class="contact-icon">
                  <div class="con-icon">
                    <img src="~/assets/images/AAmobile/brand/red.jpg">
                  </div>
                  <div class="con-text">
                    HAY
                  </div>
                </div>
                <div class="copy" @click="redBook()">
                  <span class="copy-text">关注</span>
                </div>
              </div>
              <div class="contact-info">
                <div class="contact-icon">
                  <div class="con-icon">
                    <img src="~/assets/images/AAmobile/brand/danmai.jpg">
                  </div>
                  <div class="con-text">
                    丹麦家居HAY
                  </div>
                </div>
                <div class="copy" @click="goodHome()">
                  <span class="copy-text">关注</span>
                </div>
              </div>
            </div>
          </div>
        </tab-pane>
        <tab-pane value="2" label="设计师">
          <h3>HAY & 设计师</h3>
          <HayDesigner @tracking="brandTracking" />
        </tab-pane>
        <tab-pane value="3" label="可持续">
          <hay-sustainable />
        </tab-pane>
      </content-tab>
    </template>
  </brand-component>
</template>

<script>
import HayDesigner from './designer.vue'
import HayAbout from './about.vue'
import HaySustainable from './sustainable.vue'
import BrandComponent from '~/pages/mobile/brand/components/brandComponent.vue'
import ContentTab from '~/components/AAMobile/ContentTab/index.vue'
import TabPane from '~/components/AAMobile/ContentTab/tabPane.vue'
export default {
  name: 'HayPage',
  components: {
    ContentTab,
    TabPane,
    BrandComponent,
    HayAbout,
    HaySustainable,
    HayDesigner
  },
  data () {
    return {
      activeKey: '1'
    }
  },
  mounted () {
  },
  methods: {
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
    brandTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-HAY', event, mode, label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
