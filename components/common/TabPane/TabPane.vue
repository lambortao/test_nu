<template>
  <div class="tabs">
    <div class="tabs_list_box">
      <div class="tabs_list">
        <div
          v-for="(item,index) in tabsList"
          :key="index"
          :class="activeIndex===index?'tab_item active':'tab_item'"
          @click="tabChange(index)"
        >
          {{ item.name?item.name:item }}
        </div>
      </div>
      <div class="sort_box">
        <slot name="tabs_right" />
      </div>
    </div>
    <div class="tabs_content_box">
      <slot name="tabs_content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabPaneComponent',
  props: {
    tabsList: {
      type: Array,
      default: null
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
  }),
  mounted () {
    console.log(this.tabsList)
  },
  methods: {
    tabChange (index) {
      this.$emit('activeIndex', index)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  width: 100%;
  > .tabs_list_box {
    width: 100%;
    padding-bottom: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .tabs_list {
      display: flex;
      > .tab_item {
        margin-right: 72px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.4);
      }
      > .tab_item:hover,
      .active {
        color: #000;
      }
    }
    .sort_box {
      cursor: pointer;
      z-index: 99;
      user-select: none;
      > P {
        display: inline-block;
        font-size: 18px;
        color: #000;
        line-height: 27px;
        position: relative;

        padding: 9px 31px 9px 16px;
      }
      p::after {
        content: "";
        width: 7px;
        height: 5px;
        display: block;
        background: url("~/assets/images/icon/sort_icon.png") no-repeat;
        background-size: 100% 100%;
        transition: all 0.5s;
        position: absolute;
        right: 14px;
        top: 20px;
      }
      .active {
        background: #eee;
      }
      .active::after {
        transform: rotate(-180deg);
      }
    }
    .sort_menu {
      width: 240px;
      height: 150px;
      background: #fff;
      position: absolute;
      right: 0;
      bottom: -151px;
      box-shadow: 0px 0px 4px #dddddd;
      user-select: none;
      > div {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;
      }
      > div:hover,
      .active {
        background: #f6f6f6;
        font-weight: bold;
      }
    }
  }
  // >.tabs_content_box{
  //   padding: 60px 0;
  // }
}
</style>
