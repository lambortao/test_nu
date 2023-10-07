<template>
  <div class="VerifyCode flex-between flex-align-center">
    <m-input
      v-if="inputVisible"
      v-model="myCode"
      :style="{ width: '65%' }"
      autocomplete="off"
      type="number"
      placeholder="请输入验证码"
    />
    <i v-if="inputVisible" class="vertical" />
    <p :class="[{ active: isActive && !disabledBtn }, btnClass]" @click="getCode">
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
    }
  },
  data () {
    return {
      myCode: '',
      btnText: '获取验证码',
      disabledBtn: false,
      countDownNumber: 60
    }
  },
  computed: {
    isActive () {
      const regular = this.field === 'mobile' ? /^1[3-9]\d{9}$/ : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
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
      this.btnText = '发送中...'
      try {
        const result = await this.$axios.$post(this.$props.url, {
          [this.$props.field]: this.$props.phone
        })
        if (!Array.isArray(result)) {
          throw new TypeError('错误')
        } else {
          this.countDown()
        }
      } catch (error) {
        this.btnText = '获取验证码'
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
            this.btnText = '获取验证码'
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
