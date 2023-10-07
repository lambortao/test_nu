<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="ComfirmData">
    <header-back />
    <section class="login-section">
      <h3 class="login-subtitle">您好：{{ staffData.name }}</h3>
      <ul>
        <li><span>员工姓名</span><span>{{ staffData.name }}</span></li>
        <li><span>所属部门</span><span>{{ staffData.department }}</span></li>
        <li><span>登记电话</span><span>{{ staffData.phone }}</span></li>
        <li><span>企业邮箱</span><span>{{ staffData.email }}</span></li>
        <li><span>账户状态</span><span>未绑定</span></li>
      </ul>
    </section>
    <div class="bottom-btn">
      <big-button :disabled="disableBtn" @click="confirmBind">{{ btnText }}</big-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ComfirmData',
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
      &:first-child {
        color: #999999;
      }
    }
  }
}
</style>
