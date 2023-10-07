<template>
  <div class="marketing_header_wrap">
    <div class="title">
      营销工具包
    </div>
    <div :class="['search_wrap', isSearchPage === 'yes' ? 'active' : '']">
      <img
        :src="
          isSearchPage === 'yes'
            ? require('~/assets/images/marketing/search-icon1.png')
            : require('~/assets/images/marketing/search-icon.png')
        "
        alt=""
        class="search_icon"
      >
      <input
        v-model="inputValue"
        placeholder="搜索"
        type="text"
        @keydown.enter="searchEvent()"
      >
      <img
        v-if="pagedifferent!=='home'"
        src="~/assets/images/icon/close.png"
        alt=""
        class="close"
        @click="claerDataEvent()"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {
    inputSearch: {
      type: String,
      default: null
    },
    isSearchPage: {
      type: String,
      default: null
    },
    pagedifferent: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  fetch () {
  },
  computed: {
    ...mapState({
      selectedThirdId: state => state.marketing.selectedThirdId,
      directorySubId: state => state.marketing.selectedSubId,
      brandName: state => state.marketing.selectedBrandName
    })
  },

  mounted () {
    this.inputValue = this.inputSearch
  },
  methods: {
    /** 清空搜索数据 */
    claerDataEvent () {
      if (this.directorySubId) {
        const name = encodeURIComponent(this.brandName)
        this.$router.push(`/marketing?categories=${this.directorySubId}&tag=${this.selectedThirdId}&brand=${name}`)
      } else {
        this.$router.push(`/marketing?brand=${this.brandName}`)
      }
    },
    /** enter键搜索数据 */
    searchEvent () {
      // 判断input输入内容全是空格
      const value = this.inputValue.split(' ').join('').length
      if (value !== 0) {
        const name = encodeURIComponent(this.brandName)
        this.$router.push(`/marketing/search?search=${this.inputValue}&brand=${name}`)
        this.$store.dispatch('site/tracker', { event: 'search', page: this.isSearchPage === 'yes' ? 'MarketingHub-search' : 'MarketingHub', term: this.inputValue })
      } else {
        this.inputValue = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/marketing-search-header.scss";
</style>
