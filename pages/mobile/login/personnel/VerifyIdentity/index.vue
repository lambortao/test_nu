<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="VerifyIdentity">
    <header-back />
    <section class="login-section">
      <h3 class="login-subtitle">认证并查询您的员工身份</h3>
      <form-label label="邮箱">
        <m-input :value="email" :disabled="true" />
      </form-label>
      <form-label label="验证码">
        <verify-code
          v-model="code"
          field="email"
          :phone="email"
          url="/email/sendCode"
        />
      </form-label>
    </section>
    <div class="bottom-btn">
      <big-button :disabled="disableBtn" @click="handleVerify">{{ btnText }}</big-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'VerifyIdentity',
  computed: {
    disableBtn () {
      return this.$store.getters['registerStaff/disableQueryBtn']
    },
    email () {
      return this.$store.state.login.isStaff.email || this.$store.state.login.memberData.email
    },
    code: {
      get () { return this.$store.getters['registerStaff/getCode'] },
      set (value) { this.$store.commit('registerStaff/setCode', value) }
    },
    ...mapState('registerStaff', {
      btnText: state => state.query.btnText
    })
  },
  created () {},
  methods: {
    async handleVerify () {
      try {
        await this.$store.dispatch('registerStaff/useGetStaffInfo')
        this.$store.commit('login/setRegisterStep', 'personnel-step3')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
