<template lang="html">
  <div class="staffBind_container">
    <section class="staffBind_title">
      <div>Hello，<span>{{ staffData.english_name }}</span></div>
    </section>
    <section class="staffBind_content">
      <div>
        <div><span>Staff Name</span><span>{{ staffData.english_name }}</span></div>
        <div><span>Company Name</span><span>Nine United</span></div>
        <div><span>Department</span><span>{{ staffData.department }}</span></div>
        <div><span>Registration Phone</span><span>{{ staffData.mobile }}</span></div>
        <div><span>Enterprise Email</span><span>{{ staffData.email }}</span></div>
        <div><span>Account Status</span><span>Unverified</span></div>
      </div>
      <div>
        <pc-button
          @click="confirmBind"
        >
          Confirm
        </pc-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import PcButton from '~/componentsEn/PcButton'
export default {
  name: 'StaffBindComponent',
  components: {
    PcButton
  },
  computed: {
    // staffData () { return this.$store.getters['registerStaff/getStaffData'] }
    staffData () { return this.$store.state.login.staffBIndInfo },
    registerData () { return this.$store.state.login.registerData }
  },
  created () {},
  methods: {
    ...mapActions({
      memberLoginEn: 'login/memberLoginEn'
    }),
    async confirmBind () {
      try {
        const keyArr = ['area_code', 'fm-login-id', 'password']
        keyArr.forEach((el) => {
          this.$store.commit('login/setLoginEnData', {
            key: el,
            value: this.registerData[el]
          })
        })
        await this.memberLoginEn()
        // 提示框内容
        await this.$store.commit('login/setTipsContent', {
          title: 'Verified',
          details: 'Back to home page'
        })

        await this.$store.commit('login/setTipsSection', 'done')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.staffBind_container {
  padding-top: 10vh;
  // min-width: 530px;
  width: 530px;

  .staffBind_title {
    div:nth-child(1) {
      font-size: 36px;

      span {
        font-weight: bold;
      }
    }
  }

  .staffBind_content {
    margin-top: 40px;

    >div:nth-child(1) {
      width: 100%;
      background: rgba(216, 216, 216, 0.2);

      >div {
        padding: 0 40px;
        height: 49px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:nth-child(1) {
          font-weight: bold;
          opacity: 0.4;
          text-align: left;
        }

        span:nth-child(2) {
          text-align: right;
          color: #000;
          font-size: 16px;
        }
      }

      >div:not(:last-child) {
        border-bottom: 1px solid #fff;
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
