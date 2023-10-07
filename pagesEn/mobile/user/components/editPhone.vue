<template>
  <div class="user-edit">
    <section v-if="step === 'phone'">
      <p class="small">
        Current bound cell phone number
      </p>
      <p class="phone">
        {{ staffData.phone || 'Not set' }}
      </p>
      <button class="confirm" @click="useSetStep('phone-new')">
        Edit
      </button>
      <button class="hui-border" @click="useSetStep('')">
        Back
      </button>
    </section>
    <section v-if="step === 'phone-new'">
      <p class="small">
        Please enter the new cell phone number you need to change
      </p>
      <country-phone
        v-model="newPhone"
        :country-tag="$store.state.users.enNewData.area_code"
        @changeCountryTag="value => $store.commit('users/setEnNewData', { key: 'area_code', value })"
      />
      <button :class="['confirm', { disabled: disabledGetCode }]" @click="sendCode">
        {{ $store.state.users.verification.enText }}
      </button>
    </section>
    <section v-if="step === 'phone-confirm'">
      <p class="small">
        Please enter the verification code<br>Please Input {{ newPhone }} Verification code received
      </p>
      <input v-model="code" placeholder="Input" class="full-input" type="number" autocomplete="off">
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
import CountryPhone from './CountryPhone.vue'
export default {
  name: 'EditUser',
  components: {
    CountryPhone
  },
  computed: {
    ...mapGetters({
      memberData: 'login/getMember',
      staffData: 'login/getStaffData',
      step: 'users/getStep',
      disabledGetCode: 'users/disabledEnGetCode',
      getCountDownNumber: 'users/getCountDownNumber',
      disabledChangeBtn: 'users/disabledChangeBtn'
    }),
    newPhone: {
      set (value) { this.$store.commit('users/setEnNewData', { key: 'phone', value }) },
      get () { return this.$store.getters['users/getNewData'].phone }
    },
    code: {
      set (value) { this.$store.commit('users/setVerification', { key: 'code', value }) },
      get () { return this.$store.state.users.verification.code }
    }
  },
  created () {
    this.$store.commit('users/setEnNewData', { key: 'status', value: 'mobile' })
  },
  methods: {
    useSetStep (step) {
      this.$store.commit('users/setStep', step)
    },
    sendCode () {
      this.$store.dispatch('users/getEnCode')
    },
    confirmChange () {
      this.$store.dispatch('users/changeEnPhoneNumber')
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
