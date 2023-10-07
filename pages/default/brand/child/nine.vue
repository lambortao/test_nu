<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
          <img
            src="~/assets/images/brand/nine.png"
            alt=""
          >
        </div>
      </div>
      <div class="content_box default-width">
        <div>
          <div class="nine tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="nine_tab1_content">
                <div class="tab1_section1">
                  <div class="item_title">
                    <h3>全球视野，凝聚共识</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      我们志存高远、奋楫笃行，探求自我突破。作为跨国企业，我们的业务涵盖一系列不同领域，包括设计家居、健康医疗、零售品牌、投资项目等。
                    </p>
                  </div>
                </div>
                <div class="tab1_section1">
                  <div class="item_title">
                    <h3>以人为本，用心经营</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      注重人文关怀是我们擘画未来的基石。自1975年创立以来，Nine United 集团始终遵循十项基本原则，以此为企业文化核心。我们秉持信任、共享和诚实的合作信念，将所有成员视为独立个体，同时凝聚团队之力思考与践行。
                    </p>
                  </div>
                </div>
                <div class="tab1_section1">
                  <div class="item_title">
                    <h3>Nine United 家族一员</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      Nine United TAK致力于在亚太地区提升品牌影响力的同时重新定义家居体验，旗下拥有四大家居设计品牌：HAY , &Tradition , Verpan 和 Frandsen ，业务涵盖中国、日本、韩国、澳大利亚以及东南亚等地区超过40多个城市。
                    </p>
                  </div>
                </div>
                <div class="tab1_section2">
                  <figure>
                    <img src="~/assets/images/brand/nine-2.png">
                  </figure>
                </div>
                <!-- <div class="tab1_section3">
                  <div class="tab1_section3_box1">
                    <div class="tab1_section3_item">
                      <div class="year">
                        2001年
                      </div>
                      <div class="year_content">
                        Anders Holch Polvsen 成为 BESTSELLER 的首席执行官，Troels Holch Povlsen 创办 NINE UNITED 。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2002年
                      </div>
                      <div class="year_content">
                        Troels Povlsen 与 Rolf Hay、Mette Hay 共同创立丹麦家居设计品牌 HAY。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2004年
                      </div>
                      <div class="year_content">
                        NINE UNITED 的亚洲业务开始在北京展开。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2005年
                      </div>
                      <div class="year_content">
                        NINE UNITED 亚太分公司正式成立，在香港、上海、印度、土耳其新设办事处。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2012年
                      </div>
                      <div class="year_content">
                        NINE UNITED TAK 在上海创立。孟加拉国办事处成立。
                      </div>
                    </div>
                  </div>
                  <div class="tab1_section3_box1">
                    <div class="tab1_section3_item">
                      <div class="year">
                        2014年
                      </div>
                      <div class="year_content">
                        Studio 9 创立于丹麦。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2018年
                      </div>
                      <div class="year_content">
                        &Tradition 加入 NINE UNITED TAK。Herman Miller 收购 HAY 的股份。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2020年
                      </div>
                      <div class="year_content">
                        Verpan、Frandsen 加入 NINE UNITED 亚太大家庭。
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2020年
                      </div>
                      <div class="year_content">
                        NINE DESIGN 开始为外部合作伙伴提供采购服务。
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="tab1_section4">
                  <div class="item_title">
                    <h3>我们的品牌</h3>
                  </div>
                  <div class="item_content">
                    <p>我们的品牌涵盖了设计类生活方式的范畴</p>
                  </div>
                  <div class="brand_section">
                    <NuxtLink to="/brand/hay" class="brand_section_item">
                      <div @click="brandsTracking('HAY')">
                        <figure>
                          <img src="~/assets/images/home/brand/1.png" alt="">
                        </figure>
                        <div class="brand_section_mask">
                          <img
                            src="~/assets/images/home/brand1.png"
                            alt=""
                          >
                        </div>
                      </div>
                    </NuxtLink>
                    <NuxtLink to="/brand/tradition" class="brand_section_item">
                      <div @click="brandsTracking('&Tradition')">
                        <figure>
                          <img src="~/assets/images/home/brand/2.png" alt="">
                        </figure>
                        <div class="brand_section_mask">
                          <img
                            class="mask_img1"
                            src="~/assets/images/home/brand2.png"
                            alt=""
                          >
                        </div>
                      </div>
                    </NuxtLink>
                    <NuxtLink to="/brand/frandsen" class="brand_section_item">
                      <div @click="brandsTracking('Frandsen')">
                        <figure>
                          <img src="~/assets/images/home/brand/3.png" alt="">
                        </figure>
                        <div class="brand_section_mask">
                          <img
                            class="mask_img2"
                            src="~/assets/images/home/brand3.png"
                            alt=""
                          >
                        </div>
                      </div>
                    </NuxtLink>
                    <NuxtLink to="/brand/verpan" class="brand_section_item">
                      <div @click="brandsTracking('Verpan')">
                        <figure>
                          <img src="~/assets/images/home/brand/4.png" alt="">
                        </figure>
                        <div class="brand_section_mask">
                          <img
                            class="mask_img3"
                            src="~/assets/images/home/brand4.png"
                            alt=""
                          >
                        </div>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                <div class="tab1_section5">
                  <div class="tab1_section5_word">
                    <div class="tab1_section5_word_item">
                      <div class="item_title">
                        <h3>同一个世界</h3>
                      </div>
                      <div class="item_content">
                        <p>一直以来，我们的企业公平公正，充满机遇且富有责任感，我们坚信文化交融能够提升工作质效。纵然相逢于远方，却亲密无间。</p>
                      </div>
                    </div>
                    <div class="tab1_section5_word_item">
                      <div class="item_title">
                        <h3>同一个理念</h3>
                      </div>
                      <div class="item_content">
                        <p>我们始终遵循Nine United集团的 10 项基本原则，在业务开展与沟通交流中秉持着信任、共享和诚实的合作信念。</p>
                      </div>
                    </div>
                    <div class="tab1_section5_word_item">
                      <div class="item_title">
                        <h3>同一个大家庭</h3>
                      </div>
                      <div class="item_content">
                        <p>每个人都是大家庭的一员，这种归属感使公司跨越国界、品牌和部门，从而团结一心。我们将所有成员视为独立个体，同时凝聚团队之力思考与践行。</p>
                      </div>
                    </div>
                  </div>
                  <div class="tab1_section5_img">
                    <img src="~/assets/images/brand/nine-3.png">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-brand-nine class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandNine from '~/pages/mobile/brand/child/nine/nine.vue'
export default {
  name: 'StudioPage',
  components: {
    MobileBrandNine
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: ''
  }),
  head: {
    title: 'Nine United官网-NineUnited'
  },
  methods: {
    brandsTracking (data) {
      this.$store.dispatch('site/tracker', { page: 'Brand-NineUnited', event: 'view_brand', mode: 'Brands', label: data })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
