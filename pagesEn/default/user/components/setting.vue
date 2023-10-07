<template>
  <div class="user-box-main-content-single">
    <h3>Personal Information</h3>
    <div class="setting-list">
      <ul>
        <li>
          <div class="setting-content">
            <span>Full Name</span>
            <p v-if="!edit.fullname">
              {{ memberData.fullname || memberData.nickname }}
            </p>
            <div v-if="edit.fullname" class="setting-content nickname-edit">
              <div class="new-nickname-box">
                <input v-model="newData.fullname" class="line-input" type="text" placeholder="Please enter a new fullname">
                <button :class="['confirm', { disabled: !newData.fullname || btnLoading }]" @click="setUserInfo">
                  {{ btnText }}
                </button>
              </div>
              <div class="new-nickname-advice">
                <h5>Normative suggestions</h5>
                <p>· Please use a maximum of 15 characters</p>
                <p>· It can be composed of Chinese and English, numbers, spaces, emoticons to -_. Composition</p>
              </div>
            </div>
          </div>
          <span @click="handleEdit('fullname')">{{ edit.fullname ? 'Cancel' : 'Edit' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>Phone Number</span>
            <p v-if="!edit.phone">
              {{ memberData.mobile }}
            </p>
            <double-input
              v-if="edit.phone"
              placeholder="Please enter a new cell phone number"
              :is-phone="true"
              send-code-url="/member/SendCode"
              save-url="/member/websiteChangePhone"
              @done="changeDone"
            />
          </div>
          <span @click="handleEdit('phone')">{{ edit.phone ? 'Cancel' : 'Edit' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>Birthday</span>
            <p v-if="!edit.birthday">
              {{ memberData.birthday || '-' }}
            </p>
            <div v-if="edit.birthday" class="setting-content nickname-edit">
              <div class="new-nickname-box">
                <input v-model="newData.birthday" type="date" class="line-input" placeholder="Please enter the selected birthday">
                <button :class="['confirm', { disabled: !newData.birthday || btnLoading }]" @click="setUserInfo">
                  {{ btnText }}
                </button>
              </div>
            </div>
          </div>
          <span @click="handleEdit('birthday')">{{ edit.birthday ? 'Cancel' : 'Edit' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>Email</span>
            <p v-if="!edit.email">
              {{ memberData.email || '-' }}
            </p>
            <double-input
              v-if="edit.email"
              placeholder="Please enter the input email"
              :is-phone="false"
              send-code-url="/member/SendCode"
              save-url="/member/websiteChangeEmail"
              @done="changeDone"
            />
          </div>
          <span @click="handleEdit('email')">{{ edit.email ? 'Cancel' : 'Edit' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>Privacy Policy</span>
          </div>
          <span @click="$emit('set-key', 'privacy')">View</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import DoubleInput from './doubleInput.vue'

export default {
  name: 'UserSetting',
  components: {
    DoubleInput
  },
  data () {
    return {
      edit: {
        fullname: false,
        birthday: false,
        phone: false,
        email: false
      },
      newData: {
        fullname: '',
        headimgurl: '',
        birthday: ''
      },
      btnLoading: false,
      btnText: 'Save'
    }
  },
  computed: {
    ...mapGetters({
      memberData: 'login/getMember'
    })
  },
  methods: {
    handleEdit (key) {
      this.edit[key] = !this.edit[key]
      console.log(this.edit)
    },
    resetData () {
      this.edit = {
        fullname: false,
        headimgurl: false,
        birthday: false,
        phone: false,
        email: false
      }
      this.btnLoading = false
      this.btnText = 'Save'
      this.newData = {
        fullname: '',
        headimgurl: '',
        birthday: ''
      }
    },
    // 修改成功
    changeDone () {
      this.$store.dispatch('login/useGetMemberDataEn')
      this.resetData()
    },
    /** 保存修改后的数据 */
    async setUserInfo () {
      try {
        this.btnLoading = true
        this.btnText = 'Loading...'
        const newData = () => {
          Object.keys(this.newData).forEach((key) => {
            if (!this.newData[key]) {
              delete this.newData[key]
            }
          })
          return this.newData
        }
        await axios({
          method: 'post',
          url: '/api/member/websiteSetUserInfo',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$store.state.login.loginRes.token
          },
          data: newData()
        })
        /** 修改成功后重新拉取用户信息 */
        this.$store.dispatch('login/useGetMemberDataEn')
        this.$store.commit('site/setErrorData', 'done')
      } catch (error) {
        console.log(error)
      } finally {
        this.resetData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/users.scss';
</style>
