<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="VerifyIdentity">
    <header-back />
    <section class="login-section">
      <h3 class="login-subtitle" style="margin-bottom:0;">Employee log in confirmation</h3>
      <P class="deputy">Verify with the code we sent to your email.</P>
      <form-label label="email">
        <m-input :value="email" :disabled="true" />
      </form-label>
      <form-label label="Code">
        <verify-code
          v-model="code"
          field="email"
          :phone="email"
          url="/email/sendCode"
        />
      </form-label>
      <div class="bottom-btn">
        <big-button :disabled="disableBtn" @click="handleVerify">Verify</big-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VerifyCode from '~/componentsEn/AAMobile/VerifyCode/index.vue'

export default {
  name: 'VerifyIdentity',
  components: {
    VerifyCode
  },
  computed: {
    disableBtn () {
      return this.code === ''
      // return this.$store.getters['registerStaff/disableQueryBtn']
    },
    email () {
      // return this.$store.state.login.isStaff.email || this.$store.state.login.memberData.email
      return this.$store.state.login.staffEn.staffEmail
    },
    code: {
      // get () { return this.$store.getters['registerStaff/getCode'] },
      // set (value) { this.$store.commit('registerStaff/setCode', value) }
      get () { return this.$store.state.login.staffEn.code },
      set (value) { this.$store.commit('login/setStaffCode', value) }
    },
    ...mapState('registerStaff', {
      btnText: state => state.query.btnText
    })
  },
  created () {},
  methods: {
    async handleVerify () {
      try {
        await this.$store.dispatch('login/bindStaff')
        await this.$store.commit('login/setLoginSection', 'staff-bind')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.deputy {
  width: 100%;
  border-radius: nullpx;
  margin-top: 8px;
  margin-bottom: 40px;
  color: rgba($color: #000000, $alpha: 0.6);
  font-size: 14px;
}
</style>
