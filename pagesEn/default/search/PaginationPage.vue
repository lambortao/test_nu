<template>
  <div class="pagination">
    <div :class="['pagination-prev arrow', { disabled: prevBtnDisabled }]" @click="stepPagination(-1)">
      Pre
    </div>
    <div class="pagination-content">
      <span
        v-for="(item, index) in getPagination"
        :key="`${item}-${index}`"
        :class="[{ active: parseInt(nowPage) === parseInt(item) }, { disabled: item === '...' }]"
        @click="handlePagination(item)"
      >{{ item }}</span>
    </div>
    <div :class="['pagination-next arrow', { disabled: nextBtnDisabled }]" @click="stepPagination(1)">
      Next
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PaginationPage',
  computed: {
    ...mapState({
      pageTotal: state => state.productList.productListData.pageTotal,
      nowPage: state => state.productList.requestData.page
    }),
    prevBtnDisabled () { return this.$store.getters['productList/prevBtnDisabled'] },
    nextBtnDisabled () { return this.$store.getters['productList/nextBtnDisabled'] },
    getPagination () { return this.$store.getters['productList/getPagination'] }
  },
  methods: {
    stepPagination (number) {
      this.$store.dispatch('productList/stepPagination', number)
      this.$store.dispatch('productList/useRequestParam', { router: this.$router, url: '/en/search' })
    },
    handlePagination (number) {
      if (number !== '...') {
        this.$store.dispatch('productList/handlePagination', number)
        this.$store.dispatch('productList/useRequestParam', { router: this.$router, url: '/en/search' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/product/PaginationPage.scss';
</style>
