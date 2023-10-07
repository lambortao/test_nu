<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable no-undef -->
<template>
  <client-only>
    <div class="mobile-login wh-full">
      <figure class="header">
        <img src="~/assets/images/AAmobile/login/frame.png" alt="背景图片">
      </figure>
      <div class="login-box c-whire">
        <span v-if="false">登录你的账号</span>
        <form-label class-name="flex-between flex-align-center">
          <!-- <m-select v-model="countryTag" :style="{ width: '25%' }" defaultdata="+86" :options="countryTagOptions" /> -->
          <div :style="{ width: '25%' }">
            <span :style="{ margin: '0', textAlign: 'center', fontWeight: 'bold' }">+86</span>
          </div>
          <i class="vertical" />
          <m-input v-model="phoneNumber" :style="{ width: '73%' }" type="tel" autocomplete="off" placeholder="请输入您的手机号码" />
        </form-label>
        <form-label>
          <verify-code
            v-model="code"
            :phone="phoneNumber"
            url="/member/login/vcode"
          />
        </form-label>
      </div>
      <div v-if="$isWx" class="other-login-methods">
        <p><span>更多登录方式</span></p>
        <figure @click="goWechart">
          <img src="~/assets/images/login/icon-wechat.png" alt="微信登录">
        </figure>
      </div>
      <div class="confirm-btn bottom-btn">
        <mobile-aggreement />
        <big-button :disabled="!isActive" @click="handleLogin">{{ btnText }}</big-button>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import MobileAggreement from '~/components/AAMobile/Aggreement/index.vue'
export default {
  name: 'LoginPage',
  components: {
    MobileAggreement
  },
  computed: {
    isActive () {
      return this.$store.getters['login/getCodeIsActive']
    },
    ...mapState('login', {
      loginRes: 'loginRes',
      isStaff: 'isStaff',
      btnText: state => state.login.btnText,
      countryTagOptions: state => state.login.countryTagOptions,
      memberData: state => state.memberData
    }),
    btnLoading: {
      get () { return this.$store.state.login.login.loading },
      set (value) { this.$store.commit('login/setLoginData', { key: 'loading', value }) }
    },
    countryTag: {
      get () { return this.$store.state.login.login.countryTag },
      set (value) { this.$store.commit('login/setLoginData', { key: 'countryTag', value }) }
    },
    phoneNumber: {
      get () { return this.$store.state.login.login.phoneNumber },
      set (value) { this.$store.commit('login/setLoginData', { key: 'phoneNumber', value }) }
    },
    code: {
      get () { return this.$store.state.login.login.code },
      set (value) { this.$store.commit('login/setLoginData', { key: 'code', value }) }
    }
  },
  methods: {
    ...mapActions({
      initLoginFlow: 'login/initLoginFlow'
    }),
    async handleLogin () {
      /** 执行登录流程 */
      try {
        await this.initLoginFlow()
        /** 是否已经注册过 */
        if (this.memberData.status) {
        /** 注册过直接回 home */
          const queryPos = this.$route.query.pos
          console.log(queryPos)
          const path = queryPos ? `/user?pos=${queryPos}` : '/'
          this.$router.push(path)
        } else {
        /** 未注册 */
          if (this.isStaff && this.isStaff.isStaff) {
          /** 员工注册流程 */
            this.$store.commit('login/setRegisterStep', 'personnel-step1')
            return
          }
          this.$store.commit('login/setRegisterStep', 'other-entry')
        }
      } catch (error) {
        console.log(error)
      }
    },
    goWechart () {
      window.location.href = 'https://nineunitedtak.com/api/member/login?c=infoOpenid&u=true'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/login.scss';
</style>
