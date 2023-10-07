<template>
  <div class="content">
    <template v-if="listType=='article'">
      <div class="tab_ani">
        <div class="tab_content">
          <div class="article_list_item">
            <div class="news_img">
              <img
                src="~/assets/images/news/news_img.png"
                alt=""
              >
            </div>
            <div class="news_box">
              <div
                v-if="tagList && tagList.length!==0"
                class="news_tag"
              >
                <tag :tag-list="tagList" />
              </div>
              <div class="news_title">
                <h3>特别“出色”的Flowerpot</h3>
                <p>穿过半个多世纪，持续为光延续生命力。</p>
              </div>
            </div>
          </div>
          <div class="article_list_item">
            <div class="news_img">
              <img
                src="~/assets/images/news/news_img.png"
                alt=""
              >
            </div>
            <div class="news_box">
              <div
                v-if="tagList && tagList.length!==0"
                class="news_tag"
              >
                <tag :tag-list="tagList" />
              </div>
              <div class="news_title">
                <h3>特别“出色”的Flowerpot</h3>
                <p>穿过半个多世纪，持续为光延续生命力。</p>
              </div>
            </div>
          </div>
          <div class="article_list_item">
            <div class="news_img">
              <img
                src="~/assets/images/news/news_img.png"
                alt=""
              >
            </div>
            <div class="news_box">
              <div
                v-if="tagList && tagList.length!==0"
                class="news_tag"
              >
                <tag :tag-list="tagList" />
              </div>
              <div class="news_title">
                <h3>特别“出色”的Flowerpot</h3>
                <p>穿过半个多世纪，持续为光延续生命力。</p>
              </div>
            </div>
          </div>
          <div class="article_list_item">
            <div class="news_img">
              <img
                src="~/assets/images/news/news_img.png"
                alt=""
              >
            </div>
            <div class="news_box">
              <div
                v-if="tagList && tagList.length!==0"
                class="news_tag"
              >
                <tag :tag-list="tagList" />
              </div>
              <div class="news_title">
                <h3>特别“出色”的Flowerpot</h3>
                <p>穿过半个多世纪，持续为光延续生命力。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="listType=='product'">
      <div :class="column===4?'tab_content':'tab_content tab_content_large'">
        <div
          v-for="(item,index) in productList"
          :key="index"
          class="product_list_item"
          @click="toDetail(item.alias)"
        >
          <div class="product_img">
            <img
              src="~/assets/images/collect/product_img1.png"
              alt=""
            >
            <div class="product_tag">
              <div v-if="item.new==1">
                NEW
              </div>
              <div v-if="item.multicolor">
                muliti-color
              </div>
            </div>
          </div>
          <div class="news_box">
            <div class="news_title">
              <h3>{{ item.title }}</h3>
              <p>Design by {{ item.designer }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty_box tab_ani">
        <div class="empth_img">
          <img
            src="~/assets/images/icon/empty.png"
            alt=""
          >
        </div>
        <div class="empty_desc">
          <p>{{ emptyDesc }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// 文章或产品列表类型type :product article
// 显示排序或者创建灵感簿
import tag from '~/components/common/Tag'
export default {
  name: 'ArticleListComponent',
  components: {
    tag
  },
  props: {
    emptyDesc: {
      type: String,
      default: '暂无内容'
    },
    listType: {
      type: String,
      default: 'product'
    },
    column: {
      type: Number,
      default: 4
    },
    productList: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    hasSort: true,
    tagList: ['collection', 'HAY']
  }),
  mounted () {
    console.log(this.productList)
  },
  methods: {
    toDetail (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: 500px;
  .tab_ani {
    position: relative;
    animation: tabAni 0.5s;
  }
  .tab_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .article_list_item {
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
            margin-top: 15px;
          }
        }
      }
    }
    .article_list_item:nth-child(3n) {
      margin-right: 0;
    }
    .product_list_item {
      width: calc((100% - 159px) / 4);
      margin-right: 53px;
      margin-bottom: 80px;
      cursor: pointer;
      > .product_img {
        width: 100%;
        padding: 0 20px 5%;
        box-sizing: border-box;
        background: #f6f6f6;
        position: relative;
        img {
          width: 100%;
          // height: 100%;
          object-fit: contain;
        }
        .product_tag {
          position: absolute;
          top: 20px;
          left: 20px;
          div {
            width: 87px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            border: 1px solid;
            opacity: 0.5;
            font-size: 12px;
            white-space: nowrap;
          }
          > div:not(:first-child) {
            margin-top: 10px;
          }
        }
      }

      .news_box {
        .news_title {
          margin-top: 40px;
          > h3 {
            font-size: 18px;
            line-height: 27px;
            font-weight: bold;
          }
          > p {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 12px;
          }
        }
      }
    }
    .product_list_item:nth-child(4n) {
      margin-right: 0;
    }
  }
  .tab_content_large {
    width: 100%;
    .product_list_item {
      width: calc((100% - 128px) / 3) !important;
      margin-right: 64px;
    }
    .product_list_item:nth-child(3n) {
      margin-right: 0 !important;
    }
    .product_list_item:nth-child(4n) {
      margin-right: 64px;
    }
  }
  > .empty_box {
    max-width: 793px;
    margin: 0 auto;
    padding-top: 160px;
    padding-bottom: 200px;
    > .empth_img {
      width: 177px;
      margin: 0 auto;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    > .empty_desc {
      text-align: center;
      margin-top: 20px;
      p {
        color: #333;
        opacity: 0.4;
        font-size: 16px;
        line-height: 28px;
      }
    }
  }
  @keyframes tabAni {
    from {
      top: 20px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
}
</style>
