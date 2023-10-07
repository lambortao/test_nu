<template>
  <div>
    <div class="default-width site-is-default">
      <div class="marketing_container">
        <div v-if="bannerList.banner_img" class="header">
          <img :src="bannerList.banner_img[0].url" alt="">
        </div>
        <div class="material_list_content">
          <v-placeholder v-if="$fetchState.pending" mode="loading" />
          <v-placeholder v-else-if="$fetchState.error" mode="error" />
          <div v-else>
            <material-list pagedifferent="series" :material-list="bannerList" is-page="no" @tracking="marketingTracking" />
          </div>
        </div>
        <button v-if="showMoreBtn" class="get_more" @click="getMore">
          load more
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import materialList from '../components/materialList.vue'

export default {
  name: 'MarketingSeriesPage',
  components: {
    materialList
  },
  data: () => ({
    postData: {},
    page: 1
  }),
  fetch () {
    // console.log(materialId, 'id值')

  },
  computed: {
    ...mapState({
      selectedPage: state => state.marketingBanner.selectedPage
    }),
    bannerList () {
      return this.$store.getters['marketingBanner/getBannerList']
    },
    showMoreBtn () {
      return this.$store.getters['marketingBanner/showMoreBtn']
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  mounted () {
    // 避免加载顺序导致获取不到languageen版本
    this.$nextTick(async () => {
      this.postData = {
        resources_id: this.$route.query.id,
        page: this.page
      }
      this.$store.commit('marketingBanner/setSelectedPage', this.postData.page)
      await this.$store.dispatch(
        'marketingBanner/getBannerDetail',
        this.postData
      )
    })

    // console.log(this.bannerList, 'banner详情')
  },
  methods: {
    getMore () {
      this.$store.dispatch('marketingBanner/getMore', this.postData)
    },
    marketingTracking ({ event, label, items, filterLabel }) {
      this.$store.dispatch('site/tracker', { page: 'MarketingHub-series', event, mode: 'MarketingHub', label, items, filterLabel })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/marketing-series.scss";
</style>
