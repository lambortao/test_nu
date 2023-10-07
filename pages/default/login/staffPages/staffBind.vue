<template lang="html">
  <div class="staffBind_container">
    <section class="staffBind_title">
      <div>您好，<span>{{ staffData.name }}</span></div>
    </section>
    <section class="staffBind_content">
      <div>
        <div><span>员工姓名</span><span>{{ staffData.name }}</span></div>
        <div><span>所属部门</span><span>{{ staffData.department }}</span></div>
        <div><span>登记电话</span><span>{{ staffData.phone }}</span></div>
        <div><span>企业邮箱</span><span>{{ staffData.email }}</span></div>
        <div><span>账户状态</span><span>未绑定</span></div>
      </div>
      <div>
        <pc-button
          :disabled="disableBtn"
          @click="confirmBind"
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
  name: 'StaffBindComponent',
  computed: {
    disableBtn () { return this.$store.getters['registerStaff/disableConfirmBindBtn'] },
    staffData () { return this.$store.getters['registerStaff/getStaffData'] },
    ...mapState('registerStaff', { btnText: state => state.confirmBind.btnText })
  },
  created () {},
  methods: {
    async confirmBind () {
      try {
        await this.$store.dispatch('registerStaff/useBindStaff')
        this.$store.commit('login/setRegisterStep', 'done')
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
  width: 530px;
  .staffBind_title {
    div:nth-child(1) {
      font-size: vw(36);
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
          font-size: vw(18);
        }

        span:nth-child(2) {
          text-align: right;
          color: #000;
          font-size: vw(16);
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
@include media(">maxW") {
  .staffBind_container {
  padding-top: 10vh;
  width: 530px;
  .staffBind_title {
    div:nth-child(1) {
      font-size: 36px;
    }
  }

  .staffBind_content {
    >div:nth-child(1) {
      >div {
        span:nth-child(1) {
          font-size: 16px;
        }
        span:nth-child(2) {
          font-size: 16px;
        }
      }
    }
  }
}
}
</style>
