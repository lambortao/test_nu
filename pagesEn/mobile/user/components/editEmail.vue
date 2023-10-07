<template>
  <div class="user-edit">
    <section v-if="step === 'email'">
      <p class="small">
        Current bound mailbox
      </p>
      <p class="phone">
        {{ staffData.email || 'No Data' }}
      </p>
      <button class="confirm" @click="useSetStep('email-new')">
        Edit
      </button>
      <button class="hui-border" @click="useSetStep('')">
        Back
      </button>
    </section>
    <section v-if="step === 'email-new'">
      <p class="small">
        Please enter the email address you need to modify
      </p>
      <input v-model="newEmail" placeholder="Please Input" class="full-input" type="email" autocomplete="off">
      <button :class="['confirm', { disabled: disabledGetCode }]" @click="sendCode">
        {{ $store.state.users.verification.enText }}
      </button>
    </section>
    <section v-if="step === 'email-confirm'">
      <p class="small">
        Please enter verification code<br>Please enter {{ newEmail }} Verification code received
      </p>
      <input v-model="code" placeholder="Please Input" class="full-input" type="email" autocomplete="off">
      <div class="button-box">
        <button :class="['hui-border', { disabled: disabledGetCode }]" @click="sendCode">
          {{ disabledGetCode ? $store.state.users.countDownNumber : $store.state.users.verification.enText }}
        </button>
        <button :class="['confirm', { disabled: !disabledChangeBtn }]" @click="confirmChange">
          Change
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
      getCountDownNumber: 'users/getCountDownNumber',
      disabledChangeBtn: 'users/disabledChangeBtn'
    }),
    newEmail: {
      set (value) { this.$store.commit('users/setEnNewData', { key: 'email', value }) },
      get () { return this.$store.getters['users/getNewEnData'].email }
    },
    code: {
      set (value) { this.$store.commit('users/setVerification', { key: 'code', value }) },
      get () { return this.$store.state.users.verification.code }
    }
  },
  created () {
    this.$store.commit('users/setEnNewData', { key: 'status', value: 'email' })
  },
  methods: {
    useSetStep (step) {
      this.$store.commit('users/setStep', step)
    },
    sendCode () {
      this.$store.dispatch('users/getEnCode')
    },
    async confirmChange () {
      try {
        await this.$store.dispatch('users/changeEnEmail')
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
