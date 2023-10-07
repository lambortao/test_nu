<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="container">
    <div class="banner">
      <SwiperMain :options="swiperOption">
        <SwiperSlide
          v-for="item in bannerList"
          :key="item.title"
        >
          <nuxt-link
            v-if="item.images"
            class="swiper-img"
            :to="item.link_web"
          >
            <figure
              class="swiper-img"
              @click="homeTracking({event:'view_product_list', mode:'Products',label:item.title})"
            >
              <video
                v-if="item.images.isVideo"
                autoplay
                loop
                controls
              >
                <source
                  :src="item.images.url"
                  type="video/mp4"
                >
              </video>
              <img
                v-else
                :src="item.images.url"
                alt=""
              >
            </figure>
          </nuxt-link>
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
        <div
          slot="pagination"
          class="swiper-pagination"
        />
      </SwiperMain>
    </div>
    <div
      v-if="showReserve && env !== 'production'"
      class="activity-list"
    >
      <h3 class="title">近期活动</h3>
      <SwiperMain :options="swiperOption">
        <SwiperSlide
          v-for="item in reserveList"
          :key="item.reserve_id"
        >
          <nuxt-link
            :to="`/active?id=${item.reserve_id}`"
            tag="div"
            class="activity-singe"
          >
            <div @click="homeTracking({event:'view_active', mode:'Active',label:item.title})">
              <figure>
                <img
                  :src="item.list_tmb"
                  :alt="item.title"
                ><span>{{ item.status }}</span>
              </figure>
              <div class="activity-content">
                <h4>{{ item.title }}</h4>
                <div class="activity-date">
                  <span>{{ item.reserve_time }}</span>
                </div>
              </div>
            </div>
          </nuxt-link>
        </SwiperSlide>
        <div
          slot="pagination"
          class="swiper-pagination activity dark"
        />
      </SwiperMain>
    </div>
    <nuxt-link
      to="/product?form=new"
      class="new-products-online"
      tag="div"
      :class="[{ top: !showReserve }]"
    >
      <div @click="homeTracking({event:'view_product_list', mode:'Products',label:'查看新品'})">
        <figure>
          <img
            src="~/assets/images/AAmobile/home/new-product-online.jpg"
            alt=""
          >
        </figure>
        <div class="content">
          <p>新品上线</p>
        </div>
      </div>
    </nuxt-link>
    <div class="out-brand">
      <h3 class="title">我们的品牌</h3>
      <div class="out-brand-list">
        <nuxt-link
          to="/brand/hay"
          tag="figure"
        >
          <img
            src="~/assets/images/AAmobile/home/hay.jpg"
            alt="HAY"
            @click="brandTracking('HAY')"
          >
        </nuxt-link>
        <nuxt-link
          to="/brand/tradition"
          tag="figure"
        >
          <img
            src="~/assets/images/AAmobile/home/tradition.jpg"
            alt="tradition"
            @click="brandTracking('&Tradition')"
          >
        </nuxt-link>
        <nuxt-link
          to="/brand/frandsen"
          tag="figure"
        >
          <img
            src="~/assets/images/AAmobile/home/frandsen.jpg"
            alt="frandsen"
            @click="brandTracking('Frandsen')"
          >
        </nuxt-link>
        <nuxt-link
          to="/brand/verpan"
          tag="figure"
        >
          <img
            src="~/assets/images/AAmobile/home/uerpan.jpg"
            alt="verpan"
            @click="brandTracking('VERPAN')"
          >
        </nuxt-link>
        <nuxt-link
          to="/brand/studio"
          tag="figure"
        >
          <img
            src="~/assets/images/AAmobile/home/studio.jpg"
            alt="studio"
            @click="brandTracking('STUDIO9')"
          >
        </nuxt-link>
      </div>
    </div>
    <div class="project-showcase">
      <h3 class="title">项目展示</h3>
      <div class="project-showcase-box">
        <nuxt-link to="/case">
          <figure @click="homeTracking({event:'view_inspiration_list',mode:'Inspiration',label:'查看列表'})">
            <img
              src="~/assets/images/AAmobile/home/project-showcase-cn.jpg"
              alt=""
            >
          </figure>
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="videoList.length"
      class="video-list"
    >
      <SwiperMain :options="swiperOption">
        <SwiperSlide
          v-for="(item, index) in videoList"
          :key="item.name"
        >
          <div class="swiper-img-video">
            <video
              :ref="item.name"
              :controls="hideVideoShadeIndex.includes(index)"
              :src="item.sourceSrc"
              :poster="item.poster"
              alt=""
            />
            <div
              v-if="!hideVideoShadeIndex.includes(index)"
              class="shade"
              @click="playVideo(item.name, index)"
            >
              <figure>
                <img
                  :src="item.logoSrc"
                  alt=""
                >
              </figure>
              <i class="play" />
            </div>
          </div>
        </SwiperSlide>
        <div
          slot="pagination"
          class="swiper-pagination"
        />
      </SwiperMain>
    </div>
    <div class="project-showcase store">
      <nuxt-link to="/store" class="project-showcase-box">
        <div @click="homeTracking({event:'view_store_list',mode:'Store',label:'查看列表' })">
          <figure>
            <img
              src="~/assets/images/AAmobile/home/store.jpg"
              alt=""
            >
          </figure>
          <div class="project-showcase-content">
            <h5>门店信息</h5>
            <div tag="span">查看列表</div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="footer">
      <div class="footer-img">
        <figure>
          <img src="~/assets/images/AAmobile/home/cn-footer.png" alt="">
        </figure>
      </div>
      <div class="footer-content footer-content-cn">
        <div class="link link-cn">
          <nuxt-link to="/brand/nine"><span @click="footerTracking({event:'view_brand',mode:'Brands',label:'关于'})">关于</span></nuxt-link>
          <nuxt-link to="/case"><span @click="footerTracking({event:'view_inspiration_list',mode:'Inspiration',label:'项目展示'})">项目展示</span></nuxt-link>
          <nuxt-link to="/store"><span @click="footerTracking({event:'view_store_list',mode:'Store',label:'门店信息'})">门店信息</span></nuxt-link>
        </div>
        <div class="link link-cn">
          <nuxt-link to="/policy">隐私政策</nuxt-link>
          <nuxt-link to="/clause">使用条款</nuxt-link>
          <nuxt-link to="/contactus"><span @click="footerTracking({event:'jump_to_url', label:'contactus'})">联系我们</span></nuxt-link>
        </div>
        <div class="copyright">
          <p>COPYRIGHT © NINE UNITED INC. RIGHTS RESERVED.</p>
          <a target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index">沪ICP备2022019890号-1</a>
          <div>
            <img class="guohui" src="~/assets/images/home/recordLogo.png" alt="">
            <span>沪公网安备 31010102007453号</span>
          </div>
        <!-- <p>公安备案号：31010102005799</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import poster from '~/assets/images/img/logoImg1.jpg'
import video1 from '~/assets/video/HAY_Video_Web.mp4'
import logoImg1 from '~/assets/images/brand/hay_logo.png'
import video2 from '~/assets/video/video1.mp4'
import logoImg2 from '~/assets/images/brand/tradition_logo.png'
import poster1 from '~/assets/images/img/home_img1.png'

export default {
  name: 'IndexPage',
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
      // if (this.isLogin) {
      //   await this.$store.dispatch('home/getReserveList')
      // }
      await this.$store.dispatch('home/getReserveList')
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
    playVideo (refs, index) {
      if (this.$refs[refs] && this.$refs[refs][0]) {
        this.hideVideoShadeIndex.push(index)
        this.$refs[refs][0].play()
        const duration = this.$refs[refs][0].duration
        const name = index === 0 ? 'HAY点击播放' : index === 1 ? 'ATD点击播放' : ''
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
@import "~/assets/scss/mobile/home.scss";
</style>
