<template>
  <button :class="[size]" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'SmallButton',
  props: {
    size: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 77px;
  height: 48px;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 16px;
  cursor: pointer;

  &.short {
    height: vw(40);
  }
}
</style>
