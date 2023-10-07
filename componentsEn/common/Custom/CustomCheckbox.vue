<template>
  <div class="customCheckbox">
    <label for="sence">
      <slot name="checkboxContent" />
      <input id="sence" type="checkbox">
    </label>
  </div>
</template>
<script>
export default {
  name: 'CustomCheckbox',
  data () {
    return {}
  },
  created () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.customCheckbox {
  position: relative;
  cursor: pointer;
  input {
    cursor: pointer;
    position: absolute;
    right: 9px;
    bottom: 8px;
  }
  input[type="checkbox"] {
    background: none;
    // zoom: 1;
    outline: none;
    -webkit-appearance: none; /*去除默认样式*/
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
  }
  input[type="checkbox"]::after {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    content: " ";
    color: #fff;
    display: inline-block;
    visibility: visible;
    box-sizing: border-box;
    background: url('~/assets/images/icon/select_white.png') no-repeat;
    background-size: 100% 100%;
    opacity: 0.1;
  }
  input[type="checkbox"]:checked::after {
    opacity: 1;
  }
}
</style>
