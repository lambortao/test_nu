<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <brand-component>
    <template slot="default">
      <img src="~/assets/images/AAmobile/brand/nine-bg.jpg" alt="HAY">
    </template>
    <template slot="content">
      <div class="studio">
        <!-- <h3>An international company with a family spirit</h3>
        <p>NINE UNITED is a privately held family of companies. The NINE UNITED family covers a range of different areas; design, architecture, inventory, branding, garment accessories, window decoration, CSR and sustainable development projects.</p>
        <p>In our everyday work, we aim to dream big and act humble, which is reflected in our approach to every new project.</p>
        <h3>History</h3>
        <p>The story of NINE UNITED began in 1975, in a small town called Ringkoebing on the western coast of Jutland when Troels Holch Povlsen founded the Danish clothing company BESTSELLER.</p>
        <p>As BESTSELLER grew, new areas were explored and new business opportunities started developing. The NINE UNITED family began to take shape in the early 2000s and is still growing every day. The family blood and values still run through both BESTSELLER and NINE UNITED, and this shared legacy is an important part of the NINE UNITED history and spirit.</p> -->
        <h3 class="brand-our">An international company with a family spirit</h3>
        <p>We dream big and work hard, but it is our ability to think and act as a team that unites us across borders, brands and departments. We are a privately held family of international companies covering a range of different areas, including design furniture and lighting, health and care products, retail branding, property administration, foundations and social investment.</p>
        <h3 class="brand-our">Run by heart</h3>
        <p>Great results are made by people who care. We can train people for a job, but we cannot easily train someone to care about what they do for a living.<br><br>Since 1975, members of the Nine United family have been guided by one philosophy based on 10 basic principles. Our cooperation is built on trust, partnership and honesty. We treat all people as individuals but we think and act as a team.</p>
        <h3 class="brand-our">Part of Nine United Family</h3>
        <p>Nine United TAK is dedicated to growing its brand presence and redefining home furnishings across style-conscious markets in Asia Pacific. It operates four home furnishing brands, namely HAY, &Tradition, VERPAN, and FRANDSEN, in more than 40 cities across  China, Japan, South Korea, Australia, Southeast Asia, and beyond</p>
        <figure class="img_margin"><img src="~/assets/images/AAmobile/brand/nine-icon.png" alt=""></figure>
        <!-- <div class="progress">
          <div class="progress-icon">
            <img src="~/assets/images/AAmobile/brand/progress-icon.png">
          </div>
          <div class="progress-detail">
            <div class="progress_item">
              <h5>2001</h5>
              <p>Anders Holch Polvsen becomes BESTSELLER CEO, Troels Holch Povlsen establishes NINE UNITED.</p>
            </div>
            <div class="progress_item">
              <h5>2002</h5>
              <p>Troels Povlsen co-founds HAY with Rolf and Mette Hay.</p>
            </div>
            <div class="progress_item">
              <h5>2004</h5>
              <p>NINE UNITED’s Asia presence starts in Beijing.</p>
            </div>
            <div class="progress_item">
              <h5>2005</h5>
              <p>NINE UNITED ASIA is officially established, with new offices in Hong Kong, Shanghai, India, Turkey.</p>
            </div>
            <div class="progress_item">
              <h5>20012</h5>
              <p>NINE UNITED TAK is founded out of Shanghai. Bangladesh office opens.</p>
            </div>
            <div class="progress_item">
              <h5>2014</h5>
              <p>Studio 9 is created in Denmark.</p>
            </div>
            <div class="progress_item">
              <h5>2018</h5>
              <p>&Tradition joins NINE UNITED TAK. Herman Miller acquires a stake in HAY.</p>
            </div>
            <div class="progress_item">
              <h5>2020</h5>
              <p>Verpan, Frandsen, join the NINE UNITED ASIA family.</p>
            </div>
            <div class="progress_item">
              <h5>2020</h5>
              <p>NINE DESIGN begins offering its procurement services to external partners.</p>
            </div>
          </div>
        </div> -->
        <h3 class="brand-our">Our brands</h3>
        <p>Our brands cover a wide spectrum of lifestyle design</p>
        <div class="out-brand-list img_margin">
          <div class="our-brand">
            <nuxt-link
              to="/brand/hay"
            >
              <img
                src="~/assets/images/AAmobile/brand/nine-one.png"
                @click="brandTracking({label:'HAY'})"
              >
            </nuxt-link>
          </div>
          <div class="our-brand">
            <nuxt-link
              to="/brand/tradition"
            >
              <img
                src="~/assets/images/AAmobile/brand/nine-two.png"
                @click="brandTracking({label:'&Tradition'})"
              >
            </nuxt-link>
          </div>
          <div class="our-brand">
            <nuxt-link
              to="/brand/frandsen"
            >
              <img
                src="~/assets/images/AAmobile/brand/nine-three.png"
                @click="brandTracking({label:'Frandsen'})"
              >
            </nuxt-link>
          </div>
          <div class="our-brand">
            <nuxt-link
              to="/brand/verpan"
            >
              <img
                src="~/assets/images/AAmobile/brand/nine-four.png"
                @click="brandTracking({label:' Verpan'})"
              >
            </nuxt-link>
          </div>
        </div>
        <h3 class="brand-our">Our World</h3>
        <p>We build our company on fairness, opportunities and a sense of responsibility towards our surroundings. We believe that cultural differences are an advantage that promotes quality, good results and strong values. Our world may be large but we strive to have closeness despite distance.</p>
        <h3 class="brand-our">Our Philosophy</h3>
        <p>We make NINE UNITED's 10 basic principles come alive. They guide us in the way we interact with the world around us and determine how we do business. We base our relations on trust, respect and honesty.</p>
        <h3 class="brand-our">Our Family</h3>
        <p>The feeling of being part of a family unites our company across borders, brands and departments. We help our colleagues, are proud of them and take pride in the good examples we set for one another. We treat all people as individuals but we think and act as a team.</p>
        <figure class="img_margin"><img src="~/assets/images/brand/nine-3.png" alt=""></figure>
      </div>
    </template>
  </brand-component>
</template>
<script>
import BrandComponent from '~/pagesEn/mobile/brand/components/brandComponent.vue'
export default {
  name: 'NineUnitedPage',
  components: {
    BrandComponent
  },
  data () {
    return {
    }
  },
  methods: {
    brandTracking ({ label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-NineUnited', event: 'view_brand', mode: 'Brands', label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
