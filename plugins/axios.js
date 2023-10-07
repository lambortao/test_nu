import checkTokenUriList from '~/config/checkTokenUri'
import useCheckToken from '~/utils/useCheckToken'

export default ({ app, store, $axios, redirect, route }) => {
  $axios.onRequest((config) => {
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.headers['Content-Type'] = 'application/json'
    config.headers['Cms-Media-Type'] = 'desktop'

    /**
     * 需要校验 token 的接口
     * 这里把强制校验接口的和非强制校验接口的都加上了
     */
    const allCheckTokenUrl = [...checkTokenUriList.required, ...checkTokenUriList.optional]
    if (useCheckToken(allCheckTokenUrl, config.url)) {
      console.log(`接口：${config.url}，需要进行 token 校验`)
      /** 获取 token 做校验 */
      const tokenData = store.getters['login/getToken']
      const nowTime = new Date().getTime()
      if (tokenData && Object.keys(tokenData).length && nowTime < Date.parse(tokenData?.expireAt?.replace(' ', 'T'))) {
        config.headers.Authorization = tokenData.token
        return config
      }
      /** 判断是否为可选加 token 的 url */
      if (!useCheckToken(checkTokenUriList.optional, config.url)) {
        store.commit('login/logout')
        redirect(route.path.includes('/en') ? '/en/login?isDated=true' : '/login?isDated=true')
        console.log('axios请先登录')
        return Promise.reject(new Error('请先登录'))
      }
    }
  })

  $axios.onResponse((response) => {
    //  || String(response.data.code).length === 5
    if (response.data.code !== 0) {
      const { msg, requestID, code } = response.data
      let errorMsg = msg
      // 如果是 token 失效就清除本地数据
      if (code === 603) {
        store.commit('login/logout')
        /** 如果是可选 token 的就不会弹出 token 过期的弹窗 */
        errorMsg = useCheckToken(checkTokenUriList.optional, response.config.url) ? null : `${msg} - ${requestID}`
      } else if (code < 1000 && code > 99) {
        errorMsg = `${msg} - ${requestID}`
      }
      if (errorMsg) { store.commit('site/setErrorData', errorMsg) }

      return Promise.reject(response.data)
    } else {
      return response.data
    }
  })
  $axios.onError(({ response }) => {
    if (response && response.status === 500) {
      store.commit('site/setErrorData', '网络异常，请稍后重试！- 500')
    }
    return false
  })
}
