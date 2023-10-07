<template>
  <div class="personnelDone">
    <!-- <header-back /> -->
    <section class="login-section">
      <figure class="done">
        <img src="~/assets/images/AAmobile/login/done.png" alt="完成">
      </figure>
      <p>{{ doneText }}</p>
      <small>{{ remark }} {{ countDownNumber }}s...</small>
      <figure class="logo">
        <img src="~/assets/images/AAmobile/login/logo-b.png" alt="LOGO">
      </figure>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PersonnelDone',
  props: {
    doneText: {
      type: String,
      default: ''
    },
    remark: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      countDownNumber: 5
    }
  },
  created () {
    this.countDownFunc()
  },
  methods: {
    countDownFunc () {
      const down = () => {
        setTimeout(() => {
          if (this.countDownNumber > 0) {
            this.countDownNumber = this.countDownNumber - 1
            down()
          } else {
            this.timeOut()
          }
        }, 1000)
      }
      down()
    },
    timeOut () {
      this.$emit('timeout')
    }
  }
}
</script>

<style lang="scss" scoped>

section {
  justify-content: center;
}
figure.done {
  width: mvw(48);
}
img {
  width: 100%;
}
p {
  margin: mvw(15) 0;
}
figure.logo {
  position: absolute;
  width: mvw(118);
  bottom: mvw(40);
  left: mvw(128);
}
small {
  font-size: mrem(16);
  color: #555;
}
</style>
