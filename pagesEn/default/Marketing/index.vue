<template>
  <div>
    <div
      class="default-width site-is-default material_container"
      @click.self="selectBrandOptionsSection(null)"
    >
      <div class="marketing_container">
        <!-- banner图 -->
        <div class="swiper_pic_section">
          <banner-swiper>
            <SwiperSlide
              v-for="item in bannersList"
              :key="item.title"
              class="swiper-slide"
            >
              <nuxt-link
                class="swiper-img"
                :to="`/en/marketing/series?id=${item.alias}`"
              >
                <div @click="marketingTracking({event:'view_marketingHub_list',label:item.title})">
                  <figure>
                    <img :src="item.images[0].url" alt="" class="imgs">
                  </figure>
                </div>
              </nuxt-link>
            </SwiperSlide>
          </banner-swiper>
        </div>
        <!-- 头部 -->
        <search-header ref="headerRef" pagedifferent="home" />
        <!-- 内容部分 -->
        <div class="material_list_section">
          <div class="left_wrap">
            <div
              v-if="selectedBrandName"
              class="brand_options_wrap"
              @click="selectBrandOptionsSection('brand')"
            >
              <div class="brand_name_wrap">
                <!-- 一级名字 -->
                <div class="brand_name">
                  {{ selectedBrandName }}
                </div>
                <img
                  src="~/assets/images/marketing/down-icon.png"
                  alt=""
                  :class="[
                    'down_icon',
                    brandOptionsSection === 'brand' ? 'active' : '',
                  ]"
                >
              </div>
              <!-- 一级名字下拉选项 -->
              <div
                :class="[
                  'brand_active_options_group',
                  brandOptionsSection === 'brand' ? 'active' : '',
                ]"
              >
                <div class="brand_options_content">
                  <div
                    v-for="(item, index) in directorysList"
                    :key="item.alias"
                    :class="['brand_item', { active: firstIndex === index }]"
                    @click="brandNameEvent(index, item)"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="selectedBrandName !== 'ALL'"
              class="sub_third_cate_wrap"
            >
              <div
                v-for="item in subAndThirdList"
                :key="item.alias"
                class="cate_item_wrap"
              >
                <div class="sub_item_name" @click="unfoldEvent(item.name)">
                  <p>{{ item.name }}</p>
                  <img
                    v-if="item.name === '活动推广'"
                    src="~/assets/images/marketing/down.png"
                    :class="[
                      'down_img',
                      { active: promotionName != item.name },
                    ]"
                    alt=""
                  >
                </div>
                <div v-if="promotionName != item.name" class="third_wrap 55555">
                  <div
                    v-for="(subitem, index) in item.child"
                    :key="subitem.alias"
                    :class="[
                      'third_name',
                      { active: subitem.alias === selectedThirdId },
                    ]"
                    @click="
                      selectedThirdMenuEvent(index, item.alias, subitem.alias,selectedBrandName)
                    "
                  >
                    {{ subitem.name }}
                  </div>
                </div>
              </div>
            </div>
            <!-- ALL品牌项 -->
            <div
              v-if="selectedBrandName === 'ALL'"
              class="all_cate_wrap"
              data-simplebar
              data-simplebar-auto-hide="false"
            >
              <div
                v-for="item in allCateList"
                :key="item.alias"
                class="cate_item_wrap"
              >
                <div class="first_item_name">
                  {{ item.name }}
                </div>
                <div
                  v-for="subitem in item.child"
                  :key="subitem.alias"
                  class="sub_cate_item_wrap"
                >
                  <div class="sub_item_name" @click="unfolAlldSubMenuEvent(subitem)">
                    {{ subitem.name }}
                  </div>
                  <div v-if="subId === subitem.alias" class="third_wrap">
                    <!-- 三级名字 -->
                    <div
                      v-for="(thirditem, index) in subitem.child"
                      :key="thirditem.alias"
                      :class="[
                        'third_name',
                        { active: thirditem.alias === thirdId },
                      ]"
                      @click="
                        selectedThirdMenuEvent(
                          index,
                          subitem.alias,
                          thirditem.alias,
                          'ALL'
                        )
                      "
                    >
                      {{ thirditem.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right_wrap">
            <div class="material_list_content">
              <v-placeholder v-if="$fetchState.pending" mode="loading" />
              <v-placeholder v-else-if="$fetchState.error" mode="error" />
              <template v-else>
                <material-list
                  v-if="materialList.list.length > 0"
                  pagedifferent="home"
                  :material-list="materialList"
                  @tracking="marketingTracking"
                />
                <p v-else>
                  No files have been uploaded
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BannerSwiper from './components/BannerSwiper.vue'
import materialList from './components/materialList.vue'
import searchHeader from './components/SearchHeader.vue'

export default {
  name: 'MarketingPage',
  components: {
    BannerSwiper,
    materialList,
    searchHeader
  },
  data: () => ({
    page: 1, // 页码
    subId: null, // 二级菜单id
    thirdId: '', // 三级菜单id
    firstIndex: null, // 目录一级索引值
    brandOptionsSection: null, // 显示下拉菜单
    ThirdDirectoryIndexStatus: 0, // 设置三级的选中显示状态
    promotionName: '' // 是否隐藏活动推广
  }),
  async fetch () {
    if (!this.$store.getters['login/checkLoginStatus']) {
      this.$router.push('/en/login')
    } else {
      const query = JSON.parse(JSON.stringify(this.$route.query))
      // console.log(query, 'query首页参数')
      /** 初始获取物料列表数据 */
      await this.getMaterialList({ local: true, query })

      await this.$store.dispatch('marketing/getDirectoryList')
      const { categories, tag, brand, page } = this.$route.query
      this.thirdId = tag
      this.page = page || 1
      this.$store.commit('marketing/setSelectedSubId', categories)
      this.$store.commit('marketing/setSelectedThirdId', tag)
      this.$store.commit('marketing/setBrandName', brand)
      this.$nextTick(async () => {
        await this.getMaterialBannerList()
      })
    }
  },
  computed: {
    ...mapState({
      bannersList: state => state.marketing.bannersList,
      directorysList: state => state.marketing.directorysList,
      selectedBrandName: state => state.marketing.selectedBrandName,
      selectedThirdId: state => state.marketing.selectedThirdId,
      subAndThirdList: state => state.marketing.subAndThirdList,
      allCateList: state => state.marketing.allCateList,
      materialList: state => state.marketingList.materialList
    })
  },
  watch: {
    /** 监听路由变化的操作 */
    '$route.query': '$fetch',
    thirdId () {
      this.handlePagination(this.page)
      this.useRouteParam({ router: this.$router, url: '/en/marketing' })
    },
    firstIndex () {
      this.handlePagination(this.page)
      this.useRouteParam({ router: this.$router, url: '/en/marketing' })
    }
  },

  methods: {
    ...mapActions({
      getMaterialBannerList: 'marketing/getMaterialBannerList',
      handlePagination: 'marketingList/handlePagination',
      getMaterialList: 'marketingList/getMaterialList',
      /** 确认筛选 */
      useRouteParam: 'marketingList/useRequestParam'
    }),
    /** 设置下拉菜单的显示状态 */
    selectBrandOptionsSection (data) {
      this.brandOptionsSection =
        data === this.brandOptionsSection ? null : data
    },
    /**  一级栏目切换 得到二级三级栏目 */
    brandNameEvent (index, item) {
      // console.log(index, item, '一级栏目切换 得到二级三级栏目')
      this.page = 1
      this.firstIndex = index
      this.$refs.headerRef.inputValue = ''
      if (item.name !== 'ALL') {
        this.$store.commit('marketingList/coverRequestData', {
          categories: item.child[0].alias,
          tag: item.child[0].child[0].alias,
          brand: item.name
        })
      } else {
        this.$store.commit('marketingList/coverRequestData', {
          categories: '',
          tag: '',
          brand: item.name
        })
      }
      this.marketingTracking({ event: 'filter_marketingHub', label: item.name, filterLabel: 'Brands' })
    },

    /** 设置三级的显示状态 */
    selectedThirdMenuEvent (index, subId, thirdId, name) {
      // console.log('设置三级的显示状态', index, subId, thirdId, name)
      const subIndex = this.subAndThirdList.findIndex(item => item.alias === subId) // subIndex:当前二级分类索引
      const subItems = this.subAndThirdList.filter(item => item.alias === subId) // subItems:二级分类列表 subItems[0].name：二级目录名字
      // const thirdIndex = this.subAndThirdList[subIndex].child.findIndex(item => item.alias === thirdId) // thirdIndex:三级分了索引
      const thirdItems = this.subAndThirdList[subIndex].child.filter(item => item.alias === thirdId) // thirdIndex:三级分了索引
      this.$refs.headerRef.inputValue = ''
      this.brandOptionsSection = null
      this.thirdId = thirdId
      this.page = 1
      this.$store.commit('marketingList/coverRequestData', {
        categories: subId,
        tag: thirdId,
        brand: name
      })
      this.marketingTracking({ event: 'filter_marketingHub', label: thirdItems[0].name, filterLabel: subItems[0].name })
    },

    /** 设置非全部品牌下 活动推广二级菜单展开折叠 */
    unfoldEvent (name) {
      if (name === '活动推广') {
        this.isShowPromotion = false
        if (name !== this.promotionName) {
          this.promotionName = name
        } else {
          this.promotionName = null
        }
      } else {
        // console.log('不是活动推广项')
      }
    },

    /** 设置全部品牌下二级菜单展开折叠 */
    unfolAlldSubMenuEvent (item) {
      if (item.alias !== this.subId) {
        this.subId = item.alias
      } else {
        this.subId = null
      }
    },
    marketingTracking ({ event, label, items, filterLabel }) {
      this.$store.dispatch('site/tracker', { page: 'MarketingHub', event, mode: 'MarketingHub', label, items, filterLabel })
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/default/marketing.scss";
</style>
