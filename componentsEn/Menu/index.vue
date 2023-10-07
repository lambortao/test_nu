<template>
  <header :class="['light', { 'hide-header': up }]">
    <div class="header_box">
      <nuxt-link
        class="logo"
        to="/en"
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
          <NuxtLink
            class="header_menu_item"
            to="/en/brand/nine"
          >
            <div @click="brandsTracking('NineUnited')">
              Nine United
            </div>
          </NuxtLink>
          <div class="header_menu_item">
            <p>Our Brands</p>
            <div class="sub_menu sub_menu_en">
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
            to="/en/product"
          >
            <p @click="menuTracking({event:'view_product_list',mode:'Products',label:'Products'})">
              Products
            </p>
            <div class="product_sub_menu">
              <div class="sub_menu_left">
                <div>
                  <nuxt-link tag="div" to="/en/product">
                    <div @click="menuTracking({event:'view_product_list',mode:'Products',label:'All'})">
                      All
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
                    :to="`/en/product?form=channel&method=${item.child.map(i => i.child.map(e => e.alias))}&type=menu`"
                    :class="subIndex === index ? 'active' : ''"
                  >
                    <div @click="menuTracking({event:'view_product_list',mode:'Products',label:item.nameen})">
                      {{ item.nameen }}
                    </div>
                  </nuxt-link>
                  <div
                    v-else
                    :class="subIndex === index ? 'active' : ''"
                  >
                    {{ item.nameen }}
                  </div>
                </div>
              </div>
              <div class="sub_menu_right">
                <NuxtLink
                  v-for="item in productChannelList[subIndex].child"
                  :key="item.alias"
                  class="sub_menu_item"
                  :to="`/en/product?form=channel&method=${item.child.map(i => i.alias)}`"
                >
                  <div @click="menuTracking({event:'view_product_list', mode:'Products',label:item.nameen})">
                    {{ item.nameen }}
                  </div>
                </NuxtLink>
              </div>
            </div>
          </NuxtLink>
          <div
            class="header_menu_item"
          >
            <p>Inspiration</p>
            <div class="sub_menu sub_menu_en">
              <NuxtLink
                v-for="item in caseChannelList.channel"
                :key="item.alias"
                class="sub_menu_item"
                :to="`/en/case?id=${item.alias}`"
              >
                <span @click="menuTracking({event:'view_inspiration_list',mode:'Inspiration',label:item.name_en})">{{ item.name_en }}</span>
              </NuxtLink>
            </div>
          </div>
          <div
            class="header_menu_item"
          >
            <p>Where to buy</p>
            <div class="sub_menu sub_menu_en">
              <NuxtLink
                v-for="item in storeList"
                :key="item.alias"
                class="sub_menu_item"
                :to="item.link"
              >
                <span @click="menuTracking({ event: 'view_store_list',mode:'Store',label:item.name })">{{ item.name }}</span>
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
          <a href="javascript:;" class="header_menu_icon header_menu_item" @click="goUsers('favorite')">
            <figure>
              <img
                src="~/assets/images/icon/header_collect.png"
                alt=""
                class="saf"
              >
            </figure>
          </a>
          <a href="javascript:;" class="header_menu_icon header_menu_item" @click="goUsers('setting')">
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
    <div :class="['search_box',searchShow?'search_box_active':'']" @click.self="closeSearch">
      <div class="search_content">
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
                placeholder="Search..."
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
export default {
  name: 'IndexPage',
  data: () => ({
    // {
    //   name: 'Nine United',
    //   link: '/en/brand/nine'
    // }
    brandList: [{
      name: 'HAY',
      link: '/en/brand/hay'
    }, {
      name: '&Tradition',
      link: '/en/brand/tradition'
    }, {
      name: 'Verpan',
      link: '/en/brand/verpan'
    }, {
      name: 'Frandsen',
      link: '/en/brand/frandsen'
    }, {
      name: 'STUDIO 9',
      link: '/en/brand/studio'
    }],
    storeList: [{
      name: 'Our Stores',
      link: '/en/store'
    }, {
      name: 'Dealers',
      link: '/en/store?storeType=Dealers'
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
    goProductList (item) {
      const allChild = item.child.map(i => i.alias).join(',')
      this.$router.push({
        path: '/en/product',
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
          path: '/en/user',
          query: { pos }
        })
      } else {
        this.$router.push({
          path: '/en/login',
          query: { pos }
        })
      }
      this.menuTracking({ event: 'jump_to_url', label: pos })
    },
    searchEvent () {
      this.$router.push(`/en/search?keywords=${this.inputValue}&page=1`)
      this.$store.dispatch('site/tracker', { event: 'search', term: this.inputValue })
      // 清除数据，隐藏组件

      this.searchShow = false
      this.inputValue = ''
    },
    toHome () {
      this.$router.push('/en')
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
    goMenu (item) {
      return `/en/product?form=channel&method=${item.child.map(i => i.child.map(e => e.alias))}&type=menu`
    },
    brandsTracking (data) {
      console.log(data)
      this.menuTracking({ event: 'view_brand', mode: 'Brands', label: data })
    },
    menuTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { event, mode: mode ? `${mode},Menu` : 'Menu', label })
    }
  }
}
</script>

<style lang="scss" scoped>
@import  '~/assets/scss/default/menu.scss'
</style>
