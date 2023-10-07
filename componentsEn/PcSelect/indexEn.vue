<template>
  <select
    :class="[size]"
    :placeholder="placeholder"
    :disabled="disabled"
    :value="value"
    @change="handleChange"
  >
    <option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>
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
    size: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    handleChange (e) {
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
select {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  padding: 0 10px;
  height: 48px;

  &.short {
    height: 40px;
  }
}
</style>
