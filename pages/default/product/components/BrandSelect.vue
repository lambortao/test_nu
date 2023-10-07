<template>
  <div :class="['filter_item',classifySection==='brand' ?'active':'',brandValue.length>0?'option_active':'']">
    <div
      class="filter_item_box"
      @click="selectSection('brand')"
    >
      <p>
        品牌
      </p>
    </div>
    <div class="filter_item_active_box">
      <div class="brand_content">
        <div
          :class="['brand_item', { brand_active: brandAllCheck }]"
          @click="selectAllEvent()"
        >
          <div class="checkbox">
            <img
              src="~/assets/images/icon/checkbox_active.png"
              alt=""
            >
          </div>
          <div class="name_box">
            全部
          </div>
        </div>
        <div
          v-for="item in brandList"
          :key="item.alias"
          :class="['brand_item', { brand_active: value.includes(item.alias) }]"
          @click="brandSelect({item,isSelect:value.includes(item.alias)})"
        >
          <div class="checkbox">
            <img
              src="~/assets/images/icon/checkbox_active.png"
              alt=""
            >
          </div>
          <div class="name_box">
            {{ item.name }}
          </div>
        </div>
        <div class="setting_box">
          <div :class="['reset',brandValue.length>0?'brand_value_active':'']" @click="reset">
            <figure>
              <img
                src="~/assets/images/icon/reset.png"
                alt=""
              >
            </figure>
            <div>重置</div>
          </div>
          <div class="confirm">
            <button @click="handleConfirm">
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'BrandSelectComponent',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    classifySection: {
      type: [String, Object],
      default: ''
    }
  },
  computed: {
    ...mapState('productBrand', {
      brandList: state => state.brandList,
      // 品牌数据
      brandValue: state => state.value
    }),
    /** 品牌的全选状态 */
    brandAllCheck () { return this.$store.getters['productBrand/getAllStatus'] }
  },
  methods: {
    ...mapActions({
      /** 全选按钮 */
      selectAll: 'productBrand/useValue',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam'
    }),
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    /** 双相数据绑定 */
    brandSelect ({ item, isSelect }) {
      this.$emit('update:value', item)
      if (!isSelect) {
        this.$emit('tracking', { event: 'filter_product', label: item.name, filterLabel: 'Brands' })
      }
      // 筛选可以选择的颜色和材质
      // this.$store.dispatch('productList/setColorOrTexture')
    },
    handleConfirm () {
      this.selectSection(null)
      this.useRouteParam({ router: this.$router, url: '/product' })
    },
    reset () {
      this.$store.commit('productBrand/coverValue', [])
    },
    selectAllEvent () {
      this.selectAll({ all: true })
      if (this.brandAllCheck) {
        this.$emit('tracking', { event: 'filter_product', label: '全部', filterLabel: 'Brands' })
      }
      // 请求筛选接口
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/product.scss";
@import '~/assets/scss/default/product/brand-select.scss';
</style>
