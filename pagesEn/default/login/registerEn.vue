<template>
  <div class="phoneLogin_container">
    <div class="phoneLogin_title">
      <h1>
        Register
      </h1>
      <div class="skip" @click="$emit('switchClick',{section:'login'})">
        <p>back</p>
      </div>
    </div>
    <section class="login-en-content">
      <template v-if="isPhoneModal">
        <div class="form-label">
          <pc-select
            v-model="countryTag"
            :country="true"
            border=""
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
            v-model="login_id"
            :style="{ width: '80%' }"
            name="mobile"
            type="text"
            placeholder="Please enter your phone number"
          >
        </div>
      </template>
      <div v-else class="form-label">
        <input
          v-model="login_id"
          class="code_box"
          name="email"
          type="email"
          placeholder="Please enter your E-mail Address"
        >
      </div>
      <div class="form-label inline-border">
        <input
          v-model="code"
          name="code"
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
        <!-- :disabled="!isActive"  -->
        <pc-button
          :disabled="!notEmpty"
          @click="handleRegiste"
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
      globalTagList,
      isPhoneModal: false,
      disabledBtn: false,
      btnText: 'Send',
      countDownNumber: 60
    }
  },
  computed: {
    isActive () {
      return this.$store.getters['login/getRegisterBtnIsActive']
    },
    // 验证数据是否填写
    notEmpty () {
      return this.$store.getters['login/notEmpty']
    },
    ...mapState('login', {
      globalTagOptions: 'areaCode',
      isAgreeCheck: state => state.isAgreeCheck,
      countryTagOptions: state => state.login.countryTagOptions
    }),
    country: {
      get () { return this.$store.state.login.login.country },
      set (value) { this.$store.commit('login/setLoginData', { key: 'country', value }) }
    },
    countryTag: {
      get () { return this.$store.state.login.login.countryTag },
      set (value) { this.$store.commit('login/setLoginData', { key: 'countryTag', value }) }
    },
    login_id: {
      get () { return this.$store.state.login.registerData['fm-login-id'] },
      set (value) { this.$store.commit('login/setRegisterEnData', { key: 'fm-login-id', value }) }
    },
    code: {
      get () { return this.$store.state.login.registerData.code },
      set (value) { this.$store.commit('login/setRegisterEnData', { key: 'code', value }) }
    },
    password: {
      get () { return this.$store.state.login.registerData.password },
      set (value) { this.$store.commit('login/setRegisterEnData', { key: 'password', value }) }
    },
    pass_confirm: {
      get () { return this.$store.state.login.registerData.pass_confirm },
      set (value) { this.$store.commit('login/setRegisterEnData', { key: 'pass_confirm', value }) }
    }
  },
  watch: {
    countryTag (data) {
      this.$store.commit('login/setRegisterEnData', { key: 'area_code', value: data })
    }
  },
  mounted () {
    // this.$store.commit('login/setRegisterEnData', { key: 'area_code', value: this.countryTag })
    // 清空注册信息
    this.$store.commit('login/initialize')
  },
  methods: {
    ...mapActions({
      sendCode: 'login/sendCode',
      registerConfirm: 'login/registerConfirm'
    }),
    checkRegisterModal () {
      this.isPhoneModal = !this.isPhoneModal
      const area = this.isPhoneModal ? this.countryTag : ''
      this.$store.commit('login/setRegisterEnData', { key: 'area_code', value: area })
      this.login_id = ''
      this.code = ''
      this.password = ''
      this.pass_confirm = ''
    },
    changeCountry (e) {
      this.$store.commit('login/setLoginData', {
        key: 'countryTag',
        value: `+${globalTagList.filter(item => item.en === e.target.value)[0].tel}`
      })
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
    },
    async handleRegiste () {
      /** 执行登录流程 */
      try {
        // 判断是否为员工，是的话直接跳员工绑定
        await this.$store.dispatch('login/isStaffFn')
        console.log(this.$store.state.login.staffEn.staffEmail, 'staffEmail')
        console.log(this.$store.state.login.staffEn.type, 'type')
        // 判断有没有邮箱
        if (this.$store.state.login.staffEn.staffEmail) {
          // 判断是否绑定
          if (this.$store.state.login.staffEn.type) {
            await this.$store.commit('site/setErrorData', 'Account is verified')
          } else {
            // await this.$store.commit('site/setErrorData', 'Account is already employee')
            this.$store.commit('login/setLoginSection', 'staff-login')
          }
        } else {
          // 跳转身份注册页
          this.$store.commit('login/setLoginSection', 'other-entry')
        }
      } catch (error) {
        console.log(error.code)
        // 40002 经销商
        // 20302
        // 20103 验证码错误的提示
        // 20102
        if (error.code === 40002) {
          this.$store.commit('login/setLoginSection', 'login')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/login/enLogin.scss';
.skip{cursor: pointer;}
:deep(.select select) {
  border: none;
}
</style>
