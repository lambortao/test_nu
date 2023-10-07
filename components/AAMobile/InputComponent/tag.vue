<template>
  <div>
    <p
      v-for="item in tags"
      :key="item.label"
      :class="{ active: value.includes(item.value) }"
      @click="toggleTags(item.value)"
    >
      {{ item.label }}
    </p>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'TagSigin',
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
    }
  },
  methods: {
    toggleTags (id) {
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
    width: mvw(160);
    height: mvw(40);
    text-align: center;
    line-height: mvw(40);
    color: #D8D8D8;
    border: 1px solid #D8D8D8;
    margin-bottom: mvw(10);
    transition: all 300ms ease;

    &.active {
      color: #000;
      border-color: #000;
    }
  }
}
</style>
