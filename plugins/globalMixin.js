/**
 * 全局注册的 mixin
 */
import Vue from 'vue'

const mixin = {
  data () {
    return {
      env: null
    }
  },
  mounted () {
    this.env = process.env.NODE_ENV
  }
}

Vue.mixin(mixin)
