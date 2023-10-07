<template>
  <div class="form-label no-border form-flex">
    <aggreement language="en" />
    <small v-if="modelType!=='reg'" class="forgat" @click="_click">Forgot password?</small>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'AgreementComponent',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    language: {
      type: String,
      default: 'cn'
    },
    modelType: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  methods: {
    agreeClick () {
      this.$store.commit('login/setAgreeStatus', !this.isAgreeCheck)
    },
    _click () {
      this.$store.commit('login/setLoginSection', 'forget')
    }
  }
}
</script>

<style lang="scss" scoped>
.forgat{
  cursor: pointer;
}
</style>
