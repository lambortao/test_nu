<template>
  <div>
    <div class="container site-is-default">
      <nuxt-link to="/" class="login-logo">
        <figure class="logo">
          <img src="~/assets/images/home/logo.png">
        </figure>
      </nuxt-link>
      <div class="login-container">
        <!-- <div class="login-bg" /> -->
        <section class="login-en-content">
          <div class="phoneLogin_title">
            <h1>绑定手机号</h1>
          </div>
          <div class="form-label">
            <input
              v-model="phoneNumber"
              name="mobile"
              type="tel"
              autocomplete="off"
              placeholder="请输入您的手机号码"
            >
          </div>
          <send-code
            v-model="code"
            :phone="phoneNumber"
            url="/member/login/vcode"
          />
          <aggreement class="agreement" />
          <div class="form-label no-border">
            <pc-button
              :disabled="!getCodeIsActive"
              @click="handleConfirm"
            >
              提交
            </pc-button>
          </div>
        </section>
      </div>
    </div>
    <wechat-mobile class="site-is-mobile" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import WechatMobile from '~/pages/mobile/login/wechat/index.vue'
export default {
  name: 'LoginWechatPage',
  components: {
    WechatMobile
  },
  layout: 'wechatLogin',
  computed: {
    ...mapState('login', {
      memberData: state => state.memberData
    }),
    phoneNumber: {
      get () { return this.$store.state.login.login.phoneNumber },
      set (value) { this.$store.commit('login/setLoginData', { key: 'phoneNumber', value }) }
    },
    code: {
      get () { return this.$store.state.login.login.code },
      set (value) { this.$store.commit('login/setLoginData', { key: 'code', value }) }
    },
    getCodeIsActive () {
      return this.$store.getters['login/getCodeIsActive']
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  async created () {
    const query = JSON.parse(JSON.stringify(this.$route.query))
    // 条件具备的时候才会调用微信登录
    if (query && query.openid && query.type) {
      await this.$store.dispatch('login/wechatUpdateToken', {
        openid: query.openid,
        type: query.type
      })
    }
  },
  methods: {
    // 测试函数
    testFunc () {
      this.$store.commit('login/setRegisterStep', 'other-entry')
      this.$router.push('/login')
    },
    ...mapActions({
      scanCheckMobile: 'login/scanCheckMobile',
      useGetMemberData: 'login/useGetMemberData'
    }),
    loginEvent (data) {
      if (data === 'staffLogin' || data === 'userRegister') {
        this.showSection = data
      }
    },
    wxLoginClick () {
      this.showSection = 'wxLogin'
    },
    goHome () {
      /** 清空注册步骤 */
      this.$store.commit('login/setRegisterStep', null)
      /** 回到首页 */
      this.$router.push('/')
    },
    nextStep (data) {
      if (data === 0) {
        this.$router.replace('/')
      } else {
        const nextSection = data === 1 ? 'RegiPartner' : data === 2 ? 'RegiBlogger' : data === 3 ? 'RegiMedia' : data === 4 ? 'RegiDesign' : 'userRegister'
        this.showSection = nextSection
      }
    },
    async handleConfirm () {
      try {
        const result = await this.scanCheckMobile()
        // 扫码后要获取已有用户信息
        await this.useGetMemberData()
        /** 是否已经注册过 */
        if (result.status) {
          /** 注册过直接回 home */
          const queryPos = this.$route.query.pos
          const path = queryPos ? `/user?pos=${queryPos}` : '/'
          this.$router.push(path)
        } else {
          this.$router.push('/login')
          result.isStaff
            /** 员工注册流程 */
            ? this.$store.commit('login/setRegisterStep', 'personnel-step1')
            /** 其他注册流程 */
            : this.$store.commit('login/setRegisterStep', 'other-entry')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-en-content {
    width: 530px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .form-label {
      margin-bottom: 20px;
      border: 1px solid rgba($color: #000000, $alpha: 0.2);
      display: flex;
      &.no-border {
        border: none;
      }
      &.form-flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      input{
        font-family: 'WorkSans-Regular';
      }
      &.inline-border{
        border: none;
        input{
          border: 1px solid rgba($color: #000000, $alpha: 0.2);
        }
        >.code_box{
          width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 12px;
          border: 1px solid #000;
        }
      }
    }
    .agreement{
      margin-bottom: 10px;
    }
    .btn-box{
      display: flex;
      justify-content: space-between;
    }
    .region_select {
      display: flex;
      position: relative;
      select {
        appearance: none;
        cursor: pointer;
        font-family: 'WorkSans-Regular';
      }
      .select_icon {
        height: 100%;
        display: flex;
        align-items: center;
        position: absolute;
        right: 14px;
        cursor: pointer;
        img {
          width: 30px;
          height: 18px;
          object-fit: contain;
          opacity: 0.8;
        }
      }
    }
    select,
    input {
      border-color: rgba($color: #000000, $alpha: 0.2);
      opacity: 1;
      width: 100%;
      height: 60px;
      padding: 0 10px 0 23px;
      appearance: revert;
      outline: none;
      font-family: 'WorkSans-Regular';
    }
    input::placeholder {
      color: rgba(0, 0, 0, 0.5);
      font-family: 'WorkSans-Regular';
    }
    small.forgat {
      cursor: pointer;
      text-decoration: underline;
    }
}
</style>
