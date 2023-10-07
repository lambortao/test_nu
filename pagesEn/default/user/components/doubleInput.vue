<template>
  <div class="setting-content nickname-edit">
    <div class="new-nickname-box" :style="{ marginBottom: '20px' }">
      <div v-if="isPhone" class="form-label double-input-select">
        <pc-select
          v-model="country"
          :country="true"
          :style="{
            height: '48px',
            width: '108px'
          }"
          :options="globalTagOptions"
        />
        <input
          v-model="newData"
          :style="{ width: '70%' }"
          name="mobile"
          type="text"
          placeholder="New Phone Number"
          maxlength="11"
        >
      </div>
      <div v-else class="form-label double-input-select">
        <input
          v-model="newData"
          :style="{ width: '90%',height:'48px' }"
          name="email"
          type="text"
          placeholder="New Email"
        >
      </div>
      <button
        :class="['confirm', { disabled: checkRegEx || codeBtnLoading }]"
        :style="{ width: '180px' }"
        @click="getCode"
      >
        {{ codeBtnText }}
      </button>
    </div>
    <div class="new-nickname-box">
      <input v-model="code" class="line-input" type="text" placeholder="Enter the verification code">
      <button :class="['confirm', { disabled: !code || btnLoading }]" @click="changePhoneNumber">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import globalTagList from '~/config/areaCode'
import pcSelect from '~/componentsEn/PcSelect/index.vue'
globalTagList.unshift({
  en: null,
  name: '请选择国家',
  disable: true,
  tel: null
})

export default {
  components: {
    pcSelect
  },
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
      globalTagList,
      code: '',
      btnText: 'Save',
      country: '+93',
      newData: '',
      btnLoading: false,
      codeBtnLoading: false,
      codeBtnText: 'Send',
      freezePhoneNumber: '',
      countDownNumber: 60
    }
  },
  computed: {
    ...mapState('login', {
      globalTagOptions: 'areaCode'
    }),
    checkRegEx () {
      const regex = this.isPhone ? /^1[3-9]\d{9}$/ : /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      return !regex.test(this.newData)
    }
  },
  methods: {
    async getCode () {
      this.codeBtnText = 'Send...'
      this.codeBtnLoading = true
      try {
        const postData = {
          'fm-login-id': this.newData,
          type: 3
        }
        if (this.isPhone) {
          postData.area_code = `${this.country}`
        }
        const result = await this.$axios.$post(this.sendCodeUrl, postData)
        if (!Array.isArray(result)) {
          throw new TypeError('Error')
        } else {
          this.freezePhoneNumber = this.newData
          this.countDown()
        }
      } catch (error) {
        this.codeBtnText = 'Sending'
        this.codeBtnLoading = false
      }
    },
    async changePhoneNumber () {
      this.btnLoading = true
      this.btnText = 'Saveing...'
      try {
        console.log(this.saveUrl, 'this.saveUrl')
        if (this.isPhone) {
          await this.$axios.$post(this.saveUrl, {
            mobile: Number(this.freezePhoneNumber),
            code: Number(this.code),
            area_code: `${this.country}`
          })
        } else {
          await this.$axios.$post(this.saveUrl, {
            email: this.freezePhoneNumber,
            code: this.code
          })
        }
        this.$store.commit('site/setErrorData', 'Done')
        this.$emit('done')
      } catch (error) {
        console.log(error)
      } finally {
        this.btnLoading = false
        this.btnText = 'Save'
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
            this.codeBtnText = 'Send'
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
.double-input-select {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;

  select {
    padding-left: 5px;
    margin-right: 10px;
    border: none;
    border-bottom: 1px solid #ddd;

    option.disabled {
      color: #828482;
    }
  }

  :deep(.country) {
    height: 48px;
    line-height: 48px;
    // border: none;
  }
  input {
    padding-left: 10px;
  }
}
</style>
