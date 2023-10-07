<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <article class="designer-content">
    <p class="p-area">At HAY, we believe that we are constantly working with the most talented, curious, and courageous designers from around the world, and every one of them is a member of the HAY family.</p>
    <p class="p-area">This family includes Pierre Charpin, Inga Sempé, Doshi Levien, Shane Schneck, Ana Kraš, Stefan Diez, Scholten & Baijings, Clara Von Zweigbergk, Ronan and Erwan Bouroullec, Hee Welling, George Sowden, GamFratesi, and many others, who work closely with HAY’s in-house Design team.</p>
    <div class="designer">
      <div v-for="(item, indexz) in designer" :key="indexz" class="designer-info" @click="goStylist(item.alias)">
        <div :style="{ backgroundImage: `url(${item.thumbnail})` }" class="designer-pic" />
        <div class="designer-name">
          <div class="de-name">
            <div class="names">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: 'HayDesigner',
  data () {
    return {
      designerList: '',
      count: 0,
      postData: ''
    }
  },
  fetch () {
    this.designerList = this.designer
    this.count = this.designer.length
  },
  computed: {
    designer () {
      return this.$store.getters['designer/getDesignerList']
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  created () {
  },
  methods: {
    async getList () {
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'HAY' })
      this.designerList = list
      this.count = list.length
    },
    goStylist (id) {
      this.$router.push({ path: '/en/stylist', query: { designerId: id, brand: 'HAY', count: this.count } }, () => {}, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
