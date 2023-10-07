<template>
  <div :class="['PcButton', { disabled }]" @click="$emit('click')">
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
    }
  }
}
</script>

<style lang="scss" scoped>
.PcButton {
  cursor: pointer;
  width: 100%;
  height: 60px;
  background-color: #000;
  color: #fff ;
  text-align: center;
  line-height: 60px;
  transition: opacity 300ms ease;

  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
}
</style>
