<template>
  <button :class="[size]">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ButtonSingin',
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
  border: none;
  background: transparent;
  outline: none;
  height: mvw(48);
  width: 100%;

  &.short {
    height: mvw(40);
  }
}
</style>
