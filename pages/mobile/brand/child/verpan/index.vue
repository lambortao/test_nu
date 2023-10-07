<template>
  <brand-component>
    <template slot="default">
      <img src="~/assets/images/AAmobile/brand/Rect.jpg" alt="HAY">
    </template>
    <template slot="content">
      <content-tab v-model="activeKey" :center="false" style="padding-top: 0">
        <tab-pane value="1" label="关于">
          <NuxtLink
            :to="`/product?form=brand&method=6f54a55xtb0te7adt`"
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
          <verpan-about @tracking="brandTracking" />
        </tab-pane>
        <tab-pane value="2" label="设计师">
          <h3>VERPAN & 设计师</h3>
          <VerpanDesigner @tracking="brandTracking" />
        </tab-pane>
        <tab-pane value="3" label="可持续">
          <verpan-sustainable />
        </tab-pane>
      </content-tab>
    </template>
  </brand-component>
</template>

<script>
import VerpanDesigner from './designer.vue'
import VerpanAbout from './about.vue'
import VerpanSustainable from './sustainable.vue'
import BrandComponent from '~/pages/mobile/brand/components/brandComponent.vue'
import ContentTab from '~/components/AAMobile/ContentTab/index.vue'
import TabPane from '~/components/AAMobile/ContentTab/tabPane.vue'
export default {
  name: 'VerpanPage',
  components: {
    ContentTab,
    TabPane,
    BrandComponent,
    VerpanAbout,
    VerpanSustainable,
    VerpanDesigner
  },
  data () {
    return {
      activeKey: '1'
    }
  },
  methods: {
    brandTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-Verpan', event, mode, label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
