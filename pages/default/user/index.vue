<template>
  <div>
    <div class="site-is-default">
      <div class="user_box">
        <div class="user_brief_box">
          <div class="user_brief_left">
            <div class="user_avatar">
              <figure><img :src="memberData.headimgurl" alt="头像"></figure>
              <div class="edit_icon">
                <figure><img src="~/assets/images/icon/user/1.png"></figure>
              </div>
              <input id="" type="file" name="" accept="image/*" @change="uploadImg">
            </div>
            <div class="user_tag">
              <p>您好 {{ memberData.nickname }}</p>
              <identity-tags />
            </div>
          </div>
          <div class="user_brief_right">
            <p>想更改账户? <span @click="logout">退出</span></p>
          </div>
        </div>
        <div class="user-box-main">
          <div class="user-box-main-tab">
            <div :class="['favorite', { active: showKey === 'favorite' }]" @click="setKey('favorite')">
              <span />
              <p>收藏夹</p>
            </div>
            <nuxt-link
              v-if="getIdentity.includes('2') || getIdentity.includes('3')|| getIdentity.includes('4') || getIdentity.includes('5') || getIdentity.includes('6')"
              :to="`/Marketing?categories=${directorySubId}&tag=${directoryThirdId}&brand=${directoryBrandName}`"
            >
              <div class="marketing">
                <span />
                <p>营销工具包</p>
              </div>
            </nuxt-link>

            <div v-if="false" :class="['help', { active: showKey === 'help' }]" @click="setKey('help')">
              <span />
              <p>帮助与反馈</p>
            </div>
            <div :class="['setting', { active: ['setting', 'privacy'].includes(showKey) }]" @click="setKey('setting')">
              <span />
              <p>设置</p>
            </div>
          </div>
          <div class="user-box-main-content">
            <users-favorite v-if="showKey === 'favorite'" />
            <user-setting v-if="showKey === 'setting'" @set-key="setKey" />
            <user-privacy v-if="showKey === 'privacy'" />
          </div>
        </div>
      </div>
      <success-dialog v-if="editStatus" done_text="修改成功" />
    </div>
    <mobile-user class="site-is-mobile" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UsersFavorite from './components/favorite.vue'
import UserSetting from './components/setting.vue'
import UserPrivacy from './components/PrivacyPolicy.vue'
import MobileUser from '~/pages/mobile/user'
import SuccessDialog from '~/components/common/Dialog/success.vue'

export default {
  name: 'UserPage',
  components: {
    SuccessDialog,
    MobileUser,
    UsersFavorite,
    UserSetting,
    UserPrivacy
  },
  data: () => ({
    showKey: '',
    yearList: [],
    editStatus: false
  }),
  computed: {
    ...mapGetters({
      memberData: 'login/getMember',
      staffData: 'login/getStaffData',
      step: 'users/getStep'
    }),
    theme () {
      return this.$store.state.site.theme
    },
    themeFixed () {
      return this.$store.state.site.themeFixed
    },
    directorySubId () {
      return this.$store.state.marketing.selectedSubId
    },
    directoryThirdId () {
      return this.$store.state.marketing.selectedThirdId
    },
    directoryBrandName () {
      return this.$store.state.marketing.selectedBrandName
    },
    getIdentity () {
      return this.$store.getters['login/getIdentity']
    }
  },
  watch: {
    '$route.query.pos' (val) {
      this.showKey = val
    }

  },
  async created () {
    // 如果没有登录状态就踢回登录页
    if (!this.$store.getters['login/checkLoginStatus']) {
      this.$router.push('/login')
    } else if (this.getIdentity.includes('2') || this.getIdentity.includes('3') || this.getIdentity.includes('4') || this.getIdentity.includes('5') || this.getIdentity.includes('6')) {
      await this.$store.dispatch('marketing/getDirectoryList')
    }
  },
  mounted () {
    this.showKey = this.$route.query.pos
    this.$store.commit('site/setTheme', 'dark')
    this.$store.commit('site/setThemeStatus', false)
  },
  methods: {
    logout () {
      this.$store.commit('login/logout')
      this.$router.push('/')
    },
    setKey (key) {
      this.$router.push({
        query: {
          pos: key
        }
      })
    },
    save () {
      this.editStatus = true
    },
    uploadImg (value) {
      this.$store.dispatch('users/uploadHeaderUrl', value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/users.scss';
</style>
