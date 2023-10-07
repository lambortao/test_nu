<template>
  <div class="VerifyIdentity">
    <header-back />
    <section class="login-section">
      <h3 class="login-subtitle">
        Authenticate and check your employee status
      </h3>
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
        <big-button
          :disabled="disableBtn"
          @click="handleVerify"
        >
          Submit
        </big-button>
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
        // await this.$store.dispatch('registerStaff/useGetStaffInfo')
        await this.$store.commit('login/setLoginSection', 'staff-bind')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
