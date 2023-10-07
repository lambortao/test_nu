<template>
  <other-pages
    title="Register as a dealer "
    subtitle="You can log in as a dealer once we confirm your information."
    :button="'Submit'"
    :loading="btnStatus.loading"
    :disabled="!btnDisabled"
    @done="submit"
  >
    <form-label label="You want to be a dealer in which Country/Region" :required="true">
      <m-select
        :value="formData.intention"
        size="short"
        :options="intentionOptions"
        @update:value="value => setValue({ key: 'intention', value })"
      />
    </form-label>
    <form-label label="Name" :required="true" class-name="flex-between flex-align-center">
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
    <form-label label="Company Name" :required="true">
      <m-input
        :value="formData.companyName"
        size="short"
        @update:value="value => setValue({ key: 'companyName', value })"
      />
    </form-label>
    <form-label label="Company Address">
      <m-input
        :value="formData.companyAddress"
        size="short"
        @update:value="value => setValue({ key: 'companyAddress', value })"
      />
    </form-label>
    <form-label label="Company ">
      <m-input
        :value="formData.email"
        size="short"
        @update:value="value => setValue({ key: 'email', value })"
      />
    </form-label>
    <!-- <form-label label="所在城市" :required="true" :border="false">
      <v-distpicker
        :province="formData.province"
        :city="formData.city"
        class="two"
        hide-area
        @province="({ value }) => setValue({ key: 'province', value })"
        @city="({ value }) => setValue({ key: 'city', value })"
      />
    </form-label> -->
    <form-label :required="true" :border="false" label="Phone Number" class-name="flex-between flex-align-center">
      <change-phone
        :old-phone="formData.phoneNumber"
        @changePhone="changePhone"
        @checkCode="checkCode"
      />
    </form-label>
    <form-label label="Company Position" :required="true">
      <m-input
        :value="formData.ranking"
        size="short"
        @update:value="value => setValue({ key: 'ranking', value })"
      />
    </form-label>
    <form-label label="Brand intention" :required="true" :border="false">
      <m-tag
        :value="formData.intent"
        :tags="intentOptions"
        @update:value="value => setValue({ key: 'intent', value })"
      />
    </form-label>
    <!-- <form-label label="资质证明、公司介绍及营业执照" :border="false">
      <upload-img
        :value="formData.business_license"
        @update:value="value => setValue({ key: 'business_license', value })"
      />
    </form-label> -->
    <form-label label="Company Website">
      <m-input
        :value="formData.companyWebsite"
        size="short"
        @update:value="value => setValue({ key: 'website', value })"
      />
    </form-label>
  </other-pages>
</template>

<script>
import OtherPages from '~/componentsEn/AAMobile/OtherPages/index.vue'
import changePhone from '~/componentsEn/ChangePhone/index.vue'
export default {
  name: 'MemberPage',
  components: {
    OtherPages,
    changePhone
  },
  data () {
    return {
      sexOptions: [{
        value: 0,
        label: 'Mr'
      }, {
        value: 1,
        label: 'Ms'
      }],
      intentionOptions: [],
      intentOptions: []
    }
  },
  computed: {
    formData () { return this.$store.state.registerMemberEn },
    btnDisabled () { return this.$store.getters['registerMemberEn/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerMemberEn/btnStatus'] }
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
      this.$store.commit('registerMemberEn/setData', data)
    },
    async submit () {
      // await this.$store.dispatch('registerMemberEn/submitData', '移动官网')
      // await this.$store.commit('login/setLoginSection', 'done')
      await this.$store.commit('login/setTipsContent', {
        title: 'Verified',
        details: 'Your application has been successfully submitted.'
      })
      await this.$store.commit('login/setLoginSection', 'done')
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
