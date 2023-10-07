<template>
  <header
    id="header_box"
    :class="['light', { 'hide-header': up }]"
  >
    <div class="header_box">
      <nuxt-link
        class="logo"
        to="/"
      >
        <div @click="menuTracking({event:'jump_to_url', label:'home'})">
          <img
            src="~/assets/images/home/logo.png"
            alt="LOGO"
          >
        </div>
      </nuxt-link>
      <div :class="['header_center', { active: menuShow }]">
        <menu>
          <!-- <NuxtLink
            class="header_menu_item"
            to="/"
          >
            首页
          </NuxtLink> -->
          <div class="header_menu_item">
            <p>品牌</p>
            <div class="sub_menu">
              <NuxtLink
                v-for="item in brandList"
                :key="item.link"
                class="sub_menu_item"
                :to="item.link"
              >
                <div @click="brandsTracking(item.name)">
                  {{ item.name }}
                </div>
              </NuxtLink>
            </div>
          </div>
          <NuxtLink
            class="header_menu_item"
            to="/product"
          >
            <p @click="menuTracking({event:'view_product_list',mode:'Products',label:'产品'})">
              产品
            </p>
            <div class="product_sub_menu">
              <div class="sub_menu_left">
                <div>
                  <nuxt-link
                    tag="div"
                    to="/product"
                  >
                    <div @click="menuTracking({event:'view_product_list',mode:'Products',label:'全部'})">
                      全部
                    </div>
                  </nuxt-link>
                </div>
                <div
                  v-for="(item,index) in productChannelList"
                  :key="item.alias"
                  @mouseover="subMenuHover(index)"
                >
                  <nuxt-link
                    v-if="item.child && item.child.length"
                    :class="subIndex === index ? 'active' : ''"
                    :to="`/product?form=channel&method=${item.child.map(i => i.child.map(e => e.alias))}&type=menu`"
                  >
                    <div @click="menuTracking({event:'view_product_list',mode:'Products',label:item.name})">
                      {{ item.name }}
                    </div>
                  </nuxt-link>
                  <div
                    v-else
                    :class="subIndex === index ? 'active' : ''"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="sub_menu_right">
                <NuxtLink
                  v-for="item in productChannelList[subIndex].child"
                  :key="item.alias"
                  class="sub_menu_item"
                  :to="`/product?form=channel&method=${item.child.map(i => i.alias)}`"
                >
                  <div @click="menuTracking({event:'view_product_list', mode:'Products',label:item.name})">
                    {{ item.name }}
                  </div>
                </NuxtLink>
              </div>
            </div>
          </NuxtLink>
          <div class="header_menu_item">
            <p>案例</p>
            <div class="sub_menu">
              <NuxtLink
                v-for="item in caseChannelList.channel"
                :key="item.alias"
                class="sub_menu_item"
                :to="`/case?id=${item.alias}`"
              >
                <div @click="menuTracking({event:'view_inspiration_list',mode:'Inspiration',label:item.name})">
                  {{ item.name }}
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="header_menu_item">
            <p>购买</p>
            <div class="sub_menu">
              <NuxtLink
                v-for="item in storeList"
                :key="item.alias"
                class="sub_menu_item"
                :to="item.link"
              >
                <div @click="menuTracking({ event: 'view_store_list',mode:'Store',label:item.name })">
                  {{ item.name }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </menu>
      </div>
      <div :class="['header_right', { active: menuShow }]">
        <menu>
          <div
            class="header_menu_icon header_menu_item"
            @click="searchClick"
          >
            <figure>
              <img
                src="~/assets/images/icon/header_search.png"
                alt=""
                class="saf"
              >
            </figure>
          </div>
          <a
            href="javascript:;"
            class="header_menu_icon header_menu_item"
            @click="goUsers('favorite')"
          >
            <figure>
              <img
                src="~/assets/images/icon/header_collect.png"
                class="saf"
                alt=""
              >
            </figure>
          </a>
          <a
            href="javascript:;"
            class="header_menu_icon header_menu_item"
            @click="goUsers('setting')"
          >
            <figure>
              <img
                src="~/assets/images/icon/header_user.png"
                alt=""
                class="saf"
              >
            </figure>
          </a>
        </menu>
      </div>
    </div>
    <div
      :class="['search_box',searchShow?'search_box_active':'']"
      @click.self="closeSearch"
    >
      <div
        class="search_content"
      >
        <div class="search_inner">
          <div class="search_box_left">
            <div class="search_icon">
              <img
                src="~/assets/images/icon/header_search.png"
                alt=""
              >
            </div>
            <div class="search_input">
              <input
                v-model="inputValue"
                placeholder="请输入您想搜索的内容"
                type="text"
                @keydown.enter="searchEvent()"
              >
            </div>
          </div>
          <div
            class="search_box_right"
            @click="closeSearch"
          >
            <figure>
              <img
                src="~/assets/images/icon/close.png"
                alt=""
              >
            </figure>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import productMenu from '~/utils/productMenu'
export default {
  name: 'IndexPage',
  data: () => ({
    // {
    //   name: 'Nine United',
    //   link: '/brand/nine'
    // },
    brandList: [{
      name: 'HAY',
      link: '/brand/hay'
    }, {
      name: '&Tradition',
      link: '/brand/tradition'
    }, {
      name: 'Verpan',
      link: '/brand/verpan'
    }, {
      name: 'Frandsen',
      link: '/brand/frandsen'
    }, {
      name: 'STUDIO 9',
      link: '/brand/studio'
    }],
    storeList: [{
      name: '门店',
      link: '/store'
    }, {
      name: '经销商',
      link: '/store?storeType=Dealers'
    }],
    menuShow: false,
    subIndex: 0,
    searchShow: false,
    inputValue: '',
    up: false,
    top: 0
  }),
  computed: {
    caseChannelList () {
      return this.$store.getters['site/getCaseChannel']
    },
    productChannelList () {
      return this.$store.getters['productCategory/useGoodsChannel']
    },
    checkLoginStatus () {
      return this.$store.getters['login/checkLoginStatus']
    }
  },
  watch: {
    top (newVal, oldVal) {
      if (newVal > 100) {
        if (!this.searchShow) {
          this.up = newVal > oldVal
          if (this.clearTimeUp) {
            clearTimeout(this.clearTimeUp)
          }
          if (this.up) { this.clearUp() }
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    this.menuShow = true
  },
  methods: {
    productMenuFunc (item) {
      console.log(item)
      productMenu(item)
    },
    goProductList (item) {
      const allChild = item.child.map(i => i.alias).join(',')
      this.$router.push({
        path: '/product',
        query: {
          form: 'channel',
          method: allChild
        }
      })
    },
    handleScroll () {
      this.top = Math.round(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
    },
    clearUp () {
      this.clearTimeUp = setTimeout(() => {
        this.up = false
      }, 500)
    },
    goUsers (pos) {
      if (this.checkLoginStatus) {
        this.$router.push({
          path: '/user',
          query: { pos }
        })
      } else {
        this.$router.push({
          path: '/login',
          query: { pos }
        })
      }
      this.menuTracking({ event: 'jump_to_url', label: pos })
    },
    searchEvent () {
      this.$router.push(`/search?keywords=${this.inputValue}&page=1`)
      this.$store.dispatch('site/tracker', { event: 'search', term: this.inputValue })
      this.searchShow = false
      this.inputValue = ''
    },
    toHome () {
      this.$router.push('/')
    },
    subMenuHover (data) {
      this.subIndex = data
      console.log(this.subIndex)
    },
    searchClick () {
      this.searchShow = !this.searchShow
      this.menuTracking({ event: 'jump_to_url', label: 'search' })
    },
    closeSearch () {
      this.searchShow = false
    },
    brandsTracking (data) {
      this.menuTracking({ event: 'view_brand', mode: 'Brands', label: data })
    },
    menuTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { event, mode: mode ? `${mode},Menu` : 'Menu', label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/default/menu.scss";
</style>
