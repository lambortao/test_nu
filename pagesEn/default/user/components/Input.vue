<template>
  <div class="input_box">
    <input
      :type="inpuType"
      :placeholder="placeholder"
    >
  </div>
</template>
<script>
export default {
  name: 'InputComponent',
  props: {
    inpuType: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  }
}
</script>
<style scoped lang="scss">
.input_box {
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
}
input {
  border: none;
  font-size: 24px;
  outline: none;
  // caret-color: #005bff;
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: rgba(0, 0, 0, 0.1);
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: rgba(0, 0, 0, 0.1);
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: rgba(0, 0, 0, 0.1);
}
:-moz-placeholder {
  /* Firefox 18- */
  color: rgba(0, 0, 0, 0.1);
}
</style>
