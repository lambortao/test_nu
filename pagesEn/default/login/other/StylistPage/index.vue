<template>
  <other-pages
    title="填写您的专业信息"
    subtitle="获取您的设计师认证"
    :button="btnStatus.text"
    :loading="btnStatus.loading"
    :disabled="!btnDisabled"
    @done="submit"
  >
    <form-label label="个人或机构" :border="false" :required="true">
      <m-radio
        :value="formData.position"
        :options="positionOptions"
        @update:value="value => setValue({ key: 'position', value })"
      />
    </form-label>
    <form-label label="合作意向" :border="false" :required="true">
      <m-radio
        :value="formData.intentionToCooperate"
        :options="intentionToCooperateOptions"
        @update:value="value => setValue({ key: 'intentionToCooperate', value })"
      />
    </form-label>
    <form-label label="主营设计方向" :required="true" :border="false">
      <m-tag
        :tags="typeBusinessOptions"
        :value="formData.typeBusiness"
        @update:value="value => setValue({ key: 'typeBusiness', value })"
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
    <form-label :required="true" :border="false" label="手机号" class-name="flex-between flex-align-center">
      <change-phone
        :old-phone="formData.phoneNumber"
        @changePhone="changePhone"
        @checkCode="checkCode"
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
        :value="formData.address"
        type="address"
        size="short"
        placeholder="贵公司详细地址"
        @update:value="value => setValue({ key: 'address', value })"
      />
    </form-label>
    <form-label label="公司/个人所在城市" :border="false" :required="true">
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
    <form-label label="邮箱" :required="true">
      <m-input
        :value="formData.email"
        size="short"
        placeholder="请输入邮箱地址"
        @update:value="value => setValue({ key: 'email', value })"
      />
    </form-label>
    <form-label label="项目作品链接/公司官网">
      <m-input
        :value="formData.website"
        size="short"
        placeholder="请输入项目作品链接"
        @update:value="value => setValue({ key: 'website', value })"
      />
    </form-label>
    <form-label label="过往案例叙述">
      <m-input
        :value="formData.remark"
        type="textarea"
        size="short"
        placeholder="请输入邮箱地址"
        @update:value="value => setValue({ key: 'remark', value })"
      />
    </form-label>
  </other-pages>
</template>

<script>
export default {
  name: 'StylistPage',
  data () {
    return {
      positionOptions: [],
      typeBusinessOptions: [],
      intentionToCooperateOptions: [],
      intentOptions: [],
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
    formData () { return this.$store.state.registerDesigner },
    btnDisabled () { return this.$store.getters['registerDesigner/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerDesigner/btnStatus'] }
  },
  mounted () {
    /** 初始化手机号 */
    this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
    /** 初始化选项 */
    const configList = this.$store.getters['registerEntry/getConfigList']
    this.positionOptions = configList.organization
    this.typeBusinessOptions = configList.design_direction
    this.intentionToCooperateOptions = configList.cooperation_intention
    this.intentOptions = configList.cooperation_brand
  },
  methods: {
    setValue (data) {
      this.$store.commit('registerDesigner/setData', data)
    },
    async submit () {
      await this.$store.dispatch('registerDesigner/submitData', '移动官网')
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
