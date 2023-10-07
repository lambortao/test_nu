<template>
  <div :class="['filter_item',classifySection==='scene' ?'active':'',scenesValue.length>0?'option_active':'']">
    <div class="filter_item_box" @click="selectSection('scene')">
      <p>
        By space
      </p>
    </div>
    <div class="filter_item_active_box">
      <div class="sence_content">
        <div
          v-for="item in scenesList"
          :key="item.alias"
          :class="['sence_item', { active: value === item.alias }]"
          @click="senceClick(item)"
        >
          {{ item.nameen }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SenceSelectComponent',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    classifySection: {
      type: [String, Object],
      default: ''
    }
  },
  data: () => ({
  }),
  computed: {
    ...mapState('productScene', {
      scenesList: state => state.list,
      scenesValue: state => state.value
    })
  },
  methods: {
    selectSection (i) {
      this.$emit('selectSection', i)
    },
    senceClick (data) {
      this.$emit('update:value', data.alias)
      this.$emit('tracking', { event: 'filter_product', label: data.nameen, filterLabel: 'By space' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';

.sence_content {
  width: vw(240);
  background: #fff;
  box-shadow: 0px 0px 6px 0 #eee;
  padding: 17px 0;
  .sence_item{
    width: 100%;
    height: 49px;
    text-align: center;
    line-height:49px;
    color: #555;
    cursor: pointer;
    font-size: vw(16);
    &.active {
      background: #f6f6f6;
      color: #000;
    }
  }
  .sence_item:hover{
    background: #f6f6f6;
    color: #000;
  }
}
@include media(">maxW") {
  .sence_content {
  width: vw(240);
  background: #fff;
  box-shadow: 0px 0px 6px 0 #eee;
  padding: 17px 0;
  .sence_item{
    width: 100%;
    height: vw(49);
    text-align: center;
    line-height: vw(49);
    color: #555;
    cursor: pointer;
    font-size: vw(16);
    &.active {
      background: #f6f6f6;
      color: #000;
    }
  }
  .sence_item:hover{
    background: #f6f6f6;
    color: #000;
  }
}
}
</style>
