import Vue from 'vue'
import tracking from '~/utils/tracking.js'

// 绑定到全局 vue。$data自己申明的全局变量
Vue.prototype.$tracking = tracking
