<template>
  <div :class="['filter_item',classifySection==='price' ?'active':'']">
    <div
      class="filter_item_box"
      @click="selectSection('price')"
    >
      <p>Price</p>
    </div>
    <div class="filter_item_active_box">
      <div class="price_box">
        <div class="price_title">
          Set Price Range
        </div>
        <div class="price_input_box">
          <div>
            <input
              v-model="priceMin"
              placeholder="Min"
              type="number"
            >
          </div>
          <span>~</span>
          <div>
            <input
              v-model="priceMax"
              placeholder="Max"
              type="number"
            >
          </div>
        </div>
        <template v-for="(item, key) in priceRangeData">
          <div v-if="key === selectedPrizeRangeAlias" :key="key" class="price_radio_box">
            <label v-for="price in item" :key="price[0]" @click="selectedRangePrice(price)">
              <input
                name="price"
                type="checkbox"
                :value="`${price[0]}-${price[1]}`"
                :checked="`${priceMin}-${priceMax}` === `${price[0]}-${price[1]}`"
              >
              <span>{{ price[0] }} </span><span v-if="price[1]"> ~ {{ price[1] }}</span>￥
            </label>
          </div>
        </template>

        <div class="setting_box">
          <div class="confirm">
            <button @click="handleConfirm">
              Confirm
            </button>
          </div>
          <div class="reset">
            <figure @click="reset">
              <img
                src="~/assets/images/icon/reset.png"
                alt=""
              >
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import priceRangeData from '~/config/priceRangeData'

export default {
  props: {
    classifySection: {
      type: [String, Object],
      default: ''
    }
  },
  data () {
    return {
      priceRangeData
    }
  },
  computed: {
    ...mapState('productCategory', {
      selectedPrizeRange: state => state.selectedPrizeRange,
      selectedProdcutList: state => state.selectedProdcutList,
      allLevelOneMenuList: state => state.allLevelOneMenuList,
      selectedPrizeRangeAlias: state => state.selectedPrizeRangeAlias
    }),
    priceMin: {
      get () { return this.$store.state.productCategory.priceRange.min },
      set (value) {
        const data = [value, this.$store.state.productCategory.priceRange.max]
        this.selectedRangePrice(data)
      }
    },
    priceMax: {
      get () { return this.$store.state.productCategory.priceRange.max },
      set (value) {
        const data = [this.$store.state.productCategory.priceRange.min, value]
        this.selectedRangePrice(data)
      }
    }
  },
  watch: {
    selectedProdcutList (val) {
      const selectedOneMenu = []
      for (const key in this.allLevelOneMenuList) {
        if (Object.hasOwnProperty.call(this.allLevelOneMenuList, key)) {
          const element = this.allLevelOneMenuList[key]
          if (element.filter(v => val.includes(v)).length) {
            selectedOneMenu.push(key)
          }
        }
      }
      this.$store.commit('productCategory/setSelectedPrizeRangeAlias', selectedOneMenu)
    }
  },
  methods: {
    ...mapActions({
      /** 全选按钮 */
      selectedRangePrice: 'productCategory/useSelectedRangePrice',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam'
    }),
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    handleConfirm () {
      this.selectSection(null)
      this.useRouteParam({ router: this.$router, url: '/en/product' })
    },
    reset () {
      this.$store.commit('productCategory/setAllPriceRange', { min: '', max: '' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
@import '~/assets/scss/default/product/price-select.scss';
</style>
