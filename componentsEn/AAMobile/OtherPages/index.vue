<template>
  <div class="OtherPages">
    <!-- <header-back /> -->
    <section>
      <header>
        <h3>{{ title }}</h3>
        <small>{{ subtitle }}</small>
      </header>
      <slot name="default" />
      <big-button :disabled="disabled" :loading="loading" class="botton-btn" @click="$emit('done')">
        {{ button }}
      </big-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'OtherPages',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: '提交审核人员'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

section {
  padding: mvw(24);

  header {
    margin-bottom: mvw(40);
  }
  h3 {
    font-size: mrem(38);
  }
}
.botton-btn {
  margin-top: mvw(30);
}
</style>
