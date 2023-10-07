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
      <div v-if="productDetail.images" class="product-nav-spu">
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
              <img v-if="item.images" :src="item.images && item.images[0]" :alt="item">
            </figure>
            <div class="more" @click="handleMore(0)">
              <p>全部<br>共{{ productDetail.children.length }}款</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <section class="detail-content">
      <header>
        <h1 v-if="detailData">{{ skuIndex === -1?`${detailData.title_en} ${detailData.title}`:` ${detailData.title}` }}</h1>
        <div v-if="detailData&&detailData.price" class="price">
          <p>参考价格：￥{{ (detailData.price).toLocaleString() }} <span v-if="skuIndex === -1">起</span></p>
        </div>
        <div
          v-if="skuIndex === -1"
          class="warranty-box"
        >
          <p v-if="productDetail.warranty && productDetail.warranty>0" :class="['warranty', `year${productDetail.warranty}`]"><b>{{ productDetail.warranty }}</b> 年质保</p>
          <p v-if="productDetail.children.length" class="standard">{{ productDetail.children.length }}种规格可选</p>
        </div>
        <div v-if="false" class="delivery">
          <figure><img src="~/assets/images/AAmobile/product/remind.png" alt="送货提示"></figure>
          <div class="delivery-content">
            <p v-html="productDetail.remarks" />
          </div>
        </div>
      </header>
      <div v-show="skuIndex > -1" class="standard-list">
        <h3>规格参数</h3>
        <ul v-if="productDetail.children && productDetail.children[skuIndex] && productDetail.children[skuIndex].spec">
          <li v-for="item in productDetail.children[skuIndex].spec" :key="item.label">
            <p>{{ item.label }}:</p>
            <p>{{ item.value }}</p>
          </li>
        </ul>
      </div>
      <article v-show="productDetail.content !== ''">
        <h3>产品介绍</h3>
        <div v-html="productDetail.content" />
      </article>
    </section>
    <div v-if="productDetail.recommend_list.length" class="commend">
      <h3>搭配推荐</h3>
      <div class="commend-list">
        <nuxt-link
          v-for="item in productDetail.recommend_list"
          :key="item.alias"
          class="commend-detail"
          :to="`/product/detail?id=${item.alias}`"
        >
          <div @click="productTracking({event:'view_product',mode:'Products',label:item.title_en,items:[{CMSId:item.alias,brand:item.brandids.join(','),source:'Recommendations'}]})">
            <figure><img :src="item.thumbnail" :alt="item.title"></figure>
            <div class="commend-content">
              <div class="commend-content-title">
                <p>{{ item.title }}</p>
              </div>
              <div class="brand-list">
                <small v-for="brand in item.brandids" :key="brand">{{ brand }}</small>
              </div>
            </div>
          </div>
        </nuxt-link>
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
          <figure><img v-if="item.images" :src="item.images[0]" alt="图片"></figure>
          <p>{{ item.title }}</p>
        </div>
      </div>
      <div v-show="popupShowType === 1" class="popup-buy">
        <div class="methods-1">
          <p>方法一：</p>
          <small>进入天猫旗舰店在线购买</small>
          <div @click="productTracking({event:'jump_to_url',mode:'Products',label:'Tmall'})">
            <a target="_blank" href="https://hayjiaju.tmall.com/">进入HAY家居旗舰店</a>
          </div>
        </div>
        <i />
        <div class="methods-1">
          <p>方法二：</p>
          <small>前往线下门店亲自体验</small>
          <div @click="productTracking({event:'view_store_list',mode:'Store',label:'门店列表'})">
            <a href="javascript:;" @click="toStore('HAY')">查看HAY门店列表</a>
          </div>
        </div>
      </div>
    </popup-component>
    <div class="fixed-button">
      <div class="footer-control">
        <p><span>Form</span> <small v-for="brand in productDetail.brandids" :key="brand">{{ brand }}</small></p>
        <template v-if="skuIndex > -1">
          <div v-if="detailData&&detailData.is_collect" class="favorite" @click="() => handleFavorite(detailData.alias)">
            <img src="~/assets/images/AAmobile/product/start-active.png" alt="收藏图标">
            <span>取消收藏</span>
          </div>
          <div v-else class="favorite" @click="() => handleFavorite(detailData.alias)">
            <img src="~/assets/images/AAmobile/product/start.png" alt="收藏图标">
            <span>收藏</span>
          </div>
        </template>
      </div>
      <p v-if="!productDetail.brandids.includes('HAY')" @click="toStore()">购买方式</p>
      <p v-else @click="handleMore(1)">购买方式</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SwiperComponent from '../components/SwiperComponent.vue'
import PopupComponent from '~/components/AAMobile/PopupComponent/index.vue'

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
        console.log(this.productDetail.children[this.skuIndex], 'this.productDetail.children[this.skuIndex]')
        return this.productDetail.children[this.skuIndex]
      } else {
        console.log(Object.assign(this.productDetail, {
          price: this.productDetail.min_price
        }), 'productDetail')
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
        path: '/store'
      }
      if (brand) {
        path.query = { brand }
      } else if (this.productDetail.brandids) {
        path.query = {
          brand: this.productDetail.brandids.join(',')
        }
      }
      this.$router.push(path)
      this.productTracking({ event: 'view_store_list', mode: 'Store', label: '门店列表' })
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
        this.popupTitle = `共 ${this.productDetail.children.length} 种规则可选`
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
          this.productTracking({ event: 'add_to_favorites', label: '加入收藏', items: [{ CMSId: items[0].alias, name: items[0].title_en, brand: items[0].spec.filter(item => item.label === '品牌')[0].value, code: items[0].spec.filter(item => item.label === '编码')[0].value }] })
        }
      } else {
        this.$router.push('/login')
      }
    },
    productTracking ({ event, mode, label, items }) {
      this.selectedAlias = ''
      this.skuIndex = -1
      this.$store.dispatch('site/tracker', { page: 'Products-detail', event, mode: mode || 'Products', label, items })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/product-detail.scss';
</style>
