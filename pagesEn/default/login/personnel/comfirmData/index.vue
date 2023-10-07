<template>
  <div class="ComfirmData">
    <header-back />
    <section class="login-section">
      <h3 class="login-subtitle">
        Hello，{{ staffData.name }}
      </h3>
      <ul>
        <li><span>Employee Name</span><span>{{ staffData.name }}</span></li>
        <li><span>Department</span><span>{{ staffData.department }}</span></li>
        <li><span>Registration Phone</span><span>{{ staffData.phone }}</span></li>
        <li><span>Enterprise Email</span><span>{{ staffData.email }}</span></li>
        <li><span>Account Status</span><span>Unverified</span></li>
      </ul>
      <div class="bottom-btn">
        <big-button
          :disabled="disableBtn"
          @click="confirmBind"
        >
          Verify
        </big-button>
      </div>
    </section>
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
        // await this.$store.dispatch('registerStaff/useBindStaff')
        // 提示框内容
        await this.$store.commit('login/setTipsContent', {
          title: 'Verified',
          details: 'Back to home page'
        })
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
      &:first-child {
        color: #999999;
      }
    }
  }
}
</style>
