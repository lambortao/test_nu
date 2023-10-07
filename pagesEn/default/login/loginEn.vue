<template>
  <div class="phoneLogin_container">
    <div class="phoneLogin_title">
      <h1>Log in</h1>
      <nuxt-link to="/en" class="skip">
        <p>skip</p>
      </nuxt-link>
    </div>
    <section class="login-en-content">
      <template v-if="isPhoneModal">
        <!-- <p class="en-region">
          Region
        </p> -->
        <!-- <div class="form-label no-border region_select">
          <select
            v-model="country"
            @change="e => changeCountry(e.target.value)"
          >
            <option
              v-for="(item,index) in globalTagList"
              :key="index"
              :value="item.en"
            >
              {{ item.en }}
            </option>
          </select>
          <div class="select_icon">
            <img
              src="~/assets/images/login/down.png"
              alt=""
            >
          </div>
        </div> -->
        <div class="form-label">
          <pc-select
            v-model="countryTag"
            :country="true"
            border=""
            :style="{
              height: '58px',
              width: '108px',
              borderLeft: 'none',
              borderTop: 'none',
              borderBottom: 'none'
            }"
            :options="globalTagOptions"
          />
          <input
            v-model="login_id"
            :style="{ width: '70%' }"
            name="phoneNumber"
            type="text"
            placeholder="Please enter your phone number"
            maxlength="11"
          >
        </div>
      </template>
      <div v-else class="form-label">
        <input
          v-model="login_id"
          autocomplete="off"
          name="mobile"
          type="email"
          placeholder="Please enter your E-mail Address"
        >
      </div>
      <div class="form-label">
        <input
          v-model="password"
          type="password"
          autocomplete="off"
          placeholder="Password"
        >
      </div>
      <pwdLabel />
      <div class="form-label no-border btn-box">
        <pc-button
          @click="$emit('switchClick',{section:'register'})"
        >
          Register
        </pc-button>
        <pc-button
          :disabled="!isActive"
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
        <figure @click="checkRegisterModal">
          <img
            v-if="isPhoneModal"
            src="~/assets/images/icon/email.png"
            alt=""
          >
          <img
            v-else
            src="~/assets/images/icon/phone.png"
            alt=""
          >
        </figure>
        <span>{{ isPhoneModal ? 'Email' : 'Phone number' }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PcButton from './cpns/normal-button.vue'
import pwdLabel from './cpns/pwdLabel.vue'
import globalTagList from '~/config/areaCode'
export default {
  name: 'PhoneLoginComponent',
  components: {
    PcButton,
    pwdLabel
  },
  data () {
    return {
      globalTagList,
      isPhoneModal: false
    }
  },
  computed: {
    isActive () {
      return this.$store.getters['login/getEnbtnIsActive']
    },
    ...mapState('login', {
      globalTagOptions: 'areaCode',
      countryTagOptions: state => state.login.countryTagOptions
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
    login_id: {
      get () { return this.$store.state.login.loginEn['fm-login-id'] },
      set (value) { this.$store.commit('login/setLoginEnData', { key: 'fm-login-id', value }) }
    },
    password: {
      get () { return this.$store.state.login.loginEn.password },
      set (value) { this.$store.commit('login/setLoginEnData', { key: 'password', value }) }
    }
  },
  watch: {
    countryTag (data) {
      this.$store.commit('login/setLoginEnData', { key: 'area_code', value: data })
    }
  },
  mounted () {
    this.$store.commit('login/setLoginEnData', { key: 'area_code', value: '' }
    )
  },
  methods: {
    ...mapActions({
      memberLoginEn: 'login/memberLoginEn'
    }),
    changeCountry (e) {
      this.$store.commit('login/setLoginData', {
        key: 'countryTag',
        value: `+${globalTagList.filter(item => item.en === e)[0].tel}`
      })
    },
    checkRegisterModal () {
      this.isPhoneModal = !this.isPhoneModal
      const area = this.isPhoneModal ? this.countryTag : ''
      this.$store.commit('login/setLoginEnData', { key: 'area_code', value: area })
      this.login_id = ''
      this.password = ''
    },
    async handleLogin () {
      /** 执行登录流程 */
      try {
        await this.memberLoginEn()
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
