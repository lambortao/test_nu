<template>
  <div class="odd">
    <p
      v-for="item in tags"
      :key="item.label"
      :style="tagStyle"
      :class="[{ active: value.includes(item.value) }]"
      @click="toggleTags(item.value)"
    >
      {{ item.label }}
    </p>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'PcSigin',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => [{
        label: '&Tradition',
        value: 0
      }, {
        label: 'HAY',
        value: 1
      }, {
        label: 'Verpan',
        value: 2
      }, {
        label: 'Frandsen',
        value: 3
      }]
    },
    tagStyle: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    toggleTags (id) {
      console.log(id)
      const nowTags = cloneDeep(this.value)
      console.log(nowTags, 'cloneDeep')
      const nowIndex = nowTags.indexOf(id)
      console.log(nowIndex, 'nowIndex')
      nowIndex > -1 ? nowTags.splice(nowIndex, 1) : nowTags.push(id)
      console.log(nowTags, '最终')
      this.$emit('update:value', nowTags)
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    width: 195px;
    height: 48px;
    text-align: center;
    line-height: 46px;
    font-weight: bold;
    color: #D8D8D8;
    border: 1px solid #D8D8D8;
    margin-bottom: 10px;
    cursor: pointer;

    &.active {
      color: #000;
      border: 2px solid #D8D8D8;
      line-height: 44px;
    }
  }

  &.odd {
    p:nth-child(odd) {
      margin-right: 10px;
    }
  }
}
</style>
