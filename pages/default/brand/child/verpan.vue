<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
          <img
            src="~/assets/images/brand/verpan-big.png"
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
              :to="`/product?form=brand&method=6f54a55xtb0te7adt`"
            >
              <div @click="brandsTracking({event:'view_product_list',mode:'Products',label:'相关产品'})">
                相关产品
              </div>
            </NuxtLink>
          </div>
          <div class="verpan tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="verpan_tab1_content">
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <div class="item_title">
                      <h3 class="title-h3">
                        关于 VERPAN
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>VERPAN 是丹麦著名建筑师和设计师 Verner Panton 设计作品的授权制造商。就像 Panton 本人一样，这家丹麦设计公司也是丹麦设计传统的产物，使丹麦设计以其功能性、现代性和独特性而闻名于世。</p>
                      <br>
                      <p>VERPAN的故事始于2003年，在得到作品独家授权后，开始发行Verner Panton的灯具系列作品，2010年后，又投入了家具系列作品的生产。VERPAN继承于Panton先生的设计精神，以高辨识度的产品，为现代用户重现其超前的生活方式主张。</p>
                      <a class="brank_link" href="https://www.verpan.com" target="_blank">www.verpan.com</a>
                    </div>
                  </div>
                  <div class="tab1_section1_right">
                    <div class="img_flex">
                      <img src="~/assets/images/AAmobile/brand/vicon-left.jpg">
                      <img src="~/assets/images/AAmobile/brand/vicon-right.jpg">
                    </div>
                  </div>
                </div>
                <div class="tab1_section2">
                  <div class="tab1_section2_left">
                    <div class="img_flex">
                      <img src="~/assets/images/AAmobile/brand/verpan-left.jpg">
                      <img src="~/assets/images/AAmobile/brand/verpan-right.jpg">
                    </div>
                  </div>
                  <div class="tab1_section2_right">
                    <div class="item_content">
                      <p>
                        VERPAN 的全系列产品均为 Verner Panton 作品中最优雅和最值得纪念的经典之作。如今，这些设计与它们在50年代、60年代、70年代和80年代被首次设计时一样具有标志性，趣味性和当代性。<br><br>
                        VERPAN 的产品带着独有的声音、动态、色彩与光和生命力闯进我们的视觉世界，并赋予其更广阔的价值。
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab1_section2">
                  <div class="tab1_section2_left">
                    <div class="item_title">
                      <h3 class="title-h3">
                        Verner Panton
                      </h3>
                      <span>维纳尔·潘顿</span>
                    </div>
                    <div class="item_content content_width">
                      <p>
                        作为丹麦设计界的巨匠，Verner Panton(1926-1998) 以其旺盛的创造力和不懈的探索精神开创了独特的风格体系。他热衷于新型材料和色彩的设计实践，将强烈的视觉表现方式运用到众多作品的造型创意设计中，因此也被誉为“二十世纪最富有创造力的设计大师”。<br><br>
                        VERPAN的故事始于2003年，在得到作品独家授权后，开始发行Verner Panton的灯具系列作品，2010年后，又投入了家具系列作品的生产。VERPAN继承于Panton先生的设计精神，以高辨识度的产品，为现代用户重现其超前的生活方式主张。
                      </p>
                    </div>
                  </div>
                  <div class="tab1_section2_right">
                    <img
                      src="~/assets/images/AAmobile/brand/ver.jpg"
                      alt=""
                    >
                  </div>
                </div>
                <div class="tab1_section2">
                  <div class="tab1_section2_left">
                    <img
                      src="~/assets/images/AAmobile/brand/v-bg.jpg"
                      alt=""
                    >
                    <p class="img_desc">
                      Visiona 2展览中的VP Glob
                    </p>
                  </div>
                  <div class="tab1_section2_right">
                    <div class="item_content">
                      <p>
                        Panton 幼年时曾梦想成为一名画家，在接受了建筑学相关的学习后，最终在设计领域找到了自己的兴趣所向。师从 Arne Jacobsen 和 Poul Henningsen 等人，这些设计大师给予 Panton 很深的影响。<br><br>
                        纵观 Panton 先生的职业生涯，他总是在不断挖掘新材料和工艺技术，将人体工学等功能性设计与富有想象力的有机形状、大胆且丰富的色彩相结合，以挑战传统的方式达到工艺和质量的跃升。时至今日，这些实验经受住时间的考验，变成了一件件伟大的设计实践。<br><br>
                        尽管 Panton 师出名门，贡献良多，但在跨入设计领域之初，他始终冲向创新的最前沿，大胆前卫的设计风格让他被同时代的丹麦设计师视作“反叛者”。<br><br>
                        Panton 的标志性设计已成为当代设计的经典之作，并与50年前一样具有惊人的创造力。
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab1_video_section">
                  <div
                    class="video_box"
                    @click="play()"
                    @play="playVideo($event)"
                  >
                    <video
                      ref="videoE"
                      src="~/assets/video/Verpan.mp4"
                      paused="paused"
                      width="100%"
                      height="100%"
                      :poster="videoPoster"
                    />
                    <div class="video_mask">
                      <img
                        v-if="videoButton"
                        src="~/assets/images/brand/play.png"
                        class="play-button"
                      >
                    </div>
                  </div>
                  <p>Verner Panton著名空间装置作品Visiona 2，1970年</p>
                </div>
              </div>
              <div class="contact">
                <div class="follow-us">
                  <div class="follow-we">
                    关注我们
                  </div>
                </div>
                <div class="contact-all">
                  <div class="contact-info contact_width">
                    <div
                      class="contact_item"
                      @click="copyText ('VERPAN')"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/wechat.jpg">
                      </div>
                      微信公众号: VERPAN
                    </div>
                    <div
                      class="contact_item"
                      @click="weibo()"
                    >
                      <div class="contact_item_icon">
                        <img src="~/assets/images/AAmobile/brand/weibo.jpg">
                      </div>
                      微博: VERPAN
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==1?'tab_content active':'tab_content'">
              <div class="designer_box">
                <div class="designer_title">
                  <h3>VERPAN & 设计师</h3>
                </div>
                <div class="designer_list">
                  <div
                    v-for="(item, index) in designerList"
                    :key="index"
                    class="designer_list_item"
                  >
                    <NuxtLink :to="`/stylist?designerId=${item.alias}&brand=VERPAN&count=${count}`">
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
                      我们致⼒于提供兼具美观和高质量的产品系列，它们拥有经久不衰、经久耐看的外观，这些都与未来延续息息相关。<br><br>
                      从美学、质量与成本⽅面进⾏考量，我们始终采用最适合用来制作产品的材料以确保其完整性。我们尽可能地引⼊可回收材料，并努⼒开发易于组装和拆卸的解决⽅案，以便对产品进⾏行合理更换或处理损坏的部件。
                    </p>
                  </div>
                </div>
                <div class="sustain_box_right">
                  <img
                    src="~/assets/images/brand/verpan_img2.png"
                    alt=""
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-brand-verpan class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandVerpan from '~/pages/mobile/brand/child/verpan/index.vue'
import videoPoster from '~/assets/images/brand/4.png'
export default {
  name: 'VerpanPage',
  components: {
    MobileBrandVerpan
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: '',
    count: 0,
    hiddenVideo: true,
    videoButton: true,
    postData: '',
    videoPoster
  }),
  async fetch () {
    this.postData = { brand: 'VERPAN' }
    await this.$store.dispatch('designer/useDesignerList', this.postData)
    this.designerList = this.designer
    this.count = this.designer.length
  },
  head: {
    title: 'Nine United官网-Verpan'
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
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'VERPAN' })
      this.designerList = list
      this.count = list.length
    },
    goStylist (id) {
      this.$router.push({ path: '/stylist', query: { designerId: id, brand: 'VERPAN', count: this.count } }, () => { }, () => { })
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
      this.$store.dispatch('site/tracker', { page: 'Brand-Verpan', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
