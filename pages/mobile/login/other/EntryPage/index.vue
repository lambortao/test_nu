<template>
  <div class="EntryPage">
    <!-- <header-back /> -->
    <section>
      <header>
        <h3>
          欢迎，{{ getEncryptPhone }}
        </h3>
        <small>请根据您的访问目的<br>选择需要注册的账号类型</small>
      </header>
      <div class="class-type">
        <p
          v-for="item in $store.state.registerEntry.classType.filter(item => item.show)"
          :key="item.text"
          :class="{ active: selected === item.id }"
          @click="setSelected(item.id)"
        >
          {{ item.text }}
        </p>
      </div>
      <div class="bottom-btn">
        <label class="confirm-btn">
          <input v-model="agree" type="checkbox">
          <span>我已阅读并同意服务条款、隐私政策 </span>
        </label>
        <big-button
          :disabled="disabled"
          @click="nextStep"
        >
          {{ $store.state.registerEntry.btnText }}
        </big-button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'EntryPage',
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
        /** 注册成功 */
        await this.$store.dispatch('registerEntry/memberRegister', '移动官网')
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
section {
  padding: mvw(24);
}
header {
  margin-bottom: mvw(40);

  h3 {
    margin-bottom: mvw(5);
    font-size: mrem(38);
  }
  small {
    color: rgba($color: #000000, $alpha: 0.6);
  }
}
.class-type {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    width: mvw(160);
    border: mvw(1) solid #999;
    height: mvw(40);
    line-height: mvw(38);
    color: #999;
    text-align: center;
    transition: all 300ms ease;
    margin-bottom: mvw(10);
    font-size: mrem(28);

    &.active {
      border-color: #000;
      color: #000;
      font-weight: bold;
    }
  }
}
.confirm-btn {
  display: block;
  margin-bottom: mvw(10);
  font-size: mrem(18);
  span {
    vertical-align: text-bottom;
  }
}
</style>
