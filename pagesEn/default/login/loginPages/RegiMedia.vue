<template>
  <div class="container">
    <section class="title">
      <div><span>Fill in your creator information</span></div>
      <div>
        <p>Complete the information to become a media member</p>
      </div>
    </section>
    <section class="content">
      <form action="">
        <div class="form_item">
          <div class="form_item_left">
            <p>Name<span class="red">*</span></p>
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
                :style="{ width: '108px' }"
                :options="sexOptions"
                @update:value="value => setValue({ key: 'sex', value })"
              />
            </div>
          </div>
          <div class="form_item_right">
            <p>Position<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.post"
              size="short"
              placeholder="Responsible Department"
              @update:value="value => setValue({ key: 'post', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>phone number<span class="red">*</span></p>
            <div class="select_box">
              <change-phone
                :old-phone="formData.phoneNumber"
                @changePhone="changePhone"
                @checkCode="checkCode"
              />
            </div>
          </div>
          <div class="form_item_right">
            <p>Company Email</p>
            <div class="select_box">
              <Input
                :is-pc="true"
                :value="formData.companyEmail"
                type="email"
                size="short"
                placeholder="Your company email address"
                @update:value="value => setValue({ key: 'companyEmail', value })"
              />
            </div>
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
            <p>Journalists Name<span class="red">*</span></p>
            <Input
              :is-pc="true"
              :value="formData.pressmanName"
              size="short"
              @update:value="value => setValue({ key: 'pressmanName', value })"
            />
          </div>
          <div class="form_item_right">
            <p>Company Address</p>
            <Input
              :is-pc="true"
              :value="formData.address"
              size="short"
              @update:value="value => setValue({ key: 'address', value })"
            />
          </div>
        </div>
        <div class="form_item">
          <div class="form_item_left">
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
import Input from '~/componentsEn/common/Input.vue'
import PcButton from '~/componentsEn/PcButton'
import PcSelect from '~/componentsEn/PcSelect'
import ChangePhone from '~/componentsEn/ChangePhone'
export default {
  name: 'RegiMediaComponent',
  components: {
    Input,
    PcButton,
    PcSelect,
    ChangePhone
  },
  data: () => ({
    sexOptions: [{
      value: 0,
      label: 'Mister'
    }, {
      value: 1,
      label: 'lady'
    }]
  }),
  computed: {
    formData () { return this.$store.state.registerPressman },
    btnDisabled () { return this.$store.getters['registerPressman/btnDisabled'] },
    btnStatus () { return this.$store.getters['registerPressman/btnStatus'] }
  },
  mounted () {
    /** 初始化phone number */
    this.setValue({ key: 'phoneNumber', value: this.$store.getters['login/getMemberPhoneNumber'] })
  },
  methods: {
    setValue (data) {
      this.$store.commit('registerPressman/setData', data)
    },
    async submit () {
      await this.$store.dispatch('registerPressman/submitData')
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
</style>
