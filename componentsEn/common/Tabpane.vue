<template>
  <div class="radio_box">
    <div
      v-for="(item,index) in radioList"
      :key="index"
      class="radio_item"
    >
      <input
        :id="item.value"
        type="radio"
        :name="name"
        :value="item.value"
      ><label :for="item.value">{{ item.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabPaneComponent',
  props: {
    radioList: {
      type: Array,
      default: null
    },
    name: {
      type: String,
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
.radio_box {
  display: flex;
  margin-top: 19px;
  > .radio_item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  > .radio_item:not(last-child) {
    margin-right: 16px;
  }
  input {
    margin-right: 5px;
  }
  label {
    cursor: pointer;
  }
}
</style>
