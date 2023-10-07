<template>
  <div
    v-if="filterDataList && filterDataList.length"
    ref="container"
    class="filter_box default-width"
  >
    <div class="select_filter_box">
      <div class="select_filter_title">
        Filter Criteria
      </div>
      <div class="select_filter_content">
        <template v-if="filterDataList && filterDataList.length">
          <div
            v-for="item in filterDataList"
            :key="item"
            class="select_filter_item"
          >
            <p>{{ allProductNameList && allProductNameList[item] && allProductNameList[item].nameen }}</p>
            <figure>
              <img
                src="~/assets/images/icon/close.png"
                alt=""
                @click="deleteFilter(item)"
              >
            </figure>
          </div>
        </template>
        <template v-else>
          <div class="select_filter_item nodata">
            No Data
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      /** 所有的产品名字 */
      allProductNameList: state => state.productList.allKeysName,
      /** 筛选器的别名 */
      requestDataAlias: state => state.productList.requestData.method,
      /** 所有的二级菜单组合 */
      allLevelTwoMenuList: state => state.productCategory.allLevelTwoMenuList
    }),
    /** 计算属性监听当前选中的数据进行筛选展示 */
    filterDataList () {
      const brandList = this.$store.state.productBrand.value
      const categoryList = this.$store.state.productCategory.selectedProdcutList
      const sceneValue = this.$store.state.productScene.value
      const data = [...brandList, ...categoryList]
      if (sceneValue) { data.push(sceneValue) }

      const allLevelTwo = this.$store.state.productCategory.allLevelTwoMenuList

      let allFilterData = [...data]
      /** 检查是否有全选的二级菜单 */
      for (const key in allLevelTwo) {
        if (Object.hasOwnProperty.call(allLevelTwo, key)) {
          const element = allLevelTwo[key]
          if (element.every(v => data.includes(v))) {
            /** 当前选中的商品，有二级菜单全选的状态，将二级菜单子ID替换成二级菜单的ID */
            allFilterData = allFilterData.filter(i => !element.includes(i))
            if (!allFilterData.includes(key)) {
              allFilterData.push(key)
            }
          }
        }
      }

      return this.$store.state.productList.type === 'menu' ? [...allFilterData] : [...data]
    }
  },
  methods: {
    /** 点击删除按钮 */
    async deleteFilter (alias) {
      const item = this.allProductNameList[alias]
      if (item.form === 'scenes') {
        /** 删除场景 */
        await this.$store.dispatch('productScene/useScene', alias)
      } else if (item.form === 'brand') {
        /** 删除品牌 */
        await this.$store.dispatch('productBrand/useValue', { val: { alias } })
      } else if (item.form === 'channel') {
        /** 删除商品 */
        await this.$store.dispatch('productCategory/setShowFilterProductIdList', alias)
      }
      this.$store.dispatch('productList/handlePagination', 1)
      this.$store.dispatch('productList/useRequestParam', { router: this.$router, url: '/en/product' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
</style>
