<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <brand-component>
    <template slot="default">
      <img src="~/assets/images/AAmobile/brand/nine-bg.jpg" alt="HAY">
    </template>
    <template slot="content">
      <div class="studio">
        <h3 class="brand-our">全球视野，凝聚共识</h3>
        <p>我们志存高远、奋楫笃行，探求自我突破。作为跨国企业，我们的业务涵盖一系列不同领域，包括设计家居、健康医疗、零售品牌、投资项目等。</p>
        <h3 class="brand-our">以人为本，用心经营</h3>
        <p>注重人文关怀是我们擘画未来的基石。自1975年创立以来，Nine United 集团始终遵循十项基本原则，以此为企业文化核心。我们秉持信任、共享和诚实的合作信念，将所有成员视为独立个体，同时凝聚团队之力思考与践行。</p>
        <h3 class="brand-our">Nine United 家族一员</h3>
        <p>Nine United TAK致力于在亚太地区提升品牌影响力的同时重新定义家居体验，旗下拥有四大家居设计品牌：HAY , &Tradition , Verpan 和 Frandsen ，业务涵盖中国、日本、韩国、澳大利亚以及东南亚等地区超过40多个城市。</p>
        <figure class="img_margin"><img src="~/assets/images/AAmobile/brand/nine-icon.png" alt=""></figure>
        <!-- <div class="progress">
          <div class="progress-detail">
            <div class="progress_item">
              <h5>2001年</h5>
              <p>Anders Holch Polvsen 成为 BESTSELLER 的首席执行官，Troels Holch Povlsen 创办 NINE UNITED 。</p>
            </div>
            <div class="progress_item">
              <h5>2002年</h5>
              <p>Troels Povlsen 与 Rolf Hay、Mette Hay 共同创立丹麦家居设计品牌 HAY。</p>
            </div>
            <div class="progress_item">
              <h5>2004年</h5>
              <p>NINE UNITED 的亚洲业务开始在北京展开。</p>
            </div>
            <div class="progress_item">
              <h5>2005年</h5>
              <p>NINE UNITED 亚太分公司正式成立，在香港、上海、印度、土耳其新设办事处。</p>
            </div>
            <div class="progress_item">
              <h5>20012年</h5>
              <p>NINE UNITED TAK 在上海创立。孟加拉国办事处成立。</p>
            </div>
            <div class="progress_item">
              <h5>2014年</h5>
              <p>Studio 9 创立于丹麦。</p>
            </div>
            <div class="progress_item">
              <h5>2018年</h5>
              <p>&Tradition 加入 NINE UNITED TAK。Herman Miller 收购 HAY 的股份。</p>
            </div>
            <div class="progress_item">
              <h5>2020年</h5>
              <p>Verpan、Frandsen 加入 NINE UNITED 亚太大家庭。</p>
            </div>
            <div class="progress_item">
              <h5>2020年</h5>
              <p>NINE DESIGN 开始为外部合作伙伴提供采购服务。</p>
            </div>
          </div>
        </div> -->
        <h3 class="brand-our">我们的品牌</h3>
        <p>我们的品牌涵盖了设计类生活方式的范畴</p>
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
        <h3 class="brand-our">同一个世界</h3>
        <p>一直以来，我们的企业公平公正，充满机遇且富有责任感，我们坚信文化交融能够提升工作质效。纵然相逢于远方，却亲密无间。</p>
        <h3 class="brand-our">同一个理念</h3>
        <p>我们始终遵循Nine United集团的 10 项基本原则，在业务开展与沟通交流中秉持着信任、共享和诚实的合作信念。</p>
        <h3 class="brand-our">同一个大家庭</h3>
        <p>每个人都是大家庭的一员，这种归属感使公司跨越国界、品牌和部门，从而团结一心。我们将所有成员视为独立个体，同时凝聚团队之力思考与践行。</p>
        <figure class="img_margin"><img src="~/assets/images/brand/nine-3.png" alt=""></figure>
      </div>
    </template>
  </brand-component>
</template>
<script>
import BrandComponent from '~/pages/mobile/brand/components/brandComponent.vue'
export default {
  name: 'NineUnitedPage',
  components: {
    BrandComponent
  },
  data () {
    return {
    }
  },
  mounted () {
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
