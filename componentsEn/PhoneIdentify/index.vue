<template>
  <div class="identify_box">
    <p class="title">
      手机号
      <span>*</span>
    </p>
    <div class="phone_box">
      <input
        v-model="mobile"
        :class="isPhoneVerify || !canBtnTap?'unable':'able'"
        :disabled="isPhoneVerify || !canBtnTap?true:false"
        name="phone"
        autocomplete="off"
        type="tel"
        placeholder="请输入您的手机号码"
      >
      <div>
        <button
          :class="{ disabled: !canBtnTap }"
          :disabled="!canBtnTap?true:false"
          @click="getCode"
        >
          {{ btnText }}
        </button>
      </div>
    </div>
    <div
      v-if="isShowCodeBox"
      class="code_box"
    >
      <input
        v-model="code"
        name="verifyCode"
        type="number"
        placeholder="请输入验证码"
      >
      <div>
        <button @click="identifyEvent">
          验证
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneIdentify',
  props: {
    phone: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: 'mobile'
    }
  },
  data: () => ({
    code: '',
    btnText: '获取',
    disabledBtn: false,
    countDownNumber: 60,
    mobile: '',
    isIdentify: false,
    canBtnTap: true,
    isShowCodeBox: false,
    isPhoneVerify: false
  }),
  computed: {
    isActive () {
      const regular = this.field === 'mobile' ? /^1[3-9]\d{9}$/ : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      return regular.test(this.phone)
    }
  },
  watch: {
    verifyCode (val) {
      this.$emit('update:code', val)
    }
  },
  mounted () {
    console.log('user', this.data)
  },
  methods: {
    phoneCheck () {
      const regular = this.field === 'mobile' ? /^1[3-9]\d{9}$/ : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      return regular.test(this.mobile)
    },
    async getCode () {
      const isPhoneRight = this.phoneCheck(this.mobile)
      if (!isPhoneRight) {
        this.$store.commit('site/setErrorData', '手机号输入错误，请确认后重试！')
        return
      }
      this.isShowCodeBox = true
      this.disabledBtn = true
      this.btnText = '发送中...'
      try {
        const result = await this.$axios.$post('/member/login/vcode', {
          mobile: this.mobile
        })
        if (!Array.isArray(result)) {
          throw new TypeError('错误')
        } else {
          this.countDown()
        }
      } catch (error) {
        this.btnText = '获取'
        this.disabledBtn = false
      }
    },
    async identifyEvent () {
      try {
        const res = await this.$axios.$post('/member/mobile/codeVerification', {
          mobile: this.mobile,
          code: this.code
        })
        console.log('codeVerification', res)
        if (!Array.isArray(res)) {
          throw new TypeError('错误')
        } else {
          this.btnText = '获取'
          this.isIdentify = true
          this.disabledBtn = true
        }
      } catch (err) {
        this.btnText = '获取'
        this.disabledBtn = false
      }
    },
    countDown () {
      const defaultNumber = this.countDownNumber
      const down = () => {
        this.btnText = `${this.countDownNumber}s`
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber = this.countDownNumber - 1
            down()
          } else {
            this.countDownNumber = defaultNumber
            this.canBtnTap = true
            this.isShowCodeBox = false
            this.isPhoneVerify = true
            this.btnText = '获取'
            this.disabledBtn = false
          }
        }, 1000)
      }
      down()
    }
  }
}
</script>

<style lang="scss" scoped>

.identify_box {
  width: vw(400);
  .title {
    margin-bottom: 15px;
    span {
      color: #b80000;
    }
  }
  > div {
    width: vw(400);
    margin-bottom: vw(32);
    display: flex;
    input {
      width: 100%;
      height: vw(48);
      padding: 0 vw(20);
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    input:focus {
      outline: none;
    }
    button {
      width: vw(100);
      height: vw(48);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-left: none;
    }
  }
  .phone_box {
    // border: 1px solid #d8d8d8;
    .unable {
      background: rgba(216, 216, 216, 0.2);
    }
    button {
      background: rgba(216, 216, 216, 0.2);
      cursor: pointer;
    }
  }
  .code_box {
    width: 100%;
    height: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: vw(12) 0;
    box-sizing: border-box;
    input {
      width: vw(299);
      height: vw(24);
      border: none;
      padding: 0 vw(20);
    }
    input:focus {
      outline: none;
    }
    div {
      width: vw(100);
      height: vw(24);
      border-left: 1px solid rgba(0, 0, 0, 0.2);
    }
    button {
      width: 100%;
      height: vw(24);
      background: none;
      border: none;
      cursor: pointer;
    }
  }
}
.able:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
}
.able {
  background-color: transparent;
}
</style>
