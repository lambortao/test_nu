// 英文版身份信息数据

export const state = () => ({
  classType: [
    {
      id: 1,
      text: 'General user',
      show: true
    },
    {
      id: 2,
      text: 'Dealer account',
      show: true
    }
  ],
  btnText: 'Send',
  phone: '',
  selected: null,
  agree: false

})

export const mutations = ({
  // 保存手机号
  setPhone (state, data) {
    state.phone = data
  },
  // 保存注册的类型
  setSelected (state, data) {
    state.selected = data
  },
  // 条款、隐私政策
  setAgree (state, data) {
    state.agree = data
  },
  // 保存为员工的信息
  setIsStaff (state, data) {
    state.agree = data
  }
})

export const action = ({
  /** 是否为指定员工 */
  async useCheckStaff ({ commit, state }) {
    try {
      commit('setIsStaff', await this.$axios.$post('/member/isStaff', {
        mobile: state.phone
      }))
    } catch (error) {
      return Promise.reject(error)
    }
  }
})

export const getters = ({
  disabled (state) {
    return !(state.selected && state.agree)
  }
})
