<template>
  <div :class="['filter_item',classifySection==='size' ?'active':'',sizeValue.length>0?'option_active':'']">
    <div
      class="filter_item_box"
      @click="selectSection('size')"
    >
      <p>Size</p>
    </div>
    <div class="filter_item_active_box">
      <div class="size_content">
        <template v-if="sizeList && sizeList.length!==0">
          <div v-for="item in sizeList" :key="item.sign" class="size_item">
            <div class="size_item_title">
              {{ item.sign }}
            </div>
            <div class="size_item_checkbox">
              <label
                v-for="size in item.options"
                :key="size.alias"
                :for="size.alias"
                :class="[{ active: value.includes(`${item.sign}_${size.name}`), disabled: useDisabledFc(item.sign, 'asdsfda') }]"
              ><input
                :id="size.alias"
                type="checkbox"
                :disabled="useDisabledFc(item.sign)"
                :value="`${item.sign}_${size.name}`"
                :checked="value.includes(`${item.sign}_${size.name}`)"
                @change="e => changeValue(e, item.sign)"
              >{{ size.name }} cm</label>
            </div>
          </div>
          <div class="setting_box">
            <div :class="['reset',sizeValue.length>0?'size_value_active':'']" @click="reset">
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
        </template>
        <template v-else>
          <div class="empty">
            {{ productCategorySelect.length > 0?'Size filtering not available for this category':'Please select category before filtering by size' }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import useDisabled from '~/utils/useDisabled'

export default {
  name: 'SenceSelectComponent',
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
  computed: {
    ...mapState('productCategory', {
      sizeList: state => state.sizeList,
      // 已选品类数据
      productCategorySelect: state => state.selectedProdcutList
    }),
    ...mapState('productSize', {
      // 尺寸数据
      sizeValue: state => state.value

    }),
    sizeSign () {
      return this.$store.getters['productSize/signList']
    }
  },
  methods: {
    useDisabledFc (sign) {
      return useDisabled(sign, this.sizeSign)
    },
    changeValue (e, sign) {
      const oldData = [...this.value]
      const data = e.target.value

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
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam'
    }),
    handleConfirm () {
      this.selectSection(null)
      this.useRouteParam({ router: this.$router, url: '/en/product' })
    },
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    reset () {
      this.$emit('update:value', [])
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
@import '~/assets/scss/default/product/size-select.scss'
</style>
