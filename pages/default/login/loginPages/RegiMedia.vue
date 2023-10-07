<template>
  <div class="container">
    <section class="title">
      <div><span>填写您的创作者信息</span></div>
      <div>
        <p>完成资料填写，即将成为媒体者身份会员</p>
      </div>
    </section>
    <section class="content">
      <form action="">
        <div class="form_item">
          <div class="form_item_left">
            <p>姓名<span class="red">*</span></p>
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
                :designer="true"
                :style="{ width: '30%' }"
                :options="sexOptions"
                @update:value="value => setValue({ key: 'sex', value })"
              />
            </div>
          </div>
          <div class="form_item_right">
            <p>职位<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.post"
              size="short"
              placeholder="负责部门"
              @update:value="value => setValue({ key: 'post', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>手机号<span class="red">*</span></p>
            <div class="select_box">
              <change-phone
                :old-phone="formData.phoneNumber"
                @changePhone="() => changePhone"
                @checkCode="checkCode"
              />
            </div>
          </div>
          <div class="form_item_right">
            <p>公司邮箱<span class="red">*</span></p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.companyEmail"
                type="email"
                size="short"
                placeholder="贵公司电子邮箱"
                @update:value="value => setValue({ key: 'companyEmail', value })"
              />
            </div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>媒体名称<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.pressmanName"
              size="short"
              placeholder="请输入"
              @update:value="value => setValue({ key: 'pressmanName', value })"
            />
          </div>
          <div class="form_item_right">
            <p>公司地址</p>
            <Input
              :is-pc="true"
              :value="formData.address"
              size="short"
              placeholder="请输入"
              @update:value="value => setValue({ key: 'address', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
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
      </form>
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
import Input from '~/components/common/Input.vue'
export default {
  name: 'RegiMediaComponent',
  components: {
    Input
  },
  data: () => ({
    sexOptions: [{
      value: 0,
      label: '先生'
    }, {
      value: 1,
      label: '女士'
    }]
  }),
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
      await this.$store.dispatch('registerPressman/submitData', 'PC官网')
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
.container {
  padding: 5vh 0 76px;
  width: 880px;
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
    margin-top: 30px;
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
        > .select_box:not(:first-child) {
          margin-top: 10px;
        }
      }
      &_row {
        width: 100%;
        p {
          margin-bottom: 15px;
          font-size: 16px;
        }
        textarea {
          width: 100%;
          min-height: 100px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          padding: 10px 20px;
          font-size: 16px;
        }
      }
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
