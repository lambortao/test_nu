<template>
  <div>
    <div class="container site-is-default">
      <div class="banner_box">
        <div class="banner_img">
          <img
            src="~/assets/images/brand/studio-big.png"
            alt=""
          >
        </div>
      </div>
      <div class="content_box default-width">
        <div>
          <div class="studio tab_content_box">
            <div :class="activeIndex==0?'tab_content active':'tab_content'">
              <div class="tab1_content_section1">
                <div class="item_title">
                  <h3>About STUDIO 9</h3>
                </div>
                <div class="item_content">
                  <p>
                    STUDIO 9 provides design inspiration to people seeking high-quality interior design and furniture for their property or business.<br><br>
                    STUDIO 9 brings together four of Nine United Group's Danish design brands: HAY, &Tradition, Verpan, and Frandsen. Each of these brands was founded in different eras and features timeless designs and masterpieces from a century of Danish design. Together, they provide a wide assortment of styles, a massive selection and offer solutions for modern residential and commercial spaces.<br><br>
                    In this multi-dimensionally oriented destination, you will find a new distinctive model that elevates the connection and communication for the design community and offers unique creative content and experiences. STUDIO 9 uses the space as a means of actively exploring various brands and products, communicating and sharing with the creative community, and working with like-minded partners.
                    <br><br>
                    This is where creativity and inspiration converge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mobile-brand-studio class="site-is-mobile" />
  </div>
</template>

<script>
import MobileBrandStudio from '~/pagesEn/mobile/brand/child/studio/studio.vue'
export default {
  name: 'StudioPage',
  components: {
    MobileBrandStudio
  },
  data: () => ({
    tabList: ['关于', '设计师', '可持续'],
    activeIndex: 0,
    designerList: ''
  }),
  head: {
    title: 'Nine United-Studio 9'
  },
  created () {
  },
  mounted () {
  },
  methods: {
    tabChange (indexz) {
      this.activeIndex = indexz
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/default/brand.scss";
</style>
