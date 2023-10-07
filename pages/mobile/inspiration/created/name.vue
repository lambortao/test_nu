<template>
  <div class="container">
    <div class="label-items">
      <p class="label">
        标题
      </p>
      <input type="text" :value="iData.title" @input="e => changeInput('title', e.target.value)">
    </div>
    <div class="label-items">
      <p class="label">
        描述
      </p>
      <input type="text" :value="iData.desc" @input="e => changeInput('desc', e.target.value)">
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspirationCreatedName',
  model: {
    prop: 'iData',
    event: 'update:iData'
  },
  props: {
    iData: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    changeInput (key, val) {
      const nowData = this.iData
      nowData[key] = val
      this.$emit('update:iData', nowData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/scss/mobile/favorite.scss';

.container {
  padding: mvw(24);

  div.label-items {
    margin-bottom: mvw(32);
    width: 100%;
  }
  p.label {
    color: #333;
    font-size: mrem(24);
  }
  input {
    width: 100%;
    border: none;
    padding: mvw(12) 0;
    height: mvw(44);
    border-bottom: mvw(1) solid #d8d8d8;
    outline: none;
    font-size: mrem(28);
    color: #333;
    transition: all 100ms ease;

    &:focus {
      border-color: #181818;
    }
  }
}
</style>
