<template>
  <brand-component>
    <template slot="default">
      <img src="~/assets/images/AAmobile/brand/frand.jpg" alt="frandsen">
    </template>
    <template slot="content">
      <content-tab v-model="activeKey" :center="false" style="padding-top: 0">
        <tab-pane value="1" label="About">
          <NuxtLink
            :to="`/en/product?form=brand&method=8f10a55dcb0cd7cd`"
          >
            <div class="products" @click="brandTracking({event:'view_product_list',mode:'Products',label:'Products'})">
              <div class="pro-text">
                <h5>Products</h5>
              </div>
              <div class="pro-icon">
                <img src="~/assets/images/AAmobile/brand/arrow-right-line.jpg">
              </div>
            </div>
          </NuxtLink>
          <frandsen-about />
        </tab-pane>
        <tab-pane value="2" label="Designer">
          <h3>FRANDSEN & DESIGNERS</h3>
          <FrandDesigner @tracking="brandTracking" />
        </tab-pane>
        <tab-pane value="3" label="Sustainablity">
          <frandsen-sustainable />
        </tab-pane>
      </content-tab>
    </template>
  </brand-component>
</template>

<script>
import FrandDesigner from './designer.vue'
import FrandsenAbout from './about.vue'
import FrandsenSustainable from './sustainable.vue'
import BrandComponent from '~/pagesEn/mobile/brand/components/brandComponent.vue'
import ContentTab from '~/componentsEn/AAMobile/ContentTab/index.vue'
import TabPane from '~/componentsEn/AAMobile/ContentTab/tabPane.vue'
export default {
  name: 'HayPage',
  components: {
    ContentTab,
    TabPane,
    BrandComponent,
    FrandsenAbout,
    FrandsenSustainable,
    FrandDesigner
  },
  data () {
    return {
      activeKey: '1'
    }
  },
  methods: {
    brandTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-Frandsen', event, mode, label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
