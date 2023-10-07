<template>
  <div>
    <div class="line">
      {{ text }}
    </div>
    <figure @click="emailOrphone(value)">
      <img
        v-if="value"
        src="~/assets/images/AAmobile/login/phone.png"
      >
      <img
        v-else
        src="~/assets/images/AAmobile/login/email.png"
      >
    </figure>
    <p :style="{ textAlign: 'center' }">
      {{ !value ? 'Email' : 'Phone number' }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChangeFlowIcon',
  model: {
    prop: 'value',
    event: 'update:value'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'log in with'
    }
  },
  methods: {
    emailOrphone (value) {
      this.$emit('update:value', !this.value)
      if (value) {
        this.$store.commit('login/setRegisterEnData', { key: 'area_code', value: '+86' })
        this.$store.commit('login/setLoginEnData', { key: 'area_code', value: '+86' })
      } else {
        this.$store.commit('login/setRegisterEnData', { key: 'area_code', value: '' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.line {
  height: mvw(20);
  margin-top: mvw(20);
  color: #000;
  font-size: mrem(24);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &::after, &::before {
    content: '';
    width: 35%;
    height: mvw(1);
    background-color: #000;
  }
}
figure {
  margin-top: mvw(18);
  text-align: center;

  img {
    width: mvw(32);
  }
}
p {
  color: #000;
  font-size: mrem(24);
}
</style>
