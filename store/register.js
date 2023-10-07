/** 注册过程中的数据 */

export const state = () => ({
  // 员工
  personnel: {
    code: '',
    data: {}
  },
  // 普通用户
  member: {},
  // 设计师
  stylist: {},
  // 博主
  kol: {},
  // 媒体
  pressman: {},
  // 经销商
  dealer: {}
})

/** 事件注册 */
export const mutations = {
  setPersonnel (state, data) {
    state.personnel[data.key] = data.value
  },
  setMember (state, data) {
    state.member[data.key] = data.value
  },
  setStylist (state, data) {
    state.stylist[data.key] = data.value
  },
  setKol (state, data) {
    state.kol[data.key] = data.value
  },
  setPressman (state, data) {
    state.pressman[data.key] = data.value
  },
  setDealer (state, data) {
    state.dealer[data.key] = data.value
  }
}

export const actions = {
  /** 员工邮箱提交验证码 */
  async useGetStaffInfo ({ commit }) {
    try {
      const value = await this.$axios.$post('/member/getStaffInfo', {
        mobile: parseInt(state.login.phoneNumber)
      })
      commit('setPersonnel', {
        key: 'data',
        value
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

/** 内容获取 */
export const getters = {
  getPersonnel (state) {
    return state.personnel
  },
  getMember (state) {
    return state.member
  },
  getStylist (state) {
    return state.stylist
  },
  getKol (state) {
    return state.kol
  },
  getPressman (state) {
    return state.pressman
  },
  getDealer (state) {
    return state.dealer
  }
}
