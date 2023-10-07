<template>
  <div class="site-is-default">
    <div class="news_detail_container">
      <div class="product_detail_box">
        <div class="product_intro default-width">
          <div class="product_intro_left">
            <div class="product_preview_box">
              <template v-if="is_sku">
                <img
                  :src="skuImg"
                  alt=""
                >
              </template>
              <template v-else>
                <img
                  :src="previewImg?previewImg:productDetail.images[0]"
                  alt=""
                >
              </template>
            </div>
            <div class="product_preview_list">
              <template v-if="is_sku">
                <div
                  v-for="(item,index) in previewList"
                  :key="item"
                  :class="['product-preview-item',productImgNum === index?'active':'']"
                  @click="changepreviewImg(index)"
                >
                  <img
                    :src="item"
                    alt=""
                  >
                </div>
              </template>
              <template v-else>
                <div
                  v-for="(item,index) in productDetail.images"
                  :key="item"
                  :class="['product-preview-item',productImgNum === index?'active':'']"
                  @click="changepreviewImg(index)"
                >
                  <img
                    :src="item"
                    alt=""
                  >
                </div>
              </template>
            </div>
          </div>
        </div>
        <template v-if="is_sku">
          <div class="product_param default-width">
            <div class="product_param_title">
              <h3>规格参数</h3>
            </div>
            <div class="product_param_content">
              <div
                v-for="item in productDetail.children[0].spec"
                :key="item"
                class="product_param_item"
              >
                <p><span>{{ item.label }} :</span> <span>{{ item.value }}</span></p>
              </div>
            </div>
          </div>
        </template>
        <template v-if="productDetail.content!==''">
          <div class="product_introduce">
            <div class="product_introduce_title default-width">
              <h3>产品介绍</h3>
            </div>
            <div class="product_introduce_content default-width">
              <p>
                {{ productDetail.content }}
              </p>
            </div>
            <!-- <div class="product_introduce_list">
            <swiper-component>
              <SwiperSlide
                v-for="item in bannerList"
                :key="item"
                class="swiper-slide"
              >
                <figure class="swiper-img">
                  <img
                    src="~/assets/images/img/img2.png"
                    alt=""
                  >
                </figure>
              </SwiperSlide>
            </swiper-component>
          </div> -->
          </div>
        </template>
        <template v-if="productDetail.recommend_list.length>0">
          <div class="product_recommond default-width">
            <div class="product_recommond_title">
              <h3>搭配推荐</h3>
            </div>
            <div class="product_recommond_content">
              <div
                v-for="(item) in productDetail.recommend_list"
                :key="item.alias"
                class="product_recommond_item"
                @click="toDetail(item.alias)"
              >
                <figure>
                  <img
                    :src="item.thumbnail"
                    alt=""
                  >
                </figure>
                <p>{{ item.title }}</p>
                <p>
                  <span
                    v-for="brand in item.brandids"
                    :key="brand"
                  >{{ brand }}</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <mobile-product-detail class="site-is-mobile" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import swiperComponent from '../components/swiperComponent.vue'
import MobileProductDetail from '~/pages/mobile/product/detail/index.vue'
import quality1 from '~/assets/images/icon/quality1.png'
import quality2 from '~/assets/images/icon/quality2.png'
export default {
  name: 'ProductDetailPage',
  components: {
    MobileProductDetail
  },
  data () {
    return {
      id: '',
      showParam: true,
      bannerList: [1, 2, 3, 4, 5],
      showBuyList: false,
      qualityData: {
        yearImg: '',
        softrollDesc: ''
      },
      previewImg: '',
      previewList: null,
      productImgNum: 0,
      is_sku: false,
      childrenDetail: null,
      skuNum: null,
      skuImg: null
    }
  },
  computed: {
    ...mapState('product', {
      productDetail: state => state.productDetail
    })
  },
  mounted () {
    window.scrollTo(0, 0)
    const productId = this.$route.query.id
    this.getDetailData(productId)
  },

  methods: {
    ...mapActions({
      getProductDetail: 'product/getProductDetail'
    }),
    async getDetailData (method) {
      const requestData = {
        method
      }
      this.$store.commit('product/setRequestDetailData', requestData)
      this.productDetail = await this.getProductDetail()
      this.qualityData = this.dealQualityData(this.productDetail)
      this.previewList = this.productDetail.images
    },
    dealQualityData (data) {
      let numDesc = ''
      if (data.children && data.children.length > 0) {
        numDesc = data.children.length < 10 ? `共${data.children.length}种可选规格` : '多种可选规格'
      }
      const newQuality = {
        yearImg: data.warranty === '3' ? quality1 : data.warranty === '5' ? quality2 : '',
        softrollDesc: data.softroll === 'N' ? numDesc : '多种颜色材质可定制'
      }
      return newQuality
    },
    onSlideChange (data) {
      console.log(data)
    },
    showBuyEvent () {
      this.showBuyList = !this.showBuyList
    },
    changepreviewImg (index) {
      this.productImgNum = index
      this.previewImg = this.productDetail.images[index]
    },
    selectSku (index) {
      this.is_sku = true
      this.skuNum = index
      this.childrenDetail = this.productDetail.children[index]
      this.previewList = this.productDetail.children[index].images
      this.skuImg = this.productDetail.children[index].images[0]
    },
    selectSpu () {
      this.is_sku = false
      this.skuNum = null
    },
    toDetail (data) {
      this.getDetailData(data)
      window.scrollTo(0, 0)
    },
    toStore () {
      this.$router.push('/store')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/product-detail.scss';
</style>
