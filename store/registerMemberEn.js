/** 经销商注册 */
export const state = () => ({
  intention: '',
  firstName: '',
  lastName: '',
  sex: '0',
  companyAddress: '',
  companyName: '',
  // province: '',
  // city: '',
  email: '',
  area_code: '+93',
  phone: '',
  website: '',
  // phoneNumber: '',
  ranking: '',
  intent: [],
  btnStatus: {
    text: '提交审核人员',
    loading: false
  }
})

export const mutations = {
  setData (state, data) {
    console.log(data)
    state[data.key] = data.value
  },
  setBtnState (state, data) {
    state.btnStatus = data
  },
  // 保存手机号
  setPhone (state, data) {
    state.phoneNumber = DataTransferItemList
  },
  // 初始化经销商填表记录
  initializePartner (state) {
    state.intention = ''
    state.firstName = ''
    state.lastName = ''
    state.sex = '0'
    state.companyAddress = ''
    state.companyName = ''
    state.email = ''
    state.area_code = '+93'
    state.phone = ''
    state.website = ''
    state.ranking = ''
    state.intent = []
    state.btnStatus = {
      text: '提交审核人员',
      loading: false
    }
  }
}

export const actions = {
  async submitData ({ commit, state }, data) {
    try {
      const newData = {
        identity: 3,
        source: '自然注册',
        route: data.route,
        country_region: data.intention,
        first_name: data.firstName,
        last_name: data.lastName,
        sex: data.sex,
        company_name: data.companyName,
        company_position: data.ranking,
        company_address: data.companyAddress,
        company_email: data.email,
        cooperation_brand: data.intent.join(','),
        company_website: data.website,
        area_code: data.area_code,
        'fm-login-id': data['fm-login-id'
        ],
        code: data.code,
        password: data.password,
        pass_confirm: data.pass_confirm
      }
      const result = await this.$axios.$post('member/websiteIdentity', newData)
      console.log(result, '2222222')
      // 初始化注册信息
      await commit('login/initialize')
    } catch (error) {
      console.log(error.code)
      if (error.data.email) {
        await commit('login/setStaffEmail', error.data.email)
        await commit('login/setLoginSection', 'staff-login')
      } else {
        return new Promise.Reject('error')
      }
    }
    // try {
    //   commit('setBtnState', { text: '提交中...', loading: true })
    //   await this.$axios.$post('/identityRegister', {
    //     identity: 3,
    //     source: '自然注册',
    //     route: data,
    //     mobile: state.phoneNumber,
    //     name: state.name,
    //     sex: state.sex,
    //     cooperation_intention: state.intention,
    //     company_name: state.companyName,
    //     position: state.ranking,
    //     province: state.province,
    //     city: state.city,
    //     company_address: state.companyAddress,
    //     email: state.email,
    //     cooperation_brand: state.intent.join(','),
    //     company_website: state.website,
    //     business_license: ''
    //   })
    // } catch (error) {
    //   return Promise.reject(error)
    // } finally {
    //   commit('setBtnState', { text: '提交审核人员', loading: false })
    // }
  }
}

export const getters = {
  // state.province && state.city &&
  btnDisabled (state) {
    return !state.btnStatus.loading &&
      state.intention.trim() !== '' &&
      state.firstName.trim() !== '' &&
      state.lastName.trim() !== '' &&
      state.companyName.trim() !== '' &&
      state.companyAddress.trim() !== '' &&
      state.ranking.trim() &&
      state.email.trim() &&
      state.phone.trim() &&
      state.website.trim() &&
      state.intent &&
      state.intent.length
  },
  btnStatus (state) {
    return state.btnStatus
  }
}
