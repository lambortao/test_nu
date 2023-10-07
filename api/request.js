import axios from 'axios'
import checkTokenUriList from '~/config/checkTokenUri'
import useCheckToken from '~/utils/useCheckToken'

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://nineunited.brandsh.cn/api' : '/api'
})

export default ({ store }) => {
  request.interceptors.request.use((config) => {
    config.headers['Cms-Media-Type'] = 'desktop'

    /** 需要校验 token 的接口 */
    if (useCheckToken(checkTokenUriList, config.url)) {
      console.log(`接口：${config.url}，需要进行 token 校验`)
      /** 获取 token 做校验 */
      const tokenData = store.getters['login/getToken']
      const nowTime = new Date().getTime()
      if (tokenData && nowTime < Date.parse(tokenData.expireAt.replace(' ', 'T'))) {
        config.headers.Authorization = tokenData.token
      } else {
        // redirect('/login?isDated=true')
      }
    }
    return config
  })

  request.interceptors.response.use((response) => {
    console.log(444)

    if (response.data.code !== 0) {
      const { msg, requestID, code } = response.data
      let errorMsg = msg
      if (code < 1000 && code > 99) {
        errorMsg = `${msg} - ${requestID}`
      }
      store.commit('site/setErrorData', errorMsg)
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  })
}
