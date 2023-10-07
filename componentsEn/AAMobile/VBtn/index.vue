<template>
  <div class="VBtn">
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'VBtn',
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>

.VBtn {
  padding: mvw(5) mvw(15);
  border: mvw(1) solid #ddd;
  font-size: mrem(24);
  font-weight: 500;
}
</style>
