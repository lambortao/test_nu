<template>
  <div class="filter_item">
    <div>
      <img
        src="~/assets/images/icon/filter_icon1.png"
        alt=""
      >
    </div>
    <p>分类筛选</p>
  </div>
</template>
<script>
export default {
  name: 'FilterItemComponent',
  data: () => ({
    filterList: [{
      name: '分类筛选',
      icon: '~/assets/images/icon/select.png'
    }]
  })
}
</script>
<style lang="scss" scoped>
.filter_item {
  display: flex;
  align-items: center;
  padding: 10px 30px 11px 20px;
  margin-left: 18px;
  position: relative;
  > div {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  > p {
    font-size: 17px;
    position: relative;
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
    right: -16px;
    top: 12px;
  }
}
.active {
  background: #f6f6f6;
}
.active {
  p::after {
    transform: rotate(-180deg);
  }
}
</style>
