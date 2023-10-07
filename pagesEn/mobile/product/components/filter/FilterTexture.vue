<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="filter">
    <p class="title" @click="toggleFilterKeys">Material</p>
    <section v-if="showFilterKey === 'texture'" class="filter-content">
      <div class="content">
        <h3>Material Selection</h3>
        <div v-if="textureShow&&textureList.length>0&&productCategorySelect.length>0" class="tags-list">
          <div v-for="(item,idx) in textureList" :key="idx" class="each" @click="select(item.name_en)">
            <div class="eachBox">
              <div :class="['circle',value.indexOf(item.name_en) > -1 ? 'borderActive':'']">
                <div class="circular">
                  <img :src="item.image" alt="">
                </div>
              </div>
              <p :class="['font',value.indexOf(item.name_en) > -1 ? 'fontActive':'']">{{ item.name_en }}</p>
            </div>
          </div>
        </div>
        <div v-else class="empty">
          {{ productCategorySelect.length > 0 ? 'No materials for filtering currently' : 'Please select category before filtering by material' }}
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
export default {
  name: 'FilterTexture',
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
    }
  },
  computed: {
    ...mapState({
      // 下拉框数据
      showFilterKey: state => state.productBrand.showFilterKey,
      // 材质总数据
      textureList: state => state.productTexture.textureList,
      // 颜色选中数据
      productColor: state => state.productColor.value,
      // 品类总数据
      productCategory: state => state.productCategory.channeList,
      // 已选品类数据
      productCategorySelect: state => state.productCategory.selectedProdcutList,
      // 确认材质是否可选
      textureShow: state => state.productList.textureShow
    })
  },
  watch: {
    productCategorySelect: {
      handler (newVal, oldVal) {
        if (newVal.length > 0) {
          // 座椅、沙发、桌的alias数据集合
          // const newArr = []
          // this.productCategory.filter((el) => {
          //   return el.alias === '5c46640d14a87af0'
          // })[0].child.forEach((item) => {
          //   if (item.alias === '3286d9e34453dc8a' || item.alias === '1a5dd3e7408028cf' || item.alias === '6f237ac174530190') {
          //     item.child.forEach((val) => {
          //       newArr.push(val.alias)
          //     })
          //   }
          // })
          // // 确认材质是否可选
          // this.$store.commit('productList/setTextureShow', this.productCategorySelect.every((el) => {
          //   return newArr.includes(el)
          // }))
          this.$store.commit('productList/setTextureShow', true)
        } else {
          this.$store.commit('productList/setTextureShow', false)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions({
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam'
    }),
    // 下拉框
    toggleFilterKeys () {
      this.$store.commit('productBrand/setShowFilterKey', 'texture')
    },
    // 筛选颜色
    select (item) {
      const sizeData = [...this.value]
      const nowIndex = sizeData.indexOf(item)
      if (nowIndex > -1) {
        sizeData.splice(nowIndex, 1)
      } else {
        sizeData.push(item)
        this.$emit('tracking', { event: 'filter_product', label: item, filterLabel: 'Material' })
      }
      this.$emit('update:value', sizeData)
    },
    // 清空筛选数据
    reset () {
      this.$emit('update:value', [])
    },
    // 确认
    confirmBtn () {
      this.toggleFilterKeys()
      this.useRouteParam({ router: this.$router, url: '/en/product' })
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
    }

    ;
  }
}

.filter-content {
  width: 100%;
  height: calc(100vh - mvw(244));
  position: absolute;
  top: mvw(244);
  left: 0;
  z-index: 5;
  padding: mvw(25);
  border-top: mvw(1) solid rgba($color: #181818, $alpha: 0.1);

  h3 {
    margin-bottom: mvw(24);
  }

  .content {
    // padding-bottom: mvw(48);
    height: calc(100vh - mvw(325));
    // height: calc(100vh - mvw(225));
    overflow: hidden;
    overflow-y: auto;

    .tags-list {
      width: mvw(325);
      display: flex;
      flex-wrap: wrap;

      // justify-content: space-between;
      .each {
        width: mvw(65);
        height: mvw(65);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: mvw(24);

        .eachBox {
          width: mvw(50);

          .circle {
            width: mvw(50);
            height: mvw(50);
            margin-bottom: mvw(12);
            background: #F7F7F7;
            border: 1px solid #ECECEC;
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;

            .circular {
              width: mvw(40);
              height: mvw(40);
              border-radius: 50%;

              img {
                width: mvw(40);
                height: mvw(40);
              }
            }
          }

          .font {
            text-align: center;
            color: #999999;
            font-weight: 400;
            font-size: mvw(12);
          }
          .borderActive{
            border: 1px solid #333333!important;
          }
          .fontActive{
            color: #333333!important;
          }
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
  }
}
</style>
