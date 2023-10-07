<template>
  <div class="brand-main">
    <figure><slot name="default" /></figure>
    <section class="brand-content">
      <slot name="content" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'BrandComponent'
}
</script>

<style lang="scss" scoped>

figure {
  width: 100%;

  :deep(img) {
    width: 100%;
    display: block;
  }
}
</style>
