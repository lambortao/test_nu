<template>
  <div>
    <div class="container site-is-default">
      <div class="NewsList_box default-width">
        <div class="title">
          <h1>{{ title }}</h1>
        </div>
        <div class="content">
          <div class="tabs_box">
            <div class="tab_list">
              <div
                v-for="(item,index) in tabList"
                :key="index"
                :class="index==activeIndex?'tab_pane active':'tab_pane'"
                @click="tabChange(index)"
              >
                {{ item }}
              </div>
            </div>
            <div class="tabs_right" @click="toInspiration">
              <div><img src="~/assets/images/icon/collect_icon1.png" alt=""></div>
              <p>我的灵感簿</p>
            </div>
          </div>
          <div class="tab_content_box">
            <ArticleList :list-type="listType" />
          </div>
        </div>
      </div>
    </div>
    <mobile-favorite class="site-is-mobile" />
  </div>
</template>

<script>
// import Dialog from '~/components/common/Dialog.vue'
import ArticleList from '~/components/common/List/ArticleList.vue'
import MobileFavorite from '~/pages/mobile/favorite/index.vue'
export default {
  name: 'FavoritePage',
  components: {
    ArticleList,
    MobileFavorite
    // Dialog
  },
  data: () => ({
    title: '收藏夹',
    activeIndex: 0,
    listType: 'product',
    tabList: ['产品', '文章', '视频', '案例']
  }),
  methods: {
    tabChange (index) {
      this.activeIndex = index
      this.listType = index === 0 ? 'product' : index === 1 ? 'article' : ''
    },
    toInspiration () {
      this.$router.push('/inspiration')
    }
  }
}
</script>
<style lang="scss" scoped>
.NewsList_box {
  min-height: 500px;
  padding: 65px 20px 50px;
  > .title {
    margin-bottom: 40px;
    h1 {
      font-weight: bolder;
      font-size: 36px;
      line-height: 42px;
    }
  }
  .content {
    > .tabs_box {
      width: 100%;
      padding-bottom: 20px;
      padding-right: 20px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .tab_list {
        display: flex;
        > .tab_pane {
          margin-right: 72px;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.4);
        }
        > .tab_pane:hover,
        .active {
          color: #000;
        }
      }
      .tabs_right {
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        >div{
          width: 38px;
          height: 38px;
          margin-right: 10px;
          img{
            width: 100%;
            object-fit: contain;
          }
        }
        >p{
          font-size: 20px;
          line-height: 1.5;
        }
      }
    }
    > .tab_content_box {
      padding-top: 60px;
      .tab_content {
        display: none;
        &_item {
          width: calc((100% - 128px) / 3);
          margin-right: 64px;
          margin-bottom: 80px;
          cursor: pointer;
          img {
            width: 100%;
            object-fit: contain;
          }
          .news_box {
            .news_tag {
              margin-top: 20px;
              > p {
                background: #eee;
                display: inline-block;
                padding: 7px 13px 4px;
                border-radius: 18px;
                margin-right: 10px;
              }
            }
            .news_title {
              margin-top: 20px;
              > h3 {
                font-size: 18px;
                line-height: 27px;
                font-weight: bold;
              }
              > p {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
                margin-top: 20px;
              }
            }
          }
        }
        &_item:nth-child(3n) {
          margin-right: 0;
        }
      }
      .active {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
