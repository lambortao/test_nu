<template>
  <div class="NewsList_box">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="content">
      <tab-pane :tabs-list="tabList" :active-index="activeIndex" @activeIndex="tabChange">
        <div slot="tabs_right">
          <template v-if="hasSort">
            <div
              class="sort_box"
              @click="sortClick()"
            >
              <p :class="isSortActive?'active':''">
                {{ sortName }}
              </p>
            </div>
          </template>
          <template v-if="isSortActive">
            <div class="sort_menu">
              <div v-for="(item,index) in sortList" :key="index" @click="sortClick(item)">
                {{ item }}
              </div>
            </div>
          </template>
        </div>
        <div slot="tabs_content" class="tabs_content">
          <ArticleList :list-type="listType" />
        </div>
      </tab-pane>
    </div>
    <!-- <div class="content" /> -->
  </div>
</template>

<script>
// 文章或产品列表类型type :product article
// 显示排序或者创建灵感簿
import TabPane from '~/components/common/TabPane/TabPane.vue'
import ArticleList from '~/components/common/List/ArticleList.vue'
export default {
  name: 'NewsListComponent',
  components: {
    ArticleList,
    TabPane
  },
  props: {
    tabList: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  },
  data: () => ({
    activeIndex: 0,
    hasSort: true,
    isSortActive: false,
    listType: 'article',
    sortList: ['随机推荐', '最新发布', '浏览最多'],
    sortName: '排序'
  }),
  methods: {
    tabChange (data) {
      this.activeIndex = data
      this.listType = data === 1 ? 'product' : 'article'
    },
    sortClick (item) {
      if (item) {
        this.sortName = item
      }
      this.isSortActive = !this.isSortActive
    }
  }
}
</script>

<style lang="scss">
.NewsList_box {
  min-height: 500px;
  padding: 65px 20px 50px;
  > .title {
    h1 {
      font-weight: bolder;
      font-size: 36px;
      line-height: 42px;
    }
  }
  .content {
    > .tabs_box {
      position: relative;
      z-index: 99;
      .sort_box {
        cursor: pointer;
        user-select: none;
        > P {
          display: inline-block;
          font-size: 18px;
          color: #000;
          line-height: 27px;
          position: relative;

          padding: 9px 31px 9px 16px;
        }
        p::after {
          content: "";
          width: 7px;
          height: 5px;
          display: block;
          background: url("~/assets/images/icon/sort_icon.png") no-repeat;
          background-size: 100% 100%;
          transition: all 0.5s;
          position: absolute;
          right: 14px;
          top: 20px;
        }
        .active {
          background: #eee;
        }
        .active::after {
          transform: rotate(-180deg);
        }
      }
      .sort_menu {
        width: 240px;
        // height: 150px;
        background: #fff;
        position: absolute;
        right: 0;
        bottom: -151px;
        box-shadow: 0px 0px 4px #dddddd;
        user-select: none;
        > div {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          cursor: pointer;
        }
        > div:hover,
        .active {
          background: #f6f6f6;
          font-weight: bold;
        }
      }
    }
    .tabs_content{
      padding-top: 60px;
      z-index: 9;
    }
  }
}
</style>
