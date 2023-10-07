<template lang="html">
  <div v-if="loading" class="loading-page">
    <p class="loader" />
  </div>
</template>

<script>
export default {
  name: 'PagesLoading',
  computed: {
    loading () {
      return this.$store.state.site.pageLoading
    }
  }
}
</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 40%);
    text-align: center;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(32);
    font-family: sans-serif;
  }
  .loader {
      font-size: 30px;
      line-height: 200px;
      display: inline-block;
      width: 1em;
      height: 1em;
      color: inherit;
      vertical-align: middle;
      pointer-events: none;
  }
  .loader:before,
  .loader:after,
  .loader {
      border-radius: 50%;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation: loader-13 1.8s infinite ease-in-out;
      animation: loader-13 1.8s infinite ease-in-out;
  }
  .loader {
      color: currentcolor;
      position: relative;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
      top: -1em;
  }
  .loader:before {
      right: 100%;
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
  }
  .loader:after {
      left: 100%;
  }
  .loader:before,
  .loader:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      width: inherit;
      height: inherit;
  }
  @-webkit-keyframes loader-13 {
      0%, 80%, 100% {
          box-shadow: 0 1em 0 -1em;
      }
      40% {
          box-shadow: 0 1em 0 -.2em;
      }
  }
  @keyframes loader-13 {
      0%, 80%, 100% {
          box-shadow: 0 1em 0 -1em;
      }
      40% {
          box-shadow: 0 1em 0 -.2em;
      }
  }
</style>
