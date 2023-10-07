<template>
  <!-- <client-only> -->
  <div>
    <!-- 登录主面板，包含邮箱和手机号 -->
    <login-index v-if="loginSection === 'login'" />
    <!-- 注册流程 -->
    <register-flow v-if="loginSection === 'register'" />
    <!-- 忘记密码流程 -->
    <forget-flow v-if="loginSection === 'forget'" />
    <!-- 员工登录、认证、绑定 -->
    <personnel-welcome v-if="loginSection === 'staff-login'" />
    <personnel-verify-identity v-if="loginSection === 'staff-prove'" />
    <personnel-comfirm-data v-if="loginSection === 'staff-bind'" />
    <!-- 身份选择、经销商审核 -->
    <other-entry v-if="loginSection === 'other-entry'" />
    <!-- 经销商 -->
    <other-member v-if="loginSection === 'other-member'" />
    <!-- 提示框 -->
    <login-done
      v-if="loginSection === 'done'"
      :done-text="$store.state.login.tipsContent.title"
      :remark="$store.state.login.tipsContent.details"
      @timeout="goHome"
    />
  </div>
  <!-- </client-only> -->
</template>

<script>
import LoginIndex from './LoginFlow.vue'
import RegisterFlow from './RegisterFlow.vue'
import ForgetFlow from './ForgetFlow.vue'
// 员工
import PersonnelWelcome from './personnel/Welcome/index.vue'
import PersonnelVerifyIdentity from './personnel/VerifyIdentity/index.vue'
import PersonnelComfirmData from './personnel/comfirmData/index.vue'
// 身份选择页
import OtherEntry from './other/EntryPage/index.vue'
// 经销商
import OtherMember from './other/MemberPage/index.vue'

import loginDone from '~/componentsEn/AAMobile/Done/index.vue'

export default {
  name: 'LoginFlow',
  components: {
    LoginIndex,
    RegisterFlow,
    ForgetFlow,
    // 员工
    PersonnelWelcome,
    PersonnelVerifyIdentity,
    PersonnelComfirmData,
    // 身份选择页
    OtherEntry,
    // 经销商
    OtherMember,
    // 提示框
    loginDone
  },
  computed: {
    loginSection: {
      get () { return this.$store.state.login.loginSection },
      set (value) { this.$store.commit('login/setLoginSection', value) }
    }
  },
  methods: {
    goHome () {
      /** 回到首页 */
      this.$router.push('/en/')
    }
  }
}
</script>
