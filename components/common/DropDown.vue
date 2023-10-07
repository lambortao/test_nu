<template>
  <div class="dropdown">
    <div
      class="input_box"
      @click="click()"
    >
      <input
        type="text"
        :value="inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="hasDrop ? 'hasDrop' : ''"
        readonly="readonly"
      >
      <img
        :class="isDrop ? 'rotate': ''"
        src="~/assets/images/icon/left_dark.png"
        alt=""
      >
    </div>
    <div :class="isDrop ? 'drop_box active': 'drop_box'">
      <div
        v-for="item in dropList"
        :key="item.label"
        @click="select(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDownComponent',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    hasDrop: {
      type: Boolean,
      default: false
    },
    dropList: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    inputValue: null,
    isDrop: false
  }),
  methods: {
    click () {
      this.isDrop = !this.isDrop
    },
    select (item) {
      this.$emit('update:value', item.value)
      this.inputValue = item.label
      this.isDrop = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  position: relative;
  .input_box {
    cursor: pointer;
    width: 100%;
    height: 48px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    input {
      cursor: pointer;
      width: 100%;
      height: 100%;
      padding: 0 20px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    img {
      width: 12px;
      height: 7px;
      object-fit: contain;
      position: absolute;
      right: 14px;
      transition: all 0.5s;
      transform: rotate(-90deg)  scale(1.65);
    }
    .rotate {
      transform: rotate(-270deg) scale(1.65);
    }
  }

  .drop_box {
    width: 100%;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: none;
    transition: all 0.5s;
    position: absolute;
    z-index: 99;
    > div {
      height: 48px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    > div:hover {
      background: rgba(100, 100, 100, 0.1);
    }
  }
  .active {
    display: block;
  }
}
</style>
