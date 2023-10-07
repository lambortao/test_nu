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
          <span>I have read the Priv </span>
        </label>
        <big-button
          :disabled="disabled"
          @click="nextStep"
        >
          Next
        </big-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'EntryPage',
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
      if (this.selected === 1) {
        await this.registerConfirm('移动官网')
        // 提示框内容
        await this.$store.commit('login/setTipsContent', {
          title: 'Success',
          details: 'Back to home page'
        })
        await this.$store.commit('login/setLoginSection', 'done')
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
      // /** 普通会员直接注册 */
      // if (this.selected === 1) {
      //   /** 注册成功 */
      //   /** 清空注册步骤 */
      //   await this.$store.commit('login/setLoginSection', 'login')
      //   this.$router.push('/en')
      //   return
      // }
      // /** 拉取注册需要用到的配置文件 */
      // // await this.$store.dispatch('registerEntry/getLabelConfiglList')
      // /** 其他身份进入下一步 */
      // // 目前只有一个特殊身份 经销商 所以可以直接跳转
      // this.$store.commit('login/setLoginSection', 'other-member')
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
