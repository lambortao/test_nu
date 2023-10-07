<template>
  <div class="contact-us-mobile">
    <div class="title_box">
      <div class="title">
        Contact Us
      </div>
      <!-- <div class="sub_title">
        Feedback your suggestions about the product
      </div> -->
    </div>
    <div class="form_box">
      <FormLabel :required="true" title="Leave a message as...">
        <div class="border_box select_box">
          <DropDown
            v-model="role"
            :options="roleOptions"
            placeholder="Choose"
            @update:value="value => setValue({ key: 'role', value })"
          />
        </div>
      </FormLabel>
      <form-label
        v-if="role === 'Others'"
      >
        <div class="border_box">
          <Input
            v-model="roleName"
            size="short"
            placeholder="Please enter"
            @update:value="value => setValue({ key: 'roleName', value })"
          />
        </div>
      </form-label>
      <FormLabel :required="true" title="Name">
        <div style="display:flex">
          <div style="width:30%">
            <div class="border_box select_box">
              <DropDown
                v-model="sex"
                :options="sexOptions"
                placeholder="Title"
                :is-contact="true"
                @update:value="value => setValue({ key: 'sex', value })"
              />
            </div>
          </div>
          <div style="width:70%">
            <div class="border_box border_noRight">
              <Input
                v-model="name"
                size="short"
                placeholder="Please enter your full name"
                @update:value="value => setValue({ key: 'name', value })"
              />
            </div>
          </div>
        </div>
      </FormLabel>
      <FormLabel
        title="Email"
        :required="true"
      >
        <div class="border_box">
          <Input
            v-model="email"
            size="short"
            placeholder="E-mail Address"
            @update:value="value => setValue({ key: 'email', value })"
          />
        </div>
      </FormLabel>
      <form-label
        title="Message issue..."
        :required="true"
      >
        <div class="border_box select_box">
          <DropDown
            v-model="leavemsg_type"
            :options="typeOptions"
            placeholder="Please choose"
            @update:value="value => setValue({ key: 'leavemsg_type', value })"
          />
        </div>
      </form-label>
      <form-label
        v-if="leavemsg_type === 'Others'"
      >
        <div class="border_box">
          <Input
            v-model="typeName"
            size="short"
            placeholder="Please enter"
            @update:value="value => setValue({ key: 'typeName', value })"
          />
        </div>
      </form-label>
      <form-label :required="true" title="Specific description">
        <div class="border_box">
          <Input
            v-model="leavemsg_description"
            size="short"
            type="textarea"
            @update:value="value => setValue({ key: 'leavemsg_description', value })"
          />
        </div>
      </form-label>
      <form-label
        title="Additional Information"
        sub-title="png、jpg、pdf files"
      >
        <upload-img
          :value="images"
          @update:value="value => setValue({ key: 'images', value })"
        />
      </form-label>
      <mobileSubButton
        :loading="btnStatus.loading"
        :disabled="!btnDisabled"
        @click="submitData"
      >
        {{ btnStatus.text }}
      </mobileSubButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import FormLabel from './FormLabel'
import DropDown from './components/Select.vue'
import Input from '~/components/AAMobile/InputComponent/input.vue'
import mobileSubButton from '~/components/AAMobile/MobileButton'
export default {
  name: 'MobileContactUs',
  components: {
    FormLabel,
    DropDown,
    Input,
    mobileSubButton
  },
  data () {
    return {
      code: '',
      phone: ''
    }
  },
  computed: {
    // formData () { return this.$store.state.contactus },
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
    }
  },
  methods: {
    ...mapActions({
      submitData: 'contactus/submitData'
    }),
    setValue (data) {
      this.$store.commit('contactus/setFormData', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-us-mobile{
  width: 100%;
  padding:mvw(24);
  >.title_box{
    padding-bottom: mvw(22);
    border-bottom: 1px solid  rgba(24,24,24,0.05);
    .title{
      font-size: mvw(20);
      font-weight: bold;
    }
    .sub_title{
      font-size: mvw(14);
      font-weight: 400;
      margin-top: mvw(8);
      opacity: .6;
    }
  }
  .border_box{
    min-height: mvw(48);
    display: flex;
    align-items: center;
    border: 1px solid rgba(0,0,0,0.2);
  }
  .select_box{
    height: mvw(46);
  }
}
</style>
