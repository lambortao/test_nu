<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div>
    <div class="site-is-default product_detail_container">
      <div class="product_detail_box">
        <div class="back bread-crumbs">
          <span @click="backUrl">产品列表页</span> > {{ productDetail.title }}
        </div>
        <div class="product_intro">
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
                  :src="previewImg ? previewImg : ((productDetail && productDetail.images) ? productDetail.images[0] : '')"
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
                  @click="changepreviewImg(index,'sku')"
                >
                  <img
                    :src="item"
                    alt=""
                  >
                </div>
              </template>
              <template v-else>
                <div
                  v-for="(item,index) in ((productDetail && productDetail.images) || [])"
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
          <div class="product_intro_right">
            <div
              v-show="true"
              class="sku_title"
            >
              <div class="product_intro_right_title">
                <h3 class="title">{{ is_sku?`${childrenDetail.title}`:`${productDetail.title_en} ${productDetail.title}` }}</h3>
                <p
                  v-if="!is_sku"
                  class="designer"
                >
                  {{ productDetail.designer }}
                </p>
                <p class="brand">
                  From<span
                    v-for="item in productDetail.brandids"
                    :key="item"
                  >{{ item?item:'' }}</span>
                </p>
                <template v-if="!is_sku">
                  <div class="quality">
                    <div v-if="productDetail.warranty && productDetail.warranty>0" class="quality_icon">
                      <figure>
                        <img
                          src="~/assets/images/icon/quality_icon.png"
                          alt=""
                        >
                      </figure>
                      <p>{{ productDetail.warranty }}年质保</p>
                    </div>
                    <div v-if="qualityData.softrollDesc!==''" class="softroll_desc">
                      {{ qualityData.softrollDesc }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div v-if="childrenDetail.price>0" class="price">
                    参考价格：￥{{ thousands(childrenDetail.price) }}
                  </div>
                </template>
              </div>
            </div>
            <div class="product_intro_right_kind">
              <div
                :class="[
                  'product_intro_kind_item',
                  { first_active: !is_sku },
                  { line: productDetail.children && productDetail.children.length > 0 }
                ]"
                @click="selectSpu"
              >
                <figure>
                  <img
                    :src="productDetail.images ? productDetail.images[0] : ''"
                    alt=""
                  >
                </figure>
              </div>
              <template v-if="productDetail.children && productDetail.children.length > 0">
                <div
                  v-for="(item,index) in productListChildren"
                  :key="item.alias"
                  :class="['product_intro_kind_item', skuNum === index ? 'active' : '']"
                  @click="selectSku(item.alias)"
                >
                  <figure>
                    <img
                      :src="item.images[0]"
                      alt=""
                    >
                  </figure>
                </div>
              </template>
              <div
                v-if="productDetail.children && productDetail.children.length>=7"
                class="product_intro_kind_item"
                @click="openProductList = !openProductList"
              >
                <p>{{ openProductList ? '收起' : '查看全部' }}</p>
              </div>
            </div>
            <!-- <div class="product_intro_tips">
              <div class="product_intro_tips_left">
                <div>
                  <img
                    src="~/assets/images/icon/light.png"
                    alt=""
                  >
                </div>
              </div>
              <div class="product_intro_tips_right">
                <p>免费送货</p>
                <p>6-8 周交货时间</p>
              </div>
            </div> -->
            <template v-if="is_sku">
              <div class="sku_btn">
                <div class="sku_buy_btn">
                  <button @click="showBuyEvent()">
                    购买方式
                  </button>
                  <div
                    v-show="showBuyList"
                    class="sku_buy_box"
                  >
                    <nuxt-link
                      class="sku_btn_item"
                      to="/store"
                    >
                      <div @click="productDetailTracking({event:'view_store_list',mode:'Store',label:'门店列表'})">
                        <p>门店列表</p>
                      </div>
                    </nuxt-link>
                    <nuxt-link
                      class="sku_btn_item"
                      to="/store?storeType=Dealers"
                    >
                      <div @click="productDetailTracking({event:'view_store_list',mode:'Store',label:'经销商列表'})">
                        <p>经销商列表</p>
                      </div>
                    </nuxt-link>
                    <a v-if="isTmailShow" href="https://hayjiaju.tmall.com/" target="_black" class="sku_btn_item">
                      <div @click="productDetailTracking({event:'jump_to_url',mode:'Products',label:'Tmall'})">
                        <p>天猫旗舰店</p>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="sku_add_btn">
                  <button v-if="productDetail.children[skuNum]&&productDetail.children[skuNum].is_collect" @click="() => handleFavorite()">
                    <div class="collect_icon">
                      <img
                        src="~/assets/images/icon/collect_active.png"
                        alt=""
                      >
                    </div>取消收藏
                  </button>
                  <button v-else @click="() => handleFavorite()">
                    <div class="collect_icon">
                      <img
                        class="collect_icon_img"
                        src="~/assets/images/icon/collect.png"
                        alt=""
                      >
                    </div>加入收藏
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="spu_btn">
                <button @click="showBuyEvent">
                  购买方式
                </button>
                <div
                  v-show="showBuyList"
                  class="spu_btn_box"
                >
                  <nuxt-link
                    class="spu_btn_item"
                    to="/store"
                  >
                    <div @click="productDetailTracking({event:'view_store_list',mode:'Store',label:'门店列表'})">
                      <p>门店列表</p>
                    </div>
                  </nuxt-link>
                  <nuxt-link
                    class="spu_btn_item"
                    to="/store?storeType=Dealers"
                  >
                    <div @click="productDetailTracking({event:'view_store_list',mode:'Store',label:'经销商列表'})">
                      <p>经销商列表</p>
                    </div>
                  </nuxt-link>
                  <a v-if="isTmailShow" href="https://hayjiaju.tmall.com/" target="_black" class="spu_btn_item">
                    <div @click="productDetailTracking({event:'view_store_list',mode:'Store',label:'天猫旗舰店'})">
                      <p>天猫旗舰店</p>
                    </div>
                  </a>
                </div>
              </div>
            </template>
          </div>
        </div>
        <template v-if="is_sku">
          <div class="product_param default-width">
            <div class="product_section_title">
              <h3>规格参数</h3>
            </div>
            <div v-if="productDetail.children[skuNum]" class="product_param_content">
              <div
                v-for="(item, index) in productDetail.children[skuNum].spec"
                :key="item.label"
                class="product_param_item default_font"
              >
                <p v-if="detailMore ? true : index < 5">
                  <span>{{ item.label }} :</span> <span>{{ item.value }}</span>
                </p>
              </div>
              <div
                v-if="productDetail.children[skuNum].spec.length > 5"
                class="content-more"
                @click="detailMore = !detailMore"
              >
                <figure>
                  <img :class="{ close: detailMore }" src="~/assets/images/icon/more.png" alt="">
                </figure>
                <p>{{ detailMore ? '收起' : '更多' }}</p>
              </div>
            </div>
          </div>
        </template>
        <template v-if="productDetail.content!==''">
          <div class="product_introduce default-width">
            <div class="product_section_title">
              <h3>产品介绍</h3>
            </div>
            <div class="product_introduce_content default_font">
              <p v-html="productDetail.content" />
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
        <template v-if="productDetail.recommend_list && productDetail.recommend_list.length>0">
          <div class="product_recommond default-width">
            <div class="product_section_title">
              <h3>搭配推荐</h3>
            </div>
            <div class="product_recommond_content">
              <nuxt-link
                v-for="(item) in productDetail.recommend_list"
                :key="item.alias"
                class="product_recommond_item"
                :to="`/product/detail?id=${item.alias}`"
              >
                <div @click="productDetailTracking({event:'view_product',mode:'Products',label:item.title_en,items:[{CMSId: item.alias,brand:item.brandids.join(','),source:'Recommendations'}]})">
                  <figure
                    :style="{ backgroundImage: `url(${item.thumbnail})` }"
                  />
                  <p>{{ item.title }}</p>
                  <p>
                    <span
                      v-for="brand in item.brandids"
                      :key="brand"
                    >{{ brand }}</span>
                  </p>
                </div>
              </nuxt-link>
            </div>
          </div>
        </template>
      </div>
    </div>
    <mobile-product-detail
      class="site-is-mobile"
      :sku-num="skuNum"
      @childUpdateSku="selectSku"
      @childUpdateSpu="selectSpu"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MobileProductDetail from '~/pages/mobile/product/detail/index.vue'
export default {
  name: 'ProductDetailPage',
  components: {
    MobileProductDetail
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.fullPath === '/') {
        vm.$store.commit('product/setGoBackHome', true)
      }
      return true
    })
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
      previewList: [],
      productImgNum: 0,
      is_sku: false,
      childrenDetail: null,
      skuNum: null,
      skuImg: null,
      /** 是否展开子列表 */
      openProductList: false,
      isTmailShow: false,
      // 是否展开
      detailMore: false
    }
  },
  async fetch () {
    const productId = this.$route.query.id
    if (productId) {
      this.$store.commit('product/setRequestDetailData', { method: productId })
      await this.getProductDetail()
      this.qualityData = this.dealQualityData(this.productDetail)
      this.previewList = this.productDetail.images
      const { sku } = this.$route.query
      if (sku) {
        this.selectSku(sku)
      } else {
        this.selectSpu()
      }
    } else {
      this.$store.commit('site/setErrorData', '链接有误，请确认后重试！')
      this.$router.push('/product')
    }
  },
  head () {
    return {
      title: `Nine United官网-${this.productDetail.title}`
    }
  },
  computed: {
    ...mapState({
      productDetail: state => state.product.productDetail
    }),
    checkLoginStatus () {
      return this.$store.getters['login/checkLoginStatus']
    },
    productListChildren () {
      if (this.productDetail.children && this.productDetail.children.length) {
        return this.openProductList
          ? this.productDetail.children
          : this.productDetail.children.slice(0, 6)
      } else {
        return []
      }
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  beforeDestroy () {
    this.$store.commit('product/setGoBackHome', false)
  },
  methods: {
    ...mapActions({
      getProductDetail: 'product/getProductDetail'
    }),
    handleFavorite (data) {
      if (this.checkLoginStatus && this.productDetail.children[this.skuNum]) {
        // eslint-disable-next-line camelcase
        const { is_collect, alias, title_en, spec } = this.productDetail.children[this.skuNum]
        this.$store.dispatch('product/toggleProductFavite', alias)
        // eslint-disable-next-line camelcase
        if (!is_collect) {
          // eslint-disable-next-line camelcase
          this.productDetailTracking({
            event: 'add_to_favorites',
            label: '加入收藏',
            items: [{
              CMSId: alias,
              // eslint-disable-next-line camelcase
              name: title_en,
              brand: spec.filter(item => item.label === '品牌')[0].value,
              code: spec.filter(item => item.label === '编码')[0].value
            }]
          })
        }
      } else {
        this.$router.push('/login')
      }
    },
    dealQualityData (data) {
      let numDesc = ''
      if (data.children && data.children.length > 0) {
        numDesc = data.children.length < 10 ? `共${data.children.length}种可选规格` : '多种可选规格'
      }
      const newQuality = {
        softrollDesc: data.softroll === 'N' ? numDesc : '多种颜色材质可定制'
      }
      return newQuality
    },
    showBuyEvent () {
      /** 只有 HAY 品牌才会出现弹窗 */
      this.showBuyList = !this.showBuyList
      if (this.productDetail.brandids && Array.isArray(this.productDetail.brandids) && this.productDetail.brandids.includes('HAY')) {
        this.isTmailShow = true
      }
    },
    changepreviewImg (index, type) {
      this.productImgNum = index
      // 根据type判断是sku还是spu大图
      if (type === 'sku') {
        this.skuImg = this.previewList[index]
      } else {
        this.previewImg = this.productDetail.images[index]
      }
    },
    selectSku (alias) {
      // 初始化spu、sku轮播图下标
      this.productImgNum = 0
      const index = this.productDetail.children.findIndex(item => item.alias === alias)
      this.is_sku = true
      this.skuNum = index
      const selectedChildDetail = this.productDetail.children.filter(item => item.alias === alias)
      this.childrenDetail = selectedChildDetail[0]
      this.$router.push({
        query: { ...this.$route.query, sku: alias }
      })
      this.previewList = selectedChildDetail[0].images
      this.skuImg = selectedChildDetail[0].images[0]
      // eslint-disable-next-line camelcase
      const { spec, title_en } = selectedChildDetail[0]
      this.productDetailTracking({
        event: 'view_product',
        // eslint-disable-next-line camelcase
        label: title_en,
        items: [{
          CMSId: alias,
          source: 'SKU',
          brand: spec.filter(item => item.label === '品牌')[0].value,
          code: spec.filter(item => item.label === '编码')[0].value
        }]
      })
    },
    selectSpu () {
      // 初始化spu、sku轮播图下标
      this.productImgNum = 0
      this.previewImg = this.productDetail.images[0]
      this.is_sku = false
      this.skuNum = null
      const nowQuery = { ...this.$route.query }
      if (nowQuery.sku) {
        delete nowQuery.sku
      }
      this.$router.push({
        query: { ...nowQuery }
      })
      this.productDetailTracking({ event: 'view_product', label: this.productDetail.title_en, items: [{ CMSId: this.productDetail.alias, source: 'SPU', brand: this.productDetail.brandids.join(',') }] })
    },
    toStore () {
      const path = {
        path: '/store'
      }
      if (this.productDetail.brandids) {
        path.query = {
          brand: this.productDetail.brandids.join(',')
        }
      }
      this.$router.push(path)
    },
    // 价格格式化
    thousands (num) {
      const str = num.toString()
      const reg =
        str.includes('.') ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
      try {
        if (str) {
          return str.replace(reg, '$1,')
        } else {
          return ''
        }
      } catch (error) {
        console.log(error)
      }
    },
    backUrl () {
      console.log(this.$store.state.product.goBackHome)
      if (this.$store.state.product.goBackHome) {
        this.$router.push('/product')
      } else {
        this.$router.go(-1)
      }
    },
    productDetailTracking ({ event, mode, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Products-detail', event, mode: mode || 'Products', label, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/product-detail.scss';
.bread-crumbs {
  span {
    cursor: pointer;
  }
}
</style>
