/** 经销商注册 */
export const state = () => ({
  roleOptions: [{
    label: '普通用户',
    value: '普通用户'
  }, {
    label: '设计师',
    value: '设计师'
  },
  {
    label: '经销商',
    value: '经销商'
  },
  {
    label: '博主',
    value: '博主'
  },
  {
    label: '媒体',
    value: '媒体'
  }, {
    label: '品牌合作方',
    value: '品牌合作方'
  }, {
    label: '其他（选择后填写）',
    value: '其他'
  }],
  sexOptions: [{
    label: '先生',
    value: '先生'
  }, {
    label: '女士',
    value: '女士'
  }],
  sexOptionsEn: [{
    label: 'Mr',
    value: 'Mr'
  }, {
    label: 'Ms',
    value: 'Ms'
  }],
  roleOptionsEn: [{
    label: 'Consumer',
    value: 'Consumer'
  }, {
    label: 'Designer',
    value: 'Designer'
  },
  {
    label: 'Dealer',
    value: 'Dealer'
  },
  {
    label: 'KOL',
    value: 'KOL'
  },
  {
    label: 'Media',
    value: 'Media'
  }, {
    label: 'Brand Partner',
    value: 'Brand Partner'
  }, {
    label: 'Others',
    value: 'Others'
  }],
  typeOptions: [{
    label: '零售合作',
    value: '零售合作'
  }, {
    label: 'HAY专营店零售合作',
    value: 'HAY专营店零售合作'
  }, {
    label: '项目合作',
    value: '项目合作'
  }, {
    label: '品牌营销合作',
    value: '品牌营销合作'
  }, {
    label: '媒体合作',
    value: '媒体合作'
  }, {
    label: '场地租赁',
    value: '场地租赁'
  }, {
    label: '建议反馈',
    value: '建议反馈'
  }, {
    label: '其他（选择后填写）',
    value: '其他'
  }],
  typeOptionsEn: [{
    label: 'Retailer',
    value: 'Retailer'
  }, {
    label: 'Project cooperation',
    value: 'Project cooperation'
  }, {
    label: 'Brand/Marketing cooperation',
    value: 'Brand/Marketing cooperation'
  }, {
    label: 'Social Media/Press',
    value: 'Social Media/Press'
  }, {
    label: 'Suggestions',
    value: 'Suggestions'
  }, {
    label: 'Others',
    value: 'Others'
  }],
  formData: {
    type: false, // 是否登录
    role: '',
    roleName: '',
    name: '',
    sex: '',
    mobile: '',
    email: '',
    images: '',
    leavemsg_type: '',
    typeName: '',
    leavemsg_description: '',
    from: 'cn'
  },
  btnStatus: {
    text: '提交',
    loading: false
  },
  btnStatusEn: {
    text: 'Submit', loading: false
  }
})

export const mutations = {
  setData (state, data) {
    state[data.key] = data.value
  },
  setBtnState (state, data) {
    state.btnStatus = data
  },
  setBtnEnState (state, data) {
    state.btnStatusEn = data
  },
  setFormData (state, data) {
    state.formData[data.key] = data.value
    console.log('formData', state.formData)
  }
}

export const actions = {
  async submitData ({ commit, state, dispatch }) {
    try {
      commit('setBtnState', { text: '提交中...', loading: true })
      commit('setBtnEnState', { text: 'Submit...', loading: true })
      await this.$axios.$post('/contactUs', state.formData)
      const path = state.formData.from === 'en' ? '/en' : '/'
      this.$router.push(path)
      dispatch('site/tracker', { event: 'contactus_submit', mode: 'Contactus', page: 'Contactus', label: 'submit', items: [{ userType: state.formData.role, msgType: state.formData.leavemsg_type }] }, { root: true })
    } catch (error) {
      // return Promise.reject(error)
      commit('site/setErrorData', error)
    } finally {
      commit('setBtnState', { text: '提交', loading: false })
      commit('setBtnEnState', { text: 'Submit', loading: false })
    }
  }
}

export const getters = {
  btnDisabled (state) {
    return !state.btnStatus.loading &&
      state.formData.role &&
      state.formData.name &&
      state.formData.sex &&
      state.formData.mobile &&
      state.formData.email &&
      state.formData.leavemsg_type &&
      state.formData.leavemsg_description
  },
  btnDisabledEn (state) {
    return !state.btnStatus.loading &&
      state.formData.role &&
      state.formData.name &&
      state.formData.sex &&
      state.formData.email &&
      state.formData.leavemsg_type &&
      state.formData.leavemsg_description
  },
  btnStatus (state) {
    return state.btnStatus
  }
}
