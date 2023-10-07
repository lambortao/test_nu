<template>
  <div>
    <div
      id="hay_box"
      class="container site-is-default"
    >
      <div class="banner_box">
        <div class="banner_img">
          <!-- ~/assets/images/brand/hay-31.png -->
          <img
            src="~/assets/images/brand/HAY_en.png"
            alt=""
          >
        </div>
      </div>
      <div class="content_box default-width">
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
            to="/product?form=brand&method=ee4ab83b35f08f7f&page=1"
          >
            <div @click="brandsTracking({ event:'view_product_list',mode:'Products',label:'相关产品'})">
              相关产品
            </div>
          </NuxtLink>
        </div>
        <div class="hay tab_content_box">
          <div :class="activeIndex==0?'tab_content active':'tab_content'">
            <div class="about_box">
              <div class="video_box">
                <div
                  class="video_poster"
                  @click="play()"
                >
                  <video
                    ref="videoE"
                    src="~/assets/video/HAY.mp4"
                    paused="paused"
                    width="100%"
                    height="100%"
                    :poster="videoPoster"
                  />
                  <div class="video_mask">
                    <img
                      v-if="videoButton"
                      src="~/assets/images/brand/play.png"
                    >
                  </div>
                </div>
              </div>
              <!-- 关于  -->
              <section class="about_item_box">
                <div class="about_item">
                  <div class="item_title">
                    <h3>关于 HAY</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      丹麦设计品牌 HAY 成立于 2002 年 ，尊崇“每个人都应享有好设计”的理念，持续以创新且平易近人的方式，来满足现代世界瞬息万变的需求。<br><br>
                      HAY 联合创始人与创意总监 Mette 和 Rolf Hay 许下承诺，他们会与这个世代来自世界的优秀设计师合作，以高品质的作品，推广给更多人使用。这一个原则深植于 HAY 的 DNA，至今仍是品牌文化的核心。<br><br>
                      2003年，HAY 的第一个家具系列在科隆国际家具展发布，同时，第一家门店于哥本哈根开业。如今，HAY 在欧洲、亚洲和美国设有 25 家分店。
                    </p>
                    <a class="brank_link" href="https://hay.dk/country-selector" target="_blank">www.hay.dk</a>
                  </div>
                </div>
              </section>
              <!-- 创造 -->
              <div class="content_item_box">
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_about_img2.png"
                      alt=""
                    >
                  </figure>
                </div>
                <div class="content_item">
                  <div class="item_title">
                    <h3>我们的创造</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      HAY 受到当今生活的激励和启发，个人空间和工作空间之间的传统距离变得切换自如。空间的功能性被拓展，为了满足新的需求，我们的产品涵盖了家具、照明和配饰领域，并且始终灵活多变、适应性强、功能多样。满足从起居室到办公室、酒店休息室或咖啡馆的多种需要。<br><br>
                      秉承这种精神，HAY 通过在各种各样的产品上进行创新设计来重拾平凡生活中的美。<br><br>
                      这些产品中部分为我们日常所使用，从收纳到桌子到座椅，回归生活本身，装点多样空间，制造点滴快乐，为我们生活的每个微小时刻，锦上添花。
                    </p>
                  </div>
                </div>
                <div class="content_block" />
              </div>
              <!-- 运作方式 -->
              <div class="content_item_box content_item_center">
                <div class="content_block" />
                <div class="content_item">
                  <div class="item_title">
                    <h3>我们的运作方式</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      HAY 的所有产品开发均与创意总监 Mette 和 Rolf Hay 息息相关，他们在哥本哈根办公室的设计师和产品开发团队与遍布全球的当代设计师密切合作、共同研发。<br><br>
                      “我们坚持设计有意义的、原创的、可能最重要的是被人们需要的产品，因此我们非常在意所做的一切背后的构思和初衷。我们坚信每个目标都有一个明确的起点——无论是一项新技术、一款新材料，或者仅仅是我们认为在生活中缺失这一件产品。这使我们的开发流程更加流畅和完善，最终的产品也更加经久耐用。”
                    </p>
                  </div>
                </div>
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_about_img3.png"
                      alt=""
                    >
                  </figure>
                </div>
              </div>
              <!-- 品牌观 -->
              <div class="content_item_box content_item_center">
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_about_img4.png"
                      alt=""
                    >
                  </figure>
                </div>
                <div class="content_item">
                  <div class="item_title">
                    <h3>我们的品牌观</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      在 HAY 的大家庭里，我们崇尚在可持续发展、民主和谐的环境中与全球领先的设计师合作。灵感主要来自于三个来源：艺术，建筑和时尚。<br><br>
                      我们始终密切关注周围的环境并从中汲取灵感，与时俱进则是我们与周围世界保持同步的基本方式。<br><br>
                      <span class="opacty">“我对艺术的钦佩源自于它的出乎意料和独特创意，建筑当然是我们所创造的环境和家园，而时尚则赋予它奇妙的活力，反映了时代精神和当下事物。 我想说的是，我们所做的最好产品可能存在于这三个元素之间的某个地方，并从每个元素中汲取点滴灵感。”</span>
                    </p>
                  </div>
                </div>
                <div class="content_block" />
              </div>
              <!-- 核心价值观 -->
              <section class="value_item_box">
                <div class="value_item">
                  <div class="item_title">
                    <h3>我们的核心价值</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      HAY 的四个核心价值仍在不断塑造和激励着公司：PASSION 激情，FUNCTION 功能，COMMUNITY 团体，RESPONSIBILITY 责任。<br><br>
                      从家具到配件和灯具，HAY 的内部产品开发团队、来自全世界的合作设计师以及我们的创始人 Mette 和 Rolf Hay 始终致力于坚持这些核心价值。<br><br>
                      无论您对哪件产品感兴趣，从抱枕到餐桌，HAY 的顾客都可以确信每件单品中都倾注了这些价值观。
                    </p>
                  </div>
                </div>
              </section>
              <section class="about_advantage">
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>激情 PASSION</h3>
                  </div>
                  <div class="item_content">
                    <p>在 HAY，我们对设计的热爱和创新的坚持激励着我们不断挑战自我，创造能够提升人们日常生活品质的产品。这意味着要突破陈规，运用现有最先进的材料、方法、工具和技术，以独特、原创的方式 重新思考日常用品。</p>
                  </div>
                </div>
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>功能 FUNCTION</h3>
                  </div>
                  <div class="item_content">
                    <p>遵循功能创造形态，我们的产品不仅美观、精细、创新、时尚，并且始终以实用和舒适为首要目标。 我们的设计秉承需求至上，坚信极简才是最好的解决方案。</p>
                  </div>
                </div>
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>团体 COMMUNITY</h3>
                  </div>
                  <div class="item_content">
                    <p>HAY是一家国际性化的公司：HAY 的产品跨越国界。从供应商到设计师再到内部产品开发，团队合作是基础。我们相信彼此的合作关系只会越发强大：集思广益、技术融合、工具与手工艺的和谐工作产生协同效应，驱使并激励着我们每天进步。</p>
                  </div>
                </div>
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>责任 RESPONSIBILITY</h3>
                  </div>
                  <div class="item_content">
                    <p>高质量意味着精心设计、精湛工艺和经久耐用。 在 HAY，我们致力于减少产品生产中对地球的影响，以期与您一起更久地在地球上共存。我们始终坚持高标准，因此我们的每个产品类别都有相应的设计师、技术人员和工程师团队，以确保从各个角度全面考量每件产品，以经受住各方面的 严格质检。</p>
                  </div>
                </div>
              </section>
              <section class="about_img">
                <img
                  src="~/assets/images/brand/hay_about_img6.png"
                  alt=""
                >
              </section>
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
                      @click="copyText('HayOfficial')"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/wechat.jpg">
                      </div>
                      微信公众号: HAYofficial
                    </div>
                    <div
                      class="contact_item"
                      @click="weibo()"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/weibo.jpg">
                      </div>
                      微博: HayOfficial
                    </div>
                    <div
                      class="contact_item"
                      @click="redBook()"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/red.jpg">
                      </div>
                      小红书: HAY
                    </div>
                    <div
                      class="contact_item"
                      @click="goodHome()"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/danmai.jpg">
                      </div>
                      好好住: 丹麦家居HAY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="activeIndex==1?'tab_content active':'tab_content'">
            <div class="designer_box">
              <div class="designer_title">
                <h3>HAY & 设计师</h3>
                <p>在 HAY，我们持续不断地与来自世界各地才华出众、充满好奇心和 有雄心壮志的设计师合作，这些设计师每一位都是 HAY 家族的成员。</p>
                <p>设计师家族包括 Pierre Charpin, Inga Sempé, Doshi Levien, Shane Schneck, Ana Kras, Stefan Diez, Scholten & Baijings, Clara Von Zweigbergk, Ronan and Erwan Bouroullec, Hee Welling, George Sowden, GamFratesi, 以及更多其它设计师，他们与 HAY 的内部设计团队 密切。</p>
              </div>
              <div class="designer_list">
                <div
                  v-for="(item, index) in designerList"
                  :key="index"
                  class="designer_list_item"
                >
                  <NuxtLink :to="`/stylist?designerId=${item.alias}&brand=HAY&count=${count}`">
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
              <div class="sutain_content_item">
                <div class="content_item_box">
                  <div class="item_title">
                    <h3>可持续发展与认证</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      在HAY，我们为了让人们能更长久的与我们的产品生活，努力设计和生产持久耐用且具有功能性的作品。<br>
                      关于我们对减少环境影响的承诺，我们遵行以可持续的方式使用资源，努力使用最有效和最环保的方法、工具和材料。<br>
                      由于我们意识到我们的行为对环境有重大的影响，因此我们认真审视并负起责任，为更环保的未来做出贡献。
                    </p>
                  </div>
                </div>
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_sus_img1.png"
                      alt=""
                    >
                  </figure>
                </div>
              </div>
              <div class="sutain_content_normal">
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_sus_img2.png"
                      alt=""
                    >
                  </figure>
                </div>
                <div class="content_item_box content_item_top">
                  <div class="item_title">
                    <h3>水性漆 / WATER-BASED LACQUER</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      部分的木制家具系列使用水性漆生产，它比普通的PU漆有很多优点。水性变体中的低VOC（挥发性有机化合物）含量，排放的污染物明显减少，这使得它更加环保，有助于创造更健康的工作环境和更好的室内气候。此外，水性漆通常比PU漆更耐用，所以木制家具也可以拥有更长的使用寿命。
                    </p>
                  </div>
                </div>
                <div class="content_item_block" />
              </div>
              <div class="sutain_content_normal">
                <div class="content_item_block" />
                <div class="content_item_box">
                  <div class="item_title">
                    <h3>
                      FSC®森林认证 (FSC-C153898)<br>
                      FSC®-certified (FSC-C153898) CERTIFICATION
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>
                      HAY的大部分木制家具都通过了FSC®森林认证（FSC-C153898）。这意味着产品是由FSC®森林认证（FSC-C153898）的木材制成，这些木材来自可持续发展的森林，通过负责任的管理，减少了森林的砍伐，确保了森林的未来保护。认证产品是您的保证，HAY的木制家具是以一种对社会、经济和环境负责的方式生产的。
                    </p>
                  </div>
                </div>
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_sus_img3.png"
                      alt=""
                    >
                  </figure>
                </div>
              </div>
              <div class="sutain_content_normal">
                <div class="content_item_img">
                  <figure>
                    <img
                      src="~/assets/images/brand/hay_sus_img4.png"
                      alt=""
                    >
                  </figure>
                </div>
                <div class="content_item_box">
                  <div class="item_title">
                    <h3>欧盟生态标签/ EU ECOLABEL</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      欧盟生态标签是欧洲官方的卓越环境标签，颁发给在整个生命周期中符合高环境标准的产品和服务——从原材料的开采，到生产、分销和处置——产品都有拆装说明。获得欧盟生态标签的家具符合标准，保证任何原生木材、软木、竹子和藤条都来自合法和可持续管理的森林。有害物质的使用受到限制，任何装饰材料中的有害残留物都是有限的，而且产品的甲醛排放量很低。所有的产品都不含PVC，最终的涂层部件或整个家具产品的VOC排放符合规定的VOC排放标准。欧盟生态标签为消费者提供了一种识别环保产品的简便方法。
                    </p>
                  </div>
                </div>
                <div class="content_item_block" />
              </div>
              <div class="sutain_content_normal">
                <div class="content_item_img">
                  <figure class="small">
                    <img
                      src="~/assets/images/brand/hay_sus_img5.png"
                      alt=""
                    >
                  </figure>
                </div>
                <div class="content_item_box">
                  <div class="item_title">
                    <h3>
                      北欧天鹅生态标签<br>
                      / NORDIC SWAN ECOLABLE
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>
                      北欧天鹅生态标签是北欧地区的官方生态标签，欧盟生态标签是欧洲的官方生态标签。它们致力于减少生产和消费对环境的总体影响。为了确保对环境的最大影响，北欧天鹅生态标签和欧盟生态标签采用了整个生命周期的方法，并着眼于整个产品旅程。这意味着生态标签评估特定产品类型的环境影响，并对产品生命周期的所有相关阶段提出要求——从原材料、生产和使用，到废物、再利用和回收。
                    </p>
                  </div>
                </div>
                <div class="content_item_block" />
              </div>
              <div class="sustain_item first_item">
                <div class="item_title">
                  <h3>生态运输 / ECO DELIVERY</h3>
                </div>
                <div class="item_content">
                  <p>货物运输在全球可持续发展中起着根本性的作用，这就是为什么它已经成为HAY的一个重点领域。在我们努力减少碳足迹的过程中，我们试图找到最环保的解决方案来运输我们的全球产品。这导致了与马士基ECO Delivery公司的新合作，该公司用可持续的低碳燃料ECO Delivery取代化石燃料，从而使HAY能够以更可持续的方式运输其货物。ECO Delivery使用的是经国际可持续发展和碳认证（ISCC）机构认证的低碳燃料，由回收的可持续生物质制造。展望未来，HAY将在我们的欧洲和亚太地区的海洋运输中使用ECO Delivery，我们认为这是我们迈向更可持续和负责任的经营方式的一个重要步骤。</p>
                </div>
              </div>
              <div class="sustain_item">
                <div
                  class="video_box"
                  @click="playVideo()"
                >
                  <video
                    ref="videoS"
                    src="~/assets/video/ECO.mp4"
                    paused="paused"
                    width="100%"
                    height="100%"
                    :poster="videoPoster1"
                  />
                  <div class="video_mask">
                    <img
                      v-if="videoB"
                      src="~/assets/images/brand/play.png"
                      class="play-button"
                    >
                  </div>
                </div>
              </div>
              <div class="sustain_item">
                <div class="item_title">
                  <h3>五年质保 / 5 YEAR WARRANTY</h3>
                </div>
                <div class="item_content">
                  <p>
                    HAY 设计和家具生产均基于 HAY 商标。HAY 致力于设计和生产经久耐用的家具，同时 HAY 致力于实用高质量的生产材料，来确保产品的使用周期。<br><br>
                    HAY 为特定产品提供5年产品保修，包括家具设计和室内装潢材料及工艺制品。保修范围包括购买时有损坏，或由于购买时存在缺陷而发生的故障。保修期为5年，请以原始发票上的日期开始为准。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-brand-hay class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandHay from '~/pages/mobile/brand/child/hay/index.vue'
import videoPoster from '~/assets/images/brand/1.png'
import videoPoster1 from '~/assets/images/brand/2.png'
export default {
  name: 'HayPage',
  components: {
    MobileBrandHay
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: '',
    count: 0,
    hiddenVideo: true,
    videoButton: true,
    hiddenV: true,
    videoB: true,
    postData: '',
    videoPoster,
    videoPoster1
  }),
  async fetch () {
    this.postData = { brand: 'HAY' }
    await this.$store.dispatch('designer/useDesignerList', this.postData)
    this.designerList = this.designer
    this.count = this.designer.length
  },
  head: {
    title: 'Nine United官网-HAY'
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
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'HAY' })
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
      // const report = { reportName: '复制公众号', name: '公众号' }
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
    playVideo () {
      this.hiddenV = false
      this.videoB = false
      if (this.$refs.videoS.paused === true) {
        this.videoB = false
        this.$refs.videoS.play()
      } else {
        this.videoB = true
        this.$refs.videoS.pause()
      }
    },
    brandsTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-HAY', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
