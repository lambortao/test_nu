<template>
  <div class="pagination">
    <div :class="['pagination-prev arrow', { disabled: prevBtnDisabled }]" @click="stepPagination(-1)">
      上一页
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
      下一页
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PaginationPage',
  props: {
    pagedifferent: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState({
      pageTotal: state => state.marketingList.productListData.pageTotal,
      nowPage: state => state.marketingList.requestData.page
    }),
    prevBtnDisabled () { return this.$store.getters['marketingList/prevBtnDisabled'] },
    nextBtnDisabled () { return this.$store.getters['marketingList/nextBtnDisabled'] },
    getPagination () { return this.$store.getters['marketingList/getPagination'] }
  },

  methods: {
    /** 上一页或者下一页 */
    stepPagination (number) {
      this.$store.dispatch('marketingList/stepPagination', number)
      this.$store.dispatch('marketingList/useRequestParam', { router: this.$router, pagename: this.pagedifferent })
    },
    /** 设置当前页 */
    handlePagination (number) {
      if (number !== '...') {
        this.$store.dispatch('marketingList/handlePagination', number)
        this.$store.dispatch('marketingList/useRequestParam', { router: this.$router, pagename: this.pagedifferent })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  height: vw(32);
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  &::before {
      content: '';
      position: absolute;
      top: vw(-20);
      left: 0;
      width:100%;
      height: vw(1);
      background: #DDDDDD;
      border-radius: 1px;
    }
  .pagination-content {
    display: flex;
    justify-content: center;

    span {
      display: block;
      width: vw(28);
      height: vw(28);
      color: #333;
      font-size: vw(16);
      margin: 0 vw(10);
      text-align: center;
      line-height: vw(28);
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
    font-size: vw(16);

    &.pagination-prev::before,
    &.pagination-next::after {
      content: '';
      display: block;
      width: vw(22);
      height: vw(16);

      background: {
        image: url('~/assets/images/icon/prev.png');
        size: 100%;
      }
    }

    &.pagination-next::after {
      transform: rotate(180deg);
      margin-left: vw(12);
    }

    &.pagination-prev::before {
      margin-right: vw(12);
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}

@include media(">maxW") {
  .pagination {
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;

    &::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 0;
      width:100%;
      height: 1px;
      background: #DDDDDD;
      border-radius: 1px;
    }

    .pagination-content {
      span {
        width: 30px;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
      }
    }

    .arrow {
      font-size: 16px;

      &.pagination-prev::before,
      &.pagination-next::after {
        content: '';
        display: block;
        width: 24px;
        height: 18px;

        background: {
          image: url('~/assets/images/icon/prev.png') no-repeat;
          size: 100%;
        }
      }

      &.pagination-next::after {
        transform: rotate(180deg);
        margin-left: 12px;
      }

      &.pagination-prev::before {
        margin-right: 12px;
      }

      &.disabled {
        opacity: 0.5;
        pointer-events: none;
      }
    }
  }
}
</style>
