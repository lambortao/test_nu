<template>
  <footer>
    <div class="footer_container default-width">
      <div class="footer_menu">
        <div class="footer_left">
          <div class="footer_logo">
            <img
              src="~/assets/images/home/footer-logo.png"
              alt=""
            >
          </div>
          <p>Nine United TAK致力于在亚太地区提升品牌影响力的同时重新定义家居体验，旗下拥有四大家居设计品牌：HAY , &Tradition , Verpan 和 Frandsen ，业务涵盖中国、日本、韩国、澳大利亚以及东南亚等地区超过40多个城市。</p>
        </div>
        <div class="footer_right">
          <div class="menu_list">
            <div class="menu_list_item">
              <p>关于</p>
              <nuxt-link to="/brand/nine">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'NineUnited'})">Nine United</span>
              </nuxt-link>
              <nuxt-link to="/brand/hay">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'HAY'})">HAY</span>
              </nuxt-link>
              <nuxt-link to="/brand/tradition">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'&Tradition'})">&Tradition</span>
              </nuxt-link>
              <nuxt-link to="/brand/frandsen">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'Frandsen'})">Frandsen</span>
              </nuxt-link>
              <nuxt-link to="/brand/verpan">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'Verpan'})">Verpan</span>
              </nuxt-link>
              <nuxt-link to="/brand/studio">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'STUDIO9'})">STUDIO 9</span>
              </nuxt-link>
            </div>
            <div class="menu_list_item">
              <p>产品</p>
              <nuxt-link
                v-for="item in productChannelList"
                :key="item.name"
                :to="`/product?form=channel&method=${item.child.map(i => i.child.map(e => e.alias))}&type=menu`"
              >
                <div @click="footerTracking({ event:'view_product_list',mode:'Products',label:item.name})">
                  {{ item.name }}
                </div>
              </nuxt-link>
            </div>
            <div class="menu_list_item">
              <nuxt-link
                to="/case"
                class="last_menu"
              >
                <span @click="footerTracking({ event:'view_inspiration_list',mode:'Inspiration',label:'项目展示' })">
                  项目展示
                </span>
              </nuxt-link>
              <nuxt-link
                to="/store"
                class="last_menu"
              >
                <span @click="footerTracking({ event:'view_store_list',mode:'Store',label:'门店' })">
                  门店
                </span>
              </nuxt-link>
              <nuxt-link to="/store?storeType=Dealers" class="last_menu">
                <span @click="footerTracking({ event:'view_store_list',mode:'Store',label:'经销商'})">
                  经销商
                </span>
              </nuxt-link>
              <a target="_blank" href="https://portal.nineunitedb2b.com/" class="last_menu">
                <span @click="footerTracking({ event:'jump_to_url', label:'B2B' })">
                  B2B
                </span>
              </a>
              <!-- <nuxt-link to="/policy" class="last_menu">
                隐私政策
              </nuxt-link>
              <nuxt-link to="/clause" class="last_menu">
                使用条款
              </nuxt-link>
              <nuxt-link to="/contactus" class="last_menu">
                联系我们
              </nuxt-link> -->
            </div>
          </div>
        </div>
      </div>
      <div class="footer_copyRight">
        <div>
          <nuxt-link to="/policy">
            隐私政策
          </nuxt-link>
          <nuxt-link to="/clause">
            使用条款
          </nuxt-link>
          <nuxt-link to="/contactus">
            <span @click="footerTracking({ event:'jump_to_url', label:'contactus' })">
              联系我们
            </span>
          </nuxt-link>
        </div>
        <p>
          COPYRIGHT © NINE UNITED INC. RIGHTS RESERVED.<a
            target="blank"
            href="https://beian.miit.gov.cn/#/Integrated/index"
          >沪ICP备2022019890号-1</a>
          <img src="~/assets/images/home/recordLogo.png" alt="">
          沪公网安备 31010102007453号
          <!-- 公安备案号：31010102005799 -->
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data () {
    return {
      aboutList: [{
        name: 'Nine United',
        link: '/brand/nine'
      }, {
        name: 'HAY',
        link: '/brand/hay'
      }, {
        name: '&Tradition',
        link: '/brand/tradition'
      }, {
        name: 'Frandsen',
        link: '/brand/frandsen'
      }, {
        name: 'Verpan',
        link: '/brand/verpan'
      }, {
        name: 'STUDIO 9',
        link: '/brand/studio'
      }]
    }
  },
  computed: {
    productChannelList () {
      return this.$store.getters['productCategory/useGoodsChannel']
    }
  },
  methods: {
    footerTracking ({ event, mode, label }) {
      this.$store.dispatch('site/tracker', { event, mode: mode ? `${mode},Footer` : 'Footer', label })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/footer.scss';
</style>
