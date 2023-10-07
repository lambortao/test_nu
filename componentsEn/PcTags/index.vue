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
        label: 'HAY',
        value: 'HAY'
      }, {
        label: '&Tradition',
        value: '&Tradition'
      }, {
        label: 'Verpan',
        value: 'Verpan'
      }, {
        label: 'Frandsen',
        value: 'Frandsen'
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
      const nowIndex = nowTags.indexOf(id)
      nowIndex > -1 ? nowTags.splice(nowIndex, 1) : nowTags.push(id)
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
