<template>
  <div>
    <div class="stylist_container site-is-default">
      <div class="all-stylist">
        <div class="designer_introduce_box">
          <div v-if="stylist && count > 1" class="left" @click="getPrev()">
            <div class="left-arrow" />
            <div class="left-text" @click="brandsTracking({event:'view_designer',mode:'Brands',label:stylist.prev.name})">
              <div class="prev">
                上一位:
              </div>
              <div class="prev-text">
                {{ stylist.prev.name }}
              </div>
            </div>
          </div>
          <div v-if="stylist" class="design">
            <div :style="{ backgroundImage: `url(${stylist.thumbnail})` }" class="thumbs" />
            <div class="name">
              {{ stylist.name }}
            </div>
          </div>
          <div v-if="stylist && count > 1" class="right" @click="getNext()">
            <div class="right-text">
              <div class="next">
                下一位：
              </div>
              <div class="next-text">
                {{ stylist.next.name }}
              </div>
            </div>
            <div class="right-arrow" />
          </div>
        </div>
        <div v-if="stylist" class="content">
          <p align="center" v-html="stylist.content" />
        </div>
      </div>
      <div v-if="stylist" class="designer_product default-width">
        <div v-if="stylist && stylist.work" class="designer_product_title">
          <h3 v-if="stylist.work.length != 0">
            设计作品
          </h3>
        </div>
        <div class="designer_product_list">
          <div v-for="(item, index) in stylist.work" :key="index" class="designer_product_item">
            <NuxtLink
              :to="`/product?form=series&method=${item.seriesids}&page=1`"
            >
              <div @click="brandsTracking({event:'view_product_list',mode:'Products',label:item.title})">
                <div v-if="item" class="des-img" :style="{ backgroundImage: `url(${item.thumbnail})` }" />
                <div class="de-title">
                  {{ item.title }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <mobile-stylist class="site-is-mobile" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MobileStylist from '~/pages/mobile/brand/stylist.vue'
export default {
  name: 'StylistPage',
  components: {
    MobileStylist
  },
  data: () => ({
    count: 0,
    design: {}
  }),
  async fetch () {
    const { count, designerId, brand } = this.$route.query
    this.count = count
    this.alias = designerId
    this.brand = brand
    await this.useDesignerDetail()
  },
  computed: {
    ...mapState('designer', {
      stylist: state => state.designerDetail
    }),
    alias: {
      get () { return this.$store.state.designer.itemPostData.alias },
      set (value) { this.$store.commit('designer/setDesignerItemPostData', { key: 'alias', value }) }
    },
    otherAlias: {
      get () { return this.$store.state.designer.otherPostData.alias },
      set (value) { this.$store.commit('designer/setOtherPostData', { key: 'alias', value }) }
    },
    brand: {
      get () { return this.$store.state.designer.otherPostData.brand },
      set (value) { this.$store.commit('designer/setOtherPostData', { key: 'brand', value }) }
    }
  },
  watch: {
    '$route.query': '$fetch',
    stylist (data) {
      this.otherAlias = data.alias
    }
  },
  // mounted () {
  //   console.log(this.stylist)
  // },
  methods: {
    ...mapActions({
      useDesignerDetail: 'designer/useDesignerDetail',
      getPrev: 'designer/getPrevRow',
      getNext: 'designer/getNext'
    }),
    brandsTracking ({ event, mode, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-designer', event, mode, label, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/stylist.scss";
</style>
