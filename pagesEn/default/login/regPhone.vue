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
        <pc-select
          v-model="countryTag"
          :country="true"
          :style="{
            height: '58px',
            width: '20%',
            borderLeft: 'none',
            borderTop: 'none',
            borderBottom: 'none',
          }"
          :options="globalTagOptions"
        />
        <input
          v-model="phoneNumber"
          :style="{ width: '80%' }"
          name="mobile"
          type="text"
          placeholder="Please enter your phone number"
          maxlength="11"
        >
      </div>
      <div class="form-label inline-border">
        <input
          v-model="phoneNumber"
          name="mobile"
          type="number"
          placeholder="Verification Code"
        >
        <div class="code_box">
          Send
        </div>
      </div>
      <div class="form-label">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
        >
      </div>
      <div class="form-label">
        <input
          v-model="password"
          type="password"
          placeholder="Confirm Password"
        >
      </div>
      <pwdLabel model-type="reg" />
      <div class="form-label no-border">
        <pc-button
          :disabled="!isActive"
          @click="handleLogin"
        >
          Register
        </pc-button>
      </div>
    </section>
    <section class="phoneLogin_bottom">
      <div>
        <p>log in with</p>
      </div>
      <div>
        <figure @click="$emit('switchClick',{section:'regEmail'})">
          <img
            src="~/assets/images/icon/email.png"
            alt=""
          >
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import pwdLabel from './cpns/pwdLabel.vue'
import PcButton from '~/componentsEn/PcButton'
import globalTagList from '~/config/areaCode'
export default {
  name: 'RegPhoneComponent',
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
      globalTagOptions: 'areaCode',
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
      initLoginFlow: 'login/initLoginFlow',
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
:deep(.select select) {
  border: none;
}
</style>
