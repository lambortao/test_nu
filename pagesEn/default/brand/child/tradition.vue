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
              :to="`/en/product?form=brand&method=ac0140b2459f13b3&page=1`"
            >
              <span @click="brandsTracking({event:'view_product_list',mode:'Products',label:'Products'})">Products</span>
            </NuxtLink>
          </div>
          <div class="tradition tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="tradition_tab1_content">
                <div class="content_box">
                  <div class="content_box_left">
                    <div class="item_title">
                      <h3>
                        About &Tradition
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        &Tradition’s vision is to create a more conscious, comfortable and beautiful world. With a passionate approach to masterly design, we preserve icons of the past whilst creating the classics of tomorrow, bringing you a collection infused with enduring qualities that work to connect people and places.<br><br>
                        Always respectfully. Always made to last.
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
                <div class="tool">
                  <div class="tool-img">
                    <img src="~/assets/images/AAmobile/brand/trad-tion.png" class="tool-pic">
                  </div>
                </div>
                <br>
                <div class="content_box">
                  <div class="content_box_right flex_img">
                    <img src="~/assets/images/AAmobile/brand/trad-left.png">
                    <img src="~/assets/images/AAmobile/brand/trad-right.png">
                  </div>
                  <div class="content_box_left">
                    <div class="item_title">
                      <h3 class="title-h3">
                        A Century of Great Design
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        Spanning decades of timeless design icons – from Verner Panton’s norm-breaking Flowerpot lamp first produced in the late 1960s to Arne Jacobsen and Flemming Lassen’s Mayor sofa designed specifically for Søllerød’s city hall located in the outskirts of Copenhagen – &Tradition’s collection of furniture, lighting and interior objects ranges from reissued mid-century classics to contemporary pieces.<br><br>
                        Once fought-over by design appreciators at auctions around the world and available to only a handful of people, many of our products – including the Mayor sofa, Viggo Boesen’s Little Petra chair and some of the newly-added Hvidt & Mølgaard designs – are retrieved from original sketches and produced on a large scale for the first time ever.<br><br>
                        Alongside such mid-century gems are a number of contemporary pieces, the work of some of today’s most acclaimed international artists: Valencia-based Jaime Hayon, local studio Space Copenhagen, Swedish-raised designer Sami Kallio and Norwegian duo Anderssen & Voll – to name a few.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="trad_imgs">
                  <div class="flex-box">
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-three.png">
                      </div>
                      <p>Little Petra Lounge Chair</p>
                    </div>
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-four.png">
                      </div>
                      <p>Rely Chair</p>
                    </div>
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-one.png">
                      </div>
                      <p>Boomerang Lounge Chair</p>
                    </div>
                    <div class="trad_imgs_item">
                      <div>
                        <img src="~/assets/images/AAmobile/brand/trad-two.png">
                      </div>
                      <p>Drop Leaf Table</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==1?'tab_content active':'tab_content'">
              <div class="designer_box">
                <div class="designer_title">
                  <h3>TRADITION & DESIGNERS</h3>
                </div>
                <div class="designer_list">
                  <div v-for="(item, indexz) in designerList" :key="indexz" class="designer_list_item">
                    <NuxtLink
                      :to="`/en/stylist?designerId=${item.alias}&brand=TRADITION&count=${count}`"
                    >
                      <div class="designer_img">
                        <figure>
                          <img :src="item.thumbnail" class="des-img">
                        </figure>
                      </div>
                      <p>{{ item.name }}</p>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
            <div :class="activeIndex==2?'tab_content active':'tab_content'">
              <div class="sustain_box_en">
                <div class="sustain_section1">
                  <div class="item_title">
                    <h3>Social Responsibility & Sustainablity</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      Our collection is designed to be passed down through generations, to endure the impact of time, focusing on quality over quantity. Social responsibility and sustainablity play a large part in that process, and we are happy to share our procedures and results.
                    </p>
                  </div>
                </div>
                <div class="sustain_section2">
                  <div class="sustain_section2_left">
                    <div class="item_title">
                      <h3 class="title-h3">
                        MATERIALS THAT MATTER
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>We allocate a lot of resources to supporting a circular use of materials; from sourcing sustainable leathers and sheepskin, using Responsible Down Standard (RDS) feathers, eliminating all toxic chemicals, and stepping up our recycling game, to improving our use of sustainably sourced FSC® certified wood, EU Ecolabel products and Oeko-Tex® certified materials.</p>
                    </div>
                  </div>
                  <div class="sustain_section2_right">
                    <img
                      src="~/assets/images/brand/trad-1.png"
                      alt=""
                    >
                  </div>
                </div>
                <div class="sustain_section3">
                  <div class="sustain_section3_img">
                    <img
                      src="~/assets/images/brand/trad-2.png"
                      alt=""
                    >
                  </div>
                  <div class="sustain_section3_content">
                    <div class="item_title">
                      <h3>Certifications</h3>
                    </div>
                    <div class="item_content">
                      <p>
                        Look out for FSC® certified products across our website or download our  FSC® overview. View &Tradition’s ‘Test & Certifications’
                      </p>
                    </div>
                  </div>
                </div>
                <div class="sustain_section4">
                  <div class="sustain_section4_item">
                    <div class="item_img">
                      <img
                        src="~/assets/images/brand/trad-3.png"
                        alt=""
                      >
                    </div>
                    <div class="item_content">
                      <p>
                        FSC® is an international organisation dedicated to promoting responsible management of the world’s forests. FSC® certified products are made from responsibly sourced wood.
                      </p>
                    </div>
                  </div>
                  <div class="sustain_section4_item">
                    <div class="item_img">
                      <img
                        src="~/assets/images/brand/trad-4.png"
                        alt=""
                      >
                    </div>
                    <div class="item_content">
                      <p>
                        The EU Ecolabel is a label of environmental excellence that is awarded to products meeting high environmental standards throughout their life-cycle. View all of our EU Ecolabel certified products here.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="sustain_section5">
                  <div class="sustain_section5_left">
                    <img
                      src="~/assets/images/brand/trad-5.png"
                      alt=""
                    >
                  </div>
                  <div class="sustain_section5_right">
                    <div class="item_title">
                      <h3>
                        BUILT TO LAST
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Since 2010, &Tradition has worked in collaboration with Scandinavian and international designers with the ambition of creating quality furniture and accessories, focusing on timeless appeal and a ‘built to last’ mentality. By marrying tradition with innovation, &Tradition’s collection ranges from modern masterpieces to reissued Danish classics that we are thrilled to bring into contemporary homes and spaces.</p>
                      <br>
                      <p>Sustainability is part of our every day; it informs our decision-making, our processes, our designs and our work ethic. It is something we take seriously, and we understand that we have a responsibility to limit the impact of our designs and a duty to work towards a more sustainable future. We are more aware than ever of the impact our industry has on local and global communities, and we freely admit that we will never be perfect. However, we strive to reduce our ecological footprint even further, and we are committed to creating sustainable and ethically sourced, long-lasting design pieces that will bring joy for many years to come.</p>
                    </div>
                  </div>
                </div>
                <div class="sustain_section5">
                  <div class="sustain_section5_left">
                    <div class="item_title">
                      <h3>
                        OUR JOURNEY TO SUSTAINABILITY
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        At &Tradition, the entire design process is scrutinized from start to finish – How can we improve the materials here? Where is this wood sourced from? Which chemicals have been used on this fabric? How will this product be packaged? We pay attention every step of the way, and we are constantly researching, experimenting and testing new ways of sourcing, producing and manufacturing the designs you see today. For us, it’s important to know where our materials come from, and how they have been treated. And we wish to be open about it.<br><br>
                        Our collection makes use of a multitude of natural and man-made materials, ranging from woods, metals and plastics, to hides and feathers, to textiles and foams. It’s a lot to think about – but for us, providing the highest quality products to our customers is paramount to who we are as a company. We work with natural materials such as walnut, which comes in a range of strong and rich hues and can easily be shaped into elaborate forms and polished to a smooth finishing; as well as marble and travertine, both highly resistant and durable; whilst organic materials are sourced for our home objects, ensuring longevity.<br><br>
                        We are not your run-of-the-mill, one-time use design company – our collection is designed to be passed down through generations, to endure the impact of time, focusing on quality over quantity. ‘Built to last’ isn’t just something we thought sounded great, it’s the mantra that informs our decisions from start to finish. Being knowledgeable about where our materials are sourced from is important and we make sure to keep up-to-date with the latest findings and details.
                      </p>
                    </div>
                  </div>
                  <div class="sustain_section5_right">
                    <img
                      src="~/assets/images/brand/trad-6.png"
                      alt=""
                    >
                  </div>
                </div>
                <div class="sustain_section5">
                  <div class="sustain_section5_left">
                    <img
                      src="~/assets/images/brand/trad-7.png"
                      alt=""
                    >
                  </div>
                  <div class="sustain_section5_right">
                    <div class="item_title">
                      <h3 class="title-h3">
                        THE PROCESS
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>Our journey towards sustainablity is an ongoing process, and by working with like-minded designers and artists we will do our upmost to ensure that our processes keep on progressing towards minimizing the environmental impact of our collection.</p>
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
import MobileBrandTradition from '~/pagesEn/mobile/brand/child/tradition/index.vue'
export default {
  name: 'TraditionPage',
  components: {
    MobileBrandTradition
  },
  data: () => ({
    tabList: ['About', 'Designer', 'Sustainablity'],
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
    title: 'Nine United-&Tradition'
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
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'TRADITION' })
      this.designerList = list
      this.count = list.length
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
