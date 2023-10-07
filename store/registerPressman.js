/** 媒体注册 */
export const state = () => ({
  name: '',
  sex: '0',
  pressmanName: '',
  companyEmail: '',
  phoneNumber: '',
  province: '',
  city: '',
  address: '',
  post: '',
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
  }
}

export const actions = {
  async submitData ({ commit, state }, data) {
    try {
      commit('setBtnState', { text: '提交中...', loading: true })
      console.log(state.typeBusiness, state.intent)
      await this.$axios.$post('/identityRegister', {
        identity: 5,
        source: '自然注册',
        route: data,
        mobile: state.phoneNumber,
        name: state.name,
        sex: state.sex,
        media_name: state.pressmanName,
        position: state.post,
        province: state.province,
        city: state.city,
        email: state.companyEmail,
        address: state.address
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
    console.log()
    return !state.btnStatus.loading &&
      state.name &&
      state.phoneNumber &&
      state.province &&
      state.city &&
      state.companyEmail &&
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(state.companyEmail) &&
      /^1[3-9]\d{9}$/.test(state.phoneNumber) &&
      state.pressmanName &&
      state.post
  },
  btnStatus (state) {
    return state.btnStatus
  }
}
