<template>
  <div class="drop_down">
    <div class="drop" />
  </div>
</template>

<script>
export default {
  name: 'FormLabel',
  props: {
    title: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 15px;
}
span {
  color: #B80000;
}
.sub_title{
  color: rgba(0,0,0,.34);
  margin-left: 12px;
  display: inline-block;
  font-size: 14px;
}
</style>
