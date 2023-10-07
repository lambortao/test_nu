<template>
  <div v-show="show" class="pane-sigin">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TabPane',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.pane-sigin{
  height: 100%;
}
</style>
