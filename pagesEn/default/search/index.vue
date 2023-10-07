<template>
  <div class="container">
    <div class="site-is-default search_box default-width">
      <div class="search_title">
        <h3>Results</h3>
        <div class="search_result_num">
          {{ productListData.total }} results in total
        </div>
      </div>
      <div class="search_content">
        <div class="search_content_tips">
          Results for: {{ keywords }}
        </div>
        <div class="search_content_box">
          <div class="search_product_list">
            <div class="search_product_list_title">
              <h3>Products ( {{ productListData.total }} )</h3>
              <!-- <div @click="getMore">
                + Show all results
              </div> -->
            </div>
            <div class="search_product_list_box">
              <template v-if="productListData.list.length>0">
                <div
                  v-for="(item,index) in productListData.list"
                  :key="index"
                  :class="['search_product_item',{ product_screenPhoto: !item.isScenePhoto }]"
                >
                  <figure @click="toProduct({item})">
                    <img
                      :src="item.thumbnail"
                      alt=""
                    >
                  </figure>
                  <p @click="toProduct({item})">
                    {{ item.title_en }}
                  </p>
                </div>
              </template>
              <div v-else class="empty">
                No matching results found
              </div>
            </div>
          </div>
          <pagination-page />
        </div>
      </div>
    </div>
    <mobileSearch class="site-is-mobile" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PaginationPage from './PaginationPage.vue'
import mobileSearch from '~/pagesEn/mobile/search/index.vue'
export default {
  name: 'SearchPage',
  components: {
    mobileSearch,
    PaginationPage
  },
  data: () => ({
    keywords: ''
  }),
  async fetch () {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    this.keywords = query.keywords
    this.$store.commit('productList/setkeyswords', query.keywords)
    this.$store.commit('productList/setPagination', query.page)
    await this.getProductList({ local: true, query })
  },
  head: {
    title: 'Nine United-Search'
  },
  computed: {
    ...mapState('productList', {
      productListData: state => state.productListData
    }),
    getRequestParam () {
      return this.$store.getters['productList/getRequestParam']
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  mounted () {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    this.keywords = query.keywords
  },
  methods: {
    ...mapActions({
      handlePagination: 'productList/handlePagination',
      getProductList: 'productList/getProductList',
      useRouteParam: 'productList/useRequestParam'
    }),
    toProduct ({ item }) {
      this.$router.push(`/en/product/detail?id=${item.alias}`)
      this.$store.dispatch('site/tracker', { page: 'Search', event: 'view_product', mode: 'Products', label: item.title_en, items: [{ CMSId: item.alias, source: 'Search' }] })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/search.scss';
</style>
