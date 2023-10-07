<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="ComfirmData">
    <header-back />
    <section class="login-section">
      <h3 class="login-subtitle">Hello，{{ staffData.english_name }}</h3>
      <ul>
        <li><span>Employee Name</span><span>{{ staffData.english_name }}</span></li>
        <li><span>Company Name</span><span>Nine United</span></li>
        <li><span>Department</span><span>{{ staffData.department }}</span></li>
        <li><span>Registration Phone</span><span>{{ staffData.mobile }}</span></li>
        <li><span>Enterprise Email</span><span>{{ staffData.email }}</span></li>
        <li><span>Account Status</span><span>Unverified</span></li>
      </ul>
      <div class="bottom-btn">
        <big-button @click="confirmBind">Confirm</big-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ComfirmData',
  computed: {
    staffData () {
      // return this.$store.getters['registerStaff/getStaffData']
      return this.$store.state.login.staffBIndInfo
    }
    // ...mapState('registerStaff', { btnText: state => state.confirmBind.btnText })
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
        // 清空员工绑定数据
        await this.$store.commit('login/initStaffInfo')
        await this.$store.commit('login/setLoginSection', 'done')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  width: 100%;
  list-style: none;
  padding: 0;
  li {
    width: 100%;
    height: mvw(40);
    line-height: mvw(40);
    background-color: #F7F7F7;
    margin-bottom: mvw(1);
    display: flex;
    justify-content: space-between;
    padding: 0 mvw(16);
    span {
      font-size: mvw(14);
      &:first-child {
        color: #999999;
      }
    }
  }
}
</style>
