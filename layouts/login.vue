<template>
  <Nuxt />
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.login-logo {
  position: fixed;
  top: 30px;
  left: 80px;
  height: 61.63px;
  z-index: 99;
  figure.logo {
    width: 35px;
    height: 48px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
.login-container {
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: absolute;
  right: 0;

  .login-content {
    flex: 1;
    height: 100vh;
    overflow: hidden;
    overflow-y: auto;
    padding: 8vh 0;

    > div {
      margin: 0 auto;
    }
  }
  .login-bg {
    height: 100vh;
    width: 33.33%;
    // background: {
    //   image: url('~/assets/images/login/login-bg.png');
    //   size: cover;
    //   position: center center;
    // }
  }
  @include media ('<900px') {
    .login-bg {
      width: 0;
    }
  }
}
</style>
