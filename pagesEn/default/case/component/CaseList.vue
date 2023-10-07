<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="case_list_box">
    <div class="case_list_item">
      <div
        v-for="(item,index) in caseList.lists"
        :key="index"
        class="case_item"
        :class="caseList.lists.pageTotal === 1? borders : ''"
      >
        <figure class="case-img">
          <img
            :src="item.thumbnail"
            :alt="item.title"
          >
        </figure>
        <div>
          <div class="brands">
            <div
              v-for="(items,ind) in item.brandids"
              :key="ind"
              class="brand-label"
            >
              {{ items }}
            </div>
          </div>
          <h5 class="title">{{ item.subtitle_en }} {{ item.title_en }}</h5>
          <div class="country">{{ item.city_en }} {{ item.country_en }}</div>
          <NuxtLink
            class="view_box"
            :to="`/en/casedetail?brandId=${item.alias}`"
          >
            <div @click="caseDetailTracking({item})">View</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 文章或产品列表类型type :product article
// 显示排序或者创建灵感簿
export default {
  name: 'CaseListComponent',
  props: {
    caseList: {
      type: Object,
      default: null
    }
  },
  methods: {
    caseDetailTracking ({ item }) {
      this.$emit('tracking', { event: 'view_inspiration', mode: 'Inspiration', label: item.title_en, items: [{ CMSId: item.alias }] })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/case/caseList.scss';
</style>
