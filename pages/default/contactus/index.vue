<template>
  <div>
    <div class="site-is-default contact-main">
      <header>
        <h1>联系我们</h1>
        <!-- <p>反馈你对产品的相关建议</p> -->
      </header>
      <section class="from-box">
        <div class="from-top form_section bottom-border">
          <form-label
            title="我想以这个身份留言"
            :required="true"
          >
            <DropDown
              v-model="role"
              :drop-list="roleOptions"
              placeholder="请选择您的身份"
              @update:value="value => setValue({ key: 'role', value })"
            />
          </form-label>
          <form-label
            v-if="role === '其他'"
            title=""
          >
            <Input
              v-model="roleName"
              size="short"
              placeholder="请输入你想要留言的身份(限20字)"
              :maxlength="20"
              @update:value="value => setValue({ key: 'roleName', value })"
            />
          </form-label>
        </div>
        <div class="from-top form_section bottom-border">
          <div class="form_left">
            <form-label
              title="我的姓名"
              :required="true"
            >
              <div style="display:flex">
                <div style="width:70%">
                  <Input
                    v-model="name"
                    size="short"
                    placeholder="请输入您的称谓"
                    @update:value="value => setValue({ key: 'name', value })"
                  />
                </div>
                <div style="width:30%">
                  <DropDown
                    v-model="sex"
                    placeholder="性别"
                    :drop-list="sexOptions"
                    @update:value="value => setValue({ key: 'sex', value })"
                  />
                </div>
              </div>
            </form-label>
            <form-label
              title="邮箱"
              :required="true"
            >
              <Input
                v-model="email"
                size="short"
                placeholder="请输入您的电子邮箱"
                @update:value="value => setValue({ key: 'email', value })"
              />
            </form-label>
          </div>
          <div class="form_right">
            <PhoneIdentify
              v-model="mobile"
              @update:value="value => setValue({ key: 'mobile', value })"
            />
          </div>
        </div>
        <div class="from-top form_section bottom-border">
          <form-label
            title="留言类型"
            :required="true"
          >
            <DropDown
              v-model="leavemsg_type"
              :drop-list="typeOptions"
              placeholder="请选择留言类型"
              @update:value="value => setValue({ key: 'leavemsg_type', value })"
            />
          </form-label>
          <form-label
            v-if="leavemsg_type === '其他'"
          >
            <Input
              v-model="typeName"
              size="short"
              placeholder="请简要描述你的留言类型(限20字)"
              :maxlength="20"
              @update:value="value => setValue({ key: 'typeName', value })"
            />
          </form-label>
        </div>
        <div class="from-top form_section bottom-border">
          <form-label title="具体描述" :required="true">
            <Input
              v-model="leavemsg_description"
              size="short"
              type="textarea"
              :is-desc="true"
              :maxlength="500"
              placeholder="请输入您的描述(限500字)"
              @update:value="value => setValue({ key: 'leavemsg_description', value })"
            />
          </form-label>
        </div>
        <div class="from-top form_section">
          <form-label
            title="附加信息"
            sub-title="png、jpg、pdf格式"
          >
            <upload-img
              :value="images"
              @update:value="value => setValue({ key: 'images', value })"
            />
          </form-label>
        </div>
        <PcSubButton
          :loading="btnStatus.loading"
          :disabled="!btnDisabled"
          @click="submitData"
        >
          {{ btnStatus.text }}
        </PcSubButton>
      </section>
    </div>
    <mobile-contact-us class="site-is-mobile" />
  </div>
</template>

<script>
// mapActions
import { mapActions, mapState } from 'vuex'
import FormLabel from './FormLabel/index.vue'
import DropDown from '~/components/common/DropDown.vue'
import Input from '~/components/common/Input.vue'
import MobileContactUs from '~/pages/mobile/contactus/index.vue'
export default {
  name: 'ContactUs',
  components: {
    MobileContactUs,
    FormLabel,
    DropDown,
    Input
  },
  data () {
    return {
      code: '',
      phone: ''
    }
  },
  computed: {
    btnDisabled () { return this.$store.getters['contactus/btnDisabled'] },
    ...mapState('contactus', {
      roleOptions: state => state.roleOptions,
      typeOptions: state => state.typeOptions,
      sexOptions: state => state.sexOptions,
      btnStatus: state => state.btnStatus,
      formData: state => state.formData
    }),
    role: {
      get () { return this.$store.state.contactus.formData.role },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'role', value }) }
    },
    roleName: {
      get () { return this.$store.state.contactus.formData.roleName },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'roleName', value }) }
    },
    name: {
      get () { return this.$store.state.contactus.formData.name },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'name', value }) }
    },
    sex: {
      get () { return this.$store.state.contactus.formData.sex },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'sex', value }) }
    },
    mobile: {
      get () { return this.$store.state.contactus.formData.mobile },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'mobile', value }) }
    },
    email: {
      get () { return this.$store.state.contactus.formData.email },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'email', value }) }
    },
    images: {
      get () { return this.$store.state.contactus.formData.images },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'images', value }) }
    },
    leavemsg_type: {
      get () { return this.$store.state.contactus.formData.leavemsg_type },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'leavemsg_type', value }) }
    },
    typeName: {
      get () { return this.$store.state.contactus.formData.typeName },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'typeName', value }) }
    },
    leavemsg_description: {
      get () { return this.$store.state.contactus.formData.leavemsg_description },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'leavemsg_description', value }) }
    },
    type: {
      get () { return this.$store.state.contactus.formData.type },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'type', value }) }
    },
    isEnWebsite: {
      get () { return this.$store.state.contactus.formData.from },
      set (value) { this.$store.commit('contactus/setFormData', { key: 'from', value }) }
    }
  },
  mounted () {
    const loginStatus = this.checkLoginStatus()
    this.type = loginStatus
    this.isEnWebsite = 'cn'
  },
  methods: {
    ...mapActions({
      submitData: 'contactus/submitData'
    }),
    checkLoginStatus () {
      return this.$store.getters['login/checkLoginStatus']
    },
    setValue (data) {
      this.$store.commit('contactus/setFormData', data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/contactus.scss'
</style>
