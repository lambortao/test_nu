<template>
  <div class="regiPartner_container">
    <section class="title">
      <div><span>填写您的合作意向</span></div>
      <div>
        <p>
          提交后会有专人与您联系
        </p>
      </div>
    </section>
    <section class="content">
      <form>
        <div class="form_item">
          <div class="form_item_left">
            <p>合作意向<span class="red">*</span></p>
            <DropDown
              :value="formData.intention"
              :drop-list="intentionOptions"
              placeholder="请选择您的合作意向"
              @update:value="value => setValue({ key: 'intention', value })"
            />
          </div>
          <div class="form_item_right">
            <p>公司名称<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.companyName"
              size="short"
              placeholder="贵公司全称"
              @update:value="value => setValue({ key: 'companyName', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>称呼<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.name"
                size="short"
                placeholder="请输入您的称谓"
                @update:value="value => setValue({ key: 'name', value })"
              />
              <pc-select
                :value="formData.sex"
                :country="true"
                :style="{ width: '30%' }"
                :options="sexOptions"
                @update:value="value => setValue({ key: 'sex', value })"
              />
            </div>
          </div>
          <div class="form_item_right">
            <p>所在城市<span class="red">*</span></p>
            <v-distpicker
              :province="formData.province"
              :city="formData.city"
              class="two"
              hide-area
              @province="({ value }) => setValue({ key: 'province', value })"
              @city="({ value }) => setValue({ key: 'city', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>公司邮箱</p>
            <Input
              :is-pc="true"
              :value="formData.email"
              size="short"
              placeholder="请输入邮箱地址"
              @update:value="value => setValue({ key: 'email', value })"
            />
          </div>
          <div class="form_item_right">
            <p>手机号<span class="red">*</span></p>
            <div class="select_box">
              <change-phone
                :old-phone="oldPhone"
                @changePhone="() => changePhone"
                @checkCode="checkCode"
              />
            </div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>公司地址</p>
            <Input
              :is-pc="true"
              :value="formData.companyAddress"
              size="short"
              placeholder="贵公司详细地址"
              @update:value="value => setValue({ key: 'companyAddress', value })"
            />
          </div>
          <div class="form_item_right">
            <p>职位<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.ranking"
              size="short"
              placeholder="负责部门"
              @update:value="value => setValue({ key: 'ranking', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>品牌意向<span class="red">*</span></p>
            <pc-tags
              :value="formData.intent"
              :tags="intentOptions"
              @update:value="value => setValue({ key: 'intent', value })"
            />
          </div>
          <div class="form_item_right">
            <p>公司网址</p>
            <Input
              :is-pc="true"
              :value="formData.companyWebsite"
              size="short"
              placeholder="请输入贵公司网址"
              @update:value="value => setValue({ key: 'website', value })"
            />
          </div>
        </div>
        <div class="upload_box">
          <div class="title">
            资质证明、公司介绍及营业执照：
          </div>
          <div class="upload">
            <upload-img
              :value="formData.business_license"
              @update:value="value => setValue({ key: 'business_license', value })"
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
      </form>
    </section>
  </div>
</template>

<script>
import DropDown from '~/components/common/DropDown.vue'
import Input from '~/components/common/Input.vue'
export default {
  name: 'RegiPartnerComponent',
  components: {
    DropDown,
    Input
  },
  data: () => ({
    sexOptions: [{
      value: 0,
      label: '先生'
    }, {
      value: 1,
      label: '女士'
    }],
    intentionOptions: [],
    intentOptions: []
  }),
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
    console.log(this.intentionOptions)
  },
  methods: {
    setValue (data) {
      this.$store.commit('registerMember/setData', data)
    },
    async submit () {
      await this.$store.dispatch('registerMember/submitData', 'PC官网')
      this.$store.commit('login/setRegisterStep', 'done')
    },
    getUploadList (e) {
      console.log(e)
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
.regiPartner_container {
  padding: 5vh 0 76px;
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
    margin-top: 40px;
    .form_item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 30px;
      &_left,
      &_right {
        width: 400px;
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
:deep(.distpicker-address-wrapper){
  display: flex;
}
:deep(.distpicker-address-wrapper select){
  border-radius: 0;
}
:deep(.distpicker-address-wrapper.two > label){
position: relative;
  &::after{
  content: "";
  display: block;
  background: url('~/assets/images/icon/left_dark.png') no-repeat;
  background-size:100% 100%;
  transform: rotate(-90deg);
  width: 7px;
  height: 12px;
  position: absolute;
  right: 14px;
  top: 15px;
  }
}
</style>
