<template>
  <div class="regiPartner_container">
    <section class="title">
      <div><span>Register as a dealer</span></div>
      <div>
        <p>
          You can log in as a dealer once we confirm your information.
        </p>
      </div>
    </section>
    <section class="content">
      <form>
        <div class="form_item">
          <div class="form_item_left">
            <p>You want to be a dealer in which Country/Region<span class="red">*</span></p>
            <DropDown
              :value="formData.intention"
              :drop-list="intentionOptions"
              @update:value="value => setValue({ key: 'intention', value })"
            />
          </div>
          <div class="form_item_right">
            <p>Company Name<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.companyName"
              size="short"
              @update:value="value => setValue({ key: 'companyName', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div v-if="false" class="form_item_left">
            <p>First Name<span class="red">*</span></p>
            <div class="select_box">
              <pc-select
                :value="formData.sex"
                :country="true"
                :designer="true"
                :style="{ width: '30%' }"
                :options="sexOptions"
                @update:value="value => setValue({ key: 'sex', value })"
              />
              <Input
                :is-pc="true"
                :value="formData.name"
                size="short"
                @update:value="value => setValue({ key: 'name', value })"
              />
            </div>
          </div>
          <!-- <div class="form_item_right">
            <p>所在城市<span class="red">*</span></p>
            <v-distpicker
              :province="formData.province"
              :city="formData.city"
              class="two"
              hide-area
              @province="({ value }) => setValue({ key: 'province', value })"
              @city="({ value }) => setValue({ key: 'city', value })"
            />
          </div> -->
          <div class="form_item_left">
            <p>Title<span class="red">*</span></p>
            <Radio
              :value="formData.sex"
              :options="sexOptions"
              @update:value="value => setValue({ key: 'sex', value })"
            />
          </div>
          <div class="form_item_right">
            <p>Company Address<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.companyAddress"
              size="short"
              @update:value="value => setValue({ key: 'companyAddress', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>First Name<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.firstName"
              size="short"
              @update:value="value => setValue({ key: 'firstName', value })"
            />
          </div>
          <div class="form_item_right">
            <p>Contact Email<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.email"
              size="short"
              @update:value="value => setValue({ key: 'email', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>Last Name<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.lastName"
              size="short"
              @update:value="value => setValue({ key: 'lastName', value })"
            />
          </div>
          <div class="form_item_right">
            <p>Contact Phone Number<span class="red">*</span></p>
            <div class="boxFlex">
              <pc-select
                :value="formData.area_code"
                :country="true"
                :style="{
                  height: '48px',
                  width: '25%',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  borderRight: 'none',
                }"
                :options="globalTagOptions"
                @update:value="value => setValue({ key: 'area_code', value })"
              />
              <Input
                :style="{ width: '75%'}"
                :is-pc="true"
                :value="formData.phone"
                size="short"
                color="color"
                @update:value="value => setValue({ key: 'phone', value })"
              />
            </div>
          </div>
          <!-- <div v-if="false" class="form_item_right">
            <p> Phone Number<span class="red">*</span></p>
            <div class="select_box">
              <change-phone
                :old-phone="$store.state.registerMemberEn.phoneNumber"
                @changePhone="() => changePhone"
                @checkCode="checkCode"
              />
            </div>
          </div> -->
        </div>
        <div class="form_item" style="margin-bottom:0;">
          <div class="form_item_left">
            <p>Which brand you’d like to work with？<span class="red">*</span></p>
            <pc-tags
              :value="formData.intent"
              :tags="intentOptions"
              @update:value="value => setValue({ key: 'intent', value })"
            />
          </div>
          <div class="form_item_right">
            <p>Company Position<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.ranking"
              size="short"
              @update:value="value => setValue({ key: 'ranking', value })"
            />
          </div>
        </div>
        <div class="form_item" style="position:relative;">
          <div class="form_item_left" />
          <div class="form_item_right" style="position: absolute;top:-38px; right:0">
            <p>Company Website</p>
            <Input
              :is-pc="true"
              :value="formData.website"
              size="short"
              @update:value="value => setValue({ key: 'website', value })"
            />
          </div>
        </div>
        <div class="submit">
          <pc-button
            :loading="btnStatus.loading"
            :disabled="!btnDisabled"
            @click="submit"
          >
            Submit
          </pc-button>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DropDown from '~/componentsEn/common/DropDow.vue'
import Input from '~/components/common/Input.vue'
// import changePhone from '~/componentsEn/ChangePhone/index.vue'
import PcSelect from '~/componentsEn/PcSelect/index.vue'
import Radio from '~/componentsEn/common/Radio.vue'
import pcTags from '~/componentsEn/PcTags/index.vue'
export default {
  name: 'RegiPartnerComponent',
  components: {
    DropDown,
    Input,
    // changePhone,
    PcSelect,
    Radio,
    pcTags
  },
  data: () => ({
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
  }),
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
    /** 初始化手机号 */
    // this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
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
      try {
        const newData = { ...this.formData }
        newData.route = 'PC官网'
        await this.registerPartner(newData)
        // 提示框
        await this.$store.commit('login/setTipsContent', {
          title: 'Success',
          details: 'Your application has been successfully submitted.'
        })
        await this.$store.commit('login/setTipsSection', 'done')
      } catch (error) {
      }
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
  // width: 780px;
  margin: 0 auto;

  @include media('<1600px') {
    transform: scale(0.8);
  }
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
        // width: 350px;
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
      .boxFlex{
        width:400px;height: '48px';display:flex;
        :deep(.country){
            border-right: none;
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
    margin: 100px auto 0;
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
