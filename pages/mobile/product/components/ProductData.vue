<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <template v-if="productList && productList.list && productList.list.length">
      <div class="product-list">
        <nuxt-link
          v-for="item in productList.list"
          :key="item.alias"
          class="product-singin"
          :to="`/product/detail?id=${item.alias}`"
          :brand="item.softroll"
        >
          <div @click="productTracking({ label: item.title_en, items: [{ CMSId: item.alias, brand: item.brandids.join(',') }] })">
            <figure>
              <img :src="item.thumbnail" :alt="item.title">
              <div v-if="item.new" class="tags">
                <span>New</span>
              </div>
              <div v-if="item.multicolor" class="multicolor">
                <img src="~/assets/images/icon/muliti.png" alt="">
              </div>
            </figure>
            <div class="product-content">
              <template v-if="item.softroll === 'Y' && item.brandids.includes('HAY')">
                <h5 class="two-line">{{ item.title_en?.trim() }}</h5>
                <h5>{{ item.title }}</h5>
              </template>
              <template v-else>
                <h5 class="text-singin">{{ item.title_en }}</h5>
                <h5>{{ item.title }}</h5>
              </template>
              <div class="brandids">
                <p v-for="brand in item.brandids" :key="brand">{{ brand }}</p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <!-- <div v-if="showMoreBtn" class="more">
        <button @click="getMore">
          加载更多
        </button>
      </div> -->
      <pagination-page />
    </template>
    <p v-else :style="{ textAlign: 'center',color:'#999999'}">
      暂无符合条件的筛选结果
    </p>
  </div>
</template>

<script>
import PaginationPage from './PaginationPage.vue'
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
  data: () => ({
    hasSort: true,
    tagList: ['collection', 'HAY']
  }),
  computed: {
    showMoreBtn () { return this.$store.getters['productList/showMoreBtn'] }
  },
  methods: {
    getMore () {
      this.$store.dispatch('productList/getMore')
    },
    productTracking ({ label, items }) {
      this.$emit('tracking', { event: 'view_product', label, items })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mobile/product-list.scss'
</style>
