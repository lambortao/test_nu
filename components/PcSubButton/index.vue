<template>
  <div :class="['PcSubButton', { disabled }]" @click="$emit('click')">
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'PcSubButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scpoed>

.PcSubButton {
  cursor: pointer;
  width: vw(530);
  height: vw(60);
  line-height: vw(60);
  background-color: #000;
  color: #fff ;
  text-align: center;
  transition: opacity 300ms ease;
  padding: 0;
  margin: vw(90) auto 0;
  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
}
</style>
