<template>
  <div class="HeaderBack">
    <figure @click="$emit('back')">
      <img src="~/assets/images/AAmobile/login/back.png" alt="返回">
    </figure>
  </div>
</template>

<script>
export default {
  name: 'HeaderBack'
}
</script>

<style lang="scss" scoped>

.HeaderBack {
  width: mvw(375);
  height: 10vw;
  padding: 0 mvw(16);
  display: flex;
  align-items: center;

  figure {
    width: mvw(10);
    height: mvw(16);

    img {
      width: 100%;
    }
  }
}
</style>
