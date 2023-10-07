<template>
  <div class="select">
    <div
      v-if="country"
      :class="['country', size]"
    >
      <p v-if="designer">
        {{ value==='0'?'Mr':'Ms' }}
      </p>
      <p v-else>
        {{ value }}
      </p>
    </div>
    <select
      :class="[size, { hidden: country }]"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="value"
      @change="handleChange"
    >
      <option
        v-for="item in options"
        :key="`${item.value}-${item.label}`"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <img
      src="~/assets/images/icon/left_dark.png"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'SelectSingin',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    country: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: 'default'
    },
    // 设计师需要出现 先生 和 女士
    designer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange (e) {
      console.log(e.target.value)
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: flex;
  align-items: center;
  // border: 1px solid rgba(0, 0, 0, 0.2);
  border-right: none;
  select {
    width: 100%;
    // border: 1px solid rgba(0, 0, 0, 0.2);
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    outline: none;
    padding: 0 15px;
    box-sizing: border-box;
    height: 48px;
    position: relative;
    font-family: "WorkSans-Regular";
    &.short {
      height: 40px;
    }

    &.hidden {
      opacity: 0;
    }
  }

  .country {
    position: absolute;
    width: 100%;
    height: 48px;
    top: 0;
    left: 0;
    padding: 0 20px;
    font-weight: bold;
    line-height: 48px;
    border-right: 1px solid rgba(0, 0, 0, 0.2);

    &.short {
      height: 40px;
      line-height: 40px;
    }
  }
  img {
    width: 7px;
    height: 12px;
    position: absolute;
    right: 14px;
    object-fit: contain;
    transform: rotate(-90deg);
  }
}
</style>
