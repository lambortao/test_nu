<template>
  <div class="content">
    <template v-if="isEmpty">
      <div class="empty_box">
        <div class="empth_img">
          <img
            src="~/assets/images/icon/null.png"
            alt=""
          >
        </div>
        <div class="empty_desc">
          <h5>您可以创建不同主题的灵感簿。</h5>
          <p>并将收藏夹中收录的产品、文章、视频选择添加其中，形成属于您的家居设计灵感剪藏本。</p>
          <p>并可分享给您的家人或朋友，或生成产品清单。</p>
          <p> 现在就开始吧！</p>
        </div>
        <div class="empty_btn">
          <button @click="creatToParent()">
            创建第一个灵感簿
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="insipirList_box">
        <div class="insipirList_item">
          <div class="title_box">
            <div class="title_box_left">
              <div>
                <h3>Meiko的卧室</h3>
                <span class="title_icon"><img
                  src="~/assets/images/icon/edit.png"
                  alt=""
                ></span>
              </div>
              <div>
                <p>世界只有黑白但是有香味</p>
              </div>
            </div>
            <div class="title_box_right">
              <div class="inspire_share_item">
                <div class="title_icon">
                  <img
                    src="~/assets/images/icon/export.png"
                    alt=""
                  >
                </div>
                <p>导出</p>
              </div>
              <div class="inspire_share_item">
                <div class="title_icon">
                  <img
                    src="~/assets/images/icon/share.png"
                    alt=""
                  >
                </div>
                <p>分享</p>
              </div>
            </div>
          </div>
          <div class="content_box">
            <div class="tabs_box">
              123
            </div>
            <div class="">
              <ArticleList list-type="product" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// 文章或产品列表类型type :product article
// 显示排序或者创建灵感簿
import ArticleList from '~/components/common/List/ArticleList.vue'
export default {
  name: 'ArticleListComponent',
  components: {
    ArticleList
  },
  props: {
    tabList: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    listType: {
      type: String,
      default: 'article'
    },
    isEmpty: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    activeIndex: 0,
    tagList: ['collection', 'HAY']
  }),
  methods: {
    tabChange (index) {
      this.activeIndex = index
    },
    creatToParent () {
      this.$emit('showDialog', true)
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  object-fit: contain;
}
.content {
  width: 100%;
  min-height: 500px;
  > .empty_box {
    // display: none;
    max-width: 793px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 200px;
    > .empth_img {
      width: 188px;
      margin: 0 auto;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    > .empty_desc {
      text-align: center;
      margin-top: 23px;
      h5 {
        font-size: 18px;
        line-height: 2;
      }
      p {
        font-size: 18px;
        line-height: 2;
        opacity: 0.8;
      }
    }
    > .empty_btn {
      width: 300px;
      height: 60px;
      border: 1px solid #000;
      margin: 44px auto 0;
      button {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        color: #000;
        font-size: 14px;
        letter-spacing: 0.78px;
        cursor: pointer;
      }
    }
  }
  > .insipirList_box {
    padding: 60px 0 100px;
    > .insipirList_item {
      margin-bottom: 40px;
      border: 1px solid #ddd;
      padding: 40px;
      > .title_box {
        display: flex;
        justify-content: space-between;
        > .title_box_left {
          > div:first-child {
            display: flex;
            align-items: center;
            h3 {
              font-size: 36px;
              line-height: 54px;
            }
          }
          > div:nth-child(2) {
            margin-top: 10px;
            color: rgba(0, 0, 0, 0.6);
          }
        }
        > .title_box_right {
          display: flex;
          align-items: center;
          > .inspire_share_item {
            display: flex;
            align-items: center;
            cursor: pointer;
            p {
              font-size: 18px;
              margin-left: 18px;
            }
          }
          > .inspire_share_item:nth-child(1) {
            margin-right: 37px;
          }
        }
        .title_icon {
          display: block;
          width: 20px;
          height: 20px;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
