<template>
  <div :class="['filter_item',classifySection==='price' ?'active':'',priceRangeValue.max||priceRangeValue.min?'option_active':'']">
    <div
      class="filter_item_box"
      @click="selectSection('price')"
    >
      <p>价格</p>
    </div>
    <div class="filter_item_active_box">
      <div class="price_box">
        <div class="price_title">
          设置价格区间
        </div>
        <div class="price_input_box">
          <div>
            <input
              v-model="priceMin"
              placeholder="最低价格"
              type="number"
            >
          </div>
          <span>~</span>
          <div>
            <input
              v-model="priceMax"
              placeholder="最高价格"
              type="number"
            >
          </div>
        </div>
        <template v-for="(item, key) in priceRangeData">
          <div
            v-if="key === selectedPrizeRangeAlias"
            :key="key"
            class="price_radio_box"
          >
            <label
              v-for="price in item"
              :key="price[0]"
              @click="selectedRangePriceEvent({type:'check',price,label:`${price[0]}-${price[1]}`,isSelect:`${priceMin}-${priceMax}` === `${price[0]}-${price[1]}`})"
            >
              <input
                name="price"
                type="checkbox"
                :value="`${price[0]}-${price[1]}`"
                :checked="`${priceMin}-${priceMax}` === `${price[0]}-${price[1]}`"
              >
              <span>{{ price[0] }} </span><span v-if="price[1]"> ~ {{ price[1] }}</span>元
            </label>
          </div>
        </template>

        <div class="setting_box">
          <div :class="['reset',priceRangeValue.max||priceRangeValue.min?'range_value_active':'']" @click="reset">
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
      priceRangeData,
      num: 0
    }
  },
  computed: {
    ...mapState('productCategory', {
      selectedPrizeRange: state => state.selectedPrizeRange,
      selectedProdcutList: state => state.selectedProdcutList,
      allLevelOneMenuList: state => state.allLevelOneMenuList,
      selectedPrizeRangeAlias: state => state.selectedPrizeRangeAlias,
      // 价格数据
      priceRangeValue: state => state.priceRange
    }),
    priceMin: {
      get () { return this.$store.state.productCategory.priceRange.min },
      set (value) {
        const data = [value, this.$store.state.productCategory.priceRange.max]
        this.selectedRangePriceEvent({ type: 'input', price: data, label: `${data[0]}-${data[1]}`, isSelect: false })
      }
    },
    priceMax: {
      get () { return this.$store.state.productCategory.priceRange.max },
      set (value) {
        const data = [this.$store.state.productCategory.priceRange.min, value]
        this.selectedRangePriceEvent({ type: 'input', price: data, label: `${data[0]}-${data[1]}`, isSelect: false })
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
    selectedRangePriceEvent ({ type, price, label, isSelect }) {
      this.selectedRangePrice(price)
      if (!isSelect) { this.priceTracking({ label: type === 'check' ? label : '其他' }) }
    },
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    handleConfirm () {
      this.selectSection(null)
      this.useRouteParam({ router: this.$router, url: '/product' })
    },
    reset () {
      this.$store.commit('productCategory/setAllPriceRange', { min: '', max: '' })
    },
    priceTracking ({ label }) {
      this.$emit('tracking', { event: 'filter_product', label, filterLabel: 'Money' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/default/product.scss";
@import '~/assets/scss/default/product/price-select.scss';
</style>
