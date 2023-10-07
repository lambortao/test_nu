<template>
  <div
    :class="[
      'tab_content',
      pagedifferent === 'series' ? 'series_active' : '',
      pagedifferent === 'home' ? '' : 'search_active',
    ]"
  >
    <template v-if="materialList && materialList.list.length">
      <div class="material_list">
        <nuxt-link
          v-for="item in materialList.list"
          :key="item.alias"
          :class="[
            'common',
            pagedifferent === 'home' ? 'material_list_item' : 'active',
          ]"
          pagedifferent
          :to="`/marketing/detail?id=${item.alias}`"
        >
          <div class="market_content aaa" @click="macketTracking({label:item.title,alias:item.alias})">
            <div
              class="material_img_wrap"
              :style="{ backgroundImage: `url(${item.list_tmb})` }"
            >
              <div v-if="pagedifferent==='home'" class="file_txt">
                {{ item.is_file ? "文件" : "视频" }}
              </div>
            </div>
            <div class="material_info_wrap">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="time_new">
                <div class="time_txt">
                  {{ item.start_time }}
                </div>

                <div v-if="item.new" class="new_txt">
                  New
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <pagination-page v-if="isPage != 'no'" :pagedifferent="pagedifferent" />
    </template>
    <template v-else>
      <p>暂无权限查看</p>
    </template>
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
    materialList: {
      type: Object,
      default: null
    },
    pagedifferent: {
      type: String,
      default: null
    },
    isPage: {
      type: String,
      default: null
    }
  },
  methods: {
    macketTracking ({ label, alias }) {
      this.$emit('tracking', { event: 'view_marketingHub', label, items: [{ CMSId: alias }] })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/default/marketing-list.scss";
</style>
