<template lang="html">
  <div class="userRegist_container">
    <section class="userRegist_title">
      <div>Welcome，<span>{{ getEncryptPhone }}</span></div>
      <div>
        <p>
          Please select the type of account
          you would like to register with
        </p>
      </div>
    </section>
    <section class="userRegist_content">
      <div>
        <!-- <MultipleVue new-style="width:260px;" :is-single="true" :select-list="selectList" @singleSelect="singleSelect" /> -->
        <div class="multiple_box">
          <div
            v-for="item in $store.state.identityEn.classType.filter(item => item.show)"
            :key="item.text"
            :class="{ active: selected === item.id }"
            @click="setSelected(item.id)"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
      <div>
        <input id="agree" v-model="agree" type="checkbox" style="display:none">
        <label for="agree">
          <span>
            <svg width="12px" height="10px">
              <use xlink:href="#check" />
            </svg>
          </span>
          <span>I have read the <span class="black">Privacy Policy</span></span>
        </label>
        <pc-button
          :disabled="disabled"
          @click="nextStep"
        >
          Next
        </pc-button>
      </div>
      <!--SVG Sprites-->
      <svg class="inline-svg">
        <symbol id="check" viewbox="0 0 11 11">
          <polyline points="0.5 5 3.5 8.5 9.5  0.5" />
        </symbol>
      </svg>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'StaffLoginComponentEn',
  computed: {
    // getEncryptPhone () { return this.$store.state.identityEn.phone },
    getEncryptPhone () { return this.$store.state.login.registerData['fm-login-id'] },
    disabled () { return this.$store.getters['identityEn/disabled'] },
    agree: {
      get () { return this.$store.state.identityEn.agree },
      set (value) { this.$store.commit('identityEn/setAgree', value) }
    },
    selected () { return this.$store.state.identityEn.selected },
    emailOrPhone () {
      return this.$store.state.login.registerData
    }
  },
  methods: {
    ...mapActions({
      registerConfirm: 'login/registerConfirm'
    }),
    setSelected (id) {
      this.$store.commit('identityEn/setSelected', id)
    },
    setValue (data) {
      this.$store.commit('registerMemberEn/setData', data)
    },
    async nextStep () {
      /** General Member直接注册 */
      if (this.selected === 1) {
        await this.registerConfirm('PC官网')
        // 提示框
        await this.$store.commit('login/setTipsContent', {
          title: 'Success',
          details: 'Back to home page 5s'
        })
        await this.$store.commit('login/setTipsSection', 'done')
      } else {
        // 清空表格数据
        await this.$store.commit('registerMemberEn/initializePartner')
        // 根据有没有手机区号，默认给他填上手机或者邮箱
        if (this.emailOrPhone.area_code === '') {
          this.setValue({ key: 'email', value: this.emailOrPhone['fm-login-id'] })
        } else {
          this.setValue({ key: 'area_code', value: this.emailOrPhone.area_code })
          this.setValue({ key: 'phone', value: this.emailOrPhone['fm-login-id'] })
        }
        this.$store.commit('login/setLoginSection', 'other-member')
      }

      // await this.$store.dispatch('registerEntry/memberRegister')
      /** 清空注册步骤 */
      // await this.$store.commit('login/setLoginSection', 'login')
      // this.$router.push('/en')
      /** 拉取注册需要用到的配置文件 */
      // await this.$store.dispatch('registerEntry/getLabelConfiglList')
      /** 其他身份进入Next step */
      // 目前只有一个特殊身份 经销商 所以可以直接跳转
    }
  }
}
</script>

<style lang="scss" scoped>
.userRegist_container {
  padding-top: 10vh;
  width: 530px;
  .black{
    color: black;
    font-weight: 500;
    text-decoration: underline;
  }
  .userRegist_title {
    > div:nth-child(1) {
      font-size: 36px;

      span {
        font-weight: bold;
      }
    }

    > div:nth-child(2) {
      font-size: 16px;
      margin-top: 20px;
    }
  }

  .userRegist_content {
    width: 530px;
    margin-top: 40px;
    > div:nth-child(2) {
      width: 100%;
      height: 60px;
      margin: 50px auto 0;
      label {
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        transform: translate3d(0, 0, 0);
        margin-bottom: 12px;
        > span:first-child {
          position: relative;
          width: 13px;
          height: 13px;
          transform: scale(1);
          border: 2px solid #c8ccd4;
          transition: all 0.2s ease;
          svg {
            position: absolute;
            top: 0;
            left: 0;
            fill: none;
            stroke: #fff;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 16px;
            stroke-dashoffset: 16px;
            transition: all 0.3s ease;
            transition-delay: 0.1s;
            transform: translate3d(0, 0, 0);
          }
        }
        > span:last-child {
          color: rgba(0, 0, 0, 0.4);
          font-size: 14px;
          line-height: 21px;
          margin-left: 8px;
        }
      }
      .tips {
        display: inline-block;
        color: red;
        margin-bottom: 10px;
      }
      input:checked + label > span:first-child {
        background: #000;
        border-color: #000;
        animation: wave 0.4s ease;
      }
      input:checked + label > span:first-child svg {
        stroke-dashoffset: 0;
      }
      button {
        width: 100%;
        height: 60px;
        border: none;
        background: #000;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .inline-svg {
    display: none;
  }
}
.multiple_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  > div {
    width: 260px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
    cursor: pointer;
  }
  .active {
    border: 2px solid #000;
    color: #000;
    font-weight: bold;
  }
}
</style>
