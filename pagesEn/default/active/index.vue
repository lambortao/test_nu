<template>
  <div class="container">
    <div class="site-is-default search_box default-width">
      <div class="active_box" />
    </div>
    <mobileSearch class="site-is-mobile" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mobileSearch from '~/pagesEn/mobile/search/index.vue'
export default {
  name: 'ActivePage',
  components: {
    mobileSearch
  },
  data: () => ({
    searchList: [], keyWord: null
  }),
  computed: {
    ...mapState('product', {

    })
  },
  mounted () {
    this.keyWord = this.$route.query.keyWord
    this.getNewList(this.keyWord)
  },
  methods: {
    ...mapActions({
      getProductList: 'product/getProductList'
    })
  }
}
</script>
<style lang="scss" scoped>
.search_box {
  padding: 180px 0;
  .search_title {
    border-bottom: 1px solid #ddd;
    padding-bottom: 30px;
    h3 {
      font-size: 36px;
    }
    .search_result_num {
      text-align: right;
      margin-top: 40px;
    }
  }
  .search_content {
    padding-top: 32px;
    > .search_content_tips {
      font-size: 22px;
    }
    > .search_content_box {
      max-width: 1080px;
      margin: 0 auto;
      .search_product_list {
        margin: 80px 0;
        &_title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          h3 {
            font-size: 24px;
          }
          > div {
            font-size: 16px;
            cursor: pointer;
          }
        }
        &_box {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          margin-top: 40px;
          > .search_product_item {
            width: calc((100% - 120px) / 4);
            margin-right: 40px;
            margin-bottom: 40px;
            cursor: pointer;
            figure{
              height: 240px;
            background: #f6f6f6;
              img{
                width: 100%;
                height: 100%;
                object-fit: fill;
              }
            }
            p{
              font-size: 18px;
              margin-top: 20px;
              text-align: center;
            }
          }
          > .search_product_item:nth-child(4n){
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
