<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>
  <div class="filter">
    <p class="title">{{ value ? scenesKeysName[value].name : '场景' }}</p>
    <select @change="handleSelect">
      <option v-for="item in scenesList" :key="item.alias" :value="item.alias">{{ item.name }}</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FilterScene',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      /** 场景列表 */
      scenesList: state => state.productScene.list,
      scenesKeysName: state => state.productScene.nameKey
    })
  },
  methods: {
    handleSelect (e) {
      const item = this.scenesList.filter(item => item.alias === e.target.value)[0]
      this.$emit('update:value', e.target.value)
      this.$emit('tracking', { event: 'filter_product', label: item.name, filterLabel: 'By space' })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  position: relative;

  select {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
  }
}

p.title {
  width: mvw(82);
  height: mvw(48);
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: '';
    display: block;
    width: mvw(6);
    height: mvw(6);
    margin-left: mvw(12);
    background: {
      image: url('~/assets/images/AAmobile/product/arrow.png');
      size: 100%;
      repeat: no-repeat;
    };
  }
}
</style>
