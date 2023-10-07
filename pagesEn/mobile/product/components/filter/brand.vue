<template>
  <div class="filter">
    <p class="title" @click.stop="toggleFilterKeys">
      Brand
    </p>
    <section v-if="showFilterKey === 'brand'" class="filter-content">
      <h3>Brand Selection</h3>
      <div class="content">
        <div class="tags-list">
          <p
            :class="['brand_item', { active: brandAllCheck }]"
            @click="selectAllEvent()"
          >
            All
          </p>
          <p
            v-for="item in brandList"
            :key="item.alias"
            :class="['brand_item', { active: value.includes(item.alias) }]"
            @click="brandSelect({item,isSelect:value.includes(item.alias)})"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
      <footer>
        <button class="reset" @click="reset">
          Reset
        </button>
        <button class="confirm" @click="confirmBtn">
          Confirm
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FilterBrand',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      filterShow: false
    }
  },
  computed: {
    ...mapState({
      /** 品牌列表 */
      brandList: state => state.productBrand.brandList,
      showFilterKey: state => state.productBrand.showFilterKey
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
    toggleFilterKeys () {
      this.$store.commit('productBrand/setShowFilterKey', 'brand')
    },
    confirmBtn () {
      this.toggleFilterKeys()
      this.useRouteParam({ router: this.$router, url: '/en/product' })
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
    reset () {
      this.$store.commit('productBrand/coverValue', [])
    },
    selectAllEvent () {
      this.selectAll({ all: true })
      if (this.brandAllCheck) {
        this.$emit('tracking', { event: 'filter_product', label: 'All', filterLabel: 'Brands' })
      }
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
    height: 100%;
    padding-bottom: mvw(48);

    .tags-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
