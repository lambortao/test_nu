<!-- eslint-disable vue/singleline-html-element-content-newline -->
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
            <h4>{{ item.title_en }}</h4>
          </div>
          <div v-if="item.title === 'HAY'" class="nears">
            <div class="nearly">Franchise store</div>
          </div>
          <div v-if="item.isProximity&&isNear" class="nears">
            <div class="nearly">Near you</div>
          </div>
        </div>
        <div>
          <div v-if="item.qrcode !== '' || item.images !== '' || item.online !== ''" class="detail-area" @click="goDetails(item)">
            <span class="detail-text"><label v-if="false">details</label><i><img src="~/assets/images/AAmobile/store/vector.png" class="arrow"></i></span>
          </div>
        </div>
      </div>
      <div v-if="item.brandids.length>0">
        <div class="label-info">
          <div v-for="(items) in item.brandids" :key="items" class="label-text">
            <p class="label">
              {{ items }}
            </p>
          </div>
        </div>
      </div>
      <div class="dress">
        <div class="addressarea" @click="goAddress(item)">
          <div class="arrows">
            <img src="~/assets/images/AAmobile/store/arrowbig.png" class="arrowbig">
          </div>
          <div class="addre">
            <span class="address-detail">{{ item.address_en }}</span>
          </div>
        </div>
        <div class="phone-area" @click.stop="callnumber(item.mobile)">
          <span class="phone-text"><i><img src="~/assets/images/AAmobile/store/tell.png" class="phone"></i>Tel</span>
        </div>
      </div>
      <div class="open-time">
        <div class="opentime">
          Store Hours: {{ item.content_en[0].value }}
        </div>
        <div class="distance">
          <span v-if="item.distance">Less {{ item.distance }}</span>
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
    },
    isNear: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    position () {
      return this.$store.state.store.position
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    goAddress ({ lat, lng, title, address_en, alias, title_en }) {
      // eslint-disable-next-line camelcase
      goToMap({ lat, lng, title, address_en })
      // eslint-disable-next-line camelcase
      this.storeTracking({ event: 'jump_to_url', mode: 'Store', label: 'map', items: [{ CMSId: alias, StoreName: title_en }] })
    },
    callnumber (mobile) {
      /* 拨打电话 */
      window.location.href = 'tel:' + mobile
    },
    goDetails (item) {
      if (item.qrcode !== '' || item.images !== '' || item.online !== '') {
        this.$router.push({ path: '/en/storedetail', query: { method: item.alias, latitude: this.position.latitude, longitude: this.position.longitude } }, () => {}, () => {})
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
