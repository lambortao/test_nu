<template>
  <div>
    <div class="site-is-default contact-main">
      <header>
        <h1>Contact Us</h1>
        <!-- <p>Feedback your suggestions about the product</p> -->
      </header>
      <section class="from-box">
        <div class="from-top form_section bottom-border">
          <form-label
            title="Leave a message as..."
            :required="true"
          >
            <DropDown
              v-model="role"
              :drop-list="roleOptions"
              placeholder="Choose"
              @update:value="value => setValue({ key: 'role', value })"
            />
          </form-label>
          <form-label
            v-if="role === 'Others'"
            title=""
          >
            <Input
              v-model="roleName"
              size="short"
              placeholder="Please enter"
              @update:value="value => setValue({ key: 'roleName', value })"
            />
          </form-label>
        </div>
        <div class="from-top form_section bottom-border">
          <div class="form_left">
            <form-label
              title="Name"
              :required="true"
            >
              <div style="display:flex">
                <div style="width:25%">
                  <DropDown
                    v-model="sex"
                    placeholder="Title"
                    :drop-list="sexOptions"
                    @update:value="value => setValue({ key: 'sex', value })"
                  />
                </div>
                <div style="width:75%">
                  <Input
                    v-model="name"
                    size="short"
                    placeholder="Please enter your full name"
                    @update:value="value => setValue({ key: 'name', value })"
                  />
                </div>
              </div>
            </form-label>
          </div>
          <div class="form_right">
            <form-label
              title="Email"
              :required="true"
            >
              <Input
                v-model="email"
                size="short"
                placeholder="E-mail address"
                @update:value="value => setValue({ key: 'email', value })"
              />
            </form-label>
          </div>
        </div>
        <div class="from-top form_section bottom-border">
          <form-label
            title="Message issue..."
            :required="true"
          >
            <DropDown
              v-model="leavemsg_type"
              :drop-list="typeOptions"
              placeholder="Please choose"
              @update:value="value => setValue({ key: 'leavemsg_type', value })"
            />
          </form-label>
          <form-label
            v-if="leavemsg_type === 'Others'"
            title=""
          >
            <Input
              v-model="typeName"
              size="short"
              placeholder="Please enter"
              @update:value="value => setValue({ key: 'typeName', value })"
            />
          </form-label>
        </div>
        <div class="from-top form_section bottom-border">
          <form-label :required="true" title="Specific description">
            <Input
              v-model="leavemsg_description"
              size="short"
              type="textarea"
              placeholder=""
              @update:value="value => setValue({ key: 'leavemsg_description', value })"
            />
          </form-label>
        </div>
        <div class="from-top form_section">
          <form-label
            title="Additional Information"
            sub-title="png、jpg、pdf files"
          >
            <upload-img
              :value="images"
              @update:value="value => setValue({ key: 'images', value })"
            />
          </form-label>
        </div>
        <PcSubButton :loading="btnStatus.loading" :disabled="!btnDisabled" @click="submitData">
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
import DropDown from '~/componentsEn/common/DropDown.vue'
import Input from '~/componentsEn/common/Input.vue'
import MobileContactUs from '~/pagesEn/mobile/contactus/index.vue'
import PcSubButton from '~/componentsEn/PcSubButton'
export default {
  name: 'ContactUs',
  components: {
    MobileContactUs,
    FormLabel,
    DropDown,
    Input,
    PcSubButton
    // PhoneIdentify
  },
  data () {
    return {
      code: '',
      phone: ''
    }
  },
  computed: {
    btnDisabled () { return this.$store.getters['contactus/btnDisabledEn'] },
    ...mapState('contactus', {
      roleOptions: state => state.roleOptionsEn,
      typeOptions: state => state.typeOptionsEn,
      sexOptions: state => state.sexOptionsEn,
      btnStatus: state => state.btnStatusEn
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
    this.isEnWebsite = 'en'
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
