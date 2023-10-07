<template>
  <transition>
    <div v-if="isError" class="error-alert" @click="closeError">
      <p>{{ isError }}</p>
      <span />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ErrorAlert',
  computed: {
    isError () {
      return this.$store.state.site.errorData
    }
  },
  mounted () {
    setTimeout(() => {
      this.closeError()
    }, 3000)
  },
  methods: {
    closeError () {
      this.$store.commit('site/setErrorData', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active {
  transition: opacity 300ms ease;
}

.v-leave-active {
  transition: all 300ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.error-alert {
  position: fixed;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 1000;
  text-align: center;

  p {
    padding: 10px 16px;
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
    border-radius: 4px;
    border: 1px solid #eee;
    color: #000;
    display: inline-block;
    margin: 0 10px;
    background-color: #fff;
  }

  span {
    width: 19px;
    height: 19px;
    background: {
      image: url('~assets/images/icon/close.png');
    };
  }
}
</style>
