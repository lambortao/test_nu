<template>
  <div class="form-label">
    <p v-if="title">
      {{ title }}
      <span v-if="required">*</span>
      <span v-if="subTitle!==''" class="sub_title">{{ subTitle }}</span>
    </p>
    <div class="content">
      <slot name="default" />
    </div>
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
.form-label{
  padding: mvw(20) 0;
  border-bottom: 1px solid rgba(24,24,24,0.05);
}
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
