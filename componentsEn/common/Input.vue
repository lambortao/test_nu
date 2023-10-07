<template>
  <div :class="['input_box', { pc: isPc }]">
    <input
      v-if="type !== 'textarea'"
      :class="[{ disabled }, size]"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      :name="name"
      @input="handleChange"
    >
    <textarea
      v-else
      :class="[{ disabled }, size]"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      :name="name"
      @input="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: 'InputComponent',
  model: {
    prop: 'value',
    update: 'update:value'
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
    hasDrop: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'default'
    },
    isPc: {
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

.input_box {
  width: 100%;
  min-height: vw(48);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  input{
    width: 100%;
    height:48px;
    padding: 0 vw(20);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  textarea {
    width: 100%;
    height: vw(100);
    word-break: break-all;
    padding: vw(12) vw(12);
    font-size: vw(16);
  }
  input::-webkit-input-placeholder,
  input:-moz-placeholder {
    font-size: vw(16);
    color: rgba(0, 0, 0, 0.4);
  }

  &.pc {
    min-height: 48px;

    input {
      height: 48px;
      padding: 0 20px;
    }
    textarea {
      width: 100%;
      height: 100px;
      word-break: break-all;
      padding: 12px 12px;
      font-size: 16px;
    }
    input::-webkit-input-placeholder,
    input:-moz-placeholder {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
