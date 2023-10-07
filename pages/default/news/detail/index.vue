<template>
  <div>
    <div class="news_container default-width site-is-default">
      <div class="news">
        <div class="news_title_box">
          <div class="news_title">
            <h1>再一次，与VERPAN一起重温经典</h1>
            <p>2021-09-27</p>
          </div>
          <div class="news_tag">
            <Tags :tag-list="tagList" />
          </div>
        </div>
        <div class="news_content_box">
          <div class="news_content">
            <div v-html="newsContent" />
          </div>
          <div class="news_extra_list">
            <div class="news_list_item">
              <div class="news_list_item_img">
                <img
                  src="~/assets/images/news/news_img.png"
                  alt=""
                >
              </div>
              <div class="news_list_item_title">
                现场，呈现极具创新性与挑战性的家具世界，充分表达了物件独立性以及空间融洽氛围感，进
              </div>
            </div>
            <div class="news_list_item">
              <div class="news_list_item_img">
                <img
                  src="~/assets/images/news/news_img.png"
                  alt=""
                >
              </div>
              <div class="news_list_item_title">
                现场，呈现极具创新性与挑战性的家具世界，充分表达了物件独立性以及空间融洽氛围感，进
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-new-detail class="site-is-mobile" />
  </div>
</template>

<script>
import Tags from '~/components/common/Tag.vue'
import MobileNewDetail from '~/pages/mobile/news/detail/index.vue'
export default {
  name: 'NewsDetailPage',
  components: {
    Tags,
    MobileNewDetail
  },
  data: () => ({
    tagList: ['Verpan', 'news'],
    newsContent: '<p style="color:red;margin-bottom:75px">2021 3daysofdesign 丹麦三日设计节于9月16日-18日在哥本哈根举行，作为丹麦规模最大的设计盛会，以满城好设计盛邀设计爱好者们前来参与。VERPAN 以蓝色为主题，将 Verner Panton 的经典设计和新品带去现场，呈现极具创新性与挑战性的家具世界，充分表达了物件独立性以及空间融洽氛围感，进一步展现 Panton 早期对柔和、平静的理想生活的憧憬。</p><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0143285aa644bca80121246dd30e8d.jpg%402o.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660198848&t=141fb7e0a70a333dcc2b80fc2152381c" style="width:100%;object-fit:contain;" />'
  })
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  object-fit: contain;
}
.news {
  max-width: 1305px;
  margin: 0 auto;
  min-height: 500px;
  padding: 40px 0 190px;
  > .news_title_box {
    .news_title {
      > h1 {
        display: block;
        font-size: 36px;
        line-height: 50px;
      }
      > p {
        font-size: 14px;
        font-weight: bold;
      }
    }
    > .news_tag {
      margin-top: 17px;
    }
  }
  > .news_content_box {
    margin-top: 68px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    > .news_content {
      width: 848px;
    }
    > .news_extra_list {
      width: 355px;
      > .news_list_item {
        cursor: pointer;
        position: relative;
        margin-bottom: 20px;
        .news_list_item_img {
          line-height: 0;
        }
        .news_list_item_title {
          color: #fff;
          width: 355px;
          height: 37px;
          background: url("~/assets/images/news/title_bg.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          line-height: 37px;
          padding: 0 16px;
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
