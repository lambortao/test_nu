<template>
  <div>
    <div class="default-width site-is-default">
      <div class="news_container">
        <news-list
          title="NU热点"
          :tab-list="articeChannelList"
        />
      </div>
    </div>
    <mobile-news class="site-is-mobile" />
  </div>
</template>

<script>
import MobileNews from '~/pages/mobile/news/index.vue'
import NewsList from '~/components/common/List/NewsList.vue'
export default {
  name: 'NewsPage',
  components: {
    MobileNews,
    NewsList
  },
  async asyncData ({ $axios }) {
    const articeChannelList = await $axios.$get('/getArticleChannel')
    console.log(articeChannelList)
    return { articeChannelList }
  },
  data: () => ({
    tabList: ['热点', '视频', '新闻']
  }),
  computed: {
    theme () {
      return this.$store.state.site.theme
    },
    themeFixed () {
      return this.$store.state.site.themeFixed
    }
  },
  mounted () {
    this.$store.commit('site/setTheme', 'dark')
    this.$store.commit('site/setThemeStatus', false)
  }
}
</script>
<style lang="scss" scoped>
.news_container {
  padding-top: 125px;
}
</style>
