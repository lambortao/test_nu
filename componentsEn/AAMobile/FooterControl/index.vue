<template>
  <footer>
    <slot name="default" />
  </footer>
</template>

<script>
export default {
  name: 'FooterControl',
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: mvw(80);
  padding: mvw(8) mvw(24) mvw(32);
  background-color: #fff;
  box-shadow: 0px -2px 4px rgba(85, 85, 85, 0.05);

  button {
    min-width: mvw(80);
    height: mvw(40);
    padding: 0 mvw(18);
    margin-left: mvw(8);
    transition: all 100ms ease;
    pointer-events: all;
  }
  button.disabled {
    background-color: #ccc;
    pointer-events: none;
  }
}
</style>
