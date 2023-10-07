<template>
  <div id="app">
    <error-alert />
    <NuxtChild />
  </div>
</template>

<script>
export default {
  name: 'AppPage',
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
      if (store.state.store.positionAreaCode !== 'CN') {
        redirect(`/en${route.fullPath}`)
      }
    }
  },
  head: {
    title: 'Nine United官网',
    htmlAttrs: {
      lang: 'zh-cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Nine United 集团创始于2001年，业务涵盖零售、家具和医疗等多个行业。集团旗下拥有四大丹麦家居设计品牌：HAY , &Tradition , Verpan 和 Frandsen ，与全新的家居灵感交互空间 STUDIO 9，致力为当代居住语境提供优良解决方案。' },
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
