<template>
  <div class="radio-main">
    <div
      v-for="item in options"
      :key="item.label"
      class="radio"
      @click="$emit('update:value', item.value)"
    >
      <span :class="['selected', { active: value === item.value }]" />
      <p>{{ item.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RadioSingin',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>

.radio-main {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: mvw(10) mvw(40) mvw(10) 0;

    &:nth-child(3n) {
      margin-right: 0;
    }
    p {
      font-size: mrem(28);
      color: #333;
      margin-left: mvw(8);
    }
    span {
      width: mvw(16);
      height: mvw(16);
      border-radius: mvw(8);
      border: mvw(1.5) solid #d8d8d8;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 100ms ease;

      &:after {
        content: '';
        display: block;
        width: mvw(8);
        height: mvw(8);
        border-radius: mvw(4);
        background-color: #fff;
        transition: all 100ms ease;
      }
    }
    span.active {
      border-color: #000;

      &:after {
        background-color: #000;
      }
    }
  }
}
</style>
