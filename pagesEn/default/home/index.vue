<template>
  <div>
    <div class="home_container site-is-default">
      <div id="home_box" class="home_box">
        <section class="swiper_section">
          <banner-swiper>
            <SwiperSlide
              v-for="item in bannerList"
              :key="item.title || item.link_web || item.link_applet"
              class="swiper-slide"
            >
              <div
                v-if="item.images"
                class="swiper-img"
                @click="toEnProduct({title:item.title,link:item.link_web_en})"
              >
                <figure>
                  <video
                    v-if="item.images.isVideo"
                    autoplay
                    loop
                    muted
                    :src="item.images.url"
                  />
                  <img
                    v-else
                    :src="item.images.url"
                    alt=""
                  >
                </figure>
              </div>
            </SwiperSlide>
          </banner-swiper>
        </section>
        <section
          v-show="false"
          class="active_section"
        >
          <div class="active_section_title default-width">
            <p>Recent Activities</p>
          </div>
          <active-swiper class="active_section_swiper">
            <SwiperSlide
              v-for="item in reserveList"
              :key="item.banner_tmb"
              class="active-swiper-slide"
            >
              <figure class="swiper-img">
                <img
                  :src="item.banner_tmb"
                  alt=""
                >
              </figure>
              <div class="active_mask">
                <div class="active_mes_box">
                  <div class="active_mes_detail">
                    <p>{{ item.reserve_time }}</p>
                    <h3>
                      {{ item.title }}<br>
                      {{ item.subtitle }}
                    </h3>
                    <div class="normal_btn">
                      <button>View Details</button>
                    </div>
                  </div>
                  <div class="activ_tips">
                    {{ item.status }}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </active-swiper>
        </section>
        <section class="new_section">
          <div class="new_section_box default-width">
            <div class="new_section_left">
              <div class="new_section_title section_title">
                <p>New Arrivals</p>
              </div>
              <div
                class="new_section_btn dark_btn"
                @click="toProduct"
              >
                <button>View All</button>
              </div>
            </div>
            <div class="new_section_right">
              <div>
                <div class="img-box gogogo">
                  <article
                    v-for="item in productImg1List"
                    :key="item.src"
                  >
                    <nuxt-link :to="`/en/product/detail?id=${item.id}`">
                      <figure @click="homeTracking({event:'view_product',mode:'Products',label:item.title,items:[{CMSId:item.id,source:'NEW'}]})">
                        <img
                          :src="item.src"
                          alt=""
                        >
                      </figure>
                    </nuxt-link>
                  </article>
                </div>
              </div>
              <div>
                <div class="img-box gogogof">
                  <article
                    v-for="item in productImg2List"
                    :key="item.src"
                  >
                    <nuxt-link :to="`/en/product/detail?id=${item.id}`">
                      <figure @click="homeTracking({event:'view_product',mode:'Products',label:item.title,items:[{CMSId:item.id,source:'NEW'}]})">
                        <img
                          :src="item.src"
                          alt=""
                        >
                      </figure>
                    </nuxt-link>
                  </article>
                </div>
              </div>
            </div>
            <div
              v-if="false"
              class="new_section_right"
            >
              <div>
                <product-swiper :reverse="true">
                  <SwiperSlide
                    v-for="item in productImgList"
                    :key="item"
                    class="swiper-slide"
                  >
                    <figure class="swiper-img">
                      <img
                        :src="item"
                        alt=""
                      >
                    </figure>
                  </SwiperSlide>
                </product-swiper>
              </div>
              <div>
                <product-swiper>
                  <SwiperSlide class="swiper-slide">
                    <figure class="swiper-img">
                      <img
                        src="~/assets/images/img/img9.png"
                        alt=""
                      >
                    </figure>
                  </SwiperSlide>
                </product-swiper>
              </div>
            </div>
            <!-- <div class="bg_letter">
              new
            </div> -->
          </div>
        </section>
        <section class="brand_section default-width">
          <div class="brand_section_title section_title">
            <p>Our Brands</p>
          </div>
          <div class="brand_section_content">
            <div class="brand_section_content_left">
              <div
                class="brand_left_item"
                @click="toBrand('hay')"
              >
                <img
                  src="~/assets/images/home/brand/1.png"
                  alt=""
                >
                <div class="brand_left_item_mask">
                  <div class="brand_height1">
                    <img
                      src="~/assets/images/home/brand1.png"
                      alt=""
                      class="safObj"
                    >
                  </div>
                </div>
              </div>
              <div
                class="brand_left_item"
                @click="toBrand('tradition')"
              >
                <img
                  src="~/assets/images/home/brand/2.jpg"
                  alt=""
                >
                <div class="brand_left_item_mask">
                  <div class="brand_height2">
                    <img
                      src="~/assets/images/home/brand2.png"
                      alt=""
                      class="safObj"
                    >
                  </div>
                </div>
              </div>
              <div
                class="brand_left_item"
                @click="toBrand('frandsen')"
              >
                <img
                  src="~/assets/images/home/brand/3.png"
                  alt=""
                >
                <div class="brand_left_item_mask">
                  <div class="brand_height3">
                    <img
                      src="~/assets/images/home/brand3.png"
                      alt=""
                      class="safObj"
                    >
                  </div>
                </div>
              </div>
              <div
                class="brand_left_item"
                @click="toBrand('verpan')"
              >
                <img
                  src="~/assets/images/home/brand/4.png"
                  alt=""
                >
                <div class="brand_left_item_mask">
                  <div class="brand_height4">
                    <img
                      src="~/assets/images/home/brand4.png"
                      alt=""
                      class="safObj"
                    >
                  </div>
                </div>
              </div>
            </div>
            <div
              class="brand_section_content_right"
              @click="toBrand('studio')"
            >
              <img
                src="~/assets/images/home/brand/5.png"
                alt=""
              >
              <div class="brand_left_item_mask">
                <div class="brand_height5">
                  <img
                    src="~/assets/images/home/brand5-en.png"
                    alt=""
                    class="safObj"
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="case_section">
          <div class="case_seciton_box default-width">
            <div class="case_section_title section_title">
              <p>Inspiration</p>
            </div>
            <div class="case_section_content">
              <div class="case_section_content_left">
                <div class="case_title en">
                  <h3>Global Project Showcase</h3>
                  <p>Get inspired by creative design</p>
                </div>
                <div
                  class="btn_ani dark_btn"
                  @click="toCase"
                >
                  <button>View All</button>
                </div>
              </div>
              <div class="case_section_content_right">
                <figure>
                  <img
                    src="~/assets/images/img/img10.png"
                    alt=""
                  >
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section class="video_section">
          <div class="video_section_box">
            <video-swiper @slideChage="slideChage">
              <SwiperSlide
                v-for="(item,index) in videoList"
                :key="index"
                class="swiper-slide"
              >
                <figure class="swiper-video">
                  <video
                    ref="myVideo"
                    :poster="item.poster"
                    @click="videoPause(index)"
                  >
                    <source :src="item.sourceSrc">
                  </video>
                </figure>
                <div
                  v-if="isPause"
                  class="swiper-mask"
                >
                  <div class="swiper-mask-inner">
                    <div class="swiper-content_brand">
                      <figure v-show="false">
                        <img
                          :src="item.logoSrc"
                          alt=""
                        >
                      </figure>
                    </div>
                    <div
                      class="play_icon"
                      @click="playVideo(index)"
                    >
                      <figure>
                        <img
                          src="~/assets/images/icon/play.png"
                          alt=""
                        >
                      </figure>
                    </div>
                    <div>
                      <!-- <p>HAY Rey Collection</p> -->
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </video-swiper>
          </div>
        </section>
        <section class="store_section">
          <div class="store_section_box default-width">
            <div class="store_section_content">
              <div>
                <p>Our Stores</p>
                <div
                  class="btn_ani normal_btn"
                  @click="toSore()"
                >
                  <button>View All</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="letter_section">
          <news-letter />
        </section>
      </div>
    </div>
    <mobile-home class="site-is-mobile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BannerSwiper from './components/BannerSwiper.vue'
import ActiveSwiper from './components/ActiveSwiper.vue'
import VideoSwiper from './components/VideoSwiper.vue'
import newsLetter from './components/newsLetter.vue'
import MobileHome from '~/pagesEn/mobile/home/index.vue'
import logoImg1 from '~/assets/images/brand/verpan_logo.png'
import logoImg2 from '~/assets/images/brand/tradition_logo.png'
import video1 from '~/assets/video/video1.mp4'
import video2 from '~/assets/video/HAY_Video_Web.mp4'
import poster from '~/assets/images/img/home_img1.png'
import poster1 from '~/assets/images/img/logoImg1.jpg'
import prodImg1 from '~/assets/images/home/product/1.jpg'
import prodImg2 from '~/assets/images/home/product/2.jpg'
import prodImg3 from '~/assets/images/home/product/3.jpg'
import prodImg4 from '~/assets/images/home/product/4.jpg'
import prodImg5 from '~/assets/images/home/product/5.jpg'
import prodImg6 from '~/assets/images/home/product/6.jpg'
import prodImg7 from '~/assets/images/home/product/7.jpg'
import prodImg8 from '~/assets/images/home/product/8.jpg'
import prodImg9 from '~/assets/images/home/product/9.jpg'
import prodImg10 from '~/assets/images/home/product/10.jpg'
export default {
  name: 'IndexPage',
  components: {
    MobileHome,
    BannerSwiper,
    ActiveSwiper,
    VideoSwiper,
    newsLetter
  },
  data: () => ({
    videoList: [{
      name: 'tradition',
      sourceSrc: video1,
      logoSrc: logoImg1,
      poster: poster1
    }, {
      name: 'tradition',
      sourceSrc: video2,
      logoSrc: logoImg2,
      poster
      // desc: 'HAY Rey Collection'
    }],
    productImg1List: [{ id: '8672fc59e530180c', src: prodImg1, title: 'X Lounge Chair HM10' }, { id: '1ea915efd9fcde84', src: prodImg2, title: 'Mousqueton Portable' }, { id: '11d1ea3ca8ef1877', src: prodImg3, title: 'Inland AV23' }, { id: '33c6b86d2d85d381', src: prodImg4, title: 'Wall Clock' }, { id: 'd3e3c197506f3436', src: prodImg5, title: 'Alima Trolley NDS1' }],
    productImg2List: [{ id: '25556bb149389c5c', src: prodImg6, title: 'Slit Table Wood' }, { id: 'a418dc460c08d751', src: prodImg7, title: 'Rotate SC73' }, { id: '7ab737c1ac6bc5ca', src: prodImg8, title: 'Crate Lounge Chair' }, { id: '59e9dea77f5e59ae', src: prodImg9, title: 'Tung Table JA3' }, { id: '116b31d2c1a72527', src: prodImg10, title: 'Quilton 3 Seater' }],
    isPause: true,
    poster
  }),
  computed: {
    ...mapState({
      bannerList: state => state.home.deviceBannerList.desktop,
      reserveList: state => state.home.reserveList
    }),
    isLogin () { return this.$store.getters['login/checkLoginStatus'] },
    /** 检查登录状态，近期活动版块未登录不显示 */
    showReserve () { return this.reserveList.length }
  },
  methods: {
    toEnProduct (data) {
      const { title, link } = data
      this.$router.push(link)
      this.homeTracking({ event: 'view_product_list', mode: 'Products', label: title })
    },
    playVideo (e) {
      this.$refs.myVideo[e].play()
      this.videoTimeChange(this.$refs.myVideo[e], e)
      this.isPause = false
      const name = e === 0 ? 'HAY' : e === 1 ? 'ATD' : ''
      const duration = this.$refs.myVideo[e].duration
      this.homeTracking({ event: 'video_start', mode: 'Video', label: name, items: [{ video_title: name, video_duration: duration }] })
    },
    videoPause (e) {
      this.$refs.myVideo[e].pause()
      this.isPause = true
    },
    slideChage (data) {
      this.videoList.forEach((item, i) => {
        if (i !== data) {
          this.$refs.myVideo[i].pause()
        }
      })
      this.isPause = true
    },
    videoTimeChange (video, index) {
      console.log(video)
      video.addEventListener('timeupdate', () => {
        if (video.duration - video.currentTime < 0.5) {
          this.$refs.myVideo[index].pause()
          this.isPause = true
        }
      })
    },
    toProduct () {
      this.$router.push('/en/product?form=new')
      this.homeTracking({ event: 'view_product_list', mode: 'Products', label: 'View All' })
    },
    toCase () {
      this.$router.push('/en/case')
      this.homeTracking({ event: 'view_inspiration_list', mode: 'Inspiration', label: 'View All' })
    },
    toBrand (e) {
      this.$router.push(`/en/brand/${e}`)
      const label = e === 'hay' ? 'HAY' : e === 'tradition' ? '&Tradition' : e === 'frandsen' ? 'Frandsen' : e === 'verpan' ? 'Verpan' : e === 'studio' ? 'STUDIO 9' : e
      this.homeTracking({ event: 'view_brand', mode: 'Brands', label })
    },
    toSore () {
      this.$router.push('/en/store')
      this.homeTracking({ event: 'view_store_list', mode: 'Store', label: 'View All' })
    },
    homeTracking ({ event, mode, label, items }) {
      this.$store.dispatch('site/tracker', { page: 'Home', event, mode, label, items })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/home.scss";
</style>
