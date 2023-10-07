<!-- eslint-disable no-undef -->
<template>
  <client-only>
    <div class="mobile-login wh-full">
      <figure class="header">
        <img src="~/assets/images/AAmobile/login/frame.png" alt="背景图片">
      </figure>
      <div class="login-box c-whire">
        <div class="login-header-en">
          <span>Log in</span>
          <nuxt-link to="/en">
            Skip
          </nuxt-link>
        </div>
        <form-label
          v-if="isMail"
          class-name="flex-between flex-align-center"
        >
          <en-minput v-model="loginId" autocomplete="off" type="email" placeholder="E-mail Address" />
        </form-label>
        <form-label v-else>
          <country-phone
            v-model="loginId"
            :country-tag="$store.state.login.registerData.area_code"
            @changeCountryTag="value => $store.commit('login/setRegisterEnData', { key: 'area_code', value })"
          />
        </form-label>
        <form-label>
          <en-minput v-model="password" autocomplete="off" type="password" placeholder="Password" />
        </form-label>
        <div class="forget-password" @click="changeFlow('forget')">
          Forget Password?
        </div>
        <change-flow-vue v-model="isMail" />
      </div>
      <div class="confirm-btn bottom-btn">
        <mobile-aggreement />
        <big-button :disabled="!isActive || submit" :style="{ marginBottom: '10px' }" @click="handleLogin">
          {{ btnText }}
        </big-button>
        <big-button :style="{ backgroundColor: '#fff', color: '#000', border: '1px solid #000' }" @click="changeFlow('register')">
          Register
        </big-button>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CountryPhone from './components/CountryPhone.vue'
import ChangeFlowVue from './components/ChangeFlow.vue'
import MobileAggreement from '~/componentsEn/AAMobile/Aggreement/index.vue'
import EnMinput from '~/componentsEn/AAMobile/InputComponent/input.vue'

export default {
  name: 'LoginPage',
  components: {
    MobileAggreement,
    CountryPhone,
    EnMinput,
    ChangeFlowVue
  },
  data () {
    return {
      /** 当前显示状态，是邮箱还是手机号登录 */
      isMail: true,
      btnText: 'Sign in',
      submit: false
    }
  },
  computed: {
    isActive () {
      return this.loginId && this.password && this.$store.state.login.isAgreeCheck
    },
    ...mapState('login', {
      isStaff: 'isStaff',
      btnText: state => state.login.btnText,
      countryTagOptions: state => state.login.countryTagOptions,
      memberData: state => state.memberData
    }),
    loginId: {
      get () { return this.$store.state.login.loginEn['fm-login-id'] },
      set (value) { this.$store.commit('login/setLoginEnData', { key: 'fm-login-id', value }) }
    },
    password: {
      get () { return this.$store.state.login.loginEn.password },
      set (value) { this.$store.commit('login/setLoginEnData', { key: 'password', value }) }
    }
  },
  watch: {
    /** 切换的时候清空已经输入的内容 */
    isMail () {
      this.$store.commit('login/setLoginData', { key: 'phoneNumber', value: '' })
      this.$store.commit('login/setLoginEnData', { key: 'password', value: '' })
    }
  },
  methods: {
    ...mapActions({
      memberLoginEn: 'login/memberLoginEn'
    }),
    changeFlow (step) {
      this.$store.commit('login/setLoginSection', step)
    },
    async handleLogin () {
      /** 执行登录流程 */
      try {
        this.submit = true
        this.btnText = 'Loading ...'
        await this.memberLoginEn()
      } catch (error) {
        console.log(error)
      } finally {
        this.submit = false
        this.btnText = 'Confirm'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/login.scss';
.forget-password {
  text-decoration: underline;
  color: #000;
}
</style>
