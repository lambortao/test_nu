<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="banner">
      <SwiperMain :options="swiperOption">
        <SwiperSlide v-for="item in bannerList" :key="item.orderby">
          <!-- <nuxt-link
            class="swiper-img"
            :to="`/en/${item.link_web}`"
          > -->
          <div
            v-if="item.images"
            class="swiper-img"
            @click="toEnProduct({link:item.link_web_en,title:item.title})"
          >
            <video
              v-if="item.images.isVideo"
              autoplay
              loop
              controls
              class="swiper-img"
            >
              <source
                :src="item.images.url"
                type="video/mp4"
              >
            </video>
            <figure v-else class="swiper-img">
              <img :src="item.images.url" alt="">
            </figure>
          </div>
          <!-- <div class="banner-content">
            <div class="title">
              <h3 v-html="item.title" />
              <p v-html="item.des" />
            </div>
            <div class="brand">
              {{ item.brand }}
            </div>
          </div> -->
        </SwiperSlide>
        <div slot="pagination" class="swiper-pagination" />
      </SwiperMain>
    </div>
    <div v-if="false" class="activity-list">
      <h3 class="title">近期活动</h3>
      <SwiperMain :options="swiperOption">
        <SwiperSlide v-for="item in reserveList" :key="item.reserve_id">
          <nuxt-link :to="`/en/?id=${item.reserve_id}`" tag="div" class="activity-singe">
            <figure><img :src="item.list_tmb" :alt="item.title"><span>{{ item.status }}</span></figure>
            <div class="activity-content">
              <h4>{{ item.title }}</h4>
              <div class="activity-date">
                <span>{{ item.reserve_time }}</span>
              </div>
            </div>
          </nuxt-link>
        </SwiperSlide>
        <div slot="pagination" class="swiper-pagination dark" />
      </SwiperMain>
    </div>
    <nuxt-link
      to="/en/product?form=new"
      class="new-products-online"
      tag="div"
      :class="[{ top: !showReserve }]"
    >
      <div @click="homeTracking({event:'view_product_list', mode:'Products',label:' View All'})">
        <figure><img src="~/assets/images/AAmobile/home/new-product-online.jpg" alt=""></figure>
        <div class="content">
          <p>New Arrivals</p>
        </div>
      </div>
    </nuxt-link>
    <div class="out-brand">
      <h3 class="title">Our Brands</h3>
      <div class="out-brand-list">
        <nuxt-link to="/en/brand/hay" tag="figure">
          <img src="~/assets/images/AAmobile/home/hay.jpg" alt="HAY" @click="brandTracking('HAY')">
        </nuxt-link>
        <nuxt-link to="/en/brand/tradition" tag="figure">
          <img src="~/assets/images/AAmobile/home/tradition.jpg" alt="tradition" @click="brandTracking('&Tradition')">
        </nuxt-link>
        <nuxt-link to="/en/brand/frandsen" tag="figure">
          <img src="~/assets/images/AAmobile/home/frandsen.jpg" alt="frandsen" @click="brandTracking('Frandsen')">
        </nuxt-link>
        <nuxt-link to="/en/brand/verpan" tag="figure">
          <img src="~/assets/images/AAmobile/home/uerpan.jpg" alt="verpan" @click="brandTracking('VERPAN')">
        </nuxt-link>
        <nuxt-link to="/en/brand/studio" tag="figure">
          <img src="~/assets/images/AAmobile/home/studio-en.png" alt="studio" @click="brandTracking('STUDIO9')">
        </nuxt-link>
      </div>
    </div>
    <div class="project-showcase">
      <h3 class="title">Inspiration</h3>
      <nuxt-link to="/en/case">
        <div class="project-showcase-box">
          <figure @click="homeTracking({event:'view_inspiration_list',mode:'Inspiration',label:'View All'})">
            <nuxt-link to="/en/case" tag="span">
              <img src="~/assets/images/AAmobile/home/project-showcase.png" alt="">
            </nuxt-link>
          </figure>
        </div>
      </nuxt-link>
    </div>
    <div v-if="videoList.length" class="video-list">
      <SwiperMain :options="swiperOption">
        <SwiperSlide v-for="(item, index) in videoList" :key="item.name">
          <div class="swiper-img-video">
            <video :ref="item.name" :controls="hideVideoShadeIndex.includes(index)" :src="item.sourceSrc" :poster="item.poster" alt="" />
            <div v-if="!hideVideoShadeIndex.includes(index)" class="shade" @click="playVideo(item.name, index)">
              <figure><img :src="item.logoSrc" alt=""></figure>
              <i class="play" />
            </div>
          </div>
        </SwiperSlide>
        <div slot="pagination" class="swiper-pagination" />
      </SwiperMain>
    </div>
    <div class="project-showcase store">
      <nuxt-link to="/en/store" class="project-showcase-box">
        <div @click="homeTracking({event:'view_store_list',mode:'Store',label:'View All' })">
          <figure><img src="~/assets/images/AAmobile/home/store.jpg" alt=""></figure>
          <div class="project-showcase-content">
            <h5>Our Stores & Dealers</h5>
            <div tag="span">View All</div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="footer">
      <!-- <figure><img src="~/assets/images/AAmobile/home/logo.png" alt="LOGO"></figure>
      <p class="about-us about-us_en">
        Nine United was established in 2001 in Horsens, Denmark, operating across several industries such as retail branding, furniture design, and healthcare. Our Group carries four home furnishing brands in Asia-Pacific including HAY, &Tradition, VERPAN and FRANDSEN. Our brands are dedicated to creating a functional and decorative experience for both commercial and residential spaces.
      </p> -->
      <div class="footer-img">
        <figure>
          <img src="~/assets/images/AAmobile/home/en-footer.png" alt="">
        </figure>
      </div>
      <div class="footer-content">
        <div class="link link-en">
          <nuxt-link to="/en/brand/nine"><span @click="footerTracking({event:'view_brand',mode:'Brands',label:'About'})">About</span></nuxt-link>
          <nuxt-link to="/en/case"><span @click="footerTracking({event:'view_inspiration_list',mode:'Inspiration',label:'Project Showcase'})">Project Showcase</span></nuxt-link>
          <nuxt-link to="/en/store"><span @click="footerTracking({event:'view_inspiration_list',mode:'Inspiration',label:'Stores&Dealers'})">Stores&Dealers</span></nuxt-link>
        </div>
        <div class="link link-en">
          <nuxt-link to="/en/policy">Privacy Policy</nuxt-link>
          <nuxt-link to="/en/clause">Terms of Use</nuxt-link>
          <nuxt-link to="/en/contactus"><span @click="footerTracking({event:'view_inspiration_list',mode:'Inspiration',label:'Contact US'})">Contact US</span></nuxt-link>
        </div>
        <div class="copyright copyright-en">
          <p>COPYRIGHT © NINE UNITED INC. RIGHTS RESERVED.</p>
          <p v-if="false">沪ICP备2022019890号-1</p>
        <!-- <p v-if="false">
          公安备案号：31010102005799
        </p> -->
        </div>
      </div>
    </div>
    <newsLetter />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import newsLetter from './newsLetter.vue'
import poster from '~/assets/images/img/logoImg1.jpg'
import video1 from '~/assets/video/HAY_Video_Web.mp4'
import logoImg1 from '~/assets/images/brand/hay_logo.png'
import video2 from '~/assets/video/video1.mp4'
import logoImg2 from '~/assets/images/brand/tradition_logo.png'
import poster1 from '~/assets/images/img/home_img1.png'
export default {
  name: 'IndexPage',
  components: {
    newsLetter
  },
  data () {
    return {
      videoList: [{
        name: 'HAY',
        sourceSrc: video2,
        logoSrc: logoImg2,
        poster
      }, {
        name: 'tradition',
        sourceSrc: video1,
        logoSrc: logoImg1,
        poster: poster1
      }],
      hideVideoShadeIndex: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      }
    }
  },
  async fetch () {
    try {
      await this.$store.dispatch('home/getHomeApi')
      /** 登录了才可以获取预约列表 */
      if (this.isLogin) {
        await this.$store.dispatch('home/getReserveList')
      }
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    ...mapState({
      bannerList: state => state.home.deviceBannerList.mobile,
      reserveList: state => state.home.reserveList
    }),
    isLogin () { return this.$store.getters['login/checkLoginStatus'] },
    /** 检查登录状态，近期活动版块未登录不显示 */
    showReserve () { return this.reserveList.length }
  },
  methods: {
    toEnProduct ({ link, title }) {
      this.$router.push(link)
      this.homeTracking({ event: 'view_product_list', mode: 'Products', label: title })
    },
    playVideo (refs, index) {
      if (this.$refs[refs] && this.$refs[refs][0]) {
        this.hideVideoShadeIndex.push(index)
        this.$refs[refs][0].play()
        const duration = this.$refs[refs][0].duration
        const name = index === 0 ? 'HAY Click play' : index === 1 ? 'ATD Click play' : ''
        this.homeTracking({ event: 'video_start', mode: 'Video', label: name, items: [{ video_title: name, video_duration: duration }] })
      }
    },
    brandTracking (data) {
      this.homeTracking({ event: 'view_brand', mode: 'Brands', label: data })
    },
    homeTracking ({ event, mode, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Home', event, mode, label, items })
    },
    footerTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { event, mode: mode ? `${mode},Footer` : 'Footer', label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/home.scss';
</style>
