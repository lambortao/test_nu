<template>
  <article class="designer-content">
    <div class="designer">
      <div v-for="item in designerList" :key="item.alias" class="designer-info" @click="goStylist(item.alias)">
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
import { mapState } from 'vuex'
export default {
  name: 'HayDesigner',
  head: {
    title: 'Nine United官网-Verpan'
  },
  computed: {
    ...mapState('designer', {
      designerList: state => state.designerList
    })
  },
  methods: {
    goStylist (id) {
      this.$router.push({ path: '/stylist', query: { designerId: id, brand: 'VERPAN', count: this.designerList.length } }, () => {}, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
