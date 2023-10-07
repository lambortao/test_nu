<template>
  <div :class="styleType==='normal'?'verify_box':'inner_style'">
    <input v-model="verifyCode" name="verifyCode" type="text" placeholder="Verification Code">
    <div>
      <button :class="{ disabled: !isActive || disabledBtn }" @click="getCode">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script>
let buttonText = ''
export default {
  name: 'SendCode',
  model: {
    prop: 'code',
    event: 'update:code'
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: 'mobile'
    },
    styleType: {
      type: String,
      default: 'normal'
    }
  },
  data: () => ({
    verifyCode: '',
    btnText: '',
    disabledBtn: false,
    countDownNumber: 60
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
    },
    styleType (e) {
      console.log('e', e)
    }
  },
  mounted () {
    buttonText = this.styleType === 'normal' ? 'Send' : 'Get'
    this.btnText = buttonText
  },
  methods: {
    phoneCheck () {
      const regular = this.field === 'mobile' ? /^1[3-9]\d{9}$/ : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      return regular.test(this.phone)
    },
    async getCode () {
      const isPhoneRight = this.phoneCheck(this.phone)
      if (!isPhoneRight) {
        this.$store.commit('site/setErrorData', 'Cell phone number input error, please confirm and try again!')
        return
      }
      this.disabledBtn = true
      this.btnText = 'Send...'
      try {
        const result = await this.$axios.$post('/member/SendCode', {
          'fm-login-id': this.$props.phone,
          type: 2
        })
        if (!Array.isArray(result)) {
          throw new TypeError('错误')
        } else {
          this.countDown()
        }
      } catch (error) {
        this.btnText = buttonText
        this.disabledBtn = false
      }
    },
    countDown () {
      const defaultNumber = this.countDownNumber
      const down = () => {
        this.btnText = this.styleType === 'normal' ? `${this.countDownNumber} s` : `${this.countDownNumber}s`
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber = this.countDownNumber - 1
            down()
          } else {
            this.countDownNumber = defaultNumber
            this.btnText = buttonText
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

.verify_box {
  // min-width: 530px;
  min-width: 400px;
  // height: 60px;
  height: 48px;
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
      font-size: 14px;
      font-weight: bold;
      opacity: 1;
      cursor: pointer;
      pointer-events: all;
      transition: all 300ms ease;

      &.disabled {
        opacity: 0.4;
        pointer-events: none;
      }
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
.inner_style{
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
  input:focus{
    outline: none;
  }
  div{
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
</style>
