<template>
  <article class="designer-content">
    <div class="designer">
      <div v-for="(item, indexz) in designer" :key="indexz" class="designer-info" @click="goStylist(item.alias)">
        <div :style="{ backgroundImage: `url(${item.thumbnail})` }" class="designer-pic" />
        <div class="designer-name">
          <div class="de-name">
            <div class="names">
              {{ item.name }}
            </div>
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
      count: 0
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
      const list = await this.$axios.$post('/getBrandDesignerList', { brand: 'VERPAN' })
      this.designerList = list
      this.count = list
    },
    goStylist (id) {
      this.$router.push({ path: '/en/stylist', query: { designerId: id, brand: 'VERPAN', count: this.count } }, () => {}, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
