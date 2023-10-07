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
              :to="`/en/product?form=brand&method=6f54a55xtb0te7adt&page=1`"
            >
              <span @click="brandsTracking({event:'view_product_list',mode:'Products',label:'Products'})">Products</span>
            </NuxtLink>
          </div>
          <div class="verpan tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="verpan_tab1_content">
                <div class="tab1_section1">
                  <div class="tab1_section1_left">
                    <div class="item_title">
                      <h3>
                        About Verpan
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Verpan is - much like Verner Panton - a product of the Danish design tradition, which have put Denmark on the world map for functional, modern and unique design.</p>
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
                        The story of Verpan began in 2003, when the first production of Verner Panton lighting was initiated. In 2010 a furniture range was added. Today, Verpan offers a carefully curated selection of Verner Panton’s timeless designs. Our product range include iconic furniture and lighting pieces that offers extraordinary user experiences and facilitate new ways of living, working and interacting.<br><br>
                        Verpan is proud to carry on the legacy of Verner Panton as an official licensee of Verner Panton Design AG - the exclusive owner of all Verner Panton designs.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab1_section3">
                  <div class="tab1_section3_left">
                    <div class="item_title">
                      <h3>
                        Verner Panton
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Among the giants of Danish design, Verner Panton (1926-1998) established a unique reputation for his exuberant originality and tireless experimentation. Panton created lamps, furniture and textiles – and was also a sought-after interior designer. Although he was at the forefront of mid-century Danish Modern, Panton’s contribution was anything but mainstream. He enthusiastically embraced new materials, he splashed with a bold colour palette, and he playfully imbued many of his sculptural creations with a strong graphical expression – without ever compromising on quality or workmanship. Panton’s iconic designs have emerged as contemporary design classics – as strikingly inventive now as they were 50 years ago.</p>
                    </div>
                  </div>
                  <div class="tab1_section3_right">
                    <!-- <div class="img_flex"> -->
                    <img
                      src="~/assets/images/AAmobile/brand/ver.jpg"
                      alt=""
                    >
                    <!-- </div> -->
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==1?'tab_content active':'tab_content'">
              <div class="designer_box">
                <div class="designer_title">
                  <h3>VERPAN & DESIGNERS</h3>
                </div>
                <div class="designer_list">
                  <div
                    v-for="(item, indexz) in designerList"
                    :key="indexz"
                    class="designer_list_item"
                  >
                    <NuxtLink :to="`/en/stylist?designerId=${item.alias}&brand=VERPAN&count=${count}`">
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
              <div class="tab3_content">
                <div class="tab3_section1">
                  <div class="title_item">
                    FOR THE FUTURE
                  </div>
                  <div class="item_title">
                    <h3>Sustainability</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      We continuously strive to offer a collection of beautiful and high quality products with timeless appeal that transcends trends and remain relevant for generations to come.<br><br>
                      We always source the materials best suited to ensure the integrity of the product – in terms of aesthetics, quality and cost. We introduce recyclable materials when possible and strive to develop solutions for easy assembly and disassembly – making it possible to replace and ultimately dispose damaged parts properly.
                    </p>
                  </div>
                </div>
                <div class="tab3_section2">
                  <div class="tab3_section2_left">
                    <img
                      src="~/assets/images/brand/ver-1.png"
                      alt=""
                    >
                  </div>
                  <div class="tab3_section2_right">
                    <div class="item_title">
                      <h3 class="title-h3">
                        Our Commitment
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        We are committed to honoring the heritage of Verner Panton and will never compromise on quality, design or originality. Sourcing materials that fulfills our promise while minimizing the negative impact to the environment is a constant journey, and we still have a long way ahead of us.<br><br>
                        Our commitment to be more sustainable includes efforts towards improving the design process, manufacturing, packaging and shipping. We continuously work to find new ways of designing and producing our products, focusing on approved and sustainable materials.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="tab3_section3">
                  <div class="tab3_section3_left">
                    <div class="left-boxs">
                      <div class="item_title">
                        <div class="sub_title">
                          OCEAN TRANSPORT
                        </div>
                        <h3 class="title-h3">
                          Eco Delivery
                        </h3>
                      </div>
                      <div class="item_content">
                        <p>We use Maersk ECO Delivery for all our ocean shipping. Maersk ECO Delivery is reducing carbon footprint using sustainable net-carbon zero biofuels. These biofuels are ISCC certified, assuring that they have no negative environmental impact on agricultural or natural lands.</p>
                      </div>
                    </div>
                  </div>
                  <div class="tab3_section3_right">
                    <div class="abouts-img">
                      <img
                        src="~/assets/images/brand/ver-2.png"
                        alt=""
                      >
                    </div>
                  </div>
                </div>
                <div class="tab3_section4">
                  <div class="tab3_section4_left">
                    <img
                      src="~/assets/images/brand/ver-3.png"
                      alt=""
                    >
                  </div>
                  <div class="tab3_section4_right">
                    <div class="item_title">
                      <div class="sub_title">
                        MATERIALS
                      </div>
                      <h3 class="title-h3">
                        Recyclable PE & PP
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Plastic materials represents a large part of Panton’s design heritage and also plays a big part of the Verpan collection. When handled responsibly, plastic can function as a sustainably responsible choice, as it is a very durable material that ensures a long product life. Whenever possible, we implement recyclable PP and PE, ensuring that products at end-of-life can be granulated and reused.</p>
                    </div>
                  </div>
                </div>
                <div class="tab3_section5">
                  <div class="tab3_section5_left">
                    <div class="item_title">
                      <div class="sub_title">
                        MATERIALS
                      </div>
                      <h3>
                        FSC-Certified Wood
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Wood is used throughout our collection and we strive to implement wood from sustainable and traceable forestry. For the majority of our collection, including loved products such as the Cloverleaf Sofa, Series 430, Welle and more, we have already introduced FSC® Certified wood. <br> <br>FSC is a global non-profit forest certification system promoting the responsible management of the world’s forests, protecting them for future generations. The organization works against deforestation, protects animals and plants, and ensures that foresters receive decent wages, proper training and safety equipment.</p>
                    </div>
                  </div>
                  <div class="tab3_section5_right">
                    <img
                      src="~/assets/images/brand/ver-4.png"
                      alt=""
                    >
                  </div>
                </div>
                <div class="tab3_section3">
                  <div class="tab3_section3_left">
                    <div class="item_title">
                      <h3>
                        Packaging
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Packaging represents a significant part of our footprint and we continuously work to implement better and more sustainable solutions. However, first priority is always to protect the product and minimize the risk of damage. Secondly, we focus on minimizing packaging and avoiding unnecessary plastic components.</p>
                    </div>
                  </div>
                  <div class="tab3_section3_right">
                    <img
                      src="~/assets/images/brand/ver-5.png"
                      alt=""
                    >
                  </div>
                </div>
                <div class="tab3_section4">
                  <div class="tab3_section4_left">
                    <div class="singles">
                      <img
                        src="~/assets/images/brand/ver-6.png"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="tab3_section4_right">
                    <div class="item_title">
                      <div class="top_title">
                        CLEAN POWER
                      </div>
                      <h3 class="title-h3">
                        Energy
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Our headquarters in Horsens, Denmark is powered by 100% renewable energy provided and certified by Danish energy supplier Ørsted.</p>
                    </div>
                  </div>
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
import MobileBrandVerpan from '~/pagesEn/mobile/brand/child/verpan/index.vue'
export default {
  name: 'VerpanPage',
  components: {
    MobileBrandVerpan
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
    this.postData = { brand: 'VERPAN' }
    await this.$store.dispatch('designer/useDesignerList', this.postData)
    this.designerList = this.designer
    this.count = this.designer.length
  },
  head: {
    title: 'Nine United-Verpan'
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
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'VERPAN' })
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
      return res
    },
    weibo () {
      window.open('https://weibo.com/u/7496459897')
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
