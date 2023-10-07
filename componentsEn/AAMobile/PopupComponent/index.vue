<template>
  <div :class="['PopupComponent', { active: visible }]">
    <div class="popup" :style="{ height }">
      <span class="close" @click="close" />
      <h3 v-show="title">
        <!-- {{ title }} -->
      </h3>
      <div class="content">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupComponent',
  props: {
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '150vw'
    }
  },
  data () {
    return {
      visible: false
    }
  },
  created () {},
  methods: {
    close () {
      this.$emit('close')
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>

.PopupComponent {
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: -100vh;
  left: 0;
  z-index: 4;
  transition: transform 300ms ease;

  &.active {
    transform: translateY(-100vh);
    transition: background 300ms ease 300ms, transform 300ms ease;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .popup {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: mvw(16);
    width: 100%;
    background-color: #fff;

    h3 {
      margin-bottom: mvw(16);
      font-size: mrem(36);
      letter-spacing: 2px;
      font-weight: 500;
    }
    .content {
      height: 100%;
    }
  }
}
.close {
  width: mvw(14);
  height: mvw(14);
  position: absolute;
  top: mvw(17);
  right: mvw(17);
  background: {
    image: url('~/assets/images/AAmobile/main/close.png');
    size: 100%;
  };
}
</style>
