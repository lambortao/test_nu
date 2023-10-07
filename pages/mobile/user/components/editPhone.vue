<template>
  <div class="user-edit">
    <section v-if="step === 'phone'">
      <p class="small">
        当前绑定的手机号
      </p>
      <p class="phone">
        {{ staffData.phone }}
      </p>
      <button class="confirm" @click="useSetStep('phone-new')">
        修改手机号
      </button>
      <button class="hui-border" @click="useSetStep('')">
        返回
      </button>
    </section>
    <section v-if="step === 'phone-new'">
      <p class="small">
        请输入您需要修改的新手机号
      </p>
      <input v-model="newPhone" placeholder="请输入" class="full-input" type="tel" autocomplete="off">
      <button :class="['confirm', { disabled: disabledGetCode }]" @click="sendCode">
        {{ $store.state.users.verification.text }}
      </button>
    </section>
    <section v-if="step === 'phone-confirm'">
      <p class="small">
        请输入验证码<br>请输入 {{ newPhone }} 收到的验证码
      </p>
      <input v-model="code" placeholder="请输入" class="full-input" type="tel" autocomplete="off">
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
  name: 'EditUser',
  computed: {
    ...mapGetters({
      memberData: 'login/getMember',
      staffData: 'login/getStaffData',
      step: 'users/getStep',
      disabledGetCode: 'users/disabledGetCode',
      getCountDownNumber: 'users/getCountDownNumber',
      disabledChangeBtn: 'users/disabledChangeBtn'
    }),
    newPhone: {
      set (value) { this.$store.commit('users/setNewData', { key: 'phone', value }) },
      get () { return this.$store.getters['users/getNewData'].phone }
    },
    code: {
      set (value) { this.$store.commit('users/setVerification', { key: 'code', value }) },
      get () { return this.$store.state.users.verification.code }
    }
  },
  created () {
    this.$store.commit('users/setNewData', { key: 'status', value: 'mobile' })
  },
  methods: {
    useSetStep (step) {
      this.$store.commit('users/setStep', step)
    },
    sendCode () {
      this.$store.dispatch('users/getCode')
    },
    confirmChange () {
      this.$store.dispatch('users/changePhoneNumber')
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
