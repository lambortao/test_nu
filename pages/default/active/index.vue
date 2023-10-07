<template>
  <div class="container">
    <div class="site-is-default default-width">
      <div class="active_box">
        <div class="active_title">
          <h3>{{ activeDetail.title }}</h3>
          <p>{{ activeDetail.subtitle }}</p>
        </div>
        <div v-html="activeDetail.content" />
        <div class="qr_code">
          <div>
            <img
              :src="activeDetail.qr_code"
              alt=""
            >
            <p>
              打开微信识别太阳码<br>
              前往微信小程序报名参与活动
            </p>
          </div>
        </div>
      </div>
    </div>
    <mobileSearch class="site-is-mobile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import mobileSearch from '~/pages/mobile/active/index.vue'
export default {
  name: 'ActivePage',
  components: {
    mobileSearch
  },
  data: () => ({
    detailOptions: {
      content: ''
    }
  }),
  computed: {
    ...mapState('activeDetail', {
      /** 详情页数据 */
      activeDetail: state => state.detail
    })
  },
  mounted () {
    const id = this.$route.query.id
    this.getActiveDetail(id)
  },
  updated () {
    const DomList = document.getElementsByClassName('active_box')[0].querySelectorAll('img')
    for (const i in DomList) {
      if (DomList[i].style) {
        DomList[i].style.width = '100%'
      }
    }
  },
  methods: {
    async getActiveDetail (id) {
      await this.$store.dispatch('activeDetail/useDetail', id)
    }
  }
}
</script>
<style lang="scss" scoped>
.active_box {
  img {
    @include imgContain;
  }
  .active_title {
    margin-bottom: vw(50);
    h3 {
      font-size: vw(32);
      font-weight: 600;
    }
    p {
      opacity: 0.7;
      font-size: vw(20);
      margin-top: vw(10);
      font-weight: 600;
    }
  }
  max-width: 700px;
  min-height: 300px;
  margin: 0 auto;
  padding-top: vw(120);
  padding-bottom: vw(150);
  width: 100%;
  div {
    width: 100%;
  }
  > .qr_code {
    display: flex;
    justify-content: flex-end;
    div {
      width: vw(180);
      height: vw(180);
      margin-top: vw(50);
      // float: right;
      img {
        @include imgContain;
      }
      p {
        text-align: center;
        white-space: nowrap;
        font-size: vw(12);
        line-height: 1.5;
        opacity: 0.8;
        margin-top: vw(10);
      }
    }
  }
}
@include media(">maxW") {
  .active_box {
    .active_title {
      margin-bottom: 40px;
      h3 {
        font-size: 28px;
        font-weight: 600;
      }
      p {
        font-size: 16px;
        margin-top: 10px;
      }
    }
    padding-top: 120px;
    padding-bottom: 150px;
    width: 100%;
    > .qr_code {
      div {
        width: 180px;
        height: 180px;
        margin-top: 50px;
        p {
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
