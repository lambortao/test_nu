<template>
  <div class="input_box">
    <v-distpicker hide-area @selected="onSelect" />
  </div>
</template>

<script>
export default {
  name: 'DistpickerComponent',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({}),
  methods: {
    onSelect (data) {
      this.$emit('areaSelect', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.distpicker-address-wrapper {
  display: flex;
  width: 400px;
  select {
    width: 200px;
    border-radius: 0 !important;
    padding: 0px 10px !important;
    height: 48px !important;
    font-size: 15px !important;
    line-height: 30px !important;
  }
}
</style>
