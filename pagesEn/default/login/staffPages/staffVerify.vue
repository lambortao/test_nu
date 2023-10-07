<template lang="html">
  <div class="staffVerify_container">
    <section class="staffVerify_title">
      <div>Employee log in confirmation</div>
      <div>
        <p>Verify with the code we sent to your email.</p>
      </div>
    </section>
    <section class="staffVerify_content">
      <div>
        <div class="account_box">
          <!-- <m-input :value="value" :disabled="true" /> -->
          <input type="text" :disabled="true" :value="email">
        </div>
        <send-code
          v-model="code"
          field="email"
          :phone="email"
          url="/email/sendCode"
        />
      </div>
      <div>
        <pc-button
          :disabled="disableBtn"
          @click="handleVerify"
        >
          Verify
        </pc-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PcButton from '~/componentsEn/PcButton'
import SendCode from '~/componentsEn/SendCode'
export default {
  name: 'StaffLoginComponent',
  components: {
    PcButton,
    SendCode
  },
  computed: {
    disableBtn () {
      return this.code === ''
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
.staffVerify_container {
  padding-top: 10vh;
  width: 530px;

  .staffVerify_title {
    div:nth-child(1) {
      font-size: 36px;
      font-weight: bold;
    }
  }

  .staffVerify_content {
    margin-top: 40px;

    div:nth-child(1) {
      width: 100%;
      .account_box {
        height: 60px;
        input {
          width: 100%;
          height: 100%;
          padding: 0 24px;
          color: rgb(160, 160, 160);
        }
      }

      .verify_box {
        min-width: 530px;
        height: 60px;
        display: flex;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin-top: 20px;
        >div:nth-child(2) {
          padding: 10px 0;
          button {
            width: 136px;
            height: 100%;
            border: none;
            border-left: 1px solid rgba(0, 0, 0, 0.2);
            background: none;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
          }
        }
        input {
          width: 100%;
          border: none;
          padding: 0 0 0 26px;
        }
      }
    }

    >div:nth-child(2) {
      width: 100%;
      height: 60px;
      margin: 60px auto 0;
      >button {
        width: 100%;
        height: 100%;
        border: none;
        background: #000;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
