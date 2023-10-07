<template>
  <div class="VerifyCode flex-between flex-align-center">
    <m-input
      v-if="inputVisible"
      v-model="myCode"
      :style="{ width: '65%' }"
      type="type"
      autocomplete="off"
      placeholder="Verification Code"
    />
    <i v-if="inputVisible" class="vertical" />
    <p :class="[{ active: true }, btnClass]" @click="getCode">
      <!-- <p :class="[{ active: isActive && !disabledBtn }, btnClass]" @click="getCode"> -->
      {{ btnText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'VerifyCode',
  model: {
    prop: 'code',
    event: 'update:code'
  },
  props: {
    inputVisible: {
      type: Boolean,
      default: true
    },
    btnClass: {
      type: String,
      default: ''
    },
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
    type: {
      type: String,
      default: 'mobile'
    },
    countryTag: {
      type: String,
      default: ''
    },
    tagField: {
      type: String,
      default: ''
    },
    sendCodeMethods: {
      type: Function,
      default: null
    },
    forget: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      myCode: '',
      btnText: 'Send',
      disabledBtn: false,
      countDownNumber: 60
    }
  },
  computed: {
    isActive () {
      const regular = this.type === 'mobile' ? /^1[3-9]\d{9}$/ : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      return regular.test(this.phone)
    }
  },
  watch: {
    myCode (val) {
      this.$emit('update:code', val)
    }
  },
  created () {},
  methods: {
    async getCode () {
      this.disabledBtn = true
      this.btnText = 'Send...'
      try {
        const postData = {
          'fm-login-id': this.$props.phone
        }
        if (this.forget) {
          postData.type = 3
        } else {
          postData.type = 1
        }
        if (!postData['fm-login-id'].includes('@')) {
          postData[this.tagField] = this.countryTag
          // 判断forget为ture的话，证明是忘记密码发的验证码
        }
        const result = await this.$axios.$post('/member/SendCode', postData)
        if (!Array.isArray(result)) {
          throw new TypeError('错误')
        } else {
          this.countDown()
        }
      } catch (error) {
        console.log(error)
        this.btnText = 'Send'
        this.disabledBtn = false
      }
    },
    countDown () {
      const defaultNumber = this.countDownNumber
      const down = () => {
        this.btnText = this.countDownNumber
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber = this.countDownNumber - 1
            down()
          } else {
            this.countDownNumber = defaultNumber
            this.btnText = 'Send'
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

p {
  color: #333;
  text-align: center;
  flex: 1;
  height: 100%;
  line-height: 100%;
  opacity: 0.2;
  pointer-events: none;
  transition: opacity 300ms ease;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
}
.confirm {
  background-color: #000;
  color: #fff;
  border: none;
  width: mvw(120);
  height: mvw(40);
  line-height: mvw(40);

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
}
</style>
