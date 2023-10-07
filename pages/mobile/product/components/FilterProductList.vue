<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <section class="product-main">
    <div v-for="product in productList" :key="product.alias" class="product-block">
      <header>
        <h4>{{ product.name }}</h4>
        <div
          :class="['select-all', { active: hasAll(product.allChildAlias) }]"
          @click="setSelectedProductListEvent({ mode: 'all', value: product.allChildAlias,label:product.name,isSelect:hasAll(product.allChildAlias) })"
        >
          <span />
          <p>全选</p>
        </div>
      </header>
      <div class="product-list">
        <div
          v-for="item in product.child"
          :key="item.alias"
          class="product-singin"
          @click="setSelectedProductListEvent({ value: item.alias,label:item.name,isSelect:selectedProdcutList.includes(item.alias) })"
        >
          <figure><img :src="item.thumbnail" alt=""></figure>
          <p class="content">{{ item.name }}</p>
          <span :class="['selected', { active: selectedProdcutList.includes(item.alias) }]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    productList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState('productCategory', {
      channeList: state => state.channeList,
      selectedProductFirstIndex: state => state.selectedProductFirstIndex,
      selectedProdcutList: state => state.selectedProdcutList
    }),
    hasAll () {
      return (arr) => {
        return arr.every(val => this.selectedProdcutList.includes(val))
      }
    }
  },
  methods: {
    ...mapActions({
      /** 产品的选中事件 */
      setSelectedProductList: 'productCategory/useSelectedProduct',
      /** 获取尺寸 */
      getSpeclist: 'productCategory/getSpeclist'
    }),
    setSelectedProductListEvent ({ mode, value, label, isSelect }) {
      this.setSelectedProductList({ mode, value })
      if (!isSelect) {
        this.productTracking({ label })
      }
    },
    productTracking ({ label }) {
      this.$emit('tracking', { event: 'filter_product', label, filterLabel: 'Category' })
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    font-size: mrem(28);
    font-weight: 500;
  }
  .select-all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      &:first-child {
        content: '';
        margin-right: mvw(5);
        width: mvw(16);
        height: mvw(16);
        background: {
          image: url('~/assets/images/AAmobile/product/unselect.png');
          size: 100%;
        }
      }
    }

    &.active {
      span:first-child {
        background-image: url('~/assets/images/AAmobile/product/select.png');
      }
    }
  }
}
.product-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .product-singin {
    width: mvw(64);
    margin-bottom: mvw(20);
    text-align: center;
    position: relative;

    figure {
      width: mvw(64);
      height: mvw(64);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &:nth-child(3n + 2) {
      margin: 0 mvw(20) mvw(20);
    }
    img {
      width: 100%;
    }

    span.selected {
      position: absolute;
      top: mvw(48);
      left: mvw(48);
      width: mvw(16);
      height: mvw(16);
      background: {
        image: url('~/assets/images/AAmobile/product/unselect.png');
        size: 100%;
      }

      &.active {
        background-image: url('~/assets/images/AAmobile/product/select.png');
      }
    }
  }
}
.product-main {
  // height: calc(100vh - mvw(230));
  height: calc(100% - mvw(48));
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: mvw(30);
}
</style>
