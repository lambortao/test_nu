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
        v-for="item in dropList"
        :key="item"
        class="divActive"
        @click="select(item)"
      >
        {{ item }}
      </div>
      <div v-if="othersShow " class="others">
        <input
          v-model="othersValue"
          type="text"
          class="input"
          placeholder="Please enter other country..."
        >
        <div class="btn" @click="othersFn(othersValue)">
          Confirm
        </div>
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
    isDrop: false,
    // 其他选项框显示
    othersShow: false,
    // 其他值
    othersValue: ''
  }),
  mounted () {
    console.log(this.dropList)
  },
  methods: {
    click () {
      this.isDrop = !this.isDrop
      this.othersShow = false
    },
    select (item) {
      if (item === 'Others') {
        this.othersShow = !this.othersShow
      } else {
        this.othersShow = false
        this.$emit('update:value', item)
        this.inputValue = item
        this.isDrop = false
      }
    },
    // 其他项目确认按钮
    othersFn (item) {
      this.othersShow = false
      this.$emit('update:value', item)
      this.inputValue = item
      this.isDrop = false
    }
  }

}
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  min-height: vw(48);
  position: relative;
  .input_box {
    cursor: pointer;
    width: 100%;
    height:48px;
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
      border: 1px solid rgba(0, 0, 0, 0.2);
      // border: none;
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
    margin-top: 12px;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.1);
    border: 1px solid #F6F6F6;
    > div {
      height: 48px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    > .divActive:hover {
      background: rgba(100, 100, 100, 0.1);
    }
    .others{
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px;
      height: 88px;
      .input{
        width: 264px;
        height: 48px;
        background: #FFFFFF;
        border: 1px solid #CCCCCC;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        padding-left: 16px;
        box-sizing: border-box;
        margin-right: 8px;
      }
      .btn{
        width: 88px;
        height: 48px;
        background: #000000;
        text-align: center;
        line-height: 48px;
        font-weight: 400;
        color: #FFFFFF;
        font-size: 16px;
      }
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
