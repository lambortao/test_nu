<template>
  <div id="app">
    <error-alert />
    <NuxtChild />
    <set-cookie />
  </div>
</template>

<script>
import SetCookie from '~/componentsEn/setCookie/index.vue'
export default {
  name: 'AppPage',
  components: {
    SetCookie
  },
  async asyncData ({ store, route, redirect, req }) {
    /** 案例分类 */
    await store.dispatch('site/useCaseChannel')
    /** 产品分类 */
    await store.dispatch('productCategory/getGoodsChannel')
    /** 定位 */
    console.log(`当前运行模式为：${process.env.NODE_ENV}`)
    if (process.env.NODE_ENV === 'production') {
      const ip = process.server ? req.headers['x-forwarded-for'] : null
      console.log(`当前 ip 为：${ip}`)
      console.log(`当前是否为服务端：${process.server}`)
      await store.dispatch('store/useGetIpAddress', { ip })
      if (store.state.store.positionAreaCode === 'CN') {
        const goPath = route.fullPath.split('/en')[1]
        redirect(goPath || '/')
      }
    }
  },
  head: {
    title: 'Nine United',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nine United Group was founded in 2001 and operates in a variety of industries including retail, furniture and healthcare. The group is four Danish home design brands, HAY, &Tradition, Verpan and Frandsen, and the new home inspired interactive space STUDIO 9, are dedicated to providing excellent solutions for contemporary living contexts.' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  created () {
    this.setDevice()
  },
  mounted () {
    const language = ['home/en', 'stg/en'].filter(item => window.location.href.includes(item)).length > 0 ? 'en' : 'cn'
    this.$store.commit('site/setLanguage', language)
    this.$store.commit('login/setOriginBtnText', language)
    this.$store.dispatch('login/createdLoginStatus')
  },
  methods: {
    setDevice () {
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.resizeWindow)
        this.resizeWindow()
      }
    },
    resizeWindow () {
      this.$store.commit('site/setDevice', document.documentElement.clientWidth < 750)
    }
  }
}
</script>
