<template>
  <other-pages
    title="填写您的创作者信息"
    subtitle="提交后会有专人为您审核、登记"
    :button="btnStatus.text"
    :loading="btnStatus.loading"
    :disabled="!btnDisabled"
    @done="submit"
  >
    <form-label label="所在社交平台(核心运营平台)" :required="true" :border="false">
      <m-tag
        :value="formData.socialPlatforms"
        :tags="socialPlatformsList"
        @update:value="value => setValue({ key: 'socialPlatforms', value })"
      />
    </form-label>
    <template v-if="formData.socialPlatforms.includes('3fa6e95f26b88234')">
      <form-label label="微信" :required="true">
        <m-input
          :value="formData.platform['3fa6e95f26b88234'].account"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入您的平台微信号"
          @update:value="value => setPlatform({ key: '3fa6e95f26b88234', label: 'account', value })"
        />
      </form-label>
      <form-label>
        <m-input
          :value="formData.platform['3fa6e95f26b88234'].link"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入您的平台微信号"
          @update:value="value => setPlatform({ key: '3fa6e95f26b88234', label: 'link', value })"
        />
      </form-label>
    </template>
    <template v-if="formData.socialPlatforms.includes('7e0f804501d53662')">
      <form-label label="小红书" :required="true">
        <m-input
          :value="formData.platform['7e0f804501d53662'].account"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入您的小红书账号"
          @update:value="value => setPlatform({ key: '7e0f804501d53662', label: 'account', value })"
        />
      </form-label>
      <form-label>
        <m-input
          :value="formData.platform['7e0f804501d53662'].link"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入文章链接"
          @update:value="value => setPlatform({ key: '7e0f804501d53662', label: 'link', value })"
        />
      </form-label>
    </template>
    <template v-if="formData.socialPlatforms.includes('bc8b642a3a1e34a6')">
      <form-label label="微博" :required="true">
        <m-input
          :value="formData.platform['bc8b642a3a1e34a6'].account"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入您的微博账号"
          @update:value="value => setPlatform({ key: 'bc8b642a3a1e34a6', label: 'account', value })"
        />
      </form-label>
      <form-label>
        <m-input
          :value="formData.platform['bc8b642a3a1e34a6'].link"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入文章链接"
          @update:value="value => setPlatform({ key: 'bc8b642a3a1e34a6', label: 'link', value })"
        />
      </form-label>
    </template>
    <template v-if="formData.socialPlatforms.includes('4be3308c8a43d425')">
      <form-label label="好好住" :required="true">
        <m-input
          :value="formData.platform['4be3308c8a43d425'].account"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入您的好好住账号"
          @update:value="value => setPlatform({ key: '4be3308c8a43d425', label: 'account', value })"
        />
      </form-label>
      <form-label>
        <m-input
          :value="formData.platform['4be3308c8a43d425'].link"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入文章链接"
          @update:value="value => setPlatform({ key: '4be3308c8a43d425', label: 'link', value })"
        />
      </form-label>
    </template>
    <template v-if="formData.socialPlatforms.includes('341c3cbf6ddd7a01')">
      <form-label label="其他" :required="true">
        <m-input
          :value="formData.platform['341c3cbf6ddd7a01'].account"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入您的其他平台账号"
          @update:value="value => setPlatform({ key: '341c3cbf6ddd7a01', label: 'account', value })"
        />
      </form-label>
      <form-label>
        <m-input
          :value="formData.platform['341c3cbf6ddd7a01'].link"
          :style="{ width: '68%' }"
          size="short"
          placeholder="输入文章链接"
          @update:value="value => setPlatform({ key: '341c3cbf6ddd7a01', label: 'link', value })"
        />
      </form-label>
    </template>
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
    <form-label label="生日" :required="true">
      <m-input
        :value="formData.birthday"
        type="date"
        size="short"
        placeholder="请选择生日"
        @update:value="value => setValue({ key: 'birthday', value })"
      />
    </form-label>
    <form-label label="邮寄地址（供样品寄送）" :required="true">
      <m-input
        :value="formData.address"
        type="textarea"
        size="short"
        placeholder="请输入您的收件地址"
        @update:value="value => setValue({ key: 'address', value })"
      />
    </form-label>
    <form-label label="品牌意向" :required="true" :border="false">
      <m-tag
        :value="formData.intent"
        :tags="intentOptions"
        @update:value="value => setValue({ key: 'intent', value })"
      />
    </form-label>
  </other-pages>
</template>

<script>
export default {
  name: 'KolPage',
  data () {
    return {
      socialPlatformsList: [],
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
    formData () { return this.$store.state.registerKol },
    btnDisabled () { return this.$store.getters['registerKol/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerKol/btnStatus'] }
  },
  mounted () {
    /** 初始化手机号 */
    this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
    /** 初始化选项 */
    const configList = this.$store.getters['registerEntry/getConfigList']
    this.socialPlatformsList = configList.platform
    const platform = {}
    this.socialPlatformsList.forEach((element) => {
      platform[element.value] = {
        label: element.label,
        account: null,
        link: null
      }
    })
    this.$store.commit('registerKol/initPlatform', platform)
    this.intentOptions = configList.cooperation_brand
  },
  methods: {
    setValue (data) {
      this.$store.commit('registerKol/setData', data)
    },
    setPlatform (data) {
      this.$store.commit('registerKol/setPlatform', data)
    },
    async submit () {
      await this.$store.dispatch('registerKol/submitData', '移动官网')
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
