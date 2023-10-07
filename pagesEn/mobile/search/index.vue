<template>
  <div class="container">
    <div class="search_title">
      <p>Results for: "{{ keywords }}"</p>
      <p>{{ productListData.total }} results in total</p>
    </div>
    <div class="search_list_box">
      <template v-if="productListData.list.length>0">
        <div v-for="item in productListData.list" :key="item.alias" class="search_item" @click="toProduct({item})">
          <figure>
            <img
              :src="item.thumbnail"
              alt=""
            >
          </figure>
          <p>{{ item.title_en }}</p>
        </div>
      </template>
      <div v-else class="empty">
        No matching results found
      </div>
    </div>
    <pagination-page />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PaginationPage from './PaginationPage.vue'
export default {
  name: 'SearchPage',
  components: {
    PaginationPage
  },
  data () {
    return {
      keywords: ''
    }
  },
  async fetch () {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    this.keywords = query.keywords
    this.$store.commit('productList/setkeyswords', query.keywords)
    this.$store.commit('productList/setPagination', query.page)
    await this.getProductList({ local: true, query })
    console.log(122333)
  },
  computed: {
    ...mapState('productList', {
      productListData: state => state.productListData
    })
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    ...mapActions({
      handlePagination: 'productList/handlePagination',
      getProductList: 'product/getProductList',
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
@import '~/assets/scss/mobile/search.scss'
</style>
