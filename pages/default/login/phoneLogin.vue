<template>
  <div class="phoneLogin_container">
    <div class="phoneLogin_title">
      <h1>登录您的账号</h1>
    </div>
    <section class="phoneLogin_content">
      <div class="phoneNumber_box">
        <div><span>+86</span></div>
        <input
          v-model="phoneNumber"
          name="mobile"
          type="tel"
          placeholder="请输入您的手机号码"
        >
      </div>
      <send-code
        v-model="code"
        :phone="phoneNumber"
        url="/member/login/vcode"
      />
      <aggreement />
      <div class="submit_box">
        <pc-button
          :disabled="!isActive"
          @click="handleLogin"
        >
          {{ btnText }}
        </pc-button>
      </div>
    </section>
    <section class="phoneLogin_bottom">
      <div>
        <p>更多登录方式</p>
      </div>
      <div>
        <figure @click="wechatLogin">
          <img
            src="~/assets/images/login/icon-wechat.png"
            alt=""
          >
        </figure>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PhoneLoginComponent',
  data () {
    return {
      oldPhone: '18616190271'
    }
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
      console.log('点击登录')
      /** 执行登录流程 */
      try {
        await this.initLoginFlow()
        console.log('已注册')
        /** 是否已经注册过 */
        if (this.memberData.status) {
          /** 注册过直接回 home */
          const queryPos = this.$route.query.pos
          const path = queryPos ? `/user?pos=${queryPos}` : '/'
          this.$router.push(path)
        } else {
          console.log('未注册')
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
    },
    wechatLogin () {
      this.$store.commit('login/setRegisterStep', 'wxLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.phoneLogin_container {
  padding-top: 10vh;
  width: vw(530);
  min-width: 450px;
  .phoneLogin_title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    h1 {
      font-size: vw(36);
      line-height: rem(54);
    }
  }
  .phoneLogin_content {
    .phoneNumber_box,
    .verify_box {
      width: 100%;
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
        cursor: default;
        span {
          font-size: vw(22);
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
          font-size: vw(16);
          font-weight: bold;
        }
      }

      input {
        width: 100%;
        border: none;
        padding: 0 15px;
      }
    }
    .phoneNumber_box {
      padding: 0;
      > div:nth-child(1) {
        padding: 0 vw(13);
        justify-content: center;
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
      font-size: vw(14);
    }
    .submit_box {
      width: 100%;
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
        width: 36%;
        height: 1px;
        background: #000;
        position: absolute;
        left: 0;
        top: 13px;
      }

      p:after {
        content: "";
        display: block;
        width: 36%;
        height: 1px;
        background: #000;
        position: absolute;
        right: 0;
        top: 13px;
      }
    }

    div:nth-child(2) {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      margin-top: 20px;
      cursor: pointer;
      figure,
      img {
        width: 100%;
      }
    }
  }
  input::-webkit-input-placeholder,
  input:-moz-placeholder,
  input::moz-placeholder,
  input:-ms-input-placeholder {
    color: #999;
    font-size: vw(16);
  }
}
@include media(">maxW") {
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
          cursor: default;
          span {
            font-size: rem(22);
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
      .phoneNumber_box {
        padding: 0;
        > div:nth-child(1) {
          padding: 0 vw(13);
          justify-content: center;
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
        width: 50px;
        height: 50px;
        margin: 0 auto;
        margin-top: 20px;
        cursor: pointer;

        figure,
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
