import path from 'path'
import fs from 'fs'
import routeConfigMothed from './route.js'
import ENV from './config/env'

console.log(process.env.NODE_ENV === 'development' ? '测试版本：' : '生产版本：', ENV[process.env.NODE_ENV])
export default {
  /** 路由配置 */
  router: {
    /** 关闭链接预加载 */
    prefetchLinks: false,
    linkActiveClass: 'nuxt-link-active',
    extendRoutes (routes, resolve) {
      // 该设置用来清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...routeConfigMothed(routes, resolve))
    },
    // middleware: ['ipAddress'],
    base: ENV[process.env.NODE_ENV].BASE_ROUTE
  },
  middleware: [
    '~/middleware/getClientIp.js'
  ],
  render: {
    /** 禁用页面预加载 */
    resourceHints: false
  },
  /** 顶部 loading 样式 */
  loading: {
    color: '#000',
    height: '3px'
  },
  /** 全局 head 设置 */
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' }
    ],
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }
    ]
  },
  /** 全局 CSS */
  css: [
    '~/assets/scss/reset.scss'
  ],
  /** 插件 */
  plugins: [
    '~/plugins/axios',
    '~/plugins/https',
    // vuex 数据保持
    '~/plugins/persistedState.client.js',
    // 全局 mixin
    '~/plugins/globalMixin.js',
    // Google-tag埋点
    { src: '~/plugins/gtag.js', mode: 'client' },
    // 埋点封装
    // { src: '~/plugins/tracking.js', mode: 'client' },
    // 省市区三级联动
    { src: '~/plugins/v-distpicker', mode: 'client' },
    // 手机端自定义组件
    { src: '~/plugins/mobile-components.js', mode: 'client' },
    // 轮播
    { src: '~/plugins/swiper/swiper.js', mode: 'client' },
    // 轮播
    { src: '~/plugins/xss.js', mode: 'client' }
    // vconsole
    // { src: '~/plugins/vconsole.js', mode: 'client' }
  ],
  /** 自动导入组件 */
  components: true,
  /** 需要注入的模块 */
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  /** 全局的 CSS 变量库 */
  styleResources: {
    scss: [
      '~assets/scss/mobile/_func.scss',
      '~assets/scss/default/_fun.scss',
      '~assets/scss/index.scss',
      '~assets/scss/_device.scss',
      '~assets/scss/_include-media.scss',
      '~assets/scss/_breakpoints.scss'
    ]
  },
  /** 模块 */
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/google-gtag',
    'cookie-universal-nuxt', ['cookie-universal-nuxt', { parseJSON: true }]
  ],
  /** axios 基础配置 */
  axios: {
    /** 请求的基本 URL 前缀，该 URL 在 development 不起效 */
    baseURL: ENV[process.env.NODE_ENV].ENV_API,
    proxy: process.env.NODE_ENV === 'development',
    prefix: '/api',
    credentials: true
  },
  // 'google-gtag': {
  //   // id: 'UA-46218131-40',
  //   id: 'G-QCWSB0LEPS',
  //   config: {
  //     anonymize_ip: true,
  //     send_page_view: true,
  //     linker: {
  //       domains: ['domain.com', 'domain.org']
  //     }
  //   },
  //   debug: true,
  //   // 使用 router.afterEach(...) 跟踪每个路由
  //   disableAutoPageTrack: true
  // },
  /** 代理配置 */
  proxy: {
    '/api': {
      target: ENV[process.env.NODE_ENV].ENV_API,
      pathRewrite: {
        '^/api': '',
        changeOrigin: true
      }
    }
  },
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  /** 打包的配置 */
  build: {
    publicPath: ENV[process.env.NODE_ENV].PATH,
    /** css 独立打包 */
    extractCSS: true,
    filenames: {
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
    }
  },
  /** 本地服务端口及host */
  server: {
    port: ENV[process.env.NODE_ENV].PORT, // default: 3000
    host: '0.0.0.0', // default: localhost,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    }
  },
  extend (config) {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.directives = {
          html (node, directiveMeta) {
            /** 重写 v-html 放置 xss 攻击 */
            (node.props || (node.props = [])).push({
              name: 'innerHTML',
              value: `xss(_s(${directiveMeta.value}))`
            })
          }
        }
        return options
      })
  }
}
