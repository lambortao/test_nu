/** 员工注册 */
export const state = () => ({
  code: '',
  query: {
    loading: false,
    btnText: '提交查询'
  },
  confirmBind: {
    loading: false,
    btnText: '确认绑定'
  },
  data: {}
})

export const mutations = {
  setData (state, data) {
    state.data = data
  },
  setCode (state, code) {
    state.code = code
  },
  setQuery (state, data) {
    state.query = data
  },
  setConfirmBind (state, data) {
    state.confirmBind = data
  }
}

export const actions = {
  /** 员工邮箱提交验证码 */
  async useGetStaffInfo ({ commit, rootState, state }) {
    try {
      commit('setQuery', { loading: true, btnText: '提交中...' })
      commit('setData', await this.$axios.$post('/member/getStaffInfo', {
        email: rootState.login.isStaff.email || rootState.login.memberData.email,
        code: state.code
      }))
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setQuery', { loading: false, btnText: '提交查询' })
    }
  },
  /** 绑定员工账号 */
  async useBindStaff ({ commit, rootState }) {
    try {
      commit('setConfirmBind', { loading: true, btnText: '提交中...' })
      await this.$axios.$post('/member/StaffBind', {
        email: rootState.login.isStaff.email || rootState.login.memberData.email,
        mobile: rootState.login.memberData.mobile
      })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setConfirmBind', { loading: false, btnText: '确认绑定' })
    }
  }
}

export const getters = {
  getCode (state) {
    return state.code
  },
  getData (state) {
    return state.data
  },
  getQuery (state) {
    return state.query
  },
  getConfirmBind (state) {
    return state.confirmBind
  },
  disableQueryBtn (state) {
    return state.code === '' || state.query.loading
  },
  disableConfirmBindBtn (state) {
    return state.confirmBind.loading
  },
  getStaffData (state, getters, rootGetters) {
    return {
      name: state.data.name,
      CompanyName: state.data.CompanyName,
      department: state.data.cost_center,
      phone: rootGetters.login.memberData.mobile,
      email: rootGetters.login.isStaff.email
    }
  }
}
