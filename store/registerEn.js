export const state = () => ({
  /** 详情页数据 */
  postData: {
    area_code: '',
    'fm-login-id': '',
    code: '',
    password: '',
    pass_confirm: ''
  },
  registerData: {
    area_code: '',
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
  setRegisterData (state, data) {
    state.registerData[data.key] = data.value
    console.log(state.registerData)
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
      const result = await this.$axios.$post('/member/resetPwd', state.postData)
      commit('setResult', Boolean(result))
      this.$router.push('/en/login')
    } catch (error) {
      commit('site/setErrorData', error)
      // return Promise.reject(error)
    }
  },
  // 发送验证码
  async sendCode ({ commit, state }, { type }) {
    try {
      this.disabledBtn = true
      this.btnText = '发送中...'
      const requestBody = type === 'register'
        ? {
            area_code: state.registerData.area_code,
            'fm-login-id': state.registerData['fm-login-id']
          }
        : {
            area_code: state.postData.area_code,
            'fm-login-id': state.postData['fm-login-id']
          }
      const result = await this.$axios.$post('/member/SendCode', requestBody)
      commit('setResult', result)
    } catch (error) {
      commit('site/setErrorData', error)
      // return Promise.reject(error)
    }
  },
  // 英文注册 /api/member/websiteRegister
  async registerConfirm ({ commit, state }) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      const result = await this.$axios.$post('member/websiteRegister', state.registerData)
      console.log(result)
      this.$router.push('/en')
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
  },
  getRegisterBtnIsActive (state) {
    return !!(state.registerData['fm-login-id'] !== '' && state.registerData.code !== '' && state.registerData.password !== '' && state.registerData.pass_confirm !== '')
  }
}
