<template>
  <div>
    <div class="container site-is-default">
      <nuxt-link to="/" class="login-logo">
        <figure class="logo">
          <img src="~/assets/images/home/logo.png">
        </figure>
      </nuxt-link>
      <div class="login-container">
        <!-- <div class="login-bg" /> -->
        <section class="login-content">
          <phoneLogin v-if="!registerStep" @wxLoginClick="wxLoginClick" />
          <wechat-login v-if="registerStep === 'wxLogin'" @backLogin="backLogin" />
          <staffLogin v-if="registerStep === 'personnel-step1'" />
          <staffVerify v-if="registerStep === 'personnel-step2'" />
          <staffBind v-if="registerStep === 'personnel-step3'" />
          <success-dialog
            v-if="registerStep === 'done'"
            :done_text="doneText"
            :remark="doneRemark"
            @done="goHome"
          />
          <userRegister v-if="registerStep === 'other-entry'" />
          <RegiPartner v-if="registerStep === 'other-member'" />
          <!-- 有问题待调整 RegiDesign -->
          <RegiDesign v-if="registerStep === 'other-stylist'" />
          <RegiBlogger v-if="registerStep === 'other-kol'" />
          <RegiMedia v-if="registerStep === 'other-pressman'" />
        </section>
      </div>
    </div>
    <mobile-login class="site-is-mobile" />
  </div>
</template>

<script>
import phoneLogin from './phoneLogin.vue'
import staffLogin from './staffPages/staffLogin.vue'
import staffVerify from './staffPages/staffVerify.vue'
import staffBind from './staffPages/staffBind.vue'
import RegiPartner from './loginPages/RegiPartner.vue'
import userRegister from './loginPages/userRegister.vue'
import RegiDesign from './loginPages/RegiDesign.vue'
import RegiBlogger from './loginPages/RegiBlogger.vue'
import RegiMedia from './loginPages/RegiMedia.vue'
import wechatLogin from './loginPages/wechatLogin.vue'
import MobileLogin from '~/pages/mobile/login/index.vue'
import SuccessDialog from '~/components/common/Dialog/success.vue'
export default {
  name: 'LoginPage',
  components: {
    MobileLogin,
    SuccessDialog,
    phoneLogin,
    staffLogin,
    staffVerify,
    staffBind,
    RegiPartner,
    userRegister,
    RegiDesign,
    RegiBlogger,
    RegiMedia,
    wechatLogin
  },
  layout: 'login',
  props: {
    phoneNumber: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    showSection: 'RegiPartner',
    showDialog: false,
    selectForm: null,
    doneText: '注册成功',
    doneRemark: '即将回到首页'
  }),
  computed: {
    /** 当前注册的步骤 */
    registerStep () {
      return this.$store.getters['login/getRegisterStep']
    }
  },
  watch: {
    '$store.state.registerEntry.selected' (val) {
      if (val) {
        const name = ['', '会员', '设计师', '经销商/合作方', '博主', '媒体'][parseInt(val)]
        this.doneRemark = `您已成功注册会员，${name}身份申请已提交审核，认证通过后将享受相关权益`
      }
    }
  },
  created () {
    // 这里判断是否为微信登录流程，微信登录流程允许 token 存在，其他状态不允许 token 存在
    console.log(this.$store.state.login.isWechat)
    if (!this.$store.state.login.isWechat && this.$store.getters['login/checkLoginStatus']) {
      this.$router.push('/')
    }
    if (this.$store.state.registerEntry.selected) {
      const name = ['', '会员', '设计师', '经销商/合作方', '博主', '媒体'][parseInt(this.$store.state.registerEntry.selected)]
      this.doneRemark = `您已成功注册会员，${name}身份申请已提交审核，认证通过后将享受相关权益`
    } else {
      this.doneText = '绑定成功'
    }
  },
  beforeDestroy () {
    // 在离开当前页面的时候重新微信登录状态
    this.$store.commit('login/setWechatFlow', false)
  },
  methods: {
    loginEvent (data) {
      if (data === 'staffLogin' || data === 'userRegister') {
        this.showSection = data
      }
    },
    wxLoginClick () {
      this.showSection = 'wxLogin'
    },
    backLogin () {
      this.showSection = 'login'
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
    }
  }
}
</script>
