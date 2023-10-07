<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="content default-width">
    <div class="tab_content">
      <template v-if="productList && productList.list.length">
        <div class="product-list">
          <nuxt-link
            v-for="item in productList.list"
            :key="item.alias"
            class="product_list_item"
            :to="`product/detail?id=${item.alias}`"
          >
            <div @click="productListTracking({label:item.title_en,items:[{CMSId:item.alias,brand:item.brandids.join(',')}]})">
              <div
                :class="['product_img', { product_screenPhoto: !item.isScenePhoto }]"
                :style="{ backgroundImage: `url(${item.thumbnail})`}"
              >
                <div class="product_new">
                  <div v-if="item.new==1">
                    NEW
                  </div>
                </div>
                <div
                  v-if="item.multicolor"
                  class="product_multicolor"
                >
                  <img
                    src="~/assets/images/icon/muliti.png"
                    alt=""
                  >
                </div>
              </div>
              <div class="news_box">
                <div class="news_title">
                  <template v-if="item.softroll === 'Y' && item.brandids.includes('HAY')">
                    <h3 class="two-line">{{ item.title_en?.trim() }} {{ item.title }}</h3>
                  </template>
                  <template v-else>
                    <h3 class="text-singin">{{ item.title_en }} {{ item.title }}</h3>
                  </template>
                  <p>
                    <template v-for="brand in item.brandids">{{ brand }}</template>
                  </p>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
        <pagination-page />
      </template>
      <template v-else>
        暂无数据
      </template>
    </div>
  </div>
</template>

<script>
import PaginationPage from './PaginationPage.vue'
// 文章或产品列表类型type :product article
export default {
  name: 'ProductListComponent',
  components: {
    PaginationPage
  },
  props: {
    productList: {
      type: Object,
      default: null
    }
  },
  methods: {
    productListTracking ({ label, items }) {
      this.$emit('tracking', { event: 'view_product', label, items })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/default/product-list.scss";
</style>
