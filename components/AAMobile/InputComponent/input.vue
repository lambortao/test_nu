<template>
  <div class="inputCom_box">
    <input
      v-if="type !== 'textarea'"
      :class="[{ disabled }, size, color]"
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
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder"
      :value="value"
      :name="name"
      @input="handleChange"
    />
    <div
      v-if="isDesc"
      class="count"
    >
      {{ value.length }} / {{ maxlength }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSingin',
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
    isDesc: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: ''
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
.inputCom_box{
  width: 100%;
  position: relative;
}
.color{
    color: gray;
  }
input, textarea {
  width: 100%;
  border: none;
  background: transparent;
  height: mvw(48);
  line-height: 100%;
  outline: none;
  padding: 0 mvw(16);

  &.short {
    height: mvw(40);
  }
}
textarea {
  height: mvw(100) !important;
  resize: none;
  padding: mvw(5);
}
.disabled {
  background-color: #F7F7F7;
}
.count{
  position: absolute;
  right: 10px;
  bottom: 7px;
}
</style>
