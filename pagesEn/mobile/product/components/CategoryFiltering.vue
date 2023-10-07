<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div :class="['category-filtering', { tall: isTall }, { active: visible }]" @click="closeMenu">
    <div class="content" @click.stop="eventMenu">
      <header class="pt24">
        <div class="put" @click="closeMenu">
          <img src="~/assets/images/AAmobile/product/put.png" alt="收起">
          <!-- <p>Put</p> -->
        </div>
        <nuxt-link to="/en/product" tag="p" @click="closeMenu">All</nuxt-link>
      </header>
      <content-tab v-model="activeKey">
        <tab-pane
          v-for="item in channeList"
          :key="item.alias"
          :value="item.alias"
          :label="item.nameen"
        >
          <product-pane :product-list="item.child" @tracking="productTracking" />
        </tab-pane>
      </content-tab>
      <footer>
        <button @click="setSelectedProductList({ mode: 'reset' })">Reset</button>
        <button @click="confirmRouteParam">Confirm</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { furnishings } from '../productListMock'
import ProductPane from './FilterProductList.vue'
import ContentTab from '~/componentsEn/AAMobile/ContentTab/index.vue'
import TabPane from '~/componentsEn/AAMobile/ContentTab/tabPane.vue'

export default {
  name: 'CategoryFiltering',
  components: {
    ContentTab,
    TabPane,
    ProductPane
  },
  model: {
    prop: 'visible',
    event: 'update:visible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeKey: '1',
      furnishings,
      lighting: [],
      fabric: [],
      commodity: []
    }
  },
  computed: {
    ...mapState('productCategory', {
      channeList: state => state.channeList,
      selectedProductFirstIndex: state => state.selectedProductFirstIndex,
      selectedProdcutList: state => state.selectedProdcutList
    }),
    isTall () {
      return this.$store.state.site.hideHeader
    }
  },
  mounted () {
    this.activeKey = this.channeList[0].alias
  },
  methods: {
    ...mapActions({
      /** 产品的选中事件 */
      setSelectedProductList: 'productCategory/useSelectedProduct',
      /** 确认筛选 */
      useRouteParam: 'productList/useRequestParam',
      /** 获取尺寸 */
      getSpeclist: 'productCategory/getSpeclist',
      // 尺寸
      useSize: 'productSize/useSize'
    }),
    closeMenu () {
      // 取消页面穿透滑动
      document.querySelector('body').setAttribute('style', 'overflow:visible;')
      this.$emit('update:visible', false)
    },
    eventMenu (e) {
      e.stopPropagation()
    },
    /** 确认事件 */
    confirmRouteParam () {
      // 清空尺寸选择器
      this.useSize([])
      this.useRouteParam({ router: this.$router, url: '/en/product' })
      this.getSpeclist()
      this.closeMenu()
    },
    productTracking (data) {
      this.$emit('tracking', data)
    }
  }
}
</script>

<style lang="scss" scoped>

.category-filtering {
  position: fixed;
  top: mvw(48);
  right: -100vw;
  z-index: 10;
  width: 100vw;
  height: calc(100% - 12.8vw);
  transition: right 300ms ease;
  &.tall {
    top: 0;
    height: 100vh;
  }
  &.active {
    right: 0;
    transition: background 300ms ease 300ms, right 300ms ease;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .pt24 {
    padding-right: mvw(24);
  }
  .content {
    width: mvw(280);
    height: 100%;
    float: right;
    padding: mvw(24) 0  mvw(24) mvw(24);
    background-color: #fff;
    border-top: 1px solid #eee;
    position: relative;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .put {
      display: flex;
      justify-content: space-between;

      img {
        width: mvw(24);
        margin-right: mvw(8);
      }
    }
  }

  :deep(.ContentTab) {
    // height: calc(100vh - mvw(230));
    height: calc(100% - mvw(48));
    overflow: hidden;
    // overflow-y: auto;
    padding: 0;
  }
  :deep(.pane-box) {
    height: 100%;
    padding-right: mvw(24);
  }
  :deep(.ContentTab nav p) {
    margin-right: mvw(24);

    &:last-child {
      margin: 0;
    }
  }
}
footer {
  width: mvw(280);
  height: mvw(48);
  // position: relative;
  // left: mvw(-24);
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);

  button {
    flex: 1;
    height: mvw(48);
    background-color: #fff;
    border: none;
    color: black;

    &:last-child {
      border-left: mvw(1) solid #eee;
    }
  }
}
</style>
