<template>
  <section>
    <div class="root-section">
      <div class="top-section">
        <header @click="selectShow">
          <h3>Products</h3>
          <div class="sort-box">
            <!-- <div class="sort-filter" @click="toggleSorter">
              <img v-if="orderby === 'ASC'" src="~/assets/images/AAmobile/product/orderby/up.png" alt="由低到高">
              <img v-else-if="orderby === 'DESC'" src="~/assets/images/AAmobile/product/orderby/down.png" alt="由高到低">
              <img v-else src="~/assets/images/AAmobile/product/orderby/default.png" alt="默认排序">
              <span>Sort by</span>
            </div> -->
            <div class="sort-filter" @click="rightShow">
              <img src="~/assets/images/AAmobile/product/sort-control.png" alt="分类筛选">
              <span>Category</span>
            </div>
          </div>
        </header>
        <div :class="['product-main', { 'has-filter': hasFilter }]">
          <!-- <filter-money v-model="sizeSortData" /> -->
          <div class="product-filter">
            <filter-brand v-model="brandSortData" @tracking="productTracking" />
            <filter-size v-model="sizeSortData" @tracking="productTracking" />
            <filter-scene v-model="sceneSortData" @tracking="productTracking" />
            <!-- 隐藏英文版颜色筛选 -->
            <filter-color v-if="true" v-model="colorSortData" @tracking="productTracking" />
          </div>
          <!-- 隐藏英文版材质筛选 -->
          <div v-if="true" class="product-filter1">
            <filter-texture v-model="textureData" @tracking="productTracking" />
          </div>
          <product-data :product-list="productListData" @tracking="productTracking" />
        </div>
      </div>
      <bottom-filter v-if="false" />
      <category-filtering v-model="frameShow" @tracking="productTracking" />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FilterScene from './components/filter/scene.vue'
import FilterBrand from './components/filter/brand.vue'
import FilterSize from './components/filter/size.vue'
// import FilterMoney from './components/filter/money.vue'
import FilterColor from './components/filter/FilterColor.vue'
import FilterTexture from './components/filter/FilterTexture'
import BottomFilter from './components/bottmFilter.vue'
import ProductData from './components/ProductData.vue'
import CategoryFiltering from './components/CategoryFiltering.vue'
export default {
  name: 'ProductPage',
  components: {
    CategoryFiltering,
    FilterScene,
    FilterBrand,
    FilterSize,
    // FilterMoney,
    BottomFilter,
    ProductData,
    FilterColor,
    FilterTexture
  },
  data () {
    return {
      nowFilter: []
    }
  },
  computed: {
    ...mapState({
      /** 品牌列表 */
      brandList: state => state.productBrand.brandList,
      /** 商品列表数据 */
      productListData: state => state.productList.productListData,
      /** 尺寸列表 */
      sizeList: state => state.productCategory.channeList,
      orderby: state => state.productList.requestData.orderby
    }),
    /** 双向绑定排序的数据 */
    moneyFilterData: {
      get () { return this.$store.state.productMoneySorter.value },
      set (value) {
        this.classifySection = null
        this.useSorter(value)
      }
    },
    /** 双向绑定场景的数据 */
    sceneSortData: {
      get () { return this.$store.state.productScene.value },
      set (value) {
        this.classifySection = null
        this.useScene(value)
      }
    },
    /** 双向绑定品牌的数据 */
    brandSortData: {
      get () { return this.$store.state.productBrand.value },
      set (val) { this.useValue({ val }) }
    },
    /** 双向绑定尺寸的数据 */
    sizeSortData: {
      get () { return this.$store.state.productSize.value },
      set (val) { this.useSize(val) }
    },
    /** 双向绑定颜色的数据 */
    colorSortData: {
      get () { return this.$store.state.productColor.value },
      set (val) { this.useColor(val) }
    },
    /** 双向绑定材质的数据 */
    textureData: {
      get () { return this.$store.state.productTexture.value },
      set (val) { this.useTexture(val) }
    },
    /** 双向绑定右列表 */
    frameShow: {
      get () { return this.$store.state.productList.frameShow },
      set (val) { this.$store.commit('productList/setFrameShow', val) }
    },
    hasFilter () {
      return !!this.nowFilter.length
    },
    productList () {
      return this.$store.getters['product/getProductList']
    }
  },
  methods: {
    ...mapActions({
      getProductList: 'productList/getProductList',
      useSelectedProduct: 'productCategory/useSelectedProduct',
      useSorter: 'productMoneySorter/useSorter',
      useScene: 'productScene/useScene',
      useValue: 'productBrand/useValue',
      useSize: 'productSize/useSize',
      useColor: 'productColor/useColor',
      useTexture: 'productTexture/useTexture',
      initFilterList: 'productList/initList',
      toggleSorter: 'productMoneySorter/toggleSorter'
    }),
    rightShow () {
      // 禁止页面穿透滑动
      document.querySelector('body').setAttribute('style', 'overflow:hidden;')
      this.frameShow = true
    },
    selectShow () {
      this.$store.commit('productBrand/setShowFilterKey', '')
    },
    productTracking ({ event, label, filterLabel, items }) {
      this.$store.dispatch('site/tracker', { page: 'Products', event, mode: 'Products', label, filterLabel, items })
    }
  }
}
</script>
<style lang="scss" scoped>

div.root-section {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 12.8vw);
}
.top-section {
  padding: mvw(24) mvw(24) mvw(54) mvw(24);
}
div.root-section > div.top-section header {
  border-bottom: 1px solid #EEEEEE;
  display: flex;
  justify-content: space-between;
  padding-bottom: mvw(24);

  h3 {
    font-size: mrem(42);
  }

  div.sort-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  div.sort-filter {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &:last-child {
      margin-left: mvw(25);
    }
    img {
      width: mvw(24);
      height: mvw(24);
      margin-right: mvw(5);
    }
  }
}
.product-filter {
  display: flex;
  justify-content: flex-start;
  margin: mvw(8) 0;
  background-color: #fff;

  :deep(.filter-content) {
    background-color: #fff;
  }

  p {
    width: mvw(82);
    height: mvw(48);
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
      content: '';
      display: block;
      width: mvw(6);
      height: mvw(6);
      margin-left: mvw(12);
      background: {
        image: url('~/assets/images/AAmobile/product/arrow.png');
        size: 100%;
        repeat: no-repeat;
      };
    }
  }
}

.product-filter1 {
  display: flex;
  justify-content: flex-start;
  margin: mvw(8) 0;
  background-color: #fff;
  border-top: 1px solid #EEEEEE;
  :deep(.filter-content) {
    background-color: #fff;
  }

  p {
    width: mvw(82);
    height: mvw(48);
    display: flex;
    justify-content: center;
    align-items: center;
    &:after {
      content: '';
      display: block;
      width: mvw(6);
      height: mvw(6);
      margin-left: mvw(12);
      background: {
        image: url('~/assets/images/AAmobile/product/arrow.png');
        size: 100%;
        repeat: no-repeat;
      };
    }
  }
}
.product-main.has-filter {
  padding-bottom: mvw(40);
}
.top-section {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
}
</style>
