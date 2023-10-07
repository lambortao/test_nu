<template>
  <div :class="['filter_item', classifySection==='texture' ?'active':'',textureValue.length>0?'option_active':'']">
    <div
      class="filter_item_box"
      @click="selectSection('texture')"
    >
      <p>
        Material
      </p>
    </div>
    <div class="filter_item_active_box">
      <div v-if="textureShow&&textureList.length>0&&productCategorySelect.length>0" class="texture_box">
        <div class="texture_title">
          Material Selection
        </div>
        <div class="texture_input_box">
          <div v-for="(item, idx) in textureList" :key="idx" class="texture_radio_box" @click="select(item.name_en)">
            <div :class="['circle',value.indexOf(item.name_en) > -1 ? 'black':'']">
              <div class="circular">
                <img :src="item.image" alt="">
              </div>
            </div>
            <p :class="['font',value.indexOf(item.name_en) > -1 ? 'fontActive':'']">
              {{ item.name_en }}
            </p>
          </div>
        </div>
        <div class="setting_box">
          <div :class="['reset',textureValue.length>0?'texture_value_active':'']" @click="reset">
            <figure>
              <img
                src="~/assets/images/icon/reset.png"
                alt=""
              >
            </figure>
            <div>Reset</div>
          </div>
          <div class="confirm">
            <button @click="handleConfirm">
              Confirm
            </button>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        {{ productCategorySelect.length > 0 ? 'No materials for filtering currently' : 'Please select category before filtering by material' }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TextureSelectEn',
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
    return {
    }
  },
  computed: {
    ...mapState({
      // 已选颜色
      productColor: state => state.productColor.value,
      // 已选材质
      textureValue: state => state.productTexture.value,
      // 颜色总数据
      textureList: state => state.productTexture.textureList,
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
          // this.textureShow = false
          this.$store.commit('productList/setTextureShow', false)
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
        this.$emit('tracking', { event: 'filter_product', label: item, filterLabel: 'Material' })
      }
      this.$emit('update:value', sizeData)
    },
    // 确认事件
    handleConfirm () {
      this.selectSection(null)
      this.useRouteParam({ router: this.$router, url: '/en/product' })
    },
    reset () {
      this.$emit('update:value', [])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
@import '~/assets/scss/default/product/texture-select.scss';
</style>
