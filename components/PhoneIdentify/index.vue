<template>
  <div class="identify_box">
    <p class="title">
      手机号
      <span>*</span>
    </p>
    <div class="phone_box">
      <input
        v-model="mobile"
        :class="[inputSwitch==='open'?'able':'unable',isMobile?'mobile':'']"
        :disabled="inputSwitch==='open'?false:true"
        name="phone"
        type="tel"
        placeholder="请输入您的手机号码"
      >
      <div>
        <button
          v-if="!isShowCodeBox"
          :class="{ disabled: !canBtnTap }"
          :disabled="codeBtnSwitch==='open'?false:true"
          @click="getCode"
        >
          获取验证码
        </button>
        <button
          v-else
          :class="{ disabled: !canBtnTap }"
          :disabled="codeBtnSwitch==='open'?false:true"
          @click="getCode"
        >
          {{ btnText }}
        </button>
      </div>
    </div>
    <div
      v-if="isShowCodeBox"
      :class="['code_box',isMobile?'mobile_code_box':'']"
    >
      <input
        v-model="code"
        name="verifyCode"
        type="text"
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
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    code: '',
    btnText: '获取',
    countDownNumber: 60,
    mobile: '',
    inputSwitch: 'open',
    codeBtnSwitch: 'open',
    canBtnTap: true,
    isShowCodeBox: false,
    isPhoneVerify: false
  }),
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
      const errText = this.mobile === '' ? '请先输入手机号码' : !isPhoneRight ? '手机号码输入错误，请确认后重试！' : ''
      if (this.mobile === '' || !isPhoneRight) {
        this.$store.commit('site/setErrorData', errText)
        return
      }
      this.isShowCodeBox = true
      this.inputSwitch = 'close'
      this.codeBtnSwitch = 'close'
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
        this.inputSwitch = 'open'
        this.btnText = '获取'
      }
    },
    async identifyEvent () {
      try {
        const res = await this.$axios.$post('/member/mobile/codeVerification', {
          mobile: this.mobile,
          code: this.code
        })
        if (!Array.isArray(res)) {
          throw new TypeError('错误')
        } else {
          this.inputSwitch = 'close'
          this.isPhoneVerify = true
          this.isShowCodeBox = false
          this.btnText = '修改'
          this.$emit('update:value', this.mobile)
        }
      } catch (err) {
        this.btnText = '获取'
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
            this.inputSwitch = 'open'
            this.codeBtnSwitch = 'open'
            this.btnText = '获取验证码'
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
  width: 100%;
  .title {
    margin-bottom: 15px;
    span {
      color: #b80000;
    }
  }
  > div {
    width: 100%;
    margin-bottom: vw(32);
    display: flex;
    border-radius: 0;
    input {
      width: 100%;
      height: 48px;
      padding: 0 vw(20);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0;
    }
    input:focus {
      outline: none;
    }
    button {
      width: 100px;
      height: 48px;
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
      // width: 299px;
      width: 100%;
      // height: 24px;
      height: 48px;
      border: none;
      padding: 0 vw(20);
    }
    input:focus {
      outline: none;
    }
    div {
      width: 100px;
      height: 24px;
      border-left: 1px solid rgba(0, 0, 0, 0.2);
    }
    button {
      width: 100%;
      height: 24px;
      background: none;
      border: none;
      cursor: pointer;
    }
  }
  .mobile_code_box {
    margin-top: mvw(12);
    input {
      height: mvw(48);
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
.mobile {
  padding: 0 mvw(16) !important;
}
</style>
