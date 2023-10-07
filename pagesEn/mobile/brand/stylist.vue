<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div>
      <img :src="stylist.thumbnail">
      <div class="designer-name">
        <div class="name">
          <h3>{{ stylist.name }}</h3>
        </div>
      </div>
      <div class="designer">
        <div class="label">Designer</div>
      </div>
      <div class="content">
        <p v-html="stylist.content_en" />
      </div>
      <div v-if="stylist.work" class="designer-works">
        <h3 v-if="stylist.work.length != 0">Designer's Work</h3>
      </div>
      <div class="works">
        <div v-for="(item, indexz) in stylist.work" :key="indexz">
          <div>
            <NuxtLink
              :to="`/en/product?form=series&method=${item.seriesids}`"
            >
              <div @click="designerTracking({event:'view_product_list',mode:'Products',label:item.title})">
                <div :style="{ backgroundImage: `url(${item.thumbnail})` }" class="thumbs" />
                <div class="title">
                  <div>{{ item.title }}</div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-if="stylist && count >1" class="all">
        <div class="left" @click="getPrev(stylist.alias)">
          <div class="left-icon">
            <img src="~/assets/images/AAmobile/brand/left.png">
          </div>
          <div class="prev">
            Prev
          </div>
        </div>
        <div v-if="stylist && count >1" class="right" @click="getNext(stylist.alias)">
          <div class="next">
            Next
          </div>
          <div class="right-icon">
            <img src="~/assets/images/AAmobile/brand/right.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StylistPage',
  data () {
    return {
      stylist: '',
      count: 0,
      postData: ''
    }
  },
  // fetch () {
  //   // this.postData = { alias: this.$route.query.designerId }
  //   // await this.$store.dispatch('design/useDesignList', this.postData)
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
    designerTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-designer', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~/assets/scss/mobile/stylist.scss';
  img {
    width: 100%;
    object-fit: contain;
  }
</style>
