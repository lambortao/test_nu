<template lang="html">
  <div class="staffLogin_container">
    <section class="staffLogin_title">
      <div>欢迎，<span>{{ encryptPhone }}</span></div>
      <div>
        <p>识别到你的员工信息</p>
      </div>
    </section>
    <section class="staffLogin_content">
      <div>
        <img src="~/assets/images/login/icon-staff.png" alt="">
        <p>员工账号</p>
      </div>
      <div>
        <button @click="goNextPath">
          去绑定
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
      return this.$store.getters['login/getMemberPhoneNumber']
    }
  },
  methods: {
    goNextPath () {
      this.$store.commit('login/setRegisterStep', 'personnel-step2')
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
      font-size: vw(36);
      span {
        font-weight: bold;
      }
    }
    div:nth-child(2) {
      font-size: vw(16);
      margin-top:20px;
    }
  }

  .staffLogin_content {
    margin-top: 40px;
    div:nth-child(1) {
      width: 100%;
      img {
        width: vw(92);
        height:  vw(92);
        margin: 10px auto 0;
        width: 100%;
        object-fit: contain;
      }
      p {
        text-align: center;
        font-size: vw(16);
        margin-top:10px;
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
@include media(">maxW") {
  .staffLogin_container {
  padding-top: 10vh;
  width: 530px;
  .staffLogin_title {
    div:nth-child(1) {
      font-size: 36px;
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
        display: block;
    margin: 0 auto;
      }
    }
  }
}
}
</style>
