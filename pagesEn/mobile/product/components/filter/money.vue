<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="filter">
    <p class="title" @click="toggleFilterKeys">Price</p>
    <section v-if="showFilterKey === 'money'" class="filter-content">
      <div class="content">
        <h3>Set Price Range</h3>
        <div class="tags-list">
          <div class="tags-block">
            <h5>Customized Price Ranges</h5>
            <div class="input-box">
              <input
                v-model="priceMin"
                placeholder="Min"
                type="number"
              >
              <span>~</span>
              <input
                v-model="priceMax"
                placeholder="Max"
                type="number"
              >
            </div>
          </div>
          <div v-if="selectedProdcutList.length>0" class="tags-block">
            <h5>Fixed interval</h5>
            <template v-for="(item, key) in priceRangeData">
              <div v-if="key === selectedPrizeRangeAlias" :key="key" class="brands-box">
                <p
                  v-for="price in item"
                  :key="price[0]"
                  :class="[{ active: `${priceMin}-${priceMax}` === `${price[0]}-${price[1]}` }]"
                  @click="selectedRangePrice(price)"
                >
                  <span>{{ price[0] }} </span><span v-if="price[1]"> ~ {{ price[1] }}</span>￥
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
      <footer>
        <button class="reset" @click="reset">Reset</button>
        <button class="confirm" @click="confirmBtn">Confirm</button>
      </footer>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import priceRangeData from '~/config/priceRangeData'

export default {
  name: 'FilterMoney',
  data () {
    return {
      priceRangeData
    }
  },
  computed: {
    ...mapState({
      selectedPrizeRange: state => state.productCategory.selectedPrizeRange,
      selectedProdcutList: state => state.productCategory.selectedProdcutList,
      allLevelOneMenuList: state => state.productCategory.allLevelOneMenuList,
      selectedPrizeRangeAlias: state => state.productCategory.selectedPrizeRangeAlias,
      showFilterKey: state => state.productBrand.showFilterKey
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
    toggleFilterKeys () {
      this.$store.commit('productBrand/setShowFilterKey', 'money')
    },
    confirmBtn () {
      this.toggleFilterKeys()
      this.useRouteParam({ router: this.$router, url: '/en/product' })
    },
    reset () {
      this.$store.commit('productCategory/setAllPriceRange', { min: '', max: '' })
    }
  }
}
</script>

<style lang="scss" scoped>

p.title {
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

.filter-content {
  width: 100%;
  // height: calc(100vh - mvw(244));
  height: calc(100vh - mvw(190));
  position: absolute;
  // top: mvw(244);
  top: mvw(190);
  left: 0;
  z-index: 1;
  padding: mvw(24);
  border-top: mvw(1) solid rgba($color: #181818, $alpha: 0.1);

  h3 {
    margin-bottom: mvw(24);
  }

  .content {
    padding-bottom: mvw(48);
    height: calc(100vh - mvw(225));
    // height: calc(100vh - mvw(325));
    overflow: hidden;
    overflow-y: auto;

    .tags-list {
      .brands-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      h5 {
        margin: mvw(16) 0;
        color: #333;
        font-size: mrem(28);
        font-weight: 500;
      }
      p {
        width: mvw(155);
        height: mvw(40);
        line-height: mvw(40);
        font-size: mrem(28);
        color: #999;
        margin-bottom: mvw(16);
        text-align: center;
        background-color: #F6F7FB;
        border: 1px solid transparent;

        &.active {
          border-color: #000;
          color: #000;
          font-weight: bold;
        }
      }
      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          width: mvw(155);
          height: mvw(40);
          background-color: #F6F7FB;
          text-align: center;
        }
      }
    }
  }

  footer {
    width: 100%;
    height: mvw(48);
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);

    button {
      flex: 1;
      background: none;
      border: none;
    }
    .confirm {
      background-color: #000;
      color: #fff;
    }
    .reset{
      color: black;
    }
  }
}

</style>
