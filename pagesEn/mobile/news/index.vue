<template>
  <content-tab v-model="activeKey" title="NU热点">
    <tab-pane value="1" label="热点">
      <news-hot />
    </tab-pane>
    <tab-pane value="2" label="视频">
      <p>视频</p>
    </tab-pane>
    <tab-pane value="3" label="新闻">
      <news-page />
    </tab-pane>
    <template #tabsright>
      <sort-btn v-model="sort" :sort-list="sortList" default-text="排序" />
    </template>
  </content-tab>
</template>

<script>
import NewsHot from './components/hots.vue'
import NewsPage from './components/news.vue'
import ContentTab from '~/componentsEn/AAMobile/ContentTab/index.vue'
import TabPane from '~/componentsEn/AAMobile/ContentTab/tabPane.vue'

export default {
  name: 'ActivityPage',
  components: {
    ContentTab,
    TabPane,
    NewsHot,
    NewsPage
  },
  data () {
    return {
      activeKey: '1',
      sort: 0,
      sortList: [{
        value: 0,
        label: '默认'
      }, {
        value: 1,
        label: '随机推荐'
      }, {
        value: 2,
        label: '最新发布'
      }, {
        value: 3,
        label: '浏览最多'
      }]
    }
  }
}
</script>
