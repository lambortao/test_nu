<template>
  <div :class="['FormLabel']">
    <span v-if="label">{{ label }} <b v-if="required">*</b> </span>
    <div :class="['content', className, , { 'no-border': !border }]">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormLabel',
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>

.FormLabel {
  width: 100%;
  margin-bottom: mvw(16);
  span {
    color: #333;
    display: block;
    font-size: mrem(26);
    margin-bottom: mvw(5);

    b {
      color: #FF3838;
    }
  }
}
.content {
  background: #fff;
  border: mvw(1) solid #ddd;

  &.no-border {
    border: none;
  }
}
</style>
