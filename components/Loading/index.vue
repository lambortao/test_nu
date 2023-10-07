<template lang="html">
  <div v-if="loading" class="loading-page">
    <span class="bar" />
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = true
    },
    increase (num) {
      console.log(num)
    }
  }
}
</script>

<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;

  span.bar {
    height: 4px;
    background-color: #f00;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
