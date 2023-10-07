<template>
  <div class="tags_box">
    <span
      v-for="(item,index) in tagList"
      :key="index"
    >{{ item }}</span>
  </div>
</template>

<script>
export default {
  name: 'TagsComponent',
  props: {
    tagList: {
      type: Array,
      default: null
    }
  },
  data: () => ({
  }),
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tags_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > span {
    background: #eee;
    display: inline-block;
    padding: 5px 14px 7px;
    margin-right: 10px;
    border-radius: 20px;
    font-size: 12px;
  }
}
</style>
