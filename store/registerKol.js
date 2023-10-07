/** KOL 注册 */
export const state = () => ({
  socialPlatforms: [],
  platform: {},
  name: '',
  sex: 0,
  province: '',
  city: '',
  phoneNumber: '',
  birthday: '',
  address: '',
  intent: [],
  btnStatus: {
    text: '提交审核人员',
    loading: false
  }
})

export const mutations = {
  setData (state, data) {
    state[data.key] = data.value
  },
  setBtnState (state, data) {
    state.btnStatus = data
  },
  /** 初始化选择项 */
  initPlatform (state, data) {
    state.platform = data
  },
  setPlatform (state, data) {
    state.platform[data.key][data.label] = data.value
  }
}

export const actions = {
  async submitData ({ commit, state }, data) {
    try {
      commit('setBtnState', { text: '提交中...', loading: true })
      await this.$axios.$post('/identityRegister', {
        identity: 4,
        source: '自然注册',
        route: data,
        mobile: state.phoneNumber,
        name: state.name,
        sex: state.sex,
        birthday: state.birthday,
        province: state.province,
        city: state.city,
        address: state.address,
        cooperation_brand: state.intent.join(','),
        platform: state.socialPlatforms.map(item => state.platform[item])
      })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setBtnState', { text: '提交审核人员', loading: false })
    }
  }
}

export const getters = {
  btnDisabled (state) {
    /** 校验平台是否填写完成 */
    let platformPass = true
    if (state.socialPlatforms.length) {
      for (let index = 0; index < state.socialPlatforms.length; index++) {
        const element = state.socialPlatforms[index]
        const nowData = state.platform[element]
        if (!nowData.account || !nowData.link) {
          platformPass = false
          break
        }
      }
    } else {
      platformPass = false
    }

    return !state.btnStatus.loading &&
      platformPass &&
      state.name &&
      state.address &&
      state.city &&
      state.province &&
      state.birthday &&
      state.phoneNumber &&
      /^1[3-9]\d{9}$/.test(state.phoneNumber) &&
      state.intent &&
      state.intent.length
  },
  btnStatus (state) {
    return state.btnStatus
  }
}
