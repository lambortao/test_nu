<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <client-only>
    <div class="mobile-login wh-full">
      <figure class="header">
        <img src="~/assets/images/AAmobile/login/frame.png" alt="背景图片">
      </figure>
      <div class="login-box c-whire">
        <div class="login-header-en">
          <span style="opacity:0">Register</span>
          <span class="back" @click="$store.commit('login/setLoginSection', 'login')">Back</span>
        </div>
        <form-label
          v-if="isMail"
          class-name="flex-between flex-align-center"
        >
          <en-minput v-model="login_id" autocomplete="off" type="email" placeholder="E-mail Address" />
        </form-label>
        <form-label v-else>
          <country-phone
            v-model="login_id"
            :country-tag="$store.state.login.registerData.area_code"
            @changeCountryTag="value => $store.commit('login/setRegisterEnData', { key: 'area_code', value })"
          />
        </form-label>
        <form-label>
          <verify-code
            v-model="code"
            field="fm-login-id"
            tag-field="area_code"
            :phone="login_id"
            :type="isMail ? 'email' : 'mobile'"
            :country-tag="$store.state.login.login.countryTag"
            url="/member/SendCode"
          />
        </form-label>
        <form-label>
          <en-minput v-model="password" autocomplete="off" type="password" placeholder="Password" />
        </form-label>
        <form-label>
          <en-minput v-model="pass_confirm" autocomplete="off" type="password" placeholder="Confirm Password" />
        </form-label>
        <change-flow-vue v-model="isMail" :text="isMail ? 'Use Phone' : 'Use Email'" />
      </div>
      <div class="confirm-btn bottom-btn">
        <big-button :disabled="!notEmpty" :style="{ marginBottom: '10px' }" @click="handleRegiste">{{ btnText }}</big-button>
      </div>
    </div>
  </client-only>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import CountryPhone from './components/CountryPhone.vue'
import ChangeFlowVue from './components/ChangeFlow.vue'
import EnMinput from '~/componentsEn/AAMobile/InputComponent/input.vue'
import VerifyCode from '~/componentsEn/AAMobile/VerifyCode/index.vue'

export default {
  name: 'LoginRegisterFlow',
  components: {
    CountryPhone,
    EnMinput,
    ChangeFlowVue,
    VerifyCode
  },
  data () {
    return {
      /** 当前显示状态，是邮箱还是手机号登录 */
      isMail: true,
      btnText: 'Confirm',
      submit: false
    }
  },
  computed: {
    // isActive () {
    //   return this.login_id &&
    //     this.code &&
    //     this.password &&
    //     this.pass_confirm &&
    //     this.password === this.pass_confirm
    // },
    // 验证数据是否填写
    notEmpty () {
      return this.$store.getters['login/notEmpty']
    },
    ...mapState('login', {
      isStaff: 'isStaff',
      countryTagOptions: state => state.login.countryTagOptions,
      memberData: state => state.memberData
    }),
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
    /** 切换的时候清空已经输入的内容 */
    isMail () {
      this.$store.commit('login/setRegisterEnData', { key: 'fm-login-id', value: '' })
      this.$store.commit('login/setRegisterEnData', { key: 'password', value: '' })
    }
  },
  mounted () {
    // 清空注册信息
    this.$store.commit('login/initialize')
  },
  methods: {
    ...mapActions({
      sendCode: 'login/sendCode',
      registerConfirm: 'login/registerConfirm'
    }),
    changeFlow (step) {
      this.$store.commit('login/setLoginSection', step)
    },
    handleLogin () {
      console.log('忘记密码流程')
    },
    async handleRegiste () {
      /** 执行注册流程 */
      try {
        // 判断是否为员工，是的话直接跳员工绑定
        await this.$store.dispatch('login/isStaffFn')
        if (this.$store.state.login.staffEn.staffEmail) {
          if (this.$store.state.login.staffEn.type) {
            await this.$store.commit('site/setErrorData', 'Account is verified')
          } else {
            await this.$store.commit('site/setErrorData', 'Account is already employee')
            this.$store.commit('login/setLoginSection', 'staff-login')
          }
        } else {
          // 跳转身份注册页
          this.$store.commit('login/setLoginSection', 'other-entry')
        }
      } catch (error) {
        console.log(error.code)
        if (error.code === 40002) {
          this.$store.commit('login/setLoginSection', 'login')
        }
      } finally {
        // this.submit = false
        // this.btnText = 'Confirm'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mobile/login.scss';
.forget-password {
  text-decoration: underline;
}
</style>
