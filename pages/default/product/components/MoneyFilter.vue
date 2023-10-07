<template>
  <div :class="['filter_item',classifySection==='sort' ?'active':'']">
    <div
      class="filter_item_box"
      @click="$emit('select-section', 'sort')"
    >
      <p>{{ sortList[value][0] || '排序' }}</p>
    </div>
    <div class="filter_item_active_box">
      <div class="sort_box">
        <div
          v-for="item in sortBox"
          :key="item.value"
          :class="{ active: item.value === value }"
          @click="handleSort(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MoneyFilter',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: String,
      default: null
    },
    classifySection: {
      type: [String, Object],
      default: null
    }
  },
  computed: {
    ...mapState('productMoneySorter', {
      sortBox: state => state.sortBox,
      sortList: state => state.sortNameKey
    })
  },
  methods: {
    handleSort (item) {
      this.$emit('update:value', item)
      this.$emit('select-section', null)
      const label = item === 'ASC' ? '价格从低到高' : item === 'ASC' ? '价格从高到低' : '默认'
      this.$emit('tracking', { event: 'filter_product', label, filterLabel: 'default' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/default/product.scss';
</style>
