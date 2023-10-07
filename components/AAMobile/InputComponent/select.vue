<template>
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
    },
    isContact: {
      type: Boolean,
      default: false
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
.contact_select{
  text-align: center;
}
select {
  width: 100%;
  border: none;
  outline: none;
  padding: 0 mvw(16);
  height: mvw(48);

  &.short {
    height: mvw(40);
  }
  &.contact{
    height: auto;
  }
}
</style>
