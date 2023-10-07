<template>
  <other-pages
    title="填写您的信息"
    subtitle="完成资料填写，即将成为媒体者身份会员"
    :button="btnStatus.text"
    :loading="btnStatus.loading"
    :disabled="!btnDisabled"
    @done="submit"
  >
    <form-label label="姓名" :required="true" class-name="flex-between flex-align-center">
      <m-input
        :value="formData.name"
        :style="{ width: '68%' }"
        size="short"
        placeholder="请输入"
        @update:value="value => setValue({ key: 'name', value })"
      />
      <i class="vertical" />
      <m-select
        :value="formData.sex"
        :style="{ width: '30%' }"
        size="short"
        :options="sexOptions"
        @update:value="value => setValue({ key: 'sex', value })"
      />
    </form-label>
    <form-label :required="true" :border="false" label="手机号" class-name="flex-between flex-align-center">
      <change-phone
        :old-phone="formData.phoneNumber"
        @changePhone="changePhone"
        @checkCode="checkCode"
      />
    </form-label>
    <form-label label="媒体名称" :required="true">
      <m-input
        :value="formData.pressmanName"
        size="short"
        placeholder="请输入"
        @update:value="value => setValue({ key: 'pressmanName', value })"
      />
    </form-label>
    <form-label label="所在城市" :border="false">
      <v-distpicker
        :province="formData.province"
        :city="formData.city"
        class="two"
        hide-area
        @province="({ value }) => setValue({ key: 'province', value })"
        @city="({ value }) => setValue({ key: 'city', value })"
      />
    </form-label>
    <form-label label="职位" :required="true">
      <m-input
        :value="formData.post"
        size="short"
        placeholder="负责部门"
        @update:value="value => setValue({ key: 'post', value })"
      />
    </form-label>
    <form-label label="公司邮箱">
      <m-input
        :value="formData.companyEmail"
        type="email"
        size="short"
        placeholder="贵公司电子邮箱"
        @update:value="value => setValue({ key: 'companyEmail', value })"
      />
    </form-label>
    <form-label label="公司地址">
      <m-input
        :value="formData.address"
        size="short"
        type="textarea"
        placeholder="负责部门"
        @update:value="value => setValue({ key: 'address', value })"
      />
    </form-label>
  </other-pages>
</template>

<script>
export default {
  name: 'PressmanPage',
  data () {
    return {
      sexOptions: [{
        value: 0,
        label: '先生'
      }, {
        value: 1,
        label: '女士'
      }]
    }
  },
  computed: {
    formData () { return this.$store.state.registerPressman },
    btnDisabled () { return this.$store.getters['registerPressman/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerPressman/btnStatus'] }
  },
  mounted () {
    /** 初始化手机号 */
    this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
  },
  methods: {
    setValue (data) {
      this.$store.commit('registerPressman/setData', data)
    },
    async submit () {
      await this.$store.dispatch('registerPressman/submitData', '移动官网')
      this.$store.commit('login/setRegisterStep', 'done')
    },
    changePhone (value) {
      this.setValue({ key: 'phoneNumber', value })
    },
    checkCode (value) {
      this.setValue({ key: 'code', value })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
