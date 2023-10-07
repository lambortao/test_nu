<template>
  <div class="select">
    <div v-if="country" class="country">
      <p>{{ value }}</p>
    </div>
    <select
      :class="[size,{ hidden: country }]"
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
    }
  },
  methods: {
    handleChange (e) {
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
  select {
  width: 100%;
  border: none;
  outline: none;
  padding: 0 mvw(16);
  height: mvw(48);
  color: #000;
  border: mvw(1) solid #ddd;
  position: relative;
    &.short {
      height: mvw(40);
    }
    &.hidden {
      opacity: 0;
    }
  }
  .country{
    width: 100%;
  border: none;
  outline: none;
  padding: 0 mvw(16);
  height: mvw(48);
  line-height: mvw(48);
font-size: mvw(15);
  color: #000;
  border-right: mvw(1) solid #ddd;
  position: absolute;

    &.short {
      height: 40px;
      line-height: 40px;
    }
  }
  .input{
    width: 100%;
    height: mvw(40);
    margin-top: mvw(16);
    padding: 0 mvw(16);
    border: mvw(1) solid #ddd;
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
