<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
          <img
            src="~/assets/images/brand/frand.png"
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
            <NuxtLink
              class="tab_product"
              to="/product?form=brand&method=8f10a55dcb0cd7cd&page=1"
            >
              <div @click="brandsTracking({event:'view_product_list',mode:'Products',label:'相关产品'})">
                相关产品
              </div>
            </NuxtLink>
          </div>
          <div class="frandsen tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="frandsen_tab1_content">
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <div class="item_title">
                      <h3>
                        我们的DNA
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>FRANDSEN根植于强大的北欧设计基因，代表的是对有机、简洁和几何化照明解决方案的热爱。我们希望以此唤醒和激发人们的好奇心，让每一盏灯都能以自己的方式，为空间创造理想的环境，照亮生活中的每一个美好时刻。</p>
                      <a class="brank_link" href="https://www.frandsen.com" target="_blank">www.frandsen.com</a>
                    </div>
                  </div>
                  <div class="tab1_section1_right">
                    <div class="img_flex">
                      <img src="~/assets/images/AAmobile/brand/frand-left.png">
                      <img src="~/assets/images/AAmobile/brand/frand-right.png">
                    </div>
                  </div>
                </div>
                <div class="tab1_section2">
                  <div class="tab1_section2_left">
                    <div class="video_box">
                      <div class="video" @click="play()">
                        <video
                          ref="videoE"
                          src="~/assets/video/Interview.mp4"
                          paused="paused"
                          width="100%"
                          height="100%"
                          :poster="poster"
                        />
                        <div class="video_mask">
                          <img v-if="videoButton" src="~/assets/images/brand/play.png" class="play-button">
                        </div>
                      </div>
                      <div class="video_desc">
                        Ball系列灯具的手绘稿
                      </div>
                    </div>
                  </div>
                  <div class="tab1_section2_right">
                    <div class="item_title">
                      <h3>
                        我们的故事
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        设计师Benny Frandsen先生在1968年设计了他的第一款灯具作品，同年创立了FRANDSEN品牌，希望将斯堪的纳维亚式照明美学在世界范围内传播。<br><br>
                        经过几代人的努力，FRANDSEN将经典设计和现代创新工艺结合，以此延续Benny Frandsen先生的设计精神，让好设计经久不衰。
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <div class="item_title">
                      <h3>
                        创始人 Benny Frandsen
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        作为品牌创始人，Benny Frandsen先生同样是一位优秀的设计师，在半个多世纪的设计生涯中，他和他的团队设计出了大量的经典产品，如：Ball系列、Benjamin系列、BF20系列、Kobe吊灯等。<br><br>
                        Benny Frandsen先生始终认为，＂只有对未来的大力投入品牌才有良好的未来发展潜力，所有付出最终体现在产品之中，因此每一件灯具都有自己的风格。＂<br><br>
                        Benny Frandsen先生代表作Ball系列灯具是在品牌初创时设计的，但在当时圆形灯并不常见，磁吸壁灯的设计非常适合家用，一经推出便大获成功，时至今日依旧畅销不衰。
                      </p>
                    </div>
                  </div>
                  <div class="tab1_section1_right">
                    <img
                      src="~/assets/images/AAmobile/brand/frand-one.png"
                      alt=""
                    >
                  </div>
                </div>
                <div class="tab1_section3">
                  <figure>
                    <img
                      src="~/assets/images/AAmobile/brand/frand-two.png"
                      alt=""
                    >
                  </figure>
                  <div class="desc">
                    Ball系列灯具的手绘稿
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
                      <div class="contact_item" @click="copyText('FRANDSEN')">
                        <div class="contact_item_icon">
                          <img src="~/assets/images/AAmobile/brand/wechat.jpg">
                        </div>
                        <div class="con-text">
                          微信公众号:   FRANDSEN
                        </div>
                      </div>
                      <div class="contact_item" @click="weibo()">
                        <div class="contact_item_icon">
                          <img src="~/assets/images/AAmobile/brand/weibo.jpg">
                        </div>
                        <div class="con-text">
                          微博:   FRANDSEN
                        </div>
                      </div>
                      <div class="contact_item" @click="redBook()">
                        <div class="contact_item_icon">
                          <img src="~/assets/images/AAmobile/brand/red.jpg">
                        </div>
                        <div class="con-text">
                          小红书:   FRANDSEN
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==1?'tab_content active':'tab_content'">
              <div class="designer_box">
                <div class="designer_title">
                  <h3>FRANDSEN & 设计师</h3>
                </div>
                <div class="designer_list">
                  <div v-for="(item, index) in designerList" :key="index" class="designer_list_item">
                    <NuxtLink
                      :to="`/stylist?designerId=${item.alias}&brand=FRANDSEN&count=${count}`"
                    >
                      <div class="designer_img">
                        <figure>
                          <img
                            :src="item.thumbnail"
                            alt=""
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
                  <div class="item_title">
                    <h3>可持续设计</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      自1968年以来，FRANDSEN都在为创造永恒吸引力的优质照明作品而努力，与当下的设计趋势比肩，让照明美学延续不息。<br>
                      我们致力于更多的可持续理念的实践，优化设计过程、制造、包装和运输等各个环节，不断努力寻找设计和生产的新方法，使用具有环保资质的可持续材料。
                    </p>
                  </div>
                </div>
                <div class="sustain_box_right">
                  <img src="~/assets/images/brand/frandsen_img.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-brand-frandsen class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandFrandsen from '~/pages/mobile/brand/child/frandsen/index.vue'
import poster from '~/assets/images/brand/3.png'
export default {
  name: 'FrandsenPage',
  components: {
    MobileBrandFrandsen
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: '',
    count: 0,
    hiddenVideo: true,
    videoButton: true,
    postData: '',
    poster
  }),
  async fetch () {
    this.postData = { brand: 'FRANDSEN' }
    await this.$store.dispatch('designer/useDesignerList', this.postData)
    this.designerList = this.designer
    this.count = this.designer.length
  },
  head: {
    title: 'Nine United官网-Frandsen'
  },
  computed: {
    designer () {
      return this.$store.getters['designer/getDesignerList']
    }
  },
  methods: {
    tabChange (index) {
      this.activeIndex = index
    },
    async getList () {
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'FRANDSEN' })
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
      window.open('https://weibo.com/u/7496459897')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '微博' })
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5cb45523000000001702130c?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663126527')
      this.brandsTracking({ event: 'jump_to_url', mode: 'Brands', label: '小红书' })
    },
    play () {
      this.hiddenVideo = false
      this.videoButton = false
      if (this.$refs.videoE.paused === true) {
        this.videoButton = false
        this.$refs.videoE.play()
      } else {
        this.videoButton = true
        this.$refs.videoE.pause()
      }
    },
    brandsTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-Frandsen', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
