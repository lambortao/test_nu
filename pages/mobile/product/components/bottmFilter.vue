<template>
  <div v-show="hasFilter" class="fixed-filter">
    <header>
      <span>当前过滤器：</span>
      <span>{{ filterDataList.length }}个产品</span>
    </header>
    <div>
      <div v-for="item in filterDataList" :key="item">
        <p>{{ allProductNameList && allProductNameList[item] && allProductNameList[item].name }}</p>
        <img src="~/assets/images/AAmobile/product/close.png" alt="关闭" @click="deleteFilter(item)">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductBootmFilter',
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

      return [...allFilterData]
    },
    hasFilter () {
      return this.filterDataList.length
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
      this.$store.dispatch('productList/useRequestParam', { router: this.$router, url: '/product' })
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed-filter {
  // position: fixed;
  // bottom: 0;
  // left: 0;
  width: 100%;
  padding: mvw(12) mvw(16);
  background-color: #fff;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: mvw(5);

    span{
      &:first-child {
        color: #555;
      }
      &:last-child {
        color: #999;
      }
    }
  }

  > div {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    div {
      margin-right: mvw(10);
      padding: mvw(6) mvw(12);
      background-color: #f6f6f6;
      margin-bottom: mvw(6);

      p {
        display: inline-block;
        margin-right: mvw(15);
        font-size: mrem(26);
      }
      img {
        width: mvw(16);
        vertical-align: middle;
      }
    }
  }
}
</style>
