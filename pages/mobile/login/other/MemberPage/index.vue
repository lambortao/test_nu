<template>
  <other-pages
    title="填写您的合作意向"
    subtitle="提交后会有专人与您联系"
    :button="btnStatus.text"
    :loading="btnStatus.loading"
    :disabled="!btnDisabled"
    @done="submit"
  >
    <form-label label="合作意向" :required="true">
      <m-select
        :value="formData.intention"
        size="short"
        :options="intentionOptions"
        @update:value="value => setValue({ key: 'intention', value })"
      />
    </form-label>
    <form-label label="称呼" :required="true" class-name="flex-between flex-align-center">
      <m-input
        :value="formData.name"
        :style="{ width: '68%' }"
        size="short"
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
    <form-label label="公司名称" :required="true">
      <m-input
        :value="formData.companyName"
        size="short"
        placeholder="贵公司全称"
        @update:value="value => setValue({ key: 'companyName', value })"
      />
    </form-label>
    <form-label label="公司地址">
      <m-input
        :value="formData.companyAddress"
        size="short"
        placeholder="贵公司详细地址"
        @update:value="value => setValue({ key: 'companyAddress', value })"
      />
    </form-label>
    <form-label label="公司邮箱">
      <m-input
        :value="formData.email"
        size="short"
        placeholder="请输入邮箱地址"
        @update:value="value => setValue({ key: 'email', value })"
      />
    </form-label>
    <form-label label="所在城市" :required="true" :border="false">
      <v-distpicker
        :province="formData.province"
        :city="formData.city"
        class="two"
        hide-area
        @province="({ value }) => setValue({ key: 'province', value })"
        @city="({ value }) => setValue({ key: 'city', value })"
      />
    </form-label>
    <form-label :required="true" :border="false" label="手机号" class-name="flex-between flex-align-center">
      <change-phone
        :old-phone="formData.phoneNumber"
        @changePhone="changePhone"
        @checkCode="checkCode"
      />
    </form-label>
    <form-label label="职位" :required="true">
      <m-input
        :value="formData.ranking"
        size="short"
        placeholder="负责部门"
        @update:value="value => setValue({ key: 'ranking', value })"
      />
    </form-label>
    <form-label label="品牌意向" :required="true" :border="false">
      <m-tag
        :value="formData.intent"
        :tags="intentOptions"
        @update:value="value => setValue({ key: 'intent', value })"
      />
    </form-label>
    <form-label label="资质证明、公司介绍及营业执照" :border="false">
      <upload-img
        :value="formData.business_license"
        @update:value="value => setValue({ key: 'business_license', value })"
      />
    </form-label>
    <form-label label="公司网址">
      <m-input
        :value="formData.companyWebsite"
        size="short"
        placeholder="请输入贵公司网址"
        @update:value="value => setValue({ key: 'website', value })"
      />
    </form-label>
  </other-pages>
</template>

<script>
export default {
  name: 'MemberPage',
  data () {
    return {
      sexOptions: [{
        value: 0,
        label: '先生'
      }, {
        value: 1,
        label: '女士'
      }],
      intentionOptions: [],
      intentOptions: []
    }
  },
  computed: {
    formData () { return this.$store.state.registerMember },
    btnDisabled () { return this.$store.getters['registerMember/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerMember/btnStatus'] }
  },
  mounted () {
    /** 初始化手机号 */
    this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
    /** 初始化选项 */
    const configList = this.$store.getters['registerEntry/getConfigList']
    this.intentionOptions = configList.cooperation_intention
    this.intentOptions = configList.cooperation_brand
  },
  methods: {
    setValue (data) {
      this.$store.commit('registerMember/setData', data)
    },
    async submit () {
      await this.$store.dispatch('registerMember/submitData', '移动官网')
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
