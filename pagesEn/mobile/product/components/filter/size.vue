<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <div class="filter">
    <p class="title" @click.stop="toggleFilterKeys">Size</p>
    <section v-if="showFilterKey === 'size'" class="filter-content">
      <div class="content">
        <!-- <h3>Size</h3> -->
        <div v-if="sizeList && sizeList.length!==0" class="tags-list">
          <div
            v-for="item in sizeList"
            :key="item.sign"
            class="tags-block"
          >
            <h5>{{ item.sign }}</h5>
            <div class="brands-box">
              <p
                v-for="size in item.options"
                :key="size.alias"
                :class="[{ active: value.includes(`${item.sign}_${size.name}`), disabled: selectedDisabled(item.sign) }]"
                @click="changeValue(`${item.sign}_${size.name}`)"
              >{{ size.name }} cm</p>
            </div>
          </div>
        </div>
        <div v-else class="empty" :style="{ textAlign: 'center' }"> {{ productCategorySelect.length > 0?'Size filtering not available for this category':'Please select category before filtering by size' }}</div>
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
import useDisabled from '~/utils/useDisabled'

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
      /** 尺寸列表 */
      sizeList: state => state.productCategory.sizeList,
      showFilterKey: state => state.productBrand.showFilterKey,
      // 已选品类数据
      productCategorySelect: state => state.productCategory.selectedProdcutList
    }),
    sizeSign () {
      return this.$store.getters['productSize/signList']
    },
    /** 品牌的全选状态 */
    brandAllCheck () { return this.$store.getters['productBrand/getAllStatus'] },
    selectedDisabled () {
      return (sign) => {
        console.log(sign)
        return useDisabled(sign, this.sizeSign)
      }
    }
  },
  methods: {
    useDisabledFc (sign, sizeSign) {
      return useDisabled(sign, sizeSign)
    },
    changeValue (data) {
      const oldData = [...this.value]
      console.log(data)

      const nowIndex = oldData.indexOf(data)
      if (nowIndex > -1) {
        oldData.splice(nowIndex, 1)
      } else {
        oldData.push(data)
        this.$emit('tracking', { event: 'filter_product', label: data, filterLabel: 'Size' })
      }
      this.$emit('update:value', oldData)
    },
    ...mapActions({
      /** 全选按钮 */
      selectAll: 'productBrand/useValue',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam'
    }),
    toggleFilterKeys () {
      this.$store.commit('productBrand/setShowFilterKey', 'size')
    },
    confirmBtn () {
      this.toggleFilterKeys()
      this.useRouteParam({ router: this.$router, url: '/en/product' })
    },
    /** 双相数据绑定 */
    brandSelect (item) {
      this.$emit('update:value', item)
    },
    reset () {
      this.$emit('update:value', [])
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
  height: calc(100vh - mvw(190));
  // height: calc(100vh - mvw(244));
  position: absolute;
  top: mvw(190);
  // top: mvw(244);
  left: 0;
  z-index: 1;
  padding: mvw(24);
  border-top: mvw(1) solid rgba($color: #181818, $alpha: 0.1);

  h3 {
    margin-bottom: mvw(24);
  }

  .content {
    padding-bottom: mvw(48);
    // height: calc(100vh - mvw(325));
    height: calc(100vh - mvw(225));
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
        border: 1px solid #ddd;

        &.active {
          border-color: #000;
          color: #000;
          font-weight: bold;
        }

        &.disabled {
          background: #F5F5F5;
          pointer-events: none;
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
