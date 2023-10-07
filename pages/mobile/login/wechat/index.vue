<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable no-undef -->
<template>
  <client-only>
    <div class="mobile-login wh-full">
      <figure class="header">
        <img src="~/assets/images/AAmobile/login/frame.png" alt="背景图片">
      </figure>
      <div class="login-box c-whire">
        <span>绑定手机号</span>
        <form-label class-name="flex-between flex-align-center">
          <m-input v-model="phoneNumber" type="tel" autocomplete="off" placeholder="请输入您的手机号码" />
        </form-label>
        <form-label>
          <verify-code
            v-model="code"
            :phone="phoneNumber"
            url="/member/login/vcode"
          />
        </form-label>
      </div>
      <div class="confirm-btn bottom-btn">
        <mobile-aggreement />
        <big-button :disabled="!getCodeIsActive" @click="handleConfirm">{{ btnText }}</big-button>
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
  data () {
    return {
      btnText: '提交'
    }
  },
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
  methods: {
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
@import '~/assets/scss/mobile/login.scss';
</style>
