<template lang="html">
  <div class="wechat_container">
    <div class="wechat_title" @click="wechatLogin">
      <figure>
        <img src="~/assets/images/login/back.png" alt="">
      </figure>
      <h1>返回</h1>
    </div>
    <div v-if="wxConfig.appid" class="wechat_content">
      <wx-login
        :appid="wxConfig.appid"
        :state="wxConfig.ticket"
        redirect_uri="https://nineunitedtak.com/api/wechat/website/auth/callback"
        scope="snsapi_login"
      />
      <div v-if="overdue" class="wx-login-overdue" @click="reloadWxLogin">
        <figure><img src="~/assets/images/login/reload.png" alt=""></figure>
        {{ overdueText }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'WechatLoginComponent',
  data () {
    return {
      overdue: false,
      wxLoginBox: true,
      overdueText: '二维码已过期，点击刷新'
    }
  },
  async fetch () {
    // 初始的时候获取微信配置
    await this.$store.dispatch('site/useWxConfig')
    console.log(this.wxConfig)
  },
  computed: {
    ...mapState('site', {
      wxConfig: state => state.wxConfig
    })
  },
  created () {
    this.$nextTick(() => {
      this.countDown()
    })
  },
  methods: {
    ...mapActions({
      getWxcofig: 'site/useWxConfig'
    }),
    wechatLogin () {
      this.$store.commit('login/setRegisterStep', null)
    },
    async reloadWxLogin () {
      this.overdueText = '刷新中...'
      await this.getWxcofig()
      this.overdue = false
      this.overdueText = '二维码已过期，点击刷新'
      this.countDown()
    },
    // 五十五秒后二维码自动过期
    countDown () {
      setTimeout(() => {
        this.overdue = true
      }, 55000)
    },
    /** 校验登录是否过期 */
    checkWxConfigOverdue () {
      console.log(this.wxConfig)
      const clearOverdue = setInterval(async () => {
        try {
          const result = await this.$axios.$post(`/wechat/website/scan/check?ticket=${this.wxConfig.ticket}`)
          if (!result.has) {
            // 登录过期
            clearInterval(clearOverdue)
            this.overdue = true
          }
        } catch (error) {
          console.log(error)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.wechat_container {
  padding-top: 10vh;
  width: 320px;
  margin: 0 auto;
  img {
    @include imgContain;
  }
  .wechat_title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    opacity: 0.8;
    cursor: pointer;
    figure {
      width: vw(28);
      height: vw(28);
      margin-right: 10px;
    }
    h1 {
      font-size: rem(36);
      line-height: 54px;
      white-space: nowrap;
    }
  }

  .wechat_content {
    position: relative;
    .wechat_code {
      position: absolute;
      width: vw(312);
      height: vw(312);
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 6px;
      margin: 0 auto;
    }
    .wx-login-overdue {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 2;
      cursor: pointer;
      background-color: rgba($color: #000000, $alpha: 0.7);
      color: #fff;

      figure {
        width: 60px;
        height: 60px;
        margin-bottom: 20px;
        img {
          width: 100%;
        }
      }
    }
    p {
      text-align: center;
      font-size: vw(16);
      margin-top: 15px;
    }
  }
}
@include media(">maxW") {
  .wechat_container {
    .wechat_title {
      figure {
        width: 24px;
        height: 24px;
      }
      h1 {
        font-size: 24px;
      }
    }

    .wechat_content {
      .wechat_code {
        width: 312px;
        height: 312px;
      }
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
