<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="user-main">
    <div v-if="!step" class="entry">
      <!-- <h3>设置</h3> -->
      <header>
        <figure><img :src="memberData.headimgurl" alt="头像"></figure>
        <p class="name">
          {{ memberData.nickname }}
        </p>
        <identity-tags />
        <button class="hui-border" @click="useSetStep('entry')">编辑</button>
      </header>
      <section>
        <ul>
          <li @click="useSetStep('phone')">
            <span>手机号</span><span>{{ staffData.phone }}</span>
          </li>
          <li @click="useSetStep('birthday')">
            <span>生日</span><span>{{ staffData.birthday || '设置' }}</span>
          </li>
          <li @click="useSetStep('email')">
            <span>邮箱</span><span>{{ staffData.email || '设置' }}</span>
          </li>
        </ul>
      </section>
      <button class="logout hui-border" @click="$store.commit('login/logout')">退出登录</button>
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
import IdentityTags from '~/components/AAMobile/Menu/identityTags.vue'
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
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/users.scss';
</style>
