<template>
  <div class="user-box-main-content-single">
    <h3>个人信息</h3>
    <div class="setting-list">
      <ul>
        <li>
          <div class="setting-content">
            <span>昵称</span>
            <p v-if="!edit.nickname">
              {{ memberData.nickname }}
            </p>
            <div v-if="edit.nickname" class="setting-content nickname-edit">
              <div class="new-nickname-box">
                <input v-model="newData.nickname" class="line-input" type="text" placeholder="请输入新的昵称">
                <button :class="['confirm', { disabled: !newData.nickname || btnLoading }]" @click="setUserInfo">
                  {{ btnText }}
                </button>
              </div>
              <div class="new-nickname-advice">
                <h5>规范建议</h5>
                <p>· 请使用最多15个字符</p>
                <p>· 可以由中英文、数字、空格、表情符号以-_.组成</p>
              </div>
            </div>
          </div>
          <span @click="handleEdit('nickname')">{{ edit.nickname ? '取消' : '编辑' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>手机号</span>
            <p v-if="!edit.phone">
              {{ memberData.mobile }}
            </p>
            <double-input
              v-if="edit.phone"
              placeholder="请输入新的手机号"
              :is-phone="true"
              send-code-url="/member/login/vcode"
              save-url="/mobile/set"
              @done="changeDone"
            />
          </div>
          <span @click="handleEdit('phone')">{{ edit.phone ? '取消' : '编辑' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>生日</span>
            <p v-if="!edit.birthday">
              {{ memberData.birthday || '-' }}
            </p>
            <div v-if="edit.birthday" class="setting-content nickname-edit">
              <div class="new-nickname-box">
                <input v-model="newData.birthday" type="date" class="line-input" placeholder="请输入选择生日">
                <button :class="['confirm', { disabled: !newData.birthday || btnLoading }]" @click="setUserInfo">
                  {{ btnText }}
                </button>
              </div>
            </div>
          </div>
          <span @click="handleEdit('birthday')">{{ edit.birthday ? '取消' : '编辑' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>邮箱</span>
            <p v-if="!edit.email">
              {{ memberData.email || '-' }}
            </p>
            <double-input
              v-if="edit.email"
              placeholder="请输入新的邮箱"
              :is-phone="false"
              send-code-url="/email/sendCode"
              save-url="/email/bind"
              @done="changeDone"
            />
          </div>
          <span @click="handleEdit('email')">{{ edit.email ? '取消' : '编辑' }}</span>
        </li>
        <li>
          <div class="setting-content">
            <span>隐私政策</span>
          </div>
          <span @click="$emit('set-key', 'privacy')">查看</span>
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
        nickname: false,
        headimgurl: false,
        birthday: false,
        phone: false,
        email: false
      },
      newData: {
        nickname: '',
        headimgurl: '',
        birthday: ''
      },
      btnLoading: false,
      btnText: '保存'
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
    },
    resetData () {
      this.edit = {
        nickname: false,
        headimgurl: false,
        birthday: false,
        phone: false,
        email: false
      }
      this.btnLoading = false
      this.btnText = '保存'
      this.newData = {
        nickname: '',
        headimgurl: '',
        birthday: ''
      }
    },
    // 修改成功
    changeDone () {
      this.$store.dispatch('login/useGetMemberData')
      this.resetData()
    },
    /** 保存修改后的数据 */
    async setUserInfo () {
      try {
        this.btnLoading = true
        this.btnText = '保存中...'
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
          url: '/api/member/setUserInfo',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: this.$store.state.login.loginRes.token
          },
          data: newData()
        })
        /** 修改成功后重新拉取用户信息 */
        this.$store.dispatch('login/useGetMemberData')
        this.$store.commit('site/setErrorData', '修改成功')
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
