<template>
  <div class="user-box-main-content-single users-favorite">
    <h3>收藏夹</h3>
    <div v-if="favoriteList.length" class="favorite-list">
      <nuxt-link
        v-for="item in favoriteList"
        :key="item.alias"
        tag="article"
        :to="`/product/detail?id=${item.pid}&sku=${item.alias}`"
      >
        <div @click="tracking({event:'view_product', label:item.title_en, items:[{CMSId:item.alias,source:'Favorite'}]})">
          <figure><img :src="item.thumbnail" alt=""><span @click.stop="removeFavorite(item.alias)">从收藏夹移除</span></figure>
          <div class="content">
            <h4>{{ item.title }}</h4>
            <p>{{ item.subtitle }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div v-else class="favorite-none">
      <figure><img src="~/assets/images/icon/empty.png"></figure>
      <span>暂无收藏产品</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UsersFavorite',
  computed: {
    ...mapGetters({
      favoriteList: 'favorite/getGoodsList'
    })
  },
  mounted () {
    this.$store.dispatch('favorite/useGetGoodsList')
  },
  methods: {
    removeFavorite (id) {
      this.$store.dispatch('favorite/removeFavorite', id)
    },
    tracking ({ event, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Profile-Favorite', event, mode: 'Products', label, items })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/users.scss';
</style>
