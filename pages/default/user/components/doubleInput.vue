<template>
  <div class="setting-content nickname-edit">
    <div class="new-nickname-box" :style="{ marginBottom: '20px' }">
      <input v-model="newData" class="line-input" type="text" :placeholder="placeholder">
      <button
        :class="['confirm', { disabled: checkRegEx || codeBtnLoading }]"
        @click="getCode"
      >
        {{ codeBtnText }}
      </button>
    </div>
    <div class="new-nickname-box">
      <input v-model="code" class="line-input" type="number" placeholder="输入验证码">
      <button :class="['confirm', { disabled: !code || btnLoading }]" @click="changePhoneNumber">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    isPhone: {
      type: Boolean,
      default: true
    },
    sendCodeUrl: {
      type: String,
      default: ''
    },
    saveUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      code: '',
      btnText: '保存',
      newData: '',
      btnLoading: false,
      codeBtnLoading: false,
      codeBtnText: '获取验证码',
      freezePhoneNumber: '',
      countDownNumber: 60
    }
  },
  computed: {
    checkRegEx () {
      const regex = this.isPhone ? /^1[3-9]\d{9}$/ : /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      return !regex.test(this.newData)
    }
  },
  methods: {
    async getCode () {
      this.codeBtnText = '发送中...'
      this.codeBtnLoading = true
      try {
        const result = await this.$axios.$post(this.sendCodeUrl, {
          [this.isPhone ? 'mobile' : 'email']: this.newData
        })
        if (!Array.isArray(result)) {
          throw new TypeError('错误')
        } else {
          this.freezePhoneNumber = this.newData
          this.countDown()
        }
      } catch (error) {
        this.codeBtnText = '发送中'
        this.codeBtnLoading = false
      }
    },
    async changePhoneNumber () {
      this.btnLoading = true
      this.btnText = '保存中...'
      try {
        if (this.isPhone) {
          await this.$axios.$post(this.saveUrl, {
            mobile: Number(this.freezePhoneNumber),
            code: Number(this.code)
          })
        } else {
          await this.$axios.$post(this.saveUrl, {
            email: this.freezePhoneNumber,
            code: this.code
          })
        }
        // await this.$axios.$post(this.saveUrl, {
        //   [this.isPhone ? 'mobile' : 'email']: this.freezePhoneNumber,
        //   code: this.code
        // })
        this.$store.commit('site/setErrorData', '修改成功')
        this.$emit('done')
      } catch (error) {
        console.log(error)
      } finally {
        this.btnLoading = false
        this.btnText = '保存'
      }
    },
    countDown () {
      const defaultNumber = 60
      const down = () => {
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber -= 1
            this.codeBtnText = this.countDownNumber
            down()
          } else {
            this.countDownNumber = defaultNumber
            this.codeBtnText = '获取验证码'
            this.codeBtnLoading = false
          }
        }, 1000)
      }
      down()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/users.scss';
</style>
