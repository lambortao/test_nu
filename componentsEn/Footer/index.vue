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
          <p>Nine United TAK is dedicated to growing its brand presence and redefining home furnishings across style-conscious markets in Asia Pacific. It operates four home furnishing brands, namely HAY, &Tradition, VERPAN, and FRANDSEN, in more than 40 cities across  China, Japan, South Korea, Australia, Southeast Asia, and beyond.</p>
        </div>
        <div class="footer_right">
          <div class="menu_list">
            <div class="menu_list_item">
              <p>About</p>
              <nuxt-link to="/en/brand/nine">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'NineUnited'})">Nine United</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/hay">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'HAY'})">HAY</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/tradition">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'&Tradition'})">&Tradition</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/frandsen">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'Frandsen'})">Frandsen</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/verpan">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'Verpan'})">Verpan</span>
              </nuxt-link>
              <nuxt-link to="/en/brand/studio">
                <span @click="footerTracking({event:'view_brand',mode:'Brands',label:'STUDIO9'})">STUDIO 9</span>
              </nuxt-link>
            </div>
            <div class="menu_list_item">
              <p>Products</p>
              <nuxt-link
                v-for="item in productChannelList"
                :key="item.alias"
                :to="`/en/product?form=channel&method=${item.child.map(i => i.child.map(e => e.alias))}&type=menu`"
              >
                <span @click="footerTracking({ event:'view_product_list',mode:'Products',label:item.nameen})">{{ item.nameen }}</span>
              </nuxt-link>
            </div>
            <div class="menu_list_item">
              <nuxt-link to="/en/case" class="last_menu">
                <span @click="footerTracking({ event:'view_inspiration_list',mode:'Inspiration',label:'Project Showcase' })">Project Showcase</span>
              </nuxt-link>
              <nuxt-link to="/en/store" class="last_menu">
                <span @click="footerTracking({ event:'view_store_list',mode:'Store',label:'Stores' })">Stores</span>
              </nuxt-link>
              <nuxt-link to="/en/store?storeType=Dealers" class="last_menu">
                <span @click="footerTracking({ event:'view_store_list',mode:'Store',label:'Find Dealer'})">Find Dealer</span>
              </nuxt-link>
              <a target="_blank" href="https://portal.nineunitedb2b.com/" class="last_menu">
                <span @click="footerTracking({ event:'jump_to_url', label:'B2B' })">B2B</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer_copyRight">
        <div>
          <nuxt-link to="/en/policy">
            Privacy Policy
          </nuxt-link>
          <nuxt-link to="/en/clause">
            Terms of Use
          </nuxt-link>
          <nuxt-link to="/en/contactus">
            <span @click="footerTracking({ event:'jump_to_url', label:'contactus' })">Contact Us</span>
          </nuxt-link>
        </div>
        <p>COPYRIGHT © NINE UNITED INC. RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
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
