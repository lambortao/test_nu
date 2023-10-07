/* eslint-disable vue/component-definition-name-casing */
import Vue from 'vue'
import FormLabel from '@/components/AAMobile/FormLabel/index.vue'
import BigButtion from '@/components/AAMobile/MobileButton/index.vue'
import MInput from '@/components/AAMobile/InputComponent/input.vue'
import MButton from '@/components/AAMobile/InputComponent/button.vue'
import MSelect from '@/components/AAMobile/InputComponent/select.vue'
import MTag from '@/components/AAMobile/InputComponent/tag.vue'
import MRadio from '@/components/AAMobile/InputComponent/radio.vue'
import FooterControl from '@/components/AAMobile/FooterControl/index.vue'
import HeaderBack from '@/components/AAMobile/HeaderBack/index.vue'
import VerifyCode from '@/components/AAMobile/VerifyCode/index.vue'
import LoginDone from '@/components/AAMobile/Done/index.vue'
import OtherPages from '@/components/AAMobile/OtherPages/index.vue'
import SortBtn from '@/components/AAMobile/SortBtn/index.vue'
import SmallTags from '@/components/AAMobile/TagsList/index.vue'
import VBtn from '@/components/AAMobile/VBtn/index.vue'

import PlaceholderLoading from '@/components/DataLoading/index.vue'

Vue.component('form-label', FormLabel)
Vue.component('big-button', BigButtion)
Vue.component('m-input', MInput)
Vue.component('m-button', MButton)
Vue.component('m-select', MSelect)
Vue.component('m-tag', MTag)
Vue.component('m-radio', MRadio)
Vue.component('footer-control', FooterControl)
Vue.component('verify-code', VerifyCode)
Vue.component('header-back', HeaderBack)
Vue.component('login-done', LoginDone)
Vue.component('other-pages', OtherPages)
Vue.component('sort-btn', SortBtn)
Vue.component('s-tags', SmallTags)
Vue.component('v-btn', VBtn)
Vue.component('v-placeholder', PlaceholderLoading)
