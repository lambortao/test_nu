/** 经销商注册 */
export const state = () => ({
  intention: 0,
  name: '',
  sex: 0,
  companyAddress: '',
  companyName: '',
  province: '',
  city: '',
  email: '',
  website: '',
  phoneNumber: '',
  ranking: '',
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
  }
}

export const actions = {
  async submitData ({ commit, state }, data) {
    try {
      commit('setBtnState', { text: '提交中...', loading: true })
      await this.$axios.$post('/identityRegister', {
        identity: 3,
        source: '自然注册',
        route: data,
        mobile: state.phoneNumber,
        name: state.name,
        sex: state.sex,
        cooperation_intention: state.intention,
        company_name: state.companyName,
        position: state.ranking,
        province: state.province,
        city: state.city,
        company_address: state.companyAddress,
        email: state.email,
        cooperation_brand: state.intent.join(','),
        company_website: state.website,
        business_license: ''
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
    return !state.btnStatus.loading &&
      state.intention &&
      state.name &&
      state.companyName &&
      state.province &&
      state.city &&
      state.phoneNumber &&
      /^1[3-9]\d{9}$/.test(state.phoneNumber) &&
      state.ranking &&
      state.intent &&
      state.intent.length
  },
  btnStatus (state) {
    return state.btnStatus
  }
}
