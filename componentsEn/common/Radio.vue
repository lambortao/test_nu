<template>
  <div class="radio_box">
    <div
      v-for="item in options"
      :key="item.label"
      class="radio_item"
      @click="$emit('update:value', item.value)"
    >
      <label>
        <span :class="['selected', { active: value === item.value }]" />
        <p>{{ item.label }}</p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioComponent',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    options: {
      type: Array,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [Number, String],
      default: 0
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
    // margin-right: 16px;
    margin-right: 46px;
  }
  label {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .selected {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    border: 1px solid rgba($color: #000000, $alpha: 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 100ms ease;
    margin-right: 10px;

    &:after {
      content: '';
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background-color: #fff;
      transition: all 100ms ease;
    }

    &.active {
      border-color: #000;

      &:after {
        background-color: #000;
      }
    }
  }
}
</style>
