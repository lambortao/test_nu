<template>
  <div>
    <div class="site-is-default product-container" @click.self="selectSection(null)">
      <div class="product_title_box">
        <div class="product_title_left">
          <h3>产品中心</h3>
        </div>
        <div class="product_title_right">
          <!-- 价格排序 -->
          <money-filter
            v-model="moneyFilterData"
            :classify-section="classifySection"
            @select-section="i => selectSection(i)"
            @tracking="productTracking"
          />
          <!-- 品牌筛选 -->
          <brand-select
            v-model="brandSortData"
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
          <!-- 分类筛选 -->
          <category-select
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
          <!-- 尺寸筛选 -->
          <size-select
            v-model="sizeSortData"
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
          <!-- 颜色筛选 -->
          <!-- 隐藏中文版颜色筛选 -->
          <color-select
            v-if="true"
            v-model="colorData"
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
          <!-- 材质筛选 -->
          <!-- 隐藏中文版材质筛选 -->
          <texture-select
            v-if="true"
            v-model="textureData"
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
          <!-- 价格筛选 -->
          <range-price-select
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
          <!-- 场景筛选 -->
          <sence-select
            v-model="sceneSortData"
            :classify-section="classifySection"
            @selectSection="e => selectSection(e)"
            @tracking="productTracking"
          />
        </div>
      </div>
      <filter-select />
      <div class="product-list-content">
        <v-placeholder v-if="$fetchState.pending" mode="loading" />
        <v-placeholder v-else-if="$fetchState.error" mode="error" />
        <template v-else>
          <product-list v-if="productListData.list.length" :product-list="productListData" @tracking="productTracking" />
          <p v-else>
            暂无符合条件的筛选结果
          </p>
        </template>
      </div>
    </div>
    <mobile-product class="site-is-mobile" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
/** 品牌筛选组件 */
import BrandSelect from './components/BrandSelect.vue'
/** 排序组件 */
import MoneyFilter from './components/MoneyFilter.vue'
/** 场景筛选组件 */
import SenceSelect from './components/SenceSelect.vue'
/** 尺寸筛选组件 */
import SizeSelect from './components/sizeSelect.vue'
/** 颜色筛选组件 */
import ColorSelect from './components/ColorSelect.vue'
/** 材质筛选组件 */
import TextureSelect from './components/TextureSelect.vue'
/** 分类筛选组件 */
import CategorySelect from './components/CategorySelect.vue'
/** 价格筛选 */
import RangePriceSelect from './components/RangePrice.vue'
/** 高级过滤器 */
import FilterSelect from './components/FilterSelect.vue'

/** 产品列表 */
import ProductList from './components/productList.vue'
/** 手机端 */
import MobileProduct from '@/pages/mobile/product/index.vue'

export default {
  name: 'ProductPage',
  components: {
    MobileProduct,
    BrandSelect,
    SenceSelect,
    SizeSelect,
    CategorySelect,
    RangePriceSelect,
    FilterSelect,
    MoneyFilter,
    ProductList,
    ColorSelect,
    TextureSelect
  },
  data: () => ({
    /** 显示哪个下拉菜单 */
    classifySection: null,
    theStart: false
  }),
  async fetch () {
    /** 获取所有的分类数据 */
    await this.initFilterList()
    const query = JSON.parse(JSON.stringify(this.$route.query))
    /** 初始获取产品列表数据 */
    await this.getProductList({ local: true, query })
    if (!this.$route.query.form) {
      this.$store.commit('productBrand/resetValue')
      this.$store.commit('productScene/resetValue')
      this.$store.commit('productCategory/resetValue')
    } else {
      // 获取尺寸
      this.getSpeclist()
      // 筛选可以选择的颜色和材质
      this.setColorOrTexture()
    }
  },
  head: {
    title: 'Nine United官网-产品中心'
  },
  computed: {
    ...mapState({
      /** 商品列表数据 */
      productListData: state => state.productList.productListData,
      brandList: state => state.productBrand.brandList,
      brandSelectData: state => state.productBrand.value,
      // 选中的商品
      selectedProdcutList: state => state.productCategory.selectedProdcutList
    }),
    /** 双向绑定排序的数据 */
    moneyFilterData: {
      get () { return this.$store.state.productMoneySorter.value },
      set (value) {
        this.classifySection = null
        this.handlePagination(1)
      }
    },
    /** 双向绑定场景的数据 */
    sceneSortData: {
      get () { return this.$store.state.productScene.value },
      set (value) {
        this.classifySection = null
        this.handlePagination(1)
        this.useScene(value)
      }
    },
    /** 双向绑定品牌的数据 */
    brandSortData: {
      get () { return this.$store.state.productBrand.value },
      set (val) {
        this.useValue({ val })
        this.handlePagination(1)
      }
    },
    /** 双向绑定尺寸的数据 */
    sizeSortData: {
      get () { return this.$store.state.productSize.value },
      set (val) {
        this.useSize(val)
        this.handlePagination(1)
      }
    },
    /** 双向绑定颜色的数据 */
    colorData: {
      get () { return this.$store.state.productColor.value },
      set (val) {
        this.useColor(val)
        this.handlePagination(1)
      }
    },
    /** 双向绑定材质的数据 */
    textureData: {
      get () { return this.$store.state.productTexture.value },
      set (val) {
        this.useTexture(val)
        this.handlePagination(1)
      }
    },
    getRequestParam () {
      return this.$store.getters['productList/getRequestParam']
    }
  },
  watch: {
    /** 监听路由变化的操作 */
    '$route.query': '$fetch',
    /** 监听排序 */
    moneyFilterData () {
      this.handlePagination(1)
      this.useRouteParam({ router: this.$router, url: '/product' })
    },
    /** 监听场景 */
    sceneSortData () {
      this.handlePagination(1)
      this.useRouteParam({ router: this.$router, url: '/product' })
    },
    // 监听选中商品
    selectedProdcutList (newValue) {
      if (newValue.length === 0) {
        // 无选中商品时 清空颜色材质
        this.$store.commit('productColor/USECOLOR', [])
        this.$store.commit('productTexture/USETEXTURE', [])
      }
    }
  },
  methods: {
    ...mapActions({
      handlePagination: 'productList/handlePagination',
      getProductList: 'productList/getProductList',
      useSelectedProduct: 'productCategory/useSelectedProduct',
      useSorter: 'productMoneySorter/useSorter',
      useScene: 'productScene/useScene',
      useValue: 'productBrand/useValue',
      useSize: 'productSize/useSize',
      useColor: 'productColor/useColor',
      useTexture: 'productTexture/useTexture',
      initFilterList: 'productList/initList',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam',
      /** 获取尺寸 */
      getSpeclist: 'productCategory/getSpeclist',
      // 获取颜色、材质
      setColorOrTexture: 'productList/setColorOrTexture'
    }),
    /** 设置下拉菜单的显示状态 */
    selectSection (data) {
      // console.log(data) // sort brand category size price scene
      this.classifySection = data === this.classifySection ? null : data
    },
    productTracking ({ event, label, filterLabel, items }) {
      this.$store.dispatch('site/tracker', { page: 'Products', event, mode: 'Products', label, filterLabel, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
</style>
