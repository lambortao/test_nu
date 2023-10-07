<template>
  <div>
    <div class="line">
      {{ text }}
    </div>
    <figure @click="$emit('update:value', !value)">
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
  }
}
</script>

<style lang="scss" scoped>
div.line {
  height: mvw(20);
  margin-top: mvw(32);
  color: #000;
  font-size: mrem(16);
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
    width: mvw(40);
  }
}
p {
  color: #000;
}
</style>
