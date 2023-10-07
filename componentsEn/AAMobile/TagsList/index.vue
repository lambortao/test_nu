<template>
  <div class="tags-list">
    <span
      v-for="tag in tags"
      :key="tag"
    >{{ tag }}</span>
  </div>
</template>

<script>
export default {
  name: 'TagsList',
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>

div.tags-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: mvw(16);

  span {
    margin-right: mvw(8);
    padding: 0 mvw(10);
    height: mvw(20);
    line-height: mvw(20);
    background-color: #F6F7FB;
    border-radius: mvw(4);
    font-size: mrem(24);
    overflow: hidden;
    color: #333;
  }
}
</style>
