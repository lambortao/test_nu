<template>
  <div class="user-edit">
    <section v-if="step === 'email'">
      <p class="small">
        当前绑定的邮箱
      </p>
      <p class="phone">
        {{ staffData.email || '暂无' }}
      </p>
      <button class="confirm" @click="useSetStep('email-new')">
        修改邮箱
      </button>
      <button class="hui-border" @click="useSetStep('')">
        返回
      </button>
    </section>
    <section v-if="step === 'email-new'">
      <p class="small">
        请输入您需要修改的邮箱
      </p>
      <input v-model="newEmail" placeholder="请输入" class="full-input" type="email" autocomplete="off">
      <button :class="['confirm', { disabled: disabledGetCode }]" @click="sendCode">
        {{ $store.state.users.verification.text }}
      </button>
    </section>
    <section v-if="step === 'email-confirm'">
      <p class="small">
        请输入验证码<br>请输入 {{ newEmail }} 收到的验证码
      </p>
      <input v-model="code" placeholder="请输入" class="full-input" type="email" autocomplete="off">
      <div class="button-box">
        <button :class="['hui-border', { disabled: disabledGetCode }]" @click="sendCode">
          {{ disabledGetCode ? $store.state.users.countDownNumber : $store.state.users.verification.text }}
        </button>
        <button :class="['confirm', { disabled: !disabledChangeBtn }]" @click="confirmChange">
          修改
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditUserEmail',
  computed: {
    ...mapGetters({
      memberData: 'login/getMember',
      staffData: 'login/getStaffData',
      step: 'users/getStep',
      disabledGetCode: 'users/disabledGetCode',
      getCountDownNumber: 'users/getCountDownNumber',
      disabledChangeBtn: 'users/disabledChangeBtn'
    }),
    newEmail: {
      set (value) { this.$store.commit('users/setNewData', { key: 'email', value }) },
      get () { return this.$store.getters['users/getNewData'].email }
    },
    code: {
      set (value) { this.$store.commit('users/setVerification', { key: 'code', value }) },
      get () { return this.$store.state.users.verification.code }
    }
  },
  created () {
    this.$store.commit('users/setNewData', { key: 'status', value: 'email' })
  },
  methods: {
    useSetStep (step) {
      this.$store.commit('users/setStep', step)
    },
    sendCode () {
      this.$store.dispatch('users/getEmailCode')
    },
    async confirmChange () {
      try {
        await this.$store.dispatch('users/changeEmail')
        this.useSetStep('')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/users.scss';
.full-input {
  text-align: center;
  margin: mvw(10) 0 mvw(40);
}
section {
  margin-top: mvw(150);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
p.phone {
  font-size: mrem(48);
  margin: mvw(15) 0 mvw(50);
  font-weight: bold;
}
button.hui-border {
  width: mvw(120);
  height: mvw(40);
  margin-top: mvw(10);
}
</style>
