<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <client-only>
    <div class="mobile-login wh-full">
      <figure class="header">
        <img src="~/assets/images/AAmobile/login/frame.png" alt="背景图片">
      </figure>
      <div class="login-box c-whire">
        <div class="login-header-en">
          <span style="opacity:0">Forgot password</span>
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
            :country-tag="$store.state.forget.postData.area_code"
            @changeCountryTag="value => $store.commit('forget/setPostData', { key: 'area_code', value })"
          />
        </form-label>
        <form-label>
          <verify-code
            v-model="code"
            field="fm-login-id"
            tag-field="area_code"
            :phone="login_id"
            :type="isMail ? 'email' : 'mobile'"
            :country-tag="$store.state.forget.postData.area_code"
            url="/member/SendCode"
            :forget="true"
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
        <big-button :disabled="!isActive" :style="{ marginBottom: '10px' }" @click="handleLogin">{{ btnText }}</big-button>
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
  name: 'LoginForgetFlow',
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
    isActive () {
      return this.login_id && this.code && this.password && this.pass_confirm && this.password === this.pass_confirm
    },
    ...mapState('login', {
      isStaff: 'isStaff',
      countryTagOptions: state => state.login.countryTagOptions,
      memberData: state => state.memberData
    }),
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
    /** 切换的时候清空已经输入的内容 */
    isMail () {
      this.$store.commit('login/setLoginData', { key: 'phoneNumber', value: '' })
      this.$store.commit('login/setLoginEnData', { key: 'password', value: '' })
    }
  },
  methods: {
    ...mapActions({
      confirmEvent: 'forget/confirmForgetPwd'
    }),
    changeFlow (step) {
      this.$store.commit('login/setLoginSection', step)
    },
    async handleLogin () {
      try {
        this.submit = true
        this.btnText = 'Loading ...'
        await this.$store.dispatch('forget/confirmForgetPwd')
        this.$store.commit('login/setLoginSection', 'login')
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
}
</style>
