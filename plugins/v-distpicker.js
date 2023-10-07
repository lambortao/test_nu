import Vue from 'vue'
import VDistpicker from 'v-distpicker'
import WxLogin from 'vue-wxlogin'
import { getMainColor } from 'image-main-color'

Vue.component('VDistpicker', VDistpicker)
Vue.component('WxLogin', WxLogin)
Vue.prototype.$isWx = navigator.userAgent.toLowerCase().includes('micromessenger')
Vue.prototype.$getMainColor = getMainColor
