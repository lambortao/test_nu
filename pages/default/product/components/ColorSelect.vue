<template>
  <div :class="['filter_item', classifySection==='color' ?'active':'',ColorValue.length>0?'option_active':'']">
    <div
      class="filter_item_box"
      @click="selectSection('color')"
    >
      <p>
        颜色
      </p>
    </div>
    <div class="filter_item_active_box">
      <div
        v-if="colorShow && colorList.length > 0 && productCategorySelect.length > 0 "
        class="color_box"
      >
        <div class="color_title">
          颜色筛选
        </div>
        <div class="color_input_box">
          <div
            v-for="(item, idx) in colorList"
            :key="idx"
            class="color_radio_box"
            @click="select(item.name)"
          >
            <div :class="['circle',value.indexOf(item.name) > -1 ? 'black':'']">
              <div class="circular">
                <img
                  :src="item.image"
                  alt=""
                >
              </div>
            </div>
            <p :class="['font',value.indexOf(item.name) > -1 ? 'fontActive':'']">
              {{ item.name }}
            </p>
          </div>
        </div>
        <div class="setting_box">
          <div
            :class="['reset',ColorValue.length>0?'color_value_active':'']"
            @click="reset"
          >
            <figure>
              <img
                src="~/assets/images/icon/reset.png"
                alt=""
              >
            </figure>
            <div>重置</div>
          </div>
          <div
            class="confirm"
            @click="handleConfirm"
          >
            <button>
              确认
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="empty"
      >
        {{ productCategorySelect.length > 0 ? '暂无可筛选颜色' : '请选择品类后再进行颜色筛选' }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ColorSelect',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    classifySection: {
      type: [String, Object],
      default: ''
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      // 已选材质
      productTexture: state => state.productTexture.value,
      // 已选颜色
      ColorValue: state => state.productColor.value,
      // 颜色总数据
      colorList: state => state.productColor.colorList,
      // 品类总数据
      productCategory: state => state.productCategory.channeList,
      // 已选品类数据
      productCategorySelect: state => state.productCategory.selectedProdcutList,
      // 确认颜色是否可选
      colorShow: state => state.productList.colorShow
    })
  },
  watch: {
    productCategorySelect: {
      handler (newVal, oldVal) {
        if (newVal.length > 0) {
          // const newArr = []
          // // 家具
          // this.productCategory.filter((el) => {
          //   return el.alias === '5c46640d14a87af0'
          // })[0].child.forEach((item) => {
          //   // 筛选出床的id 因为床是没有颜色筛选的
          //   if (item.alias === 'f4e372819335c49f') {
          //     item.child.forEach((val) => {
          //       newArr.push(val.alias)
          //     })
          //   }
          // })
          // // 确认颜色是否可选
          // this.$store.commit('productList/setColorShow', this.productCategorySelect.every((el) => {
          //   return !newArr.includes(el)
          // }))
          this.$store.commit('productList/setColorShow', true)
        } else {
          this.$store.commit('productList/setColorShow', false)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions({
      handlePagination: 'productList/handlePagination',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam'
    }),
    // 选择下拉框显示隐藏
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    // 筛选颜色
    select (item) {
      const sizeData = [...this.value]
      const nowIndex = sizeData.indexOf(item)
      if (nowIndex > -1) {
        sizeData.splice(nowIndex, 1)
      } else {
        sizeData.push(item)
        this.$emit('tracking', { event: 'filter_product', label: item, filterLabel: 'Color' })
      }
      this.$emit('update:value', sizeData)
    },
    // 确认事件
    handleConfirm () {
      this.selectSection(null)
      this.handlePagination(1)
      this.useRouteParam({ router: this.$router, url: '/product' })
    },
    reset () {
      this.$emit('update:value', [])
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/default/product.scss";
@import "~/assets/scss/default/product/color-select.scss";
</style>
