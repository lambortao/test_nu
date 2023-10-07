<template>
  <other-pages
    title="Register as a dealer "
    subtitle="You can log in as a dealer once we confirm your information."
    :button="'Submit'"
    :loading="btnStatus.loading"
    :disabled="!btnDisabled"
    @done="submit"
  >
    <form-label label="You want to be a dealer in which Country/Region?" :required="true" :border="false">
      <select-country
        :value="formData.intention"
        size="short"
        :options="intentionOptions"
        @update:value="value => setValue({ key: 'intention', value })"
      />
    </form-label>
    <form-label v-if="false" label="Name" :required="true" class-name="flex-between flex-align-center">
      <m-input
        :value="formData.name"
        :style="{ width: '68%' }"
        size="short"
        @update:value="value => setValue({ key: 'name', value })"
      />
      <i class="vertical" />
      <select-country
        :value="formData.sex"
        :style="{ width: '30%' }"
        size="short"
        :options="sexOptions"
        @update:value="value => setValue({ key: 'sex', value })"
      />
    </form-label>
    <form-label label="Title" :required="true" :border="false">
      <mRadio
        :value="formData.sex"
        :options="sexOptions"
        @update:value="value => setValue({ key: 'sex', value })"
      />
    </form-label>
    <form-label label="First Name" :required="true">
      <m-input
        :value="formData.firstName"
        size="short"
        @update:value="value => setValue({ key: 'firstName', value })"
      />
    </form-label>
    <form-label label="Last Name" :required="true">
      <m-input
        :value="formData.lastName"
        size="short"
        @update:value="value => setValue({ key: 'lastName', value })"
      />
    </form-label>
    <form-label label="Which brand you’d like to work with？" :required="true" :border="false">
      <m-tag
        :value="formData.intent"
        :tags="intentOptions"
        @update:value="value => setValue({ key: 'intent', value })"
      />
    </form-label>
    <form-label label="Company Name" :required="true">
      <m-input
        :value="formData.companyName"
        size="short"
        @update:value="value => setValue({ key: 'companyName', value })"
      />
    </form-label>
    <form-label label="Company Address" :required="true">
      <m-input
        :value="formData.companyAddress"
        size="short"
        @update:value="value => setValue({ key: 'companyAddress', value })"
      />
    </form-label>
    <form-label label="Contact Email" :required="true">
      <m-input
        :value="formData.email"
        size="short"
        @update:value="value => setValue({ key: 'email', value })"
      />
    </form-label>
    <form-label label="Contact Phone Number" :required="true">
      <div class="boxFlex">
        <m-select
          :country="true"
          :style="{
            fontSize: '80%',
            width: '30%',
          }"
          :value="formData.area_code"
          :options="globalTagOptions"
          @update:value="value => setValue({ key: 'area_code', value })"
        />
        <m-input
          :value="formData.phone"
          color="color"
          @update:value="value => setValue({ key: 'phone', value })"
        />
      </div>
    </form-label>
    <form-label label="Company Position" :required="true">
      <m-input
        :value="formData.ranking"
        size="short"
        @update:value="value => setValue({ key: 'ranking', value })"
      />
    </form-label>
    <!-- <form-label label="资质证明、公司介绍及营业执照" :border="false">
      <upload-img
        :value="formData.business_license"
        @update:value="value => setValue({ key: 'business_license', value })"
      />
    </form-label> -->
    <form-label label="Company Website" :required="false">
      <m-input
        :value="formData.companyWebsite"
        size="short"
        @update:value="value => setValue({ key: 'website', value })"
      />
    </form-label>
  </other-pages>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import OtherPages from '~/componentsEn/AAMobile/OtherPages/index.vue'
// import changePhone from '~/componentsEn/ChangePhone/index.vue'
import selectCountry from '~/componentsEn/AAMobile/InputComponent/selectCountry.vue'
import formLabel from '~/componentsEn/AAMobile/FormLabel/index.vue'
import mRadio from '~/componentsEn/AAMobile/InputComponent/radio.vue'
import mTag from '~/componentsEn/AAMobile/InputComponent/tag.vue'
import mSelect from '~/componentsEn/AAMobile/InputComponent/select.vue'
export default {
  name: 'MemberPage',
  components: {
    OtherPages,
    // changePhone,
    selectCountry,
    formLabel,
    mRadio,
    mTag,
    mSelect
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
      intentionOptions: ['HongKong', 'Taiwan', 'Macao', 'South Korea', 'Japan',
        'South East Asia',
        'Australia',
        'New Zealand',
        'Philippines',
        'India', 'Others'],
      intentOptions: []
    }
  },
  computed: {
    ...mapState('login', {
      globalTagOptions: 'areaCode',
      countryTagOptions: state => state.login.countryTagOptions
    }),
    formData () { return this.$store.state.registerMemberEn },
    btnDisabled () { return this.$store.getters['registerMemberEn/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerMemberEn/btnStatus'] },
    emailOrPhone () {
      return this.$store.state.login.registerData
    }
  },
  mounted () {
    // 清空表格数据
    // this.$store.commit('registerMemberEn/initializePartner')
    /** 初始化手机号 */
    this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
    /** 初始化选项 */
    const configList = this.$store.getters['registerEntry/getConfigList']
    // this.intentionOptions = configList.cooperation_intention
    this.intentOptions = configList.cooperation_brand
  },
  methods: {
    ...mapActions({
      registerPartner: 'login/registerPartner'
    }),
    setValue (data) {
      this.$store.commit('registerMemberEn/setData', data)
    },
    async submit () {
      // await this.$store.dispatch('registerMemberEn/submitData', '移动官网')
      // await this.$store.commit('login/setLoginSection', 'done')
      try {
        const newData = { ...this.formData }
        newData.route = '移动官网'
        await this.registerPartner(newData)
        // 提示框
        await this.$store.commit('login/setTipsContent', {
          title: 'Verified',
          details: 'Your application has been successfully submitted.'
        })
        await this.$store.commit('login/setLoginSection', 'done')
      } catch (error) {

      }
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
.boxFlex{
  width:100%;
  display:flex;
}
</style>
