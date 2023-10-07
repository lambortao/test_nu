<template>
  <article class="designer-content">
    <p class="p-area">
      在 HAY,我们持续不断地与来自世界各地才华出众、充满好奇心和 有雄心壮志的设计师合作，这些设计师每一位都是 HAY 家族的成员。
    </p>
    <p class="p-area">
      设计师家族包括 Pierre Charpin, Inga Sempé, Doshi Levien, Shane Schneck, Ana Kras, Stefan Diez, Scholten & Baijings, Clara Von Zweigbergk, Ronan and Erwan Bouroullec, Hee Welling, George Sowden, GamFratesi, 以及更多其它设计师，他们与 HAY 的内部设计团队合作密切。
    </p>
    <div class="designer">
      <div v-for="(item, index) in designerList" :key="index" class="designer-info" @click="goStylist(item.alias)">
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
    title: 'Nine United官网-HAY'
  },
  computed: {
    ...mapState('designer', {
      designerList: state => state.designerList
    })
  },
  methods: {
    goStylist (id) {
      this.$router.push({ path: '/stylist', query: { designerId: id, brand: 'HAY', count: this.designerList.length } }, () => {}, () => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/brand.scss';
</style>
