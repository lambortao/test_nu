<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <article class="designer-content">
    <div class="designer">
      <div v-for="(item, index) in designer" :key="index" class="designer-info" @click="goStylist(item.alias)">
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
  mounted () {
  },
  methods: {
    async getList () {
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'FRANDSEN' })
      this.designerList = list
      this.count = list.length
    },
    goStylist (id) {
      this.$router.push({ path: '/en/stylist', query: { designerId: id, brand: 'FRANDSEN', count: this.count } }, () => {}, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
