<template>
  <div class="container">
    <section class="title">
      <div><span>Fill in your creator information</span></div>
      <div>
        <p>
          提交后会有专人为您审核、登记
        </p>
      </div>
    </section>
    <section class="content">
      <div class="form-content">
        <div class="form_item">
          <div class="form_item_col">
            <div class="title">
              所在社交平台（核心运营平台）<span class="red">*</span>
            </div>
            <pc-tags
              :value="formData.socialPlatforms"
              :tags="socialPlatformsList"
              :tag-style="{ width: '168px', marginRight: '8px' }"
              @update:value="value => setValue({ key: 'socialPlatforms', value })"
            />
          </div>
        </div>
        <template v-if="formData.socialPlatforms.includes('3fa6e95f26b88234')">
          <div class="form-single">
            <p>微信<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['3fa6e95f26b88234'].account"
                size="short"
                placeholder="输入您的平台微信号"
                @update:value="value => setPlatform({ key: '3fa6e95f26b88234', label: 'account', value })"
              />
            </div>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['3fa6e95f26b88234'].link"
                size="short"
                placeholder="输入您的平台微信号"
                @update:value="value => setPlatform({ key: '3fa6e95f26b88234', label: 'link', value })"
              />
            </div>
          </div>
        </template>
        <template v-if="formData.socialPlatforms.includes('7e0f804501d53662')">
          <div class="form-single">
            <p>小红书<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['7e0f804501d53662'].account"
                size="short"
                placeholder="输入您的小红书账号"
                @update:value="value => setPlatform({ key: '7e0f804501d53662', label: 'account', value })"
              />
            </div>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['7e0f804501d53662'].link"
                size="short"
                placeholder="输入文章链接"
                @update:value="value => setPlatform({ key: '7e0f804501d53662', label: 'link', value })"
              />
            </div>
          </div>
        </template>
        <template v-if="formData.socialPlatforms.includes('bc8b642a3a1e34a6')">
          <div class="form-single">
            <p>微博<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['bc8b642a3a1e34a6'].account"
                size="short"
                placeholder="输入您的微博账号"
                @update:value="value => setPlatform({ key: 'bc8b642a3a1e34a6', label: 'account', value })"
              />
            </div>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['bc8b642a3a1e34a6'].link"
                size="short"
                placeholder="输入文章链接"
                @update:value="value => setPlatform({ key: 'bc8b642a3a1e34a6', label: 'link', value })"
              />
            </div>
          </div>
        </template>
        <template v-if="formData.socialPlatforms.includes('4be3308c8a43d425')">
          <div class="form-single">
            <p>好好住<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['4be3308c8a43d425'].account"
                size="short"
                placeholder="输入您的好好住账号"
                @update:value="value => setPlatform({ key: '4be3308c8a43d425', label: 'account', value })"
              />
            </div>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['4be3308c8a43d425'].link"
                size="short"
                placeholder="输入文章链接"
                @update:value="value => setPlatform({ key: '4be3308c8a43d425', label: 'link', value })"
              />
            </div>
          </div>
        </template>
        <template v-if="formData.socialPlatforms.includes('341c3cbf6ddd7a01')">
          <div class="form-single">
            <p>其他<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['341c3cbf6ddd7a01'].account"
                size="short"
                placeholder="输入您的其他平台账号"
                @update:value="value => setPlatform({ key: '341c3cbf6ddd7a01', label: 'account', value })"
              />
            </div>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.platform['341c3cbf6ddd7a01'].link"
                size="short"
                placeholder="输入文章链接"
                @update:value="value => setPlatform({ key: '341c3cbf6ddd7a01', label: 'link', value })"
              />
            </div>
          </div>
        </template>
        <div class="form-single">
          <p>姓名<span class="red">*</span></p>
          <div class="select_box">
            <Input
              :is-pc="true"
              :value="formData.name"
              size="short"
              placeholder="Please enter your title"
              @update:value="value => setValue({ key: 'name', value })"
            />
            <pc-select
              :value="formData.sex"
              :country="true"
              :style="{
                width: '108px'
              }"
              :options="sexOptions"
              @update:value="value => setValue({ key: 'sex', value })"
            />
          </div>
        </div>
        <div class="form-single">
          <p>生日<span class="red">*</span></p>
          <Input
            :is-pc="true"
            :value="formData.birthday"
            type="date"
            size="short"
            placeholder="请选择生日"
            @update:value="value => setValue({ key: 'birthday', value })"
          />
        </div>
        <div class="form-single">
          <p>phone number<span class="red">*</span></p>
          <div class="select_box">
            <change-phone
              :old-phone="formData.phoneNumber"
              @changePhone="changePhone"
              @checkCode="checkCode"
            />
          </div>
        </div>
        <div class="form-single">
          <p>邮寄地址（供样品寄送）<span class="red">*</span></p>
          <Input
            :is-pc="true"
            :value="formData.address"
            size="short"
            placeholder="请输入您的收件地址"
            @update:value="value => setValue({ key: 'address', value })"
          />
        </div>
        <div class="form-single">
          <p>City of Residence</p>
          <v-distpicker
            :province="formData.province"
            :city="formData.city"
            class="two"
            hide-area
            @province="({ value }) => setValue({ key: 'province', value })"
            @city="({ value }) => setValue({ key: 'city', value })"
          />
        </div>
        <div class="form-single">
          <p>Brand Intent<span class="red">*</span></p>
          <pc-tags
            :value="formData.intent"
            :tag-style="{ width: '193px' }"
            :tags="intentOptions"
            @update:value="value => setValue({ key: 'intent', value })"
          />
        </div>
      </div>
      <div class="submit">
        <pc-button
          :loading="btnStatus.loading"
          :disabled="!btnDisabled"
          @click="submit"
        >
          {{ btnStatus.text }}
        </pc-button>
      </div>
    </section>
  </div>
</template>

<script>
import Input from '~/componentsEn/common/Input.vue'
import PcButton from '~/componentsEn/PcButton'
import PcSelect from '~/componentsEn/PcSelect'
import PcTags from '~/componentsEn/PcTags'
import ChangePhone from '~/componentsEn/ChangePhone'
export default {
  name: 'RegiBloggerComponent',
  components: {
    Input,
    PcButton,
    PcSelect,
    PcTags,
    ChangePhone
  },
  data: () => ({
    sexOptions: [{
      value: 0,
      label: '先生'
    }, {
      value: 1,
      label: '女士'
    }],
    socialPlatformsList: [],
    intentOptions: []
  }),
  computed: {
    formData () { return this.$store.state.registerKol },
    btnDisabled () { return this.$store.getters['registerKol/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerKol/btnStatus'] }
  },
  mounted () {
    /** 初始化phone number */
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
      await this.$store.dispatch('registerKol/submitData')
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
.red {
  color: red;
  margin-left: 3px;
}
.form-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.form-single {
  width: 45%;
  margin-bottom: 30px;
  > p {
    min-width: 30px;
    margin-bottom: 15px;
    font-size: 16px;
    position: relative;
  }
  > .select_box {
    display: flex;
    justify-content: space-between;
    .large_box {
      width: 300px;
    }
    .small_box {
      width: 100px;
    }
    .phone_box {
      width: 309px;
    }
    > button {
      width: 77px;
      height: 48px;
      background: none;
      border: 1px solid rgba(0, 0, 0, 0.2);
      font-size: 16px;
      cursor: pointer;
    }
  }
  > .select_box:not(:first-child) {
    margin-top: 10px;
  }
}
.container {
  padding: 5vh 0 70px;
  width: 880px;
  margin: 0 auto;
  .title {
    > div:nth-child(1) {
      font-size: 36px;
      font-weight: bold;
    }
    > div:nth-child(2) {
      font-size: 16px;
      opacity: 0.7;
      // margin-top: 20px;
    }
  }
  .content {
    margin-top: 30px;
    .form_item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;

      &_col {
        width: 100%;
        padding: 11px 0;
        .title {
          font-size: 16px;
          margin-bottom: 15px;
        }
      }
      &_col:not(:first-child) {
        padding-left: 20px;
        border-left: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
    .upload_box {
      .title {
        font-size: 16px;
        margin-bottom: 15px;
      }
    }
  }
  .submit {
    width: 530px;
    height: 60px;
    margin: 60px auto 0;
    > button {
      width: 100%;
      height: 100%;
      border: none;
      background: #000;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
