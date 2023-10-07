<!-- eslint-disable vue/mustache-interpolation-spacing -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div :class="['main-menu', { active: visible }]" @click="closeMenu">
    <div class="menu-box" @click.stop="eventMenu">
      <div class="menu-list">
        <header>
          <div v-if="false" class="control-header">
            <span>Main</span><img src="~/assets/images/AAmobile/main/close.png" @click="closeMenu">
          </div>
          <div class="users">
            <figure class="head">
              <img v-if="memberData.headimgurl" :src="memberData.headimgurl" alt="头像">
              <img v-else src="~/assets/images/AAmobile/main/menu/user-head.png" alt="头像">
            </figure>
            <p class="name">{{memberData.fullname||memberData.nickname||'Welcome'}}</p>
            <identity-tags />
          </div>
          <div v-if="$store.getters['login/checkLoginStatus']" class="control-btn">
            <nuxt-link to="/en/favorite" tag="p" @click.native="closeMenu({event:'jump_to_url', label:'favorite'})">Favorites</nuxt-link>
            <nuxt-link to="/en/user" tag="p" @click.native="closeMenu({event:'jump_to_url', label:'setting'})">Setting</nuxt-link>
          </div>
        </header>
        <menu>
          <nuxt-link to="/en" tag="div" @click.native="closeMenu({event:'jump_to_url',label:'home'})">
            <div class="tag-main">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-home.png" alt="首页">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-home-active.png" alt="首页">
              </figure>
              <span>Home</span>
            </div>
          </nuxt-link>
          <!-- <nuxt-link to="/product" tag="div" @click.native="closeMenu">
            <div class="tag-main">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-product.png" alt="产品中心">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-product-active.png" alt="产品中心">
              </figure>
              <span>产品</span>
            </div>
          </nuxt-link> -->
          <nuxt-link to="/en/brand/nine" tag="div" @click.native="closeMenu({event:'view_brand',mode:'Brands',label:'NineUnited'})">
            <div class="tag-main">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-brand.png" alt="品牌案例">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-brand-active.png" alt="品牌案例">
              </figure>
              <span>Nine United</span>
            </div>
          </nuxt-link>
          <div :class="{ flod: foldBrand }" @click="foldBrand = !foldBrand">
            <div class="tag-main dots">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-case.png" alt="品牌案例">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-case-active.png" alt="品牌案例">
              </figure>
              <span>Our Brands</span>
            </div>
            <div :class="['tags-list']" :style="{ height: `${foldBrand ? '61vw' : '0'}`}">
              <!-- <nuxt-link to="/en/brand/nine" @click.native="closeMenu"> //74vw
                <span>Nine United</span>
              </nuxt-link> -->
              <nuxt-link to="/en/brand/hay" @click.native="closeMenu({event:'view_brand',mode:'Brands',label:'HAY'})">
                <span>HAY</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/tradition" @click.native="closeMenu({event:'view_brand',mode:'Brands',label:'&Tradition'})">
                <span>&Tradition</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/frandsen" @click.native="closeMenu({event:'view_brand',mode:'Brands',label:'Frandsen'})">
                <span>Frandsen</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/verpan" @click.native="closeMenu({event:'view_brand',mode:'Brands',label:'Verpan'})">
                <span>Verpan</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/studio" @click.native="closeMenu({event:'view_brand',mode:'Brands',label:'STUDIO9'})">
                <span>STUDIO 9</span>
              </nuxt-link>
            </div>
          </div>
          <nuxt-link to="/en/product" tag="div" @click.native="closeMenu({event:'view_product_list',mode:'Products',label:'Products'})">
            <div class="tag-main">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-product.png" alt="产品中心">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-product-active.png" alt="产品中心">
              </figure>
              <span>Products</span>
            </div>
          </nuxt-link>
          <div :class="{ flod: foldCase }" @click="foldCase = !foldCase">
            <div class="tag-main dots">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-lingan.png" alt="灵感中心">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-lingan-active.png" alt="灵感中心">
              </figure>
              <span>Inspiration</span>
            </div>
            <div :class="['tags-list']" :style="{ height: foldCase ? `${(12.8*caseChannelList.length)}vw` : '0'}">
              <nuxt-link
                v-for="item in caseChannelList"
                :key="item.alias"
                :to="{ path: '/en/case', query: { id: item.alias } }"
                @click.native="closeMenu({event:'view_inspiration_list',mode:'Inspiration',label:item.name_en})"
              >
                <span>{{ item.name_en }}</span>
              </nuxt-link>
            </div>
          </div>

          <nuxt-link to="/en/store" tag="div" @click.native="closeMenu({event:'view_store_list',mode:'Store',label:'Find Stores & Dealers'})">
            <div class="tag-main">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-store.png" alt="门店中心">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-store-active.png" alt="门店中心">
              </figure>
              <span>Find Stores & Dealers</span>
            </div>
          </nuxt-link>
          <nuxt-link v-if="false" to="/en/clause" tag="div" @click.native="closeMenu">
            <div class="tag-main">
              <figure>
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-help.png" alt="帮助与反馈">
                <img src="~/assets/images/AAmobile/main/menu/menu-btn-help-active.png" alt="帮助与反馈">
              </figure>
              <span>Help & Feedback</span>
            </div>
          </nuxt-link>
        </menu>
      </div>
      <div :class="['control-btn', { 'is-login': $store.getters['login/checkLoginStatus'] }]" @click="loginMethods">{{ $store.getters['login/checkLoginStatus'] ? 'Log out' : 'Sign In / Register' }}</div>
    </div>
  </div>
</template>

<script>
import IdentityTags from './identityTags.vue'
export default {
  name: 'MenuSider',
  components: {
    IdentityTags
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      foldProduct: false,
      foldCase: false,
      foldBrand: false
    }
  },
  computed: {
    getUsers () {
      return this.$store.state.users.user
    },
    memberData () {
      return this.$store.getters['login/getMember']
    },
    caseChannelList () {
      return this.$store.getters['site/getCaseChannel'].channel
    },
    productChannelList () {
      return this.$store.getters['productCategory/useGoodsChannel']
    }
  },
  methods: {
    closeMenu ({ event, mode, label }) {
      this.$store.commit('users/setStep', '')
      this.$emit('close')
      this.menuTracking({ event, mode, label })
    },
    eventMenu (e) {
      e.stopPropagation()
    },
    loginMethods () {
      if (this.$store.getters['login/checkLoginStatus']) {
        /** 退出登录 */
        this.$store.commit('login/logout')
      } else {
        this.$router.push('/en/login')
      }
    },
    menuTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { event, mode: mode ? `${mode},Menu` : 'Menu', label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/menu.scss';
</style>
