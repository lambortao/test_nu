<template>
  <div class="container">
    <div class="search_title">
      <p>"{{ keywords }}"的搜索结果</p>
      <p>共 {{ productListData.total }} 个结果</p>
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
          <p>{{ item.title_en }} {{ item.title }}</p>
        </div>
      </template>
      <div v-else class="empty">
        暂无符合条件的搜索结果
      </div>
    </div>

    <PaginationPage />
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
      this.$router.push(`/product/detail?id=${item.alias}`)
      this.$store.dispatch('site/tracker', { page: 'Search', event: 'view_product', mode: 'Products', label: item.title_en, items: [{ CMSId: item.alias, source: 'Search' }] })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/search.scss'
</style>
