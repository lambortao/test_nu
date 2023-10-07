<template>
  <div class="select_box">
    <div class="placeholder">
      <p v-if="!selectText || selectText===''">
        {{ placeholder }}
      </p>
      <p v-else class="selseted">
        {{ selectText }}
      </p>
    </div>
    <select
      :class="[size,isContact?'contact_select':'']"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
      @change="handleChange"
    >
      <option
        v-for="item in options"
        :key="`${item.value}-${item.label}`"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <div class="icon">
      <img src="~/assets/images/login/down.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectSingin',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    isContact: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectText: ''
    }
  },
  methods: {
    handleChange (e) {
      this.selectText = e.target.value
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/selectCom.scss';
</style>
