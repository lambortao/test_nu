<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
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
            :to="`/en/product?form=brand&method=ee4ab83b35f08f7f&page=1`"
          >
            <span @click="brandsTracking({ event:'view_product_list',mode:'Products',label:'Products'})">Products</span>
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
                      class="play-button"
                    >
                  </div>
                </div>
              </div>
              <!-- 关于  -->
              <section class="about_item_box">
                <div class="about_item">
                  <div class="item_title">
                    <h3>About HAY</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      In 2002, HAY was established as a new kind of design company in Denmark. Motivated by the certainty that good design is everyone’s right, HAY set out to innovate new ways to answer the ever-evolving needs of the modern world – but at a more accessible price point than industry standards.<br><br>
                      Co-founders and Creative Directors Mette and Rolf Hay committed to working with their generation’s best designers from all over the world to create high-quality products that would be available to a wide audience. This founding principle has always been HAY’s DNA, and it remains at the core of the company’s culture today.<br><br>
                      In 2003, HAY’s first furniture collection launched at IMM Cologne, and the first HAY shop opened in Copenhagen.<br><br>
                      Today, there are about 30 HAY stores throughout Europe, Asia, and USA.
                    </p>
                    <a class="brank_link" href="https://hay.dk/country-selector" target="_blank">www.hay.dk</a>
                    <!--  <span class="brank_link_span">hay.dk: -->
                  </div>
                </div>
              </section>
              <!-- 创造 -->
              <div class="content_item_box">
                <div class="content_item_img">
                  <figure>
                    <img src="~/assets/images/brand/hay_about_img2.png" alt="">
                  </figure>
                </div>
                <div class="content_item">
                  <div class="item_title">
                    <h3>
                      WHAT WE DO
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>
                      HAY is motivated and inspired by the realities of life today, in which traditional divides between personal and professional space have become more fluid.<br><br>
                      To satisfy those conditions, our products span the realms of furniture, lighting, and accessories, and they are always flexible and adaptable, versatile and varied. That means they can be used in any environment and suit any need, from a living room to an office, hotel lounge, or cafe.<br><br>
                      In keeping with that spirit, HAY embraces the beauty of quotidian life by creating fresh takes on a wide range of products that are part of our everyday, from a toothbrush to a paper bin to a sofa. No object is too common, no detail too minute: HAY pays attention to the small moments that make up our lives.
                    </p>
                  </div>
                </div>
                <div class="content_block" />
              </div>
              <div class="content_item_box content_item_center">
                <div class="content_block" />
                <div class="content_item">
                  <div class="item_title">
                    <h3>
                      HOW WE WORK
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>
                      Every HAY product is developed in close collaboration between HAY’s Creative Directors Mette and Rolf Hay, their in-house designers and product- development teams in the Copenhagen office, and a loyal roster of contemporary designers based all around the world.<br><br>
                      We insist on creating products that are relevant, original, and, perhaps most of all, needed, so we care a lot about the idea and the vision behind everything we make. We believe that a clear starting point for every object — whether that be a new technology, a new material, or simply our feeling that this item is missing from the world — leads to a more fluid development process and a better, long-lasting end product.
                    </p>
                  </div>
                </div>
                <div class="content_item_img">
                  <figure>
                    <img src="~/assets/images/brand/hay_about_img3.png" alt="">
                  </figure>
                </div>
              </div>
              <div class="content_item_box content_item_center">
                <div class="content_item_img">
                  <figure>
                    <img src="~/assets/images/brand/hay_about_img4.png" alt="">
                  </figure>
                </div>
                <div class="content_item">
                  <div class="item_title">
                    <h3>
                      OUR BRAND
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>
                      At HAY, we work with the world’s leading designers in a sustainable and democratic context that draws from three primary sources of inspiration: art, architecture, and fashion.<br><br>
                      We have always paid close attention to and been inspired by our surroundings, and putting our finger on the pulse of contemporary culture is how we keep pace with the world around us.<br><br>
                      <span class="opacty">
                        ‘What I admire about art is the unexpected, the originality; architecture is of course the context and the home of what we make, and fashion has a wonderful dynamism to it, reflecting the spirit of the time and what’s happening right now. I would say that the best products we have done, they may exist somewhere in between these three environments, drawing from a little bit of everything.’— Rolf Hay</span>
                    </p>
                  </div>
                </div>
                <div class="content_block" />
              </div>
              <section class="value_item_box">
                <div class="value_item">
                  <div class="item_title">
                    <h3 class="title-h3">
                      OUR DNA
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>Four essential values at the core of HAY continue to shape and motivate the company today:</p>
                    <p class="bold">
                      PASSION
                    </p>
                    <p class="bold">
                      FUNCTION
                    </p>
                    <p class="bold">
                      COMMUNITY
                    </p>
                    <p class="bold">
                      RESPONSIBILITY
                    </p>
                    <p>
                      From Furniture to Accessories and Lighting, HAY’s in-house product development teams, our international designers, and of course our founding visionaries Mette and Rolf Hay eternally strive to maintain these values.
                      No matter what product you are interested in, from a HAY pillow to a HAY dining table, HAY customers can feel confident that each of these values is behind every single one.
                    </p>
                  </div>
                </div>
              </section>
              <section class="about_advantage">
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>PASSION</h3>
                  </div>
                  <div class="item_content">
                    <p>At HAY, we are motivated by a love of design and a commitment to constant innovation. We are always challenging ourselves to create products that elevate the modest moments in peoples’ lives. This means thinking about everyday items in new, original ways, using the most cutting-edge materials, methods, tools, and technologies available.</p>
                  </div>
                </div>
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>FUNCTION</h3>
                  </div>
                  <div class="item_content">
                    <p>At HAY, form will always follow function. Our products are beautiful, sleek, fresh, and stylish — but we believe that use and comfort should come first. Our designs are prioritize the essential: we believe the simplest solution is usually the best solution.</p>
                  </div>
                </div>
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>COMMUNITY</h3>
                  </div>
                  <div class="item_content">
                    <p>HAY is an international company: HAY design crosses borders. From our designers to our suppliers to our in-house product-development teams, collaboration is fundamental to HAY. We believe we are stronger for our partnerships: the synergy achieved by numerous minds, skill sets, tools, and hands working in harmony is what drives and motivates us every day.</p>
                  </div>
                </div>
                <div class="about_advantage_item">
                  <div class="item_title">
                    <h3>RESPONSIBILITY</h3>
                  </div>
                  <div class="item_content">
                    <p>High-quality means thoughtfully designed, well crafted, and built to last. At HAY, we strive to minimize our footstep on the planet while making durable products that we hope will live with you for a long time. We always hold ourselves to high standards, so each of our product categories has its own team of designers, technicians, and engineers who ensure that every product has been considered from every angle, and has withstood quality-control checks on all fronts.</p>
                  </div>
                </div>
              </section>
              <section class="about_img">
                <img
                  src="~/assets/images/brand/hay_about_img6.png"
                  alt=""
                >
              </section>
            </div>
          </div>
          <div :class="activeIndex==1?'tab_content active':'tab_content'">
            <div class="designer_box">
              <div class="designer_title">
                <h3>HAY & DESIGNERS</h3>
                <p>At HAY, we believe that we are constantly working with the most talented, curious, and courageous designers from around the world, and every one of them is a member of the HAY family.</p>
                <p>This family includes Pierre Charpin, Inga Sempe, Doshi Levien, Shane Schneck, Ana Kras, Stefan Diez, Scholten & Baijings, Clara Von Zweigbergk, Ronan and Erwan Bouroullec, Hee Welling, George Sowden, GamFratesi, and many others, who work closely with HAY’s in-house Design team.</p>
              </div>
              <div class="designer_list">
                <div
                  v-for="(item, indexz) in designerList"
                  :key="indexz"
                  class="designer_list_item"
                >
                  <NuxtLink :to="`/en/stylist?designerId=${item.alias}&brand=HAY&count=${count}`">
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
                    <h3>SUSTAINABILITY & CERTIFICATE</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      HAY focuses on developing long-lasting products that minimise our environmental impact. <br>
                      We optimise the use of sustainable materials such as recycled materials, FSC-certified wood and water-based lacquer, with a growing number of eco-certified products.<br>
                      We have strict regulatory requirements, and the majority of our products are tested to comply with international standards for strength, durability and safety.
                    </p>
                  </div>
                </div>
                <div class="content_item_img">
                  <figure>
                    <img src="~/assets/images/brand/hay_sus_img1.png" alt="">
                  </figure>
                </div>
              </div>
              <div class="sutain_content_normal">
                <div class="content_item_img">
                  <figure>
                    <img src="~/assets/images/brand/hay_sus_img2.png" alt="">
                  </figure>
                </div>
                <div class="content_item_box content_item_top">
                  <div class="item_title">
                    <h3>WATER-BASED LACQUER</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      The majority of our wooden furniture collection is produced with a water-based lacquer, which has many advantages over normal PU lacquer. The low VOC (volatile organic compounds) content in the water-based variant emits significantly fewer pollutants, which makes it much more environmentally friendly, contributing to a healthier working environment and better indoor climate. Furthermore, water-based lacquer is often more durable than PU lacquer, so your wooden furniture can have a longer lifetime too.
                    </p>
                  </div>
                </div>
                <div class="content_item_block" />
              </div>
              <div class="sutain_content_normal">
                <div class="content_item_block" />
                <div class="content_item_box">
                  <div>
                    <div class="item_title">
                      <h3>
                        FSC®-certified (FSC-C153898)<br>
                        CERTIFICATION
                      </h3>
                    </div>
                    <div class="item_content">
                      <p>
                        The majority of HAY’s wooden furniture is FSC®-certified (FSC-C153898). This means the products are made from FSC®-certified (FSC-C153898) wood sourced from sustainable forests with responsible management that reduces deforestation and ensures the forests’ future preservation. Certified products are your assurance that HAY’s wooden furniture has been produced in a socially, economically and environmentally responsibly way.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="content_item_img">
                  <figure>
                    <img src="~/assets/images/brand/hay_sus_img3.png" alt="">
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
                    <h3>EU ECOLABEL</h3>
                  </div>
                  <div class="item_content">
                    <p>
                      The EU Ecolabel is the official European ecolabel of environmental excellence that is awarded to products and services meeting high environmental standards throughout their life cycle – from raw material extraction, to production, distribution and disposal – the products have a disassembly instruction. EU-Ecolabelled furniture meet criteria that guarantee that any virgin wood, cork, bamboo and rattan are sourced from legal and sustainably managed forests. The use of hazardous substances is restricted, harmful residues in any upholstery are limited, and the products have low formaldehyde emissions. All products are free from PVC, and the VOC emissions from the final coated component or entire furniture product meet defined VOC emission criteria. The EU Ecolabel offers the consumer an easy way to identify an environmentally-friendly product.
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
                      NORDIC SWAN ECOLABLE
                    </h3>
                  </div>
                  <div class="item_content">
                    <p>
                      The Nordic Swan Ecolabel is the official ecolabel in the Nordics and the EU Ecolabel is the official ecolabel in Europe. They work to reduce the overall environmental impact from production and consumption. To ensure maximum environmental impact, the Nordic Swan Ecolabel and the EU Ecolabel take an entire life cycle approach and look at the full product journey. This means that the ecolabels evaluate the environmental impact of the specific product type and set requirements in all relevant stages of the product life cycle – from raw materials, production and use, to waste, re-use and recycling.
                    </p>
                  </div>
                </div>
                <div class="content_item_block" />
              </div>
              <div class="sustain_item first_item">
                <div class="item_title">
                  <h3>ECO DELIVERY</h3>
                </div>
                <div class="item_content">
                  <p>Freight transportation plays a fundamental role in global sustainable development, which is why it has become a focus area for HAY. In our efforts to minimise our carbon footprint, we sought to find the most environmentally-friendly solution for transporting our products worldwide. This has resulted in a new partnership with Maersk ECO Delivery, which replaces fossil fuels with sustainable, low-carbon fuel, ECO Delivery, and thus enables HAY to transport its cargo in a more sustainable way. ECO Delivery uses a low-carbon fuel certified by the International Sustainability and Carbon Certification (ISCC) body and manufactured from recycled sustainable biomass. Looking forward, HAY will use ECO Delivery for our Europe and APAC ocean transport, and we see this as an important step in our journey towards a more sustainable and responsible way of running our business.</p>
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
                  <h3>5 YEAR WARRANTY</h3>
                </div>
                <div class="item_content">
                  <p>
                    HAY designs and manufactures furniture under the trademark HAY. HAY is dedicated to design and produce durable furniture which is designed to last. HAY puts great effort into choosing materials of high quality which help to secure the long life span of the products.<br><br>
                    HAY provides a 5-year product warranty, which covers materials and workmanship on our furniture frame and upholstery. The warranty covers faults which were present at the time of purchase or which have occurred as a result of defects present at the time of purchase. The warranty period of 5 years is calculated from the date on the original invoice.
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
  <!-- </div> -->
</template>

<script>
import MobileBrandHay from '~/pagesEn/mobile/brand/child/hay/index.vue'
import videoPoster from '~/assets/images/brand/1.png'
import videoPoster1 from '~/assets/images/brand/2.png'
export default {
  name: 'HayPage',
  components: {
    MobileBrandHay
  },
  data: () => ({
    tabList: ['About', 'Designer', 'Sustainablity'],
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
    title: 'Nine United-HAY'
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
      window.open('https://weibo.com/u/7773306742')
    },
    redBook () {
      window.open('https://www.xiaohongshu.com/user/profile/5bbc9c1985e5bd00010c2cb1?xhsshare=CopyLink&appuid=554b8ba4af81470bf7a00400&apptime=1663125741')
    },
    goodHome () {
      window.open('https://m.haohaozhu.cn/user/dnlGM0RVY1FWd2JXdFhlNVNhclFRQT09OjExMGY5NDdkYzZmN2RkNjE1MTAwOGFmY2ZmZWVmZmQz.html?is_share_activity=1&?is_share_activity=1&&hz_dev=ios&hz_share_plfm=link&hz_share_uid=ZVJDamZGSjNBMlZZZVpFUENNV0lUdz09OjkzMjI0N2M1YTMyNjA3YjkwYjgzZTljZjEyNWQzZmE3')
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
@import "~/assets/scss/_fonts.scss";
.container {
  font-family: "WorkSans-Regular";
}
</style>
