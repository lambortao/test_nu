<template>
  <div>
    <div class="stylist_container site-is-default">
      <div class="all-stylist">
        <div class="designer_introduce_box">
          <div v-if="stylist && count > 1" class="left" @click="getPrev(stylist.alias)">
            <div class="left-arrow" />
            <div class="left-text">
              <div class="prev">
                Prev:
              </div>
              <div class="prev-text">
                {{ stylist.prev.name }}
              </div>
            </div>
          </div>
          <div class="design">
            <div :style="{ backgroundImage: `url(${stylist.thumbnail})` }" class="thumbs" />
            <div class="name">
              {{ stylist.name }}
            </div>
          </div>
          <div v-if="stylist && count > 1" class="right" @click="getNext(stylist.alias)">
            <div class="right-text">
              <div class="next">
                Next：
              </div>
              <div class="next-text">
                {{ stylist.next.name }}
              </div>
            </div>
            <div class="right-arrow" />
          </div>
        </div>
        <div class="content">
          <p align="center" v-html="stylist.content_en" />
        </div>
      </div>
      <div class="designer_product default-width">
        <div v-if="stylist.work" class="designer_product_title">
          <h3 v-if="stylist.work.length != 0">
            Designer's Work
          </h3>
        </div>
        <div class="designer_product_list">
          <div v-for="(item, indexz) in stylist.work" :key="indexz" class="designer_product_item">
            <NuxtLink
              :to="`/en/product?form=series&method=${item.seriesids}&page=1`"
            >
              <div @click="brandsTracking({event:'view_product_list',mode:'Products',label:item.title})">
                <div class="des-img" :style="{ backgroundImage: `url(${item.thumbnail})` }" />
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
import MobileStylist from '~/pagesEn/mobile/brand/stylist.vue'
export default {
  name: 'StylistPage',
  components: {
    MobileStylist
  },
  data: () => ({
    stylist: '',
    count: 0,
    design: {},
    postData: ''
  }),
  // async fetch () {
  //   this.postData = { alias: this.$route.query.designerId }
  //   await this.$store.dispatch('design/useDesignList', this.postData)
  //   this.stylist = this.designs
  // },
  computed: {
    designs () {
      return this.$store.getters['design/getDesignList']
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  created () {
    this.getList()
    this.count = this.$route.query.count
  },
  mounted () {
  },
  methods: {
    async getList () {
      const list = await this.$axios.$post('/getDesignerItem', { alias: this.$route.query.designerId })
      this.stylist = list
    },
    async getPrev (id) {
      const list = await this.$axios.$post('/getPrevRow', { alias: id, brand: this.$route.query.brand })
      this.stylist = list
    },
    async getNext (id) {
      const list = await this.$axios.$post('/getNextRow', { alias: id, brand: this.$route.query.brand })
      this.stylist = list
    },
    brandsTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-designer', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/stylist.scss";
</style>
