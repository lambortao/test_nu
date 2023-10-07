<template>
  <div class="EntryPage">
    <header-back />
    <section>
      <header>
        <h3>
          Welcome，{{ getEncryptPhone }}
        </h3>
        <small>Depending on the purpose of your visit<br>Select the type of account to be registered</small>
      </header>
      <div class="class-type">
        <p
          v-for="item in $store.state.identityEn.classType.filter(item => item.show)"
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
    getEncryptPhone () { return this.$store.state.identityEn.phone },
    disabled () { return this.$store.getters['identityEn/disabled'] },
    agree: {
      get () { return this.$store.state.identityEn.agree },
      set (value) { this.$store.commit('identityEn/setAgree', value) }
    },
    selected () { return this.$store.state.identityEn.selected }
  },
  methods: {
    setSelected (id) {
      this.$store.commit('identityEn/setSelected', id)
    },
    async nextStep () {
      /** 普通会员直接注册 */
      if (this.selected === 1) {
        /** 注册成功 */
        /** 清空注册步骤 */
        await this.$store.commit('login/setLoginSection', 'login')
        this.$router.push('/en')
        return
      }
      /** 拉取注册需要用到的配置文件 */
      // await this.$store.dispatch('registerEntry/getLabelConfiglList')
      /** 其他身份进入下一步 */
      // 目前只有一个特殊身份 经销商 所以可以直接跳转
      this.$store.commit('login/setLoginSection', 'other-member')
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
