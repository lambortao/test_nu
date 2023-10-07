<template>
  <brand-component>
    <template slot="default">
      <img src="~/assets/images/AAmobile/brand/trad-bg.jpg" alt="HAY">
    </template>
    <template slot="content">
      <content-tab v-model="activeKey" :center="false" style="padding-top: 0">
        <tab-pane value="1" label="关于">
          <NuxtLink
            to="/product?form=brand&method=ac0140b2459f13b3&page=1"
          >
            <div class="product" @click="brandTracking({event:'view_product_list',mode:'Products',label:'相关产品'})">
              <div class="pro-text">
                相关产品
              </div>
              <div class="pro-icon">
                <img src="~/assets/images/AAmobile/brand/arrow-right-line.jpg">
              </div>
            </div>
          </NuxtLink>
          <tradition-about @tracking="brandTracking" />
        </tab-pane>
        <tab-pane value="2" label="设计师">
          <h3>TRADITION & 设计师</h3>
          <TraditionDesigner @tracking="brandTracking" />
        </tab-pane>
        <tab-pane value="3" label="可持续">
          <tradition-sustainable />
        </tab-pane>
      </content-tab>
    </template>
  </brand-component>
</template>

<script>
import TraditionDesigner from './designer.vue'
import TraditionAbout from './about.vue'
import TraditionSustainable from './sustainable.vue'
import BrandComponent from '~/pages/mobile/brand/components/brandComponent.vue'
import ContentTab from '~/components/AAMobile/ContentTab/index.vue'
import TabPane from '~/components/AAMobile/ContentTab/tabPane.vue'
export default {
  name: 'TraditionPage',
  components: {
    ContentTab,
    TabPane,
    BrandComponent,
    TraditionAbout,
    TraditionSustainable,
    TraditionDesigner
  },
  data () {
    return {
      activeKey: '1'
    }
  },
  methods: {
    brandTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-&Tradition', event, mode, label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
