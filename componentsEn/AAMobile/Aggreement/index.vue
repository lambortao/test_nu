<template>
  <div :class="['argee-agreement', { active: isAgreeCheck }]" @click="agreeClick">
    <span @click.stop="agreeClick">I have read the</span>
    <nuxt-link to="/en/policy">
      Privacy Policy
    </nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MobileAggreement',
  computed: {
    ...mapState('login', {
      isAgreeCheck: state => state.isAgreeCheck
    })
  },
  methods: {
    agreeClick () {
      this.$store.commit('login/setAgreeStatus', !this.isAgreeCheck)
    }
  }
}
</script>

<style lang="scss" scoped>
 .argee-agreement {
  color: #000;
  font-size: mrem(24);
  color: rgba($color: #000, $alpha: 0.8);
  margin-bottom: mvw(18);
  display: flex;
  justify-content: flex-start;

  &::before {
    content: '';
    width: mvw(16);
    height: mvw(16);
    margin-right: mvw(9);
    background: {
      image: url('~/assets/images/AAmobile/login/check.png');
      size: 100%;
    }
  }

  &.active::before {
    background-image: url('~/assets/images/AAmobile/login/check-active.png');
  }

  a {
    color: #000;
    margin-left: mvw(5);
    text-decoration: underline;
  }
}
</style>
