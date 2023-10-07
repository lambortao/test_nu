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
        src="~/assets/images/login/down.png"
        alt=""
      >
    </div>
    <div :class="isDrop ? 'drop_box active': 'drop_box'">
      <div
        v-for="(item, key) in dropList"
        :key="key"
        @click="select(key)"
      >
        {{ key }}
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
      default: '全部'
    },
    hasDrop: {
      type: Boolean,
      default: false
    },
    dropList: {
      type: Object,
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
      this.$emit('update:value', item)
      this.inputValue = item
      this.isDrop = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  width: 70%;
  position: relative;
  .input_box {
    cursor: pointer;
    width: 100%;
    height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border: none;
    input {
      cursor: pointer;
      width: 100%;
      height: 100%;
      padding: 0 20px;
      // border: 1px solid rgba(0, 0, 0, 0.2);
      border: none;
    }
    img {
      width: 25px;
      height: 13px;
      object-fit: contain;
      position: absolute;
      right: 20px;
      opacity: 0.7;
      transition: all 0.5s;
      transform: rotate(0deg);
    }
    .rotate {
      transform: rotate(-180deg);
    }
  }

  .drop_box {
    width: 100%;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border: none;
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
.texts {
  color: black !important;
}
</style>
