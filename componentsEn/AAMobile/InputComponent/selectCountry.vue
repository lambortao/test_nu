<template>
  <div class="contentBox">
    <select
      :class="[size]"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="selectVal"
      @change="handleChange"
    >
      <option
        v-for="item in options"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
    <input
      v-if="othersInp"
      v-model="othersVal"
      class="input"
      type="text"
      placeholder="Please enter other country..."
      @input="othersFn"
    >
    <img src="~/assets/images/AAmobile/store/arrowtop.png" class="arrow-top">
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
  data () {
    return {
      // 其他框
      othersInp: false,
      // 其他选项数据
      othersVal: '',
      // 选择框显示字体
      selectVal: ''
    }
  },
  methods: {
    handleChange (e) {
      this.selectVal = e.target.value
      if (e.target.value === 'Others') {
        this.othersInp = !this.othersInp
      } else {
        this.othersInp = false
        // 清空字体
        this.othersVal = ''
        this.$emit('update:value', e.target.value)
      }
    },
    // 传输其他选项的数据
    othersFn (e) {
      console.log(e.target.value)
      this.$emit('update:value', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.contentBox {
  width: 100%;
  background: #fff;
  position: relative;
  .arrow-top {
  width: mvw(12);
  height: mvw(7.5);
  position: absolute;
  top: mvw(16.25);
  right: mvw(15);
  margin-left: mvw(30);
}
  select {
  width: 100%;
  border: none;
  outline: none;
  padding: 0 mvw(16);
  height: mvw(48);
  color: #000;
  border: mvw(1) solid #ddd;

    &.short {
      height: mvw(40);
    }
  }
  .input{
    width: 100%;
    height: mvw(40);
    margin-top: mvw(16);
    padding: 0 mvw(16);
    border: mvw(1) solid #ddd;
  }
}

</style>
