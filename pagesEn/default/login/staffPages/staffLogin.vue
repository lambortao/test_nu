<template lang="html">
  <div class="staffLogin_container">
    <section class="staffLogin_title">
      <div>Welcome，<span>{{ encryptPhone }}</span></div>
      <div>
        <p>Identify to your employee information</p>
      </div>
    </section>
    <section class="staffLogin_content">
      <div>
        <img src="~/assets/images/login/icon-staff.png" alt="">
        <p>Employee</p>
      </div>
      <div>
        <button @click="goNextPath">
          Confirm
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'StaffLoginComponent',
  computed: {
    encryptPhone () {
      // return this.$store.getters['login/getMemberPhoneNumber']
      return this.$store.state.login.staffEn.staffEmail
    }
  },
  methods: {
    goNextPath () {
      this.$store.commit('login/setLoginSection', 'staff-prove')
    }
  }
}
</script>

<style lang="scss" scoped>
.staffLogin_container {
  padding-top: 10vh;
  width: 530px;
  .staffLogin_title {
    div:nth-child(1) {
      font-size: 36px;
      span {
        font-weight: bold;
      }
    }
    div:nth-child(2) {
      font-size: 16px;
      margin-top:20px;
    }
  }

  .staffLogin_content {
    margin-top: 40px;
    div:nth-child(1) {
      width: 100%;
      img {
        width: 92px;
        height: 92px;
        margin: 10px auto 0;
        width: 100%;
        object-fit: contain;
      }

      p {
        text-align: center;
      }
    }

    div:nth-child(2) {
      width: 100%;
      height: 60px;
      margin: 50px auto 0;

      button {
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
