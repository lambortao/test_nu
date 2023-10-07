<template>
  <div :class="[hasChild ? 'filter_item_other' : 'filter_item', classifySection === 'category' ? 'active' : '', 'is-relative',selectedProdcutList.length>0?'option_active':'']">
    <div class="filter_item_box" :style="{ position: 'relative'}" @click="selectSection('category')">
      <p>
        品类
      </p>
    </div>
    <div id="category_active_box" class="filter_item_active_box category_active_box">
      <div class="category_content">
        <template v-if="channeList && channeList !== ''">
          <div v-if="!widthStyle" class="category_fold">
            <div v-for="(item, index) in channeList" :key="item.name" @click="showChild(index)">
              {{ item.name }}
            </div>
          </div>
          <div v-else class="category_unfold">
            <div class="category_fold_left">
              <div
                v-for="(item, index) in channeList"
                :key="item.name"
                :class="selectedProductFirstIndex == index ? 'level1_active' : ''"
                @click="setSelectedProductFirstIndex(index)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="category_fold_right">
              <div
                v-for="(child) in channeList[selectedProductFirstIndex].child"
                :key="child.alias"
                class="category_fold_child"
              >
                <div class="category_fold_child_title">
                  <div>{{ child.name }}</div>
                  <div @click="setSelectedProductListEvent({ mode: 'all', value: child.allChildAlias,label:child.name,isSelect:hasAll(child.allChildAlias)})">
                    <div :class="[hasAll(child.allChildAlias) ? 'select_box_active' : '', 'select_box']">
                      <img src="~/assets/images/icon/selected.png" alt="">
                    </div>全选
                  </div>
                </div>
                <div class="category_fold_child_content">
                  <div v-for="(item) in child.child" :key="item.alias" class="category_child_item">
                    <div
                      :class="['category_img', { active: selectedProdcutList.includes(item.alias) }]"
                      @click="setSelectedProductListEvent({ value: item.alias,label:item.name,isSelect: selectedProdcutList.includes(item.alias)})"
                    >
                      <img :src="item.thumbnail" alt="">
                      <div class="select_box">
                        <img src="~/assets/images/icon/selected.png" alt="">
                      </div>
                    </div>
                    <p>{{ item.name }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="setting_box">
              <div
                :class="['reset', { disabled: !selectedProdcutList.length } , selectedProdcutList.length>0?'category_value_active':'']"
                @click="setSelectedProductList({ mode: 'reset' })"
              >
                <figure>
                  <img src="~/assets/images/icon/reset.png" alt="">
                </figure>
                <div>重置</div>
              </div>
              <div class="confirm">
                <button @click="confirmRouteParam">
                  确认
                </button>
              </div>

              <div class="top" @click="toggleMenuStatus">
                <figure>
                  <img src="~/assets/images/icon/up.png" alt="">
                </figure>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="category_fold">
            暂无分类
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CategorySelectComponent',
  props: {
    classifySection: {
      type: [String, Object],
      default: ''
    }
  },
  data: () => ({
    childList: null,
    isChildAll: false,
    channelId: 0,
    hasChild: false,
    widthStyle: false
  }),
  computed: {
    ...mapState('productCategory', {
      channeList: state => state.channeList,
      selectedProductFirstIndex: state => state.selectedProductFirstIndex,
      selectedProdcutList: state => state.selectedProdcutList
    }),
    hasAll () {
      return (arr) => {
        return arr.every(val => this.selectedProdcutList.includes(val))
      }
    }
  },
  methods: {
    ...mapActions({
      handlePagination: 'productList/handlePagination',
      /** 产品的选中事件 */
      setSelectedProductList: 'productCategory/useSelectedProduct',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam',
      /** 获取尺寸 */
      getSpeclist: 'productCategory/getSpeclist',
      // 清空尺寸筛选
      useSize: 'productSize/useSize',
      // 清空颜色筛选
      useColor: 'productColor/useColor',
      // 清空材质筛选
      useTexture: 'productTexture/useTexture'
    }),
    /** 确认事件 */
    confirmRouteParam () {
      // 清空尺寸筛选
      this.useSize([])
      // 清空颜色筛选
      this.useColor([])
      // 清空材质筛选
      this.useTexture([])
      this.handlePagination(1)
      this.useRouteParam({ router: this.$router, url: '/product' })
      this.selectSection(null)
      // 获取尺寸
      this.getSpeclist()
      // 筛选可以选择的颜色和材质
      // this.$store.dispatch('productList/setColorOrTexture')
    },
    reset () {
      this.$emit('update:value', [])
    },
    getProductListData () {
      this.toggleMenuStatus()
      this.getProductList()
    },
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    showChild (index) {
      this.hasChild = true
      this.setSelectedProductFirstIndex(index)
      this.widthStyle = true
    },
    /** 设置产品一级分类的下标 */
    setSelectedProductFirstIndex (index) {
      this.$store.commit('productCategory/setSelectedProductFirstIndex', index)
    },
    /** 清除所有选择 */
    resetAllSelected () {
      this.$store.dispatch('productCategory/useSelectedProduct', { mode: 'reset' })
    },
    toggleMenuStatus () {
      this.widthStyle = false
      this.hasChild = false
    },
    setSelectedProductListEvent ({ mode, value, label, isSelect }) {
      this.setSelectedProductList({ mode, value }) // selectedProdcutList
      if (!isSelect) {
        this.categoryTracking({ label })
      }
    },
    categoryTracking ({ label }) {
      this.$emit('tracking', { event: 'filter_product', label, filterLabel: 'Category' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
@import '~/assets/scss/default/product-filter.scss';
</style>
