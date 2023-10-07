<template>
  <div>
    <div class="container site-is-default">
      <nuxt-link to="/en" class="login-logo">
        <figure class="logo">
          <img src="~/assets/images/home/logo.png">
        </figure>
      </nuxt-link>
      <div class="login-container">
        <!-- <div class="login-bg" /> -->
        <section class="login-content">
          <loginSection v-if="loginSection === 'login'" @switchClick="switchClick" />
          <registerSection v-if="loginSection === 'register'" @switchClick="switchClick" />
          <forgetPwd v-if="loginSection==='forget'" @switchClick="switchClick" />
          <!-- 身份选择注册 -->
          <userRegister v-if="loginSection==='other-entry'" />
          <!-- 经销商审核页 -->
          <RegiPartner v-if="loginSection === 'other-member'" />
          <!-- 员工登录页 -->
          <staffLogin v-if="loginSection === 'staff-login'" />
          <!-- 员工认证查询页 -->
          <staffVerify v-if="loginSection === 'staff-prove'" />
          <!-- 员工绑定页 -->
          <staffBind v-if="loginSection === 'staff-bind'" />
          <success-dialog
            v-if="tipsSection === 'done'"
            :done_text="$store.state.login.tipsContent.title"
            :remark="$store.state.login.tipsContent.details"
            @done="goHome"
          />
        </section>
      </div>
    </div>
    <mobile-login class="site-is-mobile" />
  </div>
</template>

<script>
import forgetPwd from './forget.vue'
import registerSection from './registerEn'
import loginSection from './loginEn'
import userRegister from './loginPages/userRegister.vue'
import RegiPartner from './loginPages/RegiPartner.vue'
import staffLogin from './staffPages/staffLogin.vue'
import staffVerify from './staffPages/staffVerify.vue'
import staffBind from './staffPages/staffBind.vue'
import MobileLogin from '~/pagesEn/mobile/login/index.vue'
import SuccessDialog from '~/componentsEn/common/Dialog/success.vue'
export default {
  name: 'LoginPage',
  components: {
    MobileLogin,
    SuccessDialog,
    forgetPwd,
    registerSection,
    loginSection,
    userRegister,
    RegiPartner,
    staffLogin,
    staffVerify,
    staffBind
  },
  layout: 'login',
  props: {
    phoneNumber: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    // loginSection: 'login',
    showDialog: false,
    selectForm: null
    // doneText: 'Verified',
    // doneRemark: 'Back to home page'
  }),
  computed: {
    loginSection: {
      get () { return this.$store.state.login.loginSection },
      set (value) { this.$store.commit('login/setLoginSection', value) }
    },
    tipsSection: {
      get () { return this.$store.state.login.tipsSection },
      set (value) { this.$store.commit('login/setTipsSection', value) }
    }
  },
  mounted () {
    this.loginSection = 'login'
  },
  created () {
    /** 如果已经登陆过就返回主页 */
    if (this.$store.getters['login/checkLoginStatus']) {
      this.$router.push('/en')
    }
  },
  methods: {
    switchClick (data) {
      this.loginSection = data.section
    },
    goHome () {
      /** 清空注册步骤 */
      this.$store.commit('login/setTipsSection', null)
      /** 回到首页 */
      this.$router.push('/en')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/_fun.scss';
.container{
  .login-logo{
    .logo{
      img{
        width: vw(35);
        height: vw(48);
      }
    }
  }
  .login-content{
    @include media('<1600px') {
      overflow: visible;
      padding: 0;
  }
  }
}
</style>
