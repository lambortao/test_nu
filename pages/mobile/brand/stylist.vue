<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div>
      <img v-if="stylist.thumbnail" :src="stylist.thumbnail">
      <div class="designer-name">
        <div class="name">
          <h3>{{ stylist.name }}</h3>
        </div>
      </div>
      <div class="designer">
        <div class="label">Designer</div>
      </div>
      <div class="content">
        <p v-html="stylist.content" />
      </div>
      <div v-if="stylist.work" class="designer-works">
        <h3 v-if="stylist.work.length != 0">设计作品</h3>
      </div>
      <div class="works">
        <div v-for="(item, index) in stylist.work" :key="index">
          <div>
            <NuxtLink
              :to="`/product?form=series&method=${item.seriesids}`"
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
        <div class="left" @click="getPrev()">
          <div class="left-icon">
            <img src="~/assets/images/AAmobile/brand/left.png">
          </div>
          <div class="prev">
            上一位
          </div>
        </div>
        <div v-if="stylist && count >1" class="right" @click="getNext()">
          <div class="next">
            下一位
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'StylistPage',
  data () {
    return {
      count: 0
    }
  },
  fetch () {
    const { count, designerId, brand } = this.$route.query
    this.count = count
    this.alias = designerId
    this.brand = brand
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
    '$route.query': '$fetch'
  },
  methods: {
    ...mapActions({
      useDesignerDetail: 'designer/useDesignerDetail',
      getPrev: 'designer/getPrevRow',
      getNext: 'designer/getNext'
    }),
    designerTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { page: 'Brand-designer', event, mode, label })
    }
  }
}
</script>
<style lang="scss" scoped> @import '~/assets/scss/mobile/stylist.scss';
  img {
    width: 100%;
    object-fit: contain;
  }
</style>
