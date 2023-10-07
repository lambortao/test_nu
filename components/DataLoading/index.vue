<template>
  <div>
    <div v-if="mode === 'loading'" class="loading">
      <p>Loading ...</p>
    </div>
    <div v-if="mode === 'error'" class="error">
      <p>加载错误，请刷新后重试！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataLoading',
  props: {
    mode: {
      type: String,
      default: 'loading'
    }
  }
}
</script>

<style scoped>
p {
  font-size: 24px;
  text-align: center;
  padding: 40px 0;
}
</style>
