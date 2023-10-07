<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="user-main">
    <div v-if="!step" class="entry">
      <h3 v-if="false">Setting</h3>
      <header>
        <figure><img :src="memberData.headimgurl" alt="头像"></figure>
        <p class="name">
          {{ memberData.fullname || memberData.nickname }}
        </p>
        <identity-tags />
        <button class="hui-border" @click="useSetStep('entry')">Edit</button>
      </header>
      <section>
        <ul>
          <li @click="useSetStep('phone')">
            <span>Phone Number</span><span>{{ staffData.phone || 'Edit' }}</span>
          </li>
          <li @click="useSetStep('birthday')">
            <span>Birthday</span><span>{{ staffData.birthday || 'Edit' }}</span>
          </li>
          <li @click="useSetStep('email')">
            <span>Email</span><span>{{ staffData.email || 'Edit' }}</span>
          </li>
        </ul>
      </section>
      <button class="logout hui-border" @click="$store.commit('login/logout')">Logout</button>
    </div>
    <edit-entry v-if="step === 'entry'" />
    <edit-phone v-if="['phone', 'phone-new', 'phone-confirm'].includes(step)" />
    <edit-email v-if="['email', 'email-new', 'email-confirm'].includes(step)" />
    <edit-birthday v-if="['birthday'].includes(step)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditEntry from './components/edit.vue'
import EditEmail from './components/editEmail.vue'
import EditPhone from './components/editPhone.vue'
import EditBirthday from './components/editBirthday.vue'
import IdentityTags from '~/componentsEn/AAMobile/Menu/identityTags.vue'
export default {
  name: 'MobileUser',
  components: {
    IdentityTags,
    EditEntry,
    EditEmail,
    EditPhone,
    EditBirthday
  },
  computed: {
    ...mapGetters({
      memberData: 'login/getMember',
      staffData: 'login/getStaffData',
      step: 'users/getStep'
    })
  },
  methods: {
    useSetStep (step) {
      this.$store.commit('users/setStep', step)
    },
    loginMethods () {
      if (this.memberData.uid) {
        /** 退出登录 */
        this.$store.commit('login/logout')
      } else {
        this.$router.push('/en/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/users.scss';
</style>
