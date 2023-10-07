/** 设计师注册 */
export const state = () => ({
  position: null,
  // 主营设计方向
  typeBusiness: [],
  // 合作意向
  intentionToCooperate: null,
  name: null,
  sex: 0,
  phoneNumber: null,
  companyName: null,
  address: null,
  province: null,
  city: null,
  ranking: null,
  intent: [],
  email: null,
  website: null,
  remark: null,
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
        identity: 2,
        source: '自然注册',
        route: data,
        mobile: state.phoneNumber,
        name: state.name,
        organization: state.position,
        design_direction: state.typeBusiness.join(','),
        sex: state.sex,
        cooperation_intention: state.intentionToCooperate,
        company_name: state.companyName,
        position: state.ranking,
        province: state.province,
        city: state.city,
        company_address: state.address,
        email: state.email,
        cooperation_brand: state.intent.join(','),
        company_website: state.website,
        case_description: state.remark
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
      state.position &&
      state.intentionToCooperate &&
      state.typeBusiness &&
      state.typeBusiness.length &&
      state.name &&
      state.phoneNumber &&
      /^1[3-9]\d{9}$/.test(state.phoneNumber) &&
      state.companyName &&
      state.province &&
      state.city &&
      state.ranking &&
      state.intent &&
      state.intent.length &&
      state.email &&
      /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(state.email)
  },
  btnStatus (state) {
    return state.btnStatus
  }
}
