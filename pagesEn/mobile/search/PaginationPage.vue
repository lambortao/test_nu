<template>
  <div class="pagination">
    <div :class="['pagination-prev arrow', { disabled: prevBtnDisabled }]" @click="stepPagination(-1)" />
    <div class="pagination-content">
      <span
        v-for="(item, index) in getPagination"
        :key="`${item}-${index}`"
        :class="[{ active: parseInt(nowPage) === parseInt(item) }, { disabled: item === '...' }]"
        @click="handlePagination(item)"
      >{{ item }}</span>
    </div>
    <div :class="['pagination-next arrow', { disabled: nextBtnDisabled }]" @click="stepPagination(1)" />
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
.pagination {
  width: 100%;
  height: mvw(16);
  display: flex;
  justify-content: space-between;

  .pagination-content {
    display: flex;
    justify-content: center;

    span {
      display: block;
      width: mvw(20);
      height: mvw(20);
      color: #333;
      margin: 0 mvw(5);
      text-align: center;
      line-height: mvw(20);
      cursor: pointer;
    }
    span.active {
      background-color: #333;
      color: #fff;
      pointer-events: none;
    }
    span.disabled {
      pointer-events: none;
    }
  }

  .arrow {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;

    &.pagination-prev::before,
    &.pagination-next::after {
      content: '';
      display: block;
      width: mvw(12);
      height: mvw(9);
      background: {
        image: url('~/assets/images/icon/prev.png');
        size: 100%;
      };
    }

    &.pagination-next::after {
      transform: rotate(180deg);
      margin-left: mvw(12);
    }
    &.pagination-prev::before {
      margin-right: mvw(12);
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
