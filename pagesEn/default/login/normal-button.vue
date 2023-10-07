<template>
  <div
    :class="['PcButton',{isDark}, { disabled }]"
    @click="$emit('click')"
  >
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'PcButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isDark: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.PcButton {
  cursor: pointer;
  width: 49%;
  height: 60px;
  background-color: #000;
  border: 1px solid #000;
  color: #fff;
  text-align: center;
  line-height: 60px;
  transition: opacity 300ms ease;
  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
}
.isDark {
  background: #fff;
  border: 1px solid #000;
  color: #000;
}
</style>
