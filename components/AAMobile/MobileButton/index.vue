<template>
  <div :class="['MobileButton', { disabled }]" @click="$emit('click')">
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'MobileButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

.MobileButton {
  width: 100%;
  height: mvw(48);
  background-color: #000;
  color: #fff ;
  text-align: center;
  line-height: mvw(48);
  transition: opacity 300ms ease;

  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
}
</style>
