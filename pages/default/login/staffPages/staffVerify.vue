<template lang="html">
  <div class="staffVerify_container">
    <section class="staffVerify_title">
      <div>认证并查询您的员工身份</div>
    </section>
    <section class="staffVerify_content">
      <div>
        <div class="account_box">
          <input :value="email" :disabled="true">
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
          {{ btnText }}
        </pc-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StaffLoginComponent',
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
.staffVerify_container {
  padding-top: 10vh;
  width: 530px;
  .staffVerify_title {
    div:nth-child(1) {
      font-size: vw(36);
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
        }
      }
      .verify_box {
        width: 530px;
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
            font-size: vw(16);
            font-weight: bold;
          }
        }
        input {
          width: 100%;
          border: none;
          font-size: vw(16);
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
@include media(">maxW") {
  .staffVerify_container {
  .staffVerify_title {
    div:nth-child(1) {
      font-size: 36px;
      font-weight: bold;
    }
  }
  .staffVerify_content {
    margin-top: 40px;
    div:nth-child(1) {
      .verify_box {
        >div:nth-child(2) {
          padding: 10px 0;
          button {
            width: 136px;
            font-size: 16px;
          }
        }
        input {
          width: 100%;
          border: none;
          padding: 0 0 0 26px;
          font-size: 16px;
        }
      }
    }
  }
}
}
</style>
