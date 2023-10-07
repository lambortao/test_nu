<template>
  <div class="phoneLogin_container">
    <div class="phoneLogin_title">
      <h1>Login</h1>
      <nuxt-link to="/en" class="skip">
        <p>skip</p>
      </nuxt-link>
    </div>
    <section class="login-en-content">
      <div class="form-label">
        <input
          v-model="phoneNumber"
          name="mobile"
          autocomplete="off"
          type="tel"
          placeholder="Please enter your E-mail Address"
        >
      </div>
      <div class="form-label">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
        >
      </div>
      <pwdLabel />
      <div class="form-label no-border btn-box">
        <pc-button
          @click="$emit('switchClick',{section:'regEmail'})"
        >
          Register
        </pc-button>
        <pc-button
          :is-dark="false"
          @click="handleLogin"
        >
          Sign in
        </pc-button>
      </div>
    </section>
    <section class="phoneLogin_bottom">
      <div>
        <p>log in with</p>
      </div>
      <div>
        <figure @click="$emit('switchClick',{section:'login'})">
          <img
            src="~/assets/images/icon/phone.png"
            alt=""
          >
        </figure>
        <span>Phone number</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PcButton from './normal-button.vue'
import pwdLabel from './cpns/pwdLabel.vue'
import globalTagList from '~/config/areaCode'
export default {
  name: 'EmailLoginComponent',
  components: {
    PcButton,
    pwdLabel
  },
  data () {
    return {
      globalTagList
    }
  },
  computed: {
    isActive () {
      console.log(this.$store.getters['login/getCodeIsActive'])
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
    country: {
      get () { return this.$store.state.login.login.country },
      set (value) { this.$store.commit('login/setLoginData', { key: 'country', value }) }
    },
    countryTag: {
      get () { return this.$store.state.login.login.countryTag },
      set (value) { this.$store.commit('login/setLoginData', { key: 'countryTag', value }) }
    },
    password: {
      get () { return this.$store.state.login.login.password },
      set (value) { this.$store.commit('login/setLoginData', { key: 'password', value }) }
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
      initLoginFlow: 'login/initLoginFlowEn',
      memberLoginEn: 'login/memberLoginEn'
    }),
    changeCountry (e) {
      this.$store.commit('login/setLoginData', {
        key: 'countryTag',
        value: `+${globalTagList.filter(item => item.en === e.target.value)[0].tel}`
      })
    },
    async handleLogin () {
      /** 执行登录流程 */
      try {
        await this.initLoginFlow()

        /** 是否已经注册过 */
        if (this.memberData.status) {
          /** 注册过直接回 home */
          const queryPos = this.$route.query.pos
          const path = queryPos ? `/en/user?pos=${queryPos}` : '/en'
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
@import '~/assets/scss/default/login/enLogin.scss';
</style>
