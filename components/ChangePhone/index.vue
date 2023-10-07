<template>
  <div :style="{ width: '100%' }">
    <div class="old-phone">
      <input
        v-model="phoneNumber"
        autocomplete="off"
        type="tel"
        placeholder="请输入手机号码"
        :disabled="inputDisabled"
      >
      <button :disabled="!inputDisabled" @click="changeEvent">
        修改
      </button>
    </div>
    <div v-if="changePhone">
      <send-code
        v-model="code"
        short="short"
        :phone="phoneNumber"
        url="/member/login/vcode"
      />
    </div>
  </div>
</template>

<script>
import SendCode from '../SendCode'
export default {
  name: 'ChangePhone',
  components: {
    SendCode
  },
  props: {
    oldPhone: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      code: '',
      inputDisabled: true,
      phoneNumber: '',
      changePhone: false
    }
  },
  watch: {
    phoneNumber (val) {
      this.$emit('changePhone', val)
    },
    code (val) {
      this.$emit('checkCode', val)
    }
  },
  mounted () {
    setTimeout(() => {
      this.phoneNumber = this.oldPhone
    }, 0)
  },
  methods: {
    changeEvent () {
      this.inputDisabled = false
      this.changePhone = true
      this.phoneNumber = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.old-phone {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
input {
  height: 48px;
  padding: 0 24px;
  flex: 1;
  margin-right: 14px;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
}
button  {
  height: 48px;
  border: none;
  background: none;
  outline: none;
  width: 77px;
  border: 1px solid rgba($color: #000000, $alpha: 0.2);
}
</style>
