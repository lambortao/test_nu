<template lang="html">
  <div class="phoneLogin_container">
    <div class="phoneLogin_title">
      <h1>Login to your account</h1>
    </div>
    <section class="phoneLogin_content">
      <div class="phoneNumber_box">
        <div><span>+86</span><img src="~/assets/images/login/down.png" alt=""></div>
        <input v-model="phoneNumber" name="mobile" type="text" placeholder="Please enter your phone number" maxlength="11">
      </div>
      <send-code
        v-model="code"
        :phone="phoneNumber"
        url="/member/login/vcode"
      />
      <div class="submit_box">
        <pc-button :disabled="!isActive" @click="handleLogin">
          {{ btnText }}
        </pc-button>
      </div>
    </section>
    <section class="phoneLogin_bottom">
      <div>
        <p>More</p>
      </div>
      <div>
        <figure @click="$emit('wxLoginClick')">
          <img src="~/assets/images/login/icon-wechat.png" alt="">
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PcButton from '~/componentsEn/PcButton'
import SendCode from '~/componentsEn/SendCode'

export default {
  name: 'PhoneLoginComponent',
  components: {
    PcButton,
    SendCode
  },
  computed: {
    isActive () {
      console.log(this.$store.getters['login/getCodeIsActive'])
      return this.$store.getters['login/getCodeIsActive']
    },
    ...mapState('login', {
      loginRes: 'loginRes',
      isStaff: 'isStaff',
      btnText: state => state.login.btnText,
      countryTagOptions: state => state.login.countryTagOptions,
      memberData: state => state.memberData
    }),
    btnLoading: {
      get () { return this.$store.state.login.login.loading },
      set (value) { this.$store.commit('login/setLoginData', { key: 'loading', value }) }
    },
    countryTag: {
      get () { return this.$store.state.login.login.countryTag },
      set (value) { this.$store.commit('login/setLoginData', { key: 'countryTag', value }) }
    },
    phoneNumber: {
      get () { return this.$store.state.login.login.phoneNumber },
      set (value) { this.$store.commit('login/setLoginData', { key: 'phoneNumber', value }) }
    },
    code: {
      get () { return this.$store.state.login.login.code },
      set (value) { this.$store.commit('login/setLoginData', { key: 'code', value }) }
    }
  },
  methods: {
    ...mapActions({
      initLoginFlow: 'login/initLoginFlow'
    }),
    async handleLogin () {
      /** 执行登录流程 */
      try {
        await this.initLoginFlow()

        /** 是否已经注册过 */
        if (this.memberData.status) {
          /** 注册过直接回 home */
          const queryPos = this.$route.query.pos
          const path = queryPos ? `/en/user?pos=${queryPos}` : '/en'
          this.$router.push(path)
        } else {
        /** 未注册 */
          if (this.isStaff && this.isStaff.isStaff) {
          /** 员工注册流程 */
            this.$store.commit('login/setRegisterStep', 'personnel-step1')
            return
          }
          this.$store.commit('login/setRegisterStep', 'other-entry')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.phoneLogin_container {
  padding-top: 10vh;
  width: 530px;
  .phoneLogin_title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    h1 {
      font-size: 36px;
      line-height: 54px;
    }
  }

  .phoneLogin_content {
    .phoneNumber_box,
    .verify_box {
      min-width: 530px;
      height: 60px;
      display: flex;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 0 0 0 26px;
      margin-bottom: 20px;
      > div:nth-child(1) {
        width: 108px;
        border-right: 1px solid rgba(0, 0, 0, 0.2);
        padding: 18px 0;
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          font-size: 18px;
          font-weight: bold;
        }

        img {
          height: 18px;
          object-fit: contain;
          opacity: 0.8;
          margin-left: 15px;
        }
      }

      > div:nth-child(2) {
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
        padding: 0 15px;
      }
    }
    .verify_box {
      padding: 0;
      input {
        padding-left: 23px;
      }
    }
    .login_tips {
      color: red;
      font-size: 14px;
    }
    .submit_box {
      min-width: 530px;
      margin-top: 40px;

      button {
        width: 100%;
        height: 60px;
        color: #fff;
        background: #000;
        border: none;
        cursor: pointer;
      }
    }
  }

  .phoneLogin_bottom {
    margin-top: 40px;
    text-align: center;

    div:nth-child(1) {
      p {
        width: 100%;
        opacity: 0.4;
        position: relative;
        cursor: default;
      }

      p:before {
        content: "";
        display: block;
        width: 200px;
        height: 1px;
        background: #000;
        position: absolute;
        left: 0;
        top: 13px;
      }

      p:after {
        content: "";
        display: block;
        width: 200px;
        height: 1px;
        background: #000;
        position: absolute;
        right: 0;
        top: 13px;
      }
    }

    div:nth-child(2) {
      margin: 0 auto;
      margin-top: 20px;
      cursor: pointer;

      figure, img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
