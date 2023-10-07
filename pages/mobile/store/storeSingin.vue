<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <div>
    <div
      v-for="item in storeList"
      :key="item.alias"
      class="foot"
    >
      <div class="verpan-area">
        <div class="verpan">
          <div class="titiles">
            <h4>{{ item.title }}</h4>
          </div>
          <div
            v-if="item.title === 'HAY'"
            class="near"
          >专营店</div>
          <div
            v-if="item.isProximity"
            class="near"
          >离你最近</div>
        </div>
        <div>
          <div v-if="item.qrcode !== '' || item.images !== '' || item.online !== ''" class="detail-area" @click="goDetails(item)">
            <span class="detail-text"><label>详情</label><i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow"></i></span>
          </div>
        </div>
      </div>
      <div v-if="item.brandids.length>0">
        <div class="label-info">
          <div v-for="(items) in item.brandids" :key="items" class="label-text">{{ items }}</div>
        </div>
      </div>
      <div class="dress">
        <div class="addressarea" @click="goAddress(item)">
          <div class="arrows">
            <img src="~/assets/images/AAmobile/store/arrowbig.png" class="arrowbig">
          </div>
          <div class="addre">
            <span class="address-detail">{{ item.address }}</span>
          </div>
        </div>
        <div class="phone-area" @click.stop="callnumber(item.mobile)">
          <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone"></i>致电</span>
        </div>
      </div>
      <div class="open-time">
        <div class="opentime">营业时间: {{ item.content[0].value }}</div>
        <div class="distance">
          <span v-if="item.distance">小于{{ item.distance }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goToMap from '~/utils/goToMap'
export default {
  name: 'StoreSingin',
  props: {
    storeList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    position () {
      return this.$store.state.store.position
    }
  },
  mounted () {
    console.log(this.storeList)
  },
  methods: {
    // eslint-disable-next-line camelcase, camelcase
    goAddress ({ lat, lng, title, address, title_en, alias }) {
      goToMap({ lat, lng, title, address })
      // eslint-disable-next-line camelcase, camelcase
      this.storeTracking({ event: 'jump_to_url', mode: 'Store', label: 'map', items: [{ CMSId: alias, StoreName: title_en }] })
    },
    goDetails (item) {
      if (item.qrcode !== '' || item.images !== '' || item.online !== '') {
        this.$router.push({
          path: '/storedetail',
          query: {
            method: item.alias,
            latitude: this.position.latitude,
            longitude: this.position.longitude
          }
        }, () => {}, () => {})
        this.storeTracking({ event: 'view_store', mode: 'Store', label: item.title_en, items: [{ CMSId: item.alias }] })
      }
    },
    storeTracking ({ event, mode, label, items }) {
      this.$emit('tracking', { event, mode, label, items })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/store-info.scss';
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.foot {
  display: block;
  padding: mvw(30) 0;
  border-bottom: mvw(1) solid rgba($color: #181818, $alpha: 0.05);
  &:last-child {
    border-bottom: none;
  }
}
</style>
