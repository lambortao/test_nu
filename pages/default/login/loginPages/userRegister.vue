<template lang="html">
  <div class="userRegist_container">
    <section class="userRegist_title">
      <div>欢迎，<span>{{ getEncryptPhone }}</span></div>
      <div>
        <p>请根据您的访问目的<br>选择需要注册的账号类型</p>
      </div>
    </section>
    <section class="userRegist_content">
      <div>
        <!-- <MultipleVue new-style="width:260px;" :is-single="true" :select-list="selectList" @singleSelect="singleSelect" /> -->
        <div class="multiple_box">
          <div
            v-for="item in $store.state.registerEntry.classType.filter(item => item.show)"
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
          <span>我已阅读并同意服务条款、隐私政策</span>
        </label>
        <pc-button
          :disabled="disabled"
          @click="nextStep"
        >
          {{ $store.state.registerEntry.btnText }}
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
export default {
  name: 'StaffLoginComponent',
  computed: {
    getEncryptPhone () { return this.$store.getters['login/getMemberPhoneNumber'] },
    disabled () { return this.$store.getters['registerEntry/disabled'] },
    agree: {
      set (value) { this.$store.commit('registerEntry/setAgree', value) },
      get () { return this.$store.state.registerEntry.agree }
    },
    selected () { return this.$store.state.registerEntry.selected }
  },
  methods: {
    setSelected (id) {
      this.$store.commit('registerEntry/setSelected', id)
    },
    async nextStep () {
      /** 普通会员直接注册 */
      if (this.selected === 1) {
        await this.$store.dispatch('registerEntry/memberRegister', 'PC官网')
        /** 清空注册步骤 */
        this.$store.commit('login/setRegisterStep', null)
        this.$router.push('/')
        return
      }
      /** 拉取注册需要用到的配置文件 */
      await this.$store.dispatch('registerEntry/getLabelConfiglList')
      /** 其他身份进入下一步 */
      const stepList = ['other-stylist', 'other-member', 'other-kol', 'other-pressman']
      this.$store.commit('login/setRegisterStep', stepList[this.selected - 2])
    }
  }
}
</script>

<style lang="scss" scoped>
.userRegist_container {
  padding-top: 10vh;
  width: 530px;
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
