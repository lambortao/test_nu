<template>
  <div class="container">
    <div class="site-is-mobile">
      <div class="active_box">
        <div class="active_title">
          <h3>{{ activeDetail.title }}</h3>
          <p>{{ activeDetail.subtitle }}</p>
        </div>
        <div v-html="regHtml(activeDetail.content)" />
      </div>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ActiveMobilePage',
  components: {
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
  methods: {
    regHtml (html) {
      if (!html) { return }
      // eslint-disable-next-line no-useless-escape
      return html.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/ig, '<img$1')
        // eslint-disable-next-line no-useless-escape
        .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/ig, '<img$1')
        // eslint-disable-next-line no-useless-escape
        .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/ig, '<img$1')
        // eslint-disable-next-line no-useless-escape
        .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/ig, '<img$1')
        // eslint-disable-next-line no-useless-escape
        .replace(/<img([\s\w"-=\/\.:;]+)/ig, '<img style="width: 100%;" $1')
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: calc(100vh);
  padding: mvw(24);
  overflow: hidden;
  img {
    @include imgContain;
  }
  .active_box {
    // padding: mvw(24) mvw(24) mvw(100);
    .active_title {
      margin-bottom: mvw(30);
      h3 {
        font-size: rem(24);
        font-weight: 600;
      }
      p {
        opacity: 0.7;
        font-size: rem(14);
        margin-top: mvw(10);
        font-weight: 600;
      }
    }
    box-sizing: border-box;
    width: 100%;
    div {
      width: 100%;
      margin: 0 auto;
      .img {
        max-width: 100%;
        height: auto;
      }
    }
  }
  .qr_code {
    width: 90%;
    display: flex;
    justify-content: center;
    div {
      width: 100%;
      margin: 0 auto;
      margin-top: mvw(30);
      // float: right;
      img {
        width: mvw(120);
        height: mvw(120);
        object-fit: contain;
        margin: 0 auto;
        display: block;
      }
      p {
        text-align: center;
        white-space: nowrap;
        font-size: mvw(12);
        line-height: 1.5;
        opacity: 0.8;
        margin-top: 10px;
      }
    }
  }
}
</style>
