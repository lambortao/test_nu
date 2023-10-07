import Vue from 'vue'
import VueGtag from 'vue-gtag'
// 正式id：G-N16HR64S1Z
// 测试id：G-QCWSB0LEPS
Vue.use(VueGtag, {
  config: {
    appName: 'Nine United',
    id: 'G-N16HR64S1Z',
    debug: true
  }
})
