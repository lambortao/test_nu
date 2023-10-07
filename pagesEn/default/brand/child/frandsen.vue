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
                v-for="(item,indexz) in tabList"
                :key="indexz"
                :class="indexz==activeIndex?'tab_pane active':'tab_pane'"
                @click="tabChange(indexz)"
              >
                {{ item }}
              </div>
            </div>
            <NuxtLink
              class="tab_product"
              :to="`/en/product?form=brand&method=8f10a55dcb0cd7cd&page=1`"
            >
              <span @click="brandsTracking({event:'view_product_list',mode:'Products',label:'Products'})">Products</span>
            </NuxtLink>
          </div>
          <div class="frandsen tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="frandsen_tab1_content">
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <div class="item_title">
                      <h3>
                        Our DNA
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        At Frandsen, we create decorative, timeless lighting that inspire curiosity and add personality to any space, and with inspiring lighting designs, we brighten the lives of people everywhere. <br><br>
                        Rooted in a strong design heritage, we represent a love of organic, simple and graphic lighting solutions. Our products are honest and built to last with sustainability being a vital part of our state of mind. <br><br>
                        Our style is international with a touch of Nordic, and the overall vibe is joyful and positively easy-going.
                      </p>
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
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <img
                      src="~/assets/images/AAmobile/brand/frand-two.png"
                      alt=""
                    >
                  </div>
                  <div class="tab1_section1_right small_width">
                    <div class="item_title">
                      <h3 class="title-h3">
                        Our Story.
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>It all began in 1968 when Frandsen’s founder, Benny Frandsen, designed his first lamp. Since then, Frandsen has kept evolving Benny’s designs keeping true to his design heritage while striving to make our designs last and inspire for generations and bridging Benny’s everlasting classics with the new to come. </p>
                    </div>
                  </div>
                </div>
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <div class="item_title">
                      <h3 class="title-h3">
                        The Founder of Frandsen<br> Benny Frandsen
                      </h3>
                    </div>
                    <div class="item_cotnent">
                      <p>Benny Frandsen designed his first lamp in 1968. That same year, he designed the BALL pendant and wall lamp, which is still relevant today as Frandsen keeps evolving, expanding and adding new colours to the collection. Benny Frandsen has won numerous international design awards for his lamp designs over the years, and in 2018 he celebrated his 50th anniversary with Frandsen. </p>
                    </div>
                  </div>
                  <div class="tab1_section1_right">
                    <img
                      src="~/assets/images/AAmobile/brand/frand-one.png"
                      alt=""
                    >
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==1?'tab_content active':'tab_content'">
              <div class="designer_box">
                <div class="designer_title">
                  <h3>FRANDSEN & DESIGNERS</h3>
                </div>
                <div class="designer_list">
                  <div
                    v-for="(item, indexz) in designerList"
                    :key="indexz"
                    class="designer_list_item"
                  >
                    <NuxtLink :to="`/en/stylist?designerId=${item.alias}&brand=FRANDSEN&count=${count}`">
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
                    <h3>Sustainablity</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      We continuously strive to offer a collection of beautiful and high quality products with timeless appeal that transcends trends and remain relevant for generations to come.
                      <br><br>Our commitment to be more sustainable includes efforts towards improving the design process, manufacturing, packaging and shipping. We continuously work to find new ways of designing and producing our products, focusing on approved and sustainable materials.
                    </p>
                  </div>
                </div>
                <div class="sustain_box_right">
                  <img
                    src="~/assets/images/brand/frandsen_img.png"
                    alt=""
                  >
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
import MobileBrandFrandsen from '~/pagesEn/mobile/brand/child/frandsen/index.vue'
export default {
  name: 'FrandsenPage',
  components: {
    MobileBrandFrandsen
  },
  data: () => ({
    tabList: ['About', 'Designer', 'Sustainablity'],
    activeIndex: 0,
    designerList: '',
    count: 0,
    hiddenVideo: true,
    videoButton: true,
    postData: ''
  }),
  async fetch () {
    this.postData = { brand: 'FRANDSEN' }
    await this.$store.dispatch('designer/useDesignerList', this.postData)
    this.designerList = this.designer
    this.count = this.designer.length
  },
  head: {
    title: 'Nine United-Frandsen'
  },
  computed: {
    designer () {
      return this.$store.getters['designer/getDesignerList']
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  created () {
  },
  mounted () {
  },
  methods: {
    tabChange (indexz) {
      this.activeIndex = indexz
    },
    async getList () {
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'FRANDSEN' })
      this.designerList = list
      this.count = list.length
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
