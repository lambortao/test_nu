<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- eslint-disable no-undef -->
<template>
  <client-only>
    <div class="mobile-login wh-full">
      <figure class="header">
        <img src="~/assets/images/AAmobile/login/logo.png" alt="背景图片">
      </figure>
      <div class="login-box c-whire">
        <div class="login-header-en">
          <span>LOGIN </span>
          <nuxt-link to="/en">Skip</nuxt-link>
        </div>
        <form-label class-name="flex-between flex-align-center">
          <en-mselect v-model="countryTag" :style="{ width: '100%' }" defaultdata="+86" :options="globalTagOptions" />
        </form-label>
        <form-label class-name="flex-between flex-align-center">
          <en-minput v-model="phoneNumber" :style="{ width: '100%' }" autocomplete="off" type="tel" placeholder="Phone number" />
        </form-label>
        <form-label>
          <en-verifycode
            v-model="code"
            :phone="phoneNumber"
            url="/member/login/vcode"
          />
        </form-label>
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
import EnMselect from '~/componentsEn/AAMobile/InputComponent/select.vue'
import EnMinput from '~/componentsEn/AAMobile/InputComponent/input.vue'
import EnVerifycode from '~/componentsEn/AAMobile/VerifyCode'
import MobileAggreement from '~/componentsEn/AAMobile/Aggreement/index.vue'
export default {
  name: 'LoginPage',
  components: {
    EnMselect,
    EnMinput,
    EnVerifycode,
    MobileAggreement
  },
  computed: {
    isActive () {
      return this.$store.getters['login/getCodeIsActive']
    },
    ...mapState('login', {
      loginRes: 'loginRes',
      isStaff: 'isStaff',
      globalTagOptions: 'areaCode',
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
          const path = queryPos ? `/en/user?pos=${queryPos}` : '/'
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/login.scss';
</style>
