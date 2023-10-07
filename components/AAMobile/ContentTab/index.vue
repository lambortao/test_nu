<!-- eslint-disable vue/multiline-html-element-content-newline -->
<template>
  <div :class="['ContentTab', { center }]">
    <header v-show="title">
      <h3>{{ title }}</h3>
      <slot name="header-control" />
    </header>
    <div :class="['nav-list', { 'hide-title': !title }]">
      <nav>
        <p
          v-for="item in navList"
          :key="item.value"
          :class="{ active: activeKey === item.value }"
          @click="handleActivetyKey(item.value)"
        >{{ item.label }}</p>
      </nav>
      <slot name="tabsright" />
    </div>
    <div class="pane-box">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentTab',
  model: {
    prop: 'activeKey',
    event: 'update:activeKey'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    activeKey: {
      type: [String, Number],
      default: null
    },
    center: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      navList: []
    }
  },
  watch: {
    activeKey () {
      this.updateStatus()
    }
  },
  mounted () {
    this.init()
    this.updateStatus()
  },
  methods: {
    init () {
      this.getPane().forEach((pane, index) => {
        this.navList.push({
          label: pane.$attrs.label,
          value: pane.$attrs.value || index
        })
        if (index === 0 && !this.activeKey) {
          this.handleActivetyKey(pane.$attrs.value)
        }
      })
    },
    handleActivetyKey (key) {
      this.$emit('update:activeKey', key)
    },
    getPane () {
      return this.$children.filter((item) => {
        return item.$options.name === 'TabPane'
      })
    },
    updateStatus () {
      this.getPane().forEach((tab) => {
        tab.show = tab.$attrs.value === this.activeKey
      })
    },
    hidePane (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>

.ContentTab {
  padding: mvw(24);

  header {
    margin-bottom: mvw(24);
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: mrem(42);
    }
  }
  .nav-list {
    display: flex;
    justify-content: space-between;
    border-bottom: mvw(1) solid #eee;
    padding-bottom: mvw(14);

    &.hide-title {
      padding: mvw(14) 0;
    }
  }
  nav {
    display: flex;
    justify-content: flex-start;

    p {
      height: mvw(32);
      line-height: mvw(32);
      margin-right: mvw(32);
      color: rgba($color: #000000, $alpha: 0.4);
      transition: all 300ms ease;
      position: relative;
      text-align: left;

      &:after {
        content: '';
        position: absolute;
        height: mvw(2);
        width: 100%;
        left: 0;
        bottom: mvw(-14);
        background-color: transparent;
        transition: all 300ms ease;
      }
    }
    p.active {
      color: #000;

      &:after {
        background-color: #000;
      }
    }
  }
  .pane-box {
    padding-top: mvw(24);
  }
}
.ContentTab.center {
  padding: 0;

  .nav-list {
    justify-content: center;
  }
  nav {
    p {
      margin: 0 mvw(30);
    }
  }
}
</style>
