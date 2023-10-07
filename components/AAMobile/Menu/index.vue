<template>
  <header :class="['header-box', { up }]">
    <header :class="['header-main', { up }]">
      <nuxt-link id="logo" to="/" tag="figure" class="icon">
        <img src="~/assets/images/home/logo.png" alt="LOGO">
      </nuxt-link>
      <section class="search">
        <img src="~/assets/images/AAmobile/main/search.png" alt="搜索按钮">
        <form action="javascript:return true;" @submit.prevent="searchEvent()">
          <input ref="searchInput" v-model="inputValue" type="search" placeholder="搜索...">
        </form>
      </section>
      <div class="menu-toggle-btn icon" @click="menuVisibleShow">
        <img src="~/assets/images/AAmobile/main/menu-btn-toggle.png" alt="菜单切换按钮">
      </div>
      <menu-side :visible="menuVisible" @close="closeMenu" />
    </header>
    <div class="stepping" />
  </header>
</template>

<script>
import MenuSide from './side.vue'
export default {
  name: 'MobileMenu',
  components: {
    MenuSide
  },
  data () {
    return {
      menuVisible: false,
      up: false,
      top: 0,
      inputValue: ''
    }
  },
  watch: {
    top (newVal, oldVal) {
      if (newVal > 100) {
        this.up = newVal > oldVal
        this.$store.commit('site/setHeaderStatus', this.up)
      }
    },
    menuVisible (val) {
      document.getElementsByTagName('body')[0].setAttribute('style', `overflow: ${val ? 'hidden' : 'auto'}`)
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.top = Math.round(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
    })
  },
  methods: {
    closeMenu () {
      this.menuVisible = false
    },
    searchEvent () {
      this.$router.push(`/search?keywords=${this.inputValue}&page=1`)
      this.$refs.searchInput.blur()
      this.$store.dispatch('site/tracker', { event: 'search', term: this.inputValue })
      this.$store.dispatch('site/tracker', { event: 'search', page: 'MarketingHub', term: this.inputValue })
    },
    // 显示隐藏框
    menuVisibleShow () {
      this.menuVisible = true
      this.$store.commit('productList/setFrameShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>

header.header-box.up {
  pointer-events: none;
}
header.header-main {
  width: mvw(375);
  height: mvw(48);
  padding: 0 mvw(24);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 2;
  transition: transform 300ms ease;
  &.up {
    transform: translateY(mvw(-48));
  }
}
div.stepping {
  height: mvw(48);
}

.icon {
  width: mvw(24);
}

img {
  width: 100%;
}

.menu-toggle-btn {
  height: mvw(24);
}
#logo {
  height: mvw(32);
}
.search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: mvw(230);
  height: mvw(32);
  border-radius: mvw(16);
  padding: 0 mvw(17);
  background: {
    color: #F5F5F5
  };

  img {
    display: block;
    width: mvw(18);
    height: mvw(18);
    margin-right: mvw(8);
  }
  input {
    flex: 1;
    height: mvw(32);
    line-height: mvw(32);
    border: none;
    outline: none;
    background: transparent;
    font-size: mrem(24);
  }
}
</style>
