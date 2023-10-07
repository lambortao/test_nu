<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="product-detai">
    <div v-if="detailData" class="swiper-box">
      <swiper-component>
        <SwiperSlide v-for="item in detailData.images" :key="item">
          <figure class="swiper-img">
            <img :src="item" alt="item">
          </figure>
        </SwiperSlide>
      </swiper-component>
    </div>
    <div class="product-nav">
      <div class="product-nav-spu">
        <figure :class="{active:skuIndex === -1}" @click="skuIndex = -1">
          <img :src="productDetail.images && productDetail.images[0]" alt="">
        </figure>
      </div>
      <template v-if="productDetail.children && productDetail.children.length">
        <i class="vertical-box" />
        <div class="product-nav-sku">
          <div class="product-nav-sku-list" :style="{ ...skuWidth }">
            <figure
              v-for="(item, index) in productDetail.children"
              :key="item.alias"
              :class="{ active: skuIndex!==-1 && item.alias === selectedAlias }"
              @click="selectedSku(index,item.alias)"
            >
              <!-- @click="skuIndex = index" -->
              <img :src="item.images && item.images[0]" :alt="item">
            </figure>
            <div class="more" @click="handleMore(0)">
              <p>View all</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <section class="detail-content">
      <header>
        <h1 v-if="detailData">{{ detailData.title_en }}</h1>
        <p v-if="skuIndex === -1">
          {{ productDetail.designer }}
        </p>
        <div v-if="detailData?.price&&false" class="price">
          <p>From RMBW ex.VAT {{ (detailData.price).toLocaleString() }}</p>
        </div>
        <div
          v-if="skuIndex === -1"
          class="warranty-box"
        >
          <p v-if="productDetail.warranty && productDetail.warranty>0" :class="['warranty', `year${productDetail.warranty}`]">{{ setDetailForm({type:'warranty',value:productDetail.warranty}) }}</p>
          <p v-if="productDetail.children.length>0" class="standard">{{ setDetailForm({type:'option',value:productDetail.children.length}) }}</p>
        </div>
        <div v-if="false" class="delivery">
          <figure><img src="~/assets/images/AAmobile/product/remind.png" alt="送货提示"></figure>
          <div class="delivery-content">
            <p v-html="productDetail.remarks" />
          </div>
        </div>
      </header>
      <div v-show="skuIndex > -1" class="standard-list">
        <h3>Details</h3>
        <ul v-if="productDetail.children && productDetail.children[skuIndex] && productDetail.children[skuIndex].spec">
          <li v-for="item in productDetail.children[skuIndex].spec" :key="item.label">
            <p>{{ item.label }}:</p>
            <p>{{ item.value }}</p>
          </li>
        </ul>
      </div>
      <article v-show="productDetail.content_en !== ''">
        <h3>Description</h3>
        <div v-html="productDetail.content_en" />
      </article>
    </section>
    <div v-if="productDetail.recommend_list.length" class="commend">
      <h3>Recommendations</h3>
      <div class="commend-list">
        <div
          v-for="item in productDetail.recommend_list"
          :key="item.alias"
          class="commend-detail"
          @click="recommendProduct(item.alias)"
        >
          <figure><img :src="item.thumbnail" :alt="item.title_en"></figure>
          <div class="commend-content">
            <div class="commend-content-title">
              <p>{{ item.title_en }}</p>
            </div>
            <div class="brand-list">
              <small v-for="brand in item.brandids" :key="brand">{{ brand }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup-component
      ref="popup"
      :title="popupTitle"
      @close="skuIndex = -1"
    >
      <div v-show="popupShowType === 0" class="popup-product">
        <div
          v-for="(item, index) in productDetail.children"
          :key="item.alias"
          class="popup-product-singin"
          @click="selectedSku(index, item.alias)"
        >
          <figure><img :src="item.images[0]" alt="图片"></figure>
          <p>{{ item.title_en }}</p>
        </div>
      </div>
      <div v-show="popupShowType === 1" class="popup-buy">
        <div class="methods-1">
          <p>Method 1：</p>
          <small>Enter the Tmall flagship store to buy online</small>
          <div @click="productTracking({event:'jump_to_url',mode:'Products',label:'Tmall'})">
            <a target="_blank" href="https://hayjiaju.tmall.com/">Enter HAY Home Flagship Store</a>
          </div>
        </div>
        <i />
        <div class="methods-1">
          <p>Method 2</p>
          <small>Go to offline stores for personal experience</small>
          <div @click="productTracking({event:'view_store_list',mode:'Store',label:'View the list of HAY store'})">
            <a href="javascript:;" @click="toStore('HAY')">View the list of HAY stores</a>
          </div>
        </div>
      </div>
    </popup-component>
    <div class="fixed-button">
      <div class="footer-control">
        <p><span>Form</span> <small v-for="brand in productDetail.brandids" :key="brand">{{ brand }}</small></p>
        <template v-if="skuIndex > -1">
          <div v-if="detailData?.is_collect" class="favorite" @click="handleFavorite(detailData.alias)">
            <img src="~/assets/images/AAmobile/product/start-active.png" alt="收藏图标">
            <span>unFavorite</span>
          </div>
          <div v-else class="favorite" @click="handleFavorite(detailData.alias)">
            <img src="~/assets/images/AAmobile/product/start.png" alt="收藏图标">
            <span>Favorite</span>
          </div>
        </template>
      </div>
      <!-- <p v-if="productDetail.brandids.includes('HAY')" @click="toStore">
        Find stores
      </p>
      <p v-else @click="handleMore(1)">
        Find stores
      </p> -->
      <p @click="toStore(productDetail.brandids[0])">Find stores</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SwiperComponent from '../components/SwiperComponent.vue'
import PopupComponent from '~/componentsEn/AAMobile/PopupComponent/index.vue'

export default {
  name: 'ProductDetailPage',
  components: {
    SwiperComponent,
    PopupComponent
  },
  props: {
    skuNum: {
      type: [Number, Object],
      default: -1
    }
  },
  data () {
    return {
      skuIndex: -1,
      data: [],
      popupTitle: '',
      popupShowType: 0,
      qualityData: {
        yearDesc: '',
        softrollDesc: ''
      },
      selectedAlias: ''
    }
  },
  computed: {
    ...mapState('product', {
      productDetail: state => state.productDetail
    }),
    skuWidth () {
      return {
        width: `${(this.productDetail.children.length + 1) * 19 - 2}vw`
      }
    },
    detailData () {
      if (this.skuIndex > -1) {
        return this.productDetail.children[this.skuIndex]
      } else {
        return Object.assign(this.productDetail, {
          price: this.productDetail.min_price
        })
      }
    },
    checkLoginStatus () {
      return this.$store.getters['login/checkLoginStatus']
    }
  },
  watch: {
    skuNum (val) {
      if (val && val > -1) {
        this.selectedSku(val)
        this.selectedAlias = this.productDetail.children[val].alias
      }
    }
  },
  methods: {
    toStore (brand) {
      const path = {
        path: '/en/store'
      }
      if (brand) {
        path.query = { brand }
      } else if (this.productDetail.brandids) {
        path.query = {
          brand: this.productDetail.brandids.join(',')
        }
      }
      this.$router.push(path)
      this.productTracking({ event: 'view_store_list', mode: 'Store', label: 'Find stores' })
    },
    selectedSku (index, alias) {
      if (index != null) {
        this.skuIndex = index
        this.$refs.popup.visible = false
        this.selectedAlias = alias
        if (alias) {
          this.$emit('childUpdateSku', alias)
        }
      } else {
        this.$emit('childUpdateSpu', alias)
      }
    },
    handleMore (type = 0) {
      this.popupShowType = type
      if (type === 0) {
        this.popupTitle = `A total of ${this.productDetail.children.length} rules to choose from`
      } else {
        this.popupTitle = ''
      }
      this.$refs.popup.visible = true
    },
    handleFavorite (alias) {
      if (this.checkLoginStatus) {
        this.$store.dispatch('product/toggleProductFavite', alias)
        const items = this.productDetail.children.filter(item => item.alias === alias)
        if (!items[0].is_collect) {
          this.productTracking({
            event: 'add_to_favorites',
            label: 'Favorite',
            items: [{
              CMSId: items[0].alias,
              name: items[0].title_en,
              brand: items[0].spec.filter(item => item.label === 'Brand')[0].value,
              code: items[0].spec.filter(item => item.label === 'Code')[0].value
            }]
          })
        }
      } else {
        this.$router.push('/en/login')
      }
    },
    setDetailForm (data) {
      const { type, value } = data
      if (type === 'warranty') {
        const content = value > 1 ? `${value} Years Warranty` : `${value} Year Warranty`
        return content
      } else if (type === 'option') {
        // value ==0  this.productDetail.softroll === 'N'?'More options available'
        let numDesc = ''
        const sizeText = value === 1 ? '1 option available' : `${value} options available`
        numDesc = value < 10 ? sizeText : 'Multiple Available Sizes'
        const content = this.productDetail.softroll === 'N' ? numDesc : 'More options available'
        return content
      }
    },
    productTracking ({ event, mode, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Products-detail', event, mode: mode || 'Products', label, items })
    },
    recommendProduct (alias) {
      this.selectedAlias = ''
      this.skuIndex = -1
      this.$router.push({
        path: '/en/product/detail',
        query: {
          id: alias
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/product-detail.scss';
</style>
