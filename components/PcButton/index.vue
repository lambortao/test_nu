<template>
  <div
    :class="['PcButton', { disabled },type]"
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
    type: {
      type: String,
      default: ''
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
  color: #fff;
  text-align: center;
  line-height: 60px;
  transition: opacity 300ms ease;

  &.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
  &.newsletter {
    width: 100%;
    height: vw(60);
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
@include media(">maxW") {
  .PcButton {
    &.newsletter {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
