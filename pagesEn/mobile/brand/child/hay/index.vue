<template>
  <client-only>
    <brand-component>
      <template slot="default">
        <!-- ~/assets/images/AAmobile/brand/hay-bg.jpg -->
        <img src="~/assets/images/AAmobile/brand/hay-bg1.jpg" alt="HAY">
      </template>
      <template slot="content">
        <content-tab v-model="activeKey" :center="false" style="padding-top: 0">
          <tab-pane value="1" label="About">
            <NuxtLink
              :to="`/en/product?form=brand&method=ee4ab83b35f08f7f`"
            >
              <div class="products" @click="brandTracking({ event:'view_product_list',mode:'Products',label:'Products' })">
                <div class="pro-text">
                  <h5>Products</h5>
                </div>
                <div class="pro-icon">
                  <img src="~/assets/images/AAmobile/brand/arrow-right-line.jpg">
                </div>
              </div>
            </NuxtLink>
            <hay-about />
          </tab-pane>
          <tab-pane value="2" label="Designer">
            <h3>HAY & DESIGNERS</h3>
            <HayDesigner @tracking="brandTracking" />
          </tab-pane>
          <tab-pane value="3" label="Sustainablity">
            <hay-sustainable />
          </tab-pane>
        </content-tab>
      </template>
    </brand-component>
  </client-only>
</template>

<script>
import HayDesigner from './designer.vue'
import HayAbout from './about.vue'
import HaySustainable from './sustainable.vue'
import BrandComponent from '~/pagesEn/mobile/brand/components/brandComponent.vue'
import ContentTab from '~/componentsEn/AAMobile/ContentTab/index.vue'
import TabPane from '~/componentsEn/AAMobile/ContentTab/tabPane.vue'
export default {
  name: 'HayPage',
  components: {
    ContentTab,
    TabPane,
    BrandComponent,
    HayAbout,
    HaySustainable,
    HayDesigner
  },
  data () {
    return {
      activeKey: '1'
    }
  },
  mounted () {
  },
  methods: {
    brandTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-HAY', event, mode, label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
