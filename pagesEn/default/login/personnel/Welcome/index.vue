<template>
  <div class="welcome">
    <header-back />
    <section class="login-section">
      <figure><img src="~/assets/images/AAmobile/login/users.png" alt="头像"></figure>
      <p>Welcome，{{ encryptPhone }}</p>
      <small>Identify to your employee information</small>
      <div class="bottom-btn">
        <big-button @click="goNextPath">
          Binding
        </big-button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PersonnelWelcome',
  computed: {
    encryptPhone () {
      return this.$store.getters['login/getMemberPhoneNumber']
    }
  },
  methods: {
    goNextPath () {
      this.$store.commit('login/setLoginSection', 'staff-prove')
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  margin-top: mvw(120);
  figure {
    width: mvw(64);
    height: mvw(64);
    border-radius: mvw(32);
    overflow: hidden;
    background-color: #F6F6F6;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: mvw(32)
    }
  }
  p {
    margin: mvw(24) 0 mvw(8);
    font: {
      weight: bold;
      size: mrem(36);
    };
  }
  small {
    color: rgba($color: #000000, $alpha: 0.6)
  }
}
</style>
