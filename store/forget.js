export const state = () => ({
  /** 详情页数据 */
  postData: {
    area_code: '+86',
    'fm-login-id': '',
    code: '',
    password: '',
    pass_confirm: ''
  },
  result: null,
  disabledBtn: false,
  btnText: 'Send',
  countDownNumber: 60
})

export const mutations = {
  /** 设置数据列表 */
  setPostData (state, data) {
    console.log(data)
    state.postData[data.key] = data.value
  },
  setResult (state, data) {
    state.result = data
  }
}
export const actions = {
  // 忘记密码接口
  async confirmForgetPwd ({ commit, state }) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      const postData = { ...state.postData }
      if (postData['fm-login-id'].includes('@')) {
        postData.area_code = ''
      }
      const result = await this.$axios.$post('/member/resetPwd', postData)
      commit('setResult', Boolean(result))
      commit('login/setLoginSection', 'login', { root: true })
      // this.$router.push('/en/login')
    } catch (error) {
      commit('site/setErrorData', error.msg, { root: true })
    }
  },
  // 发送验证码
  async sendCode ({ commit, state }) {
    try {
      this.disabledBtn = true
      this.btnText = '发送中...'
      const requestBody = {
        'fm-login-id': state.postData['fm-login-id']
      }
      if (!requestBody['fm-login-id'].includes('@')) {
        requestBody.area_code = state.postData.area_code
      } else {
        requestBody.type = 3
      }
      const result = await this.$axios.$post('/member/SendCode', requestBody)
      commit('setResult', result)
    } catch (error) {
      commit('site/setErrorData', error)
      // return Promise.reject(error)
    }
  }
}

export const getters = {
  /** 获取数据列表 */
  getCodeIsActive (state) {
    return !!(state.postData['fm-login-id'] !== '' && state.postData.code !== '' && state.postData.password !== '' && state.postData.pass_confirm !== '')
  }
}
