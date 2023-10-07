<template>
  <div class="phoneLogin_container">
    <div class="phoneLogin_title">
      <h1>Forgot password</h1>
      <p @click="click">
        Use {{ isPhoneModal ? 'Email' : 'mobile' }}
      </p>
    </div>
    <section class="login-en-content">
      <div v-if="isPhoneModal" class="form-label">
        <pc-select
          v-model="countryTag"
          :country="true"
          :style="{
            height: '58px',
            width: '108px',
            borderLeft: 'none',
            borderTop: 'none',
            borderBottom: 'none',
          }"
          :options="globalTagOptions"
        />
        <input
          v-model="login_id"
          :style="{ width: '70%' }"
          name="mobile"
          type="text"
          placeholder="Please enter your phone number"
          maxlength="11"
        >
      </div>
      <div v-else class="form-label">
        <input
          v-model="login_id"
          class="code_box"
          name="email"
          type="email"
          placeholder="Please enter your E-mail Address"
        >
      </div>
      <div
        class="form-label inline-border"
      >
        <input
          v-model="code"
          name="mobile"
          type="text"
          placeholder="Verification Code"
        >
        <div class="code_box" style="cursor:pointer;" @click="getCode">
          {{ btnText }}
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
          v-model="pass_confirm"
          type="password"
          placeholder="Confirm Password"
        >
      </div>
      <pwdLabel model-type="reg" />
      <div class="form-label no-border">
        <pc-button
          :disabled="!isActive"
          @click="confirmEvent"
        >
          Confirm
        </pc-button>
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
  props: {
    model: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isPhoneModal: true,
      globalTagList,
      disabledBtn: false,
      btnText: 'Send',
      countDownNumber: 60
    }
  },
  computed: {
    isActive () {
      console.log(this.$store.getters['forget/getCodeIsActive'])
      return this.$store.getters['forget/getCodeIsActive']
    },
    ...mapState('login', {
      globalTagOptions: 'areaCode',
      countryTagOptions: state => state.login.countryTagOptions
    }),
    countryTag: {
      get () { return this.$store.state.forget.postData.area_code },
      set (value) { this.$store.commit('forget/setPostData', { key: 'area_code', value }) }
    },
    login_id: {
      get () { return this.$store.state.forget.postData['fm-login-id'] },
      set (value) { this.$store.commit('forget/setPostData', { key: 'fm-login-id', value }) }
    },
    code: {
      get () { return this.$store.state.forget.postData.code },
      set (value) { this.$store.commit('forget/setPostData', { key: 'code', value }) }
    },
    password: {
      get () { return this.$store.state.forget.postData.password },
      set (value) { this.$store.commit('forget/setPostData', { key: 'password', value }) }
    },
    pass_confirm: {
      get () { return this.$store.state.forget.postData.pass_confirm },
      set (value) { this.$store.commit('forget/setPostData', { key: 'pass_confirm', value }) }
    }
  },
  watch: {
    countryTag (data) {
      this.$store.commit('forget/setPostData', { key: 'area_code', value: data })
    }
  },
  mounted () {
    this.$store.commit('forget/setPostData', { key: 'area_code', value: '+93' })
  },
  methods: {
    ...mapActions({
      sendCode: 'forget/sendCode',
      confirmEvent: 'forget/confirmForgetPwd'
    }),
    click () {
      this.isPhoneModal = !this.isPhoneModal
      if (!this.isPhoneModal) {
        this.$store.commit('forget/setPostData', { key: 'area_code', value: '+93' })
      }
    },
    async getCode () {
      if (this.login_id !== '' && !this.disabledBtn) {
        this.disabledBtn = true
        this.btnText = 'send…'
        await this.sendCode()
        this.countDown()
      } else if (this.login_id === '') {
        this.$store.commit('site/setErrorData', 'please your email or mobile')
      }
    },
    countDown () {
      const defaultNumber = this.countDownNumber
      const down = () => {
        this.btnText = this.countDownNumber + 's'
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber = this.countDownNumber - 1
            down()
          } else {
            this.countDownNumber = defaultNumber
            this.btnText = 'Send'
            this.disabledBtn = false
          }
        }, 1000)
      }
      down()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/login/enLogin.scss';
.phoneLogin_title{
  p{
    cursor: pointer;
    user-select: none;
    opacity: 0.8;
  }
}
:deep(.select select) {
  border: none;
}
</style>
