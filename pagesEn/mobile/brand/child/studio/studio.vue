<template>
  <brand-component>
    <template slot="default">
      <img src="~/assets/images/AAmobile/brand/stud.png" alt="HAY">
    </template>
    <template slot="content">
      <div class="studio">
        <h3>About STUDIO 9 </h3>
        <p>STUDIO 9 provides design inspiration to people seeking high-quality interior design and furniture for their property or business.</p>
        <p>STUDIO 9 brings together four of Nine United Group's Danish design brands: HAY, &Tradition, Verpan, and Frandsen. Each of these brands was founded in different eras and features timeless designs and masterpieces from a century of Danish design. Together, they provide a wide assortment of styles, a massive selection and offer solutions for modern residential and commercial spaces.</p>
        <p>In this multi-dimensionally oriented destination, you will find a new distinctive model that elevates the connection and communication for the design community and offers unique creative content and experiences. STUDIO 9 uses the space as a means of actively exploring various brands and products, communicating and sharing with the creative community, and working with like-minded partners.</p>
        <p>This is where creativity and inspiration converge.</p>
      </div>
    </template>
  </brand-component>
</template>
<script>
import BrandComponent from '~/pagesEn/mobile/brand/components/brandComponent.vue'
export default {
  name: 'StudioPage',
  components: {
    BrandComponent
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
