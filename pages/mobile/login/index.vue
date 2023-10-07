<template>
  <client-only>
    <div>
      <login-index v-if="!registerStep" />
      <personnel-welcome v-if="registerStep === 'personnel-step1'" />
      <personnel-verify-identity v-if="registerStep === 'personnel-step2'" />
      <personnel-comfirm-data v-if="registerStep === 'personnel-step3'" />
      <login-done
        v-if="registerStep === 'done'"
        done-text="注册成功"
        remark="即将回首页"
        @timeout="goHome"
      />
      <other-entry v-if="registerStep === 'other-entry'" />
      <other-member v-if="registerStep === 'other-member'" />
      <other-stylist v-if="registerStep === 'other-stylist'" />
      <other-kol v-if="registerStep === 'other-kol'" />
      <other-pressman v-if="registerStep === 'other-pressman'" />
    </div>
  </client-only>
</template>

<script>
import LoginIndex from './loginIndex.vue'
import PersonnelWelcome from './personnel/Welcome/index.vue'
import PersonnelVerifyIdentity from './personnel/VerifyIdentity/index.vue'
import PersonnelComfirmData from './personnel/comfirmData/index.vue'

import OtherEntry from './other/EntryPage/index.vue'
import OtherMember from './other/MemberPage/index.vue'
import OtherStylist from './other/StylistPage/index.vue'
import OtherKol from './other/KolPage/index.vue'
import OtherPressman from './other/PressmanPage/index.vue'
export default {
  name: 'LoginFlow',
  components: {
    LoginIndex,
    PersonnelWelcome,
    PersonnelVerifyIdentity,
    PersonnelComfirmData,
    OtherEntry,
    OtherMember,
    OtherStylist,
    OtherKol,
    OtherPressman
  },
  computed: {
    /** 当前注册的步骤 */
    registerStep () {
      return this.$store.getters['login/getRegisterStep']
    }
  },
  methods: {
    goHome () {
      /** 清空注册步骤 */
      this.$store.commit('login/setRegisterStep', null)
      /** 回到首页 */
      this.$router.push('/')
    }
  }
}
</script>
