<!-- eslint-disable no-irregular-whitespace -->
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
                <!-- <div class="tab1_section1">
                  <div class="item_title">
                    <h3>The NINE UNITED Family</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      NINE UNITED is a privately held family of companies.<br>
                      The NINE UNITED family covers a range of different areas; design, architecture, inventory, branding, garment accessories,
                      window decoration, CSR and sustainable development projects.<br><br>

                      In our everyday work, we aim to dream big and act humble, which is reflected in our approach to every new project.
                    </p>
                  </div>
                </div> -->
                <!-- 1 -->
                <div class="tab1_section1 en">
                  <div class="item_title">
                    <h3>An international company with a family spirit</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      We dream big and work hard, but it is our ability to think and act as a team that unites us across borders, brands and departments. We are a privately held family of international companies covering a range of different areas, including design furniture and lighting, health and care products, retail branding, property administration, foundations and social investment.
                    </p>
                  </div>
                </div>
                <!-- 2 -->
                <div class="tab1_section1 en">
                  <div class="item_title">
                    <h3>Run by heart</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      Great results are made by people who care. We can train people for a job, but we cannot easily train someone to care about what they do for a living.<br><br>

                      Since 1975, members of the Nine United family have been guided by one philosophy based on 10 basic principles. Our cooperation is built on trust, partnership and honesty. We treat all people as individuals but we think and act as a team.
                    </p>
                  </div>
                </div>
                <!-- 3 -->
                <div class="tab1_section1 en">
                  <div class="item_title">
                    <h3>Part of Nine United Family</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      Nine United TAK is dedicated to growing its brand presence and redefining home furnishings across style-conscious markets in Asia Pacific. It operates four home furnishing brands, namely HAY, &Tradition, VERPAN, and FRANDSEN, in more than 40 cities across  China, Japan, South Korea, Australia, Southeast Asia, and beyond.<br><br>

                      <!-- Through its brands and STUDIO 9 concept, Nine United TAK continues to push the boundaries of furniture and lighting design in the Asia Pacific region. -->
                    </p>
                  </div>
                </div>
                <!-- <div class="tab1_section1">
                  <div class="item_title">
                    <h3>History</h3>
                  </div>
                  <div class="item_content">
                    <p align="center">
                      The story of NINE UNITED began in 1975,<br>
                      in a small town called Ringkoebing on the western coast of Jutland when Troels Holch
                      Povlsen founded the Danish clothing company BESTSELLER.<br><br>
                      As BESTSELLER grew, new areas were explored and new business opportunities started developing. The NINE UNITED family began to take shape in the early 2000s and is still growing every day. The family blood and values still run through both BESTSELLER and NINE UNITED, and this shared legacy is an important part of the NINE UNITED history and spirit.
                    </p>
                  </div>
                </div> -->
                <div class="tab1_section2">
                  <figure>
                    <img src="~/assets/images/brand/nine-2.png">
                  </figure>
                </div>
                <!--
                <div class="tab1_section3">
                  <div class="tab1_section3_box1">
                    <div class="tab1_section3_item">
                      <div class="year">
                        2001
                      </div>
                      <div class="year_content">
                        Anders Holch Polvsen becomes BESTSELLER CEO, Troels Holch Povlsen establishes NINE UNITED.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2002
                      </div>
                      <div class="year_content">
                        Troels Povlsen co-founds HAY with Rolf and Mette Hay.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2004
                      </div>
                      <div class="year_content">
                        NINE UNITED’s Asia presence starts in Beijing.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2005
                      </div>
                      <div class="year_content">
                        NINE UNITED ASIA is officially established, with new offices in Hong Kong, Shanghai, India, Turkey.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2012
                      </div>
                      <div class="year_content">
                        NINE UNITED TAK is founded out of Shanghai. Bangladesh office opens.
                      </div>
                    </div>
                  </div>
                  <div class="tab1_section3_box1">
                    <div class="tab1_section3_item">
                      <div class="year">
                        2014
                      </div>
                      <div class="year_content">
                        Studio 9 is created in Denmark.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2018
                      </div>
                      <div class="year_content">
                        &Tradition joins NINE UNITED TAK. Herman Miller acquires a stake in HAY.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2020
                      </div>
                      <div class="year_content">
                        Verpan, Frandsen, join the NINE UNITED ASIA family.
                      </div>
                    </div>
                    <div class="tab1_section3_item">
                      <div class="year">
                        2020
                      </div>
                      <div class="year_content">
                        NINE DESIGN begins offering its procurement services to external partners.
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="tab1_section4">
                  <div class="item_title">
                    <h3>Our brands</h3>
                  </div>
                  <div class="item_content">
                    <p>Our brands cover the design lifestyle spectrum</p>
                  </div>
                  <div class="brand_section">
                    <NuxtLink to="/en/brand/hay" class="brand_section_item">
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
                    <NuxtLink to="/en/brand/tradition" class="brand_section_item">
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
                    <NuxtLink to="/en/brand/frandsen" class="brand_section_item">
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
                    <NuxtLink to="/en/brand/verpan" class="brand_section_item">
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
                        <h3>One World</h3>
                      </div>
                      <div class="item_content">
                        <p>We build our company on fairness, opportunities and a sense of responsibility towards our surroundings. We believe that cultural differences are an advantage that promotes quality, good results and strong values. Our world may be large but we strive to have closeness despite distance.</p>
                      </div>
                    </div>
                    <div class="tab1_section5_word_item">
                      <div class="item_title">
                        <h3>One Philosophy</h3>
                      </div>
                      <div class="item_content">
                        <p>We make NINE UNITED's 10 basic principles come alive. They guide us in the way we interact with the world around us and determine how we do business. We base our relations on trust, respect and honesty.</p>
                      </div>
                    </div>
                    <div class="tab1_section5_word_item">
                      <div class="item_title">
                        <h3>One Family</h3>
                      </div>
                      <div class="item_content">
                        <p>The feeling of being part of a family unites our company across borders, brands and departments. We help our colleagues, are proud of them and take pride in the good examples we set for one another. We treat all people as individuals but we think and act as a team.</p>
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
import MobileBrandNine from '~/pagesEn/mobile/brand/child/nine/nine.vue'
export default {
  name: 'StudioPage',
  components: {
    MobileBrandNine
  },
  head: {
    title: 'Nine United-NineUnited'
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
