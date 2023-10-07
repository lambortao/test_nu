import storeLanguage from '~/language/store'
import globalTagOptions from '~/config/areaCode'

const { login: LoginLanguage } = storeLanguage
/** 手机和 PC 公用的注册数据，包含完整的注册流程 */
export const state = () => ({
  /** 登录页数据 */
  enLoginTyoe: 'phone', // email
  // 英文登录页类型
  loginSection: 'login',
  // 提示框
  tipsSection: null,
  tipsContent: {
    title: '',
    details: ''
  },
  isAgreeCheck: false,
  login: {
    country: 'Country/Region',
    countryTag: '+86',
    password: '',
    phoneNumber: '',
    email: '',
    code: '',
    loading: false,
    btnText: 'Sign in / Register',
    area_code: '',
    'fm-login-id': '',
    countryTagOptions: [{
      value: '+86',
      label: '+86'
    }]
  },
  originBtnText: '登录/注册',
  /** 是否是员工账号 */
  isStaff: {},
  /** 用户数据 */
  memberData: {},
  loginRes: {},
  // 是否是微信登录流程
  isWechat: false,
  user: {
    uid: '',
    isLogin: false,
    name: '',
    phone: '',
    tag: '',
    head: ''
  },
  areaCode: globalTagOptions.map(item => ({
    label: `+${item.tel} (${item.en})`,
    value: `+${item.tel}`
  })),
  changePwdData: {
    oldpassword: '',
    newpassword: '',
    pass_confirm: ''
  },
  /** 英文登录信息 */
  loginEn: {
    area_code: '',
    'fm-login-id': '',
    password: ''
  },
  /** 英文注册信息 */
  registerData: {
    area_code: '',
    'fm-login-id': '',
    code: '',
    password: '',
    pass_confirm: ''
  },
  /** 注册步骤 */
  // step: null,
  step: 'personnel-step1',
  /** 英文注册步骤流程 */
  enStep: 'index',
  // 英文版员工邮箱
  staffEn: {
    staffEmail: '',
    code: '',
    type: false
  },
  // 英文版员工绑定信息
  staffBIndInfo: {}
})

/** 事件注册 */
export const mutations = {
  // 提示框内容修改
  setTipsContent (state, data) {
    state.tipsContent = data
  },
  setWechatFlow (state, flow) {
    state.isWechat = flow
  },
  /** 修改英文的注册步骤 */
  setEnStep (state, step) {
    state.enStep = step
  },
  logout (state) {
    state.login = {
      countryTag: '+86',
      phoneNumber: '',
      code: '',
      loading: false,
      btnText: state.originBtnText
    }
    state.isStaff = {}
    state.memberData = {}
    state.loginRes = {}
    state.step = null
    state.user = {
      uid: '',
      isLogin: false,
      name: '',
      phone: '',
      tag: '',
      head: ''
    }
    window.localStorage.removeItem('NU_USERSDATA')
  },
  /** 设置 token */
  setToken (state, data) {
    state.loginRes = data
  },
  /** 设置用户数据 */
  setUsersData (state, data) {
    state.user = data
  },
  /** 设置按钮的文案 */
  setBtnText (state, text) {
    state.login.btnText = text
  },
  /** 是否是员工 */
  setIsStaff (state, data) {
    state.isStaff = data
  },
  /** 设置会员数据 */
  setMemberData (state, data) {
    state.memberData = data
  },
  /** 设置会员的具体数据 */
  setMemberDataSigin (state, data) {
    state.memberData[data.key] = data.value
  },
  /** 设置loading状态 */
  setLoadingStatus (state, loading) {
    state.login.loading = loading
  },
  /** 设置 login 数据的状态 */
  setLoginData (state, data) {
    state.login[data.key] = data.value
  },
  /** 设置当前的注册步骤 */
  setRegisterStep (state, step) {
    state.step = step
  },
  /** 修改头像 */
  setHeaderUrl (state, data) {
    state.memberData.headimgurl = data
  },
  /** 设置按钮初始语言 */
  setOriginBtnText (state, language) {
    state.originBtnText = LoginLanguage.Login[language]
    state.login.btnText = LoginLanguage.Login[language]
  },
  /** *设置英文登录方式 */
  setEnLoginTyoe (state, data) {
    state.enLoginTyoe = data
  },
  setAgreeStatus (state, data) {
    state.isAgreeCheck = data
  },
  setLoginSection (state, data) {
    state.loginSection = data
  },
  // 提示框
  setTipsSection (state, data) {
    state.tipsSection = data
  },
  setLoginEnData (state, data) {
    console.log(data.value)
    state.loginEn[data.key] = data.value
  },
  setRegisterEnData (state, data) {
    state.registerData[data.key] = data.value
  },
  // 初始化英文版注册信息
  initialize (state, data) {
    console.log('初始化')
    state.registerData = {
      area_code: '',
      'fm-login-id': '',
      code: '',
      password: '',
      pass_confirm: ''
    }
  },
  // 初始化英文版员工绑定信息
  initStaffInfo () {
    state.staffBIndInfo = {}
  },
  // 修改员工邮箱
  setStaffEmail (state, data) {
    state.staffEn.staffEmail = data
  },
  // 修改员工验证码
  setStaffCode (state, data) {
    state.staffEn.code = data
  },
  // 修改员工绑定状态
  setStaffType (state, data) {
    state.staffEn.type = data
  },
  // 修改员工绑定信息
  setStaffBIndInfo (state, data) {
    state.staffBIndInfo = data
  }
}

export const actions = {
  a () {
    console.log(Date.parse('2023-01-06 19:32:00'))
  },
  /** 初始加载的时候如果有注册步骤就执行清空注册信息 */
  createdLoginStatus ({ commit, state }) {
    if (state.step && state.step !== 'done') {
      commit('logout')
      commit('setRegisterStep', null)
    }
  },
  /** 中文登录 */
  async memberLogin ({ commit, state }) {
    try {
      const result = await this.$axios.$post('/member/login/?c=mobile', {
        mobile: parseInt(state.login.phoneNumber),
        code: state.login.code
      })
      console.log('登录成功')
      commit('setToken', result)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  /** 英文登录 */
  async memberLoginEn ({ commit, state, dispatch }) {
    try {
      const postData = { ...state.loginEn }
      if (postData['fm-login-id'].includes('@')) {
        delete postData.area_code
      }
      const result = await this.$axios.$post('member/websiteLogin?c=mobile', postData)
      commit('setToken', result)
      commit('setLoginEnData', {
        key: 'fm-login-id',
        value: ''
      })
      commit('setLoginEnData', {
        key: 'password',
        value: ''
      })
      await dispatch('useGetMemberDataEn')
      this.$router.push('/en/user?pos=setting')
    } catch (error) {
      return Promise.reject(error)
    }
  },
  /** 英文注册 */
  async registerConfirm ({ commit, state, dispatch }, data) {
    /** 获取后台内容 */
    /** ... 调接口 */
    // 分渠道
    try {
      const newData = {
        source: '自然注册',
        route: data
      }
      const postData = { ...state.registerData, ...newData }
      if (postData['fm-login-id'].includes('@')) {
        delete postData.area_code
      }
      const result = await this.$axios.$post('member/websiteRegister', postData)
      console.log(result)
      // 设置 token
      commit('setToken', result)
      // 然后使用 token 获取当前用户信息
      await dispatch('useGetMemberDataEn')
      // 初始化注册信息
      // commit('initialize')
      // commit('setLoginSection', 'login')
      // this.$router.push('/en')
    } catch (error) {
      return new Promise.Reject('error')
      // if (error.data.email) {
      //   await commit('setStaffEmail', error.data.email)
      //   commit('setLoginSection', 'staff-login')
      // }
      // commit('site/setErrorData', error)
    }
  },
  // 绑定员工账号
  async bindStaff ({ commit, state }) {
    const newData = {
      code: state.staffEn.code,
      'fm-login-id': state.staffEn.staffEmail,
      password: state.registerData.password,
      pass_confirm: state.registerData.pass_confirm
    }
    const result = await this.$axios.$post('member/accountActivation', newData)
    // 保存员工绑定信息
    commit('setStaffBIndInfo', result)
    // 初始化注册信息
    // await commit('initialize')
  },
  /** 英文发送验证码 */
  async sendCode ({ commit, state }) {
    try {
      const postData = {
        'fm-login-id': state.registerData['fm-login-id']
      }

      if (!state.registerData['fm-login-id'].includes('@')) {
        postData.area_code = state.registerData.area_code
        postData.type = 1
      } else {
        postData.type = 1
      }
      const result = await this.$axios.$post('/member/SendCode', postData)
      console.log(result)
    } catch (error) {
      commit('site/setErrorData', error)
      // return Promise.reject(error)
    }
  },
  /** 是否为指定员工 */
  async useCheckStaff ({ commit, state }) {
    try {
      commit('setIsStaff', await this.$axios.$post('/member/isStaff', {
        mobile: parseInt(state.login.phoneNumber)
      }))
    } catch (error) {
      return Promise.reject(error)
    }
  },
  /** 中文获取用户信息 */
  async useGetMemberData ({ commit, state }) {
    try {
      const result = await this.$axios.$post('/member/info', {
        mobile: state.login.phoneNumber
      })
      commit('setMemberData', result)
      /** 清除验证码 */
      commit('setLoginData', {
        key: 'code',
        value: ''
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  /** 英文获取用户信息 */
  async useGetMemberDataEn ({ commit }) {
    console.log('获取用户信息')
    try {
      commit('setMemberData', await this.$axios.$post('/member/Websiteinfo'))
      console.log('获取成功了')
      /** 清除验证码 */
      commit('setLoginData', {
        key: 'code',
        value: ''
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  /**
   * 登录注册流程
   * 1. 登录接口
   * 2. 是否为已注册
   * 3. 是否为员工
   */
  async initLoginFlow ({ commit, dispatch, state, rootState }) {
    commit('setLoadingStatus', true)
    commit('setBtnText', LoginLanguage.loading[rootState.site.language])
    try {
      /** 登录，校验验证码 */
      await dispatch('memberLogin')
      /** 设置本地数据 */
      await commit('setToken', state.loginRes)
      await commit('setBtnText', LoginLanguage.identity[rootState.site.language])
      /** 获取会员信息，判断是否已经注册 */
      await dispatch('useGetMemberData')
      if (state.memberData.status) {
        /** 已注册 */
      } else {
        /** 未注册，再判断是否是员工身份 */
        await dispatch('useCheckStaff')
      }
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('setBtnText', LoginLanguage.Login[rootState.site.language])
      commit('setLoadingStatus', false)
    }
  },
  /** 使用 openid 更新 token */
  async wechatUpdateToken ({ commit }, postData) {
    try {
      commit('setToken', await this.$axios.$post('/member/website/token', postData))
    } catch (error) {
      console.log(error)
    }
  },
  /** 微信登录，手机号校验 */
  scanCheckMobile ({ state, commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/member/scanCheckmobile', {
        mobile: parseInt(state.login.phoneNumber),
        code: state.login.code
      }).then((data) => {
        commit('setWechatFlow', true)
        resolve(data)
      }).catch((e) => {
        reject(e)
      })
    })
  },
  // 英文版经销商注册
  async registerPartner ({ state, commit, dispatch }, data) {
    try {
      console.log(data)
      delete data.btnStatus
      // 注册信息，以及经销商填写信息
      const newData = {
        ...state.registerData,
        identity: '3',
        source: '自然注册',
        route: data.route,
        first_name: data.firstName,
        last_name: data.lastName,
        sex: data.sex,
        company_name: data.companyName,
        company_position: data.ranking,
        company_address: data.companyAddress,
        company_email: data.email,
        cmobile: data.area_code + '-' + data.phone,
        cooperation_brand: data.intent.join(','),
        company_website: data.website,
        country_region: data.intention
      }
      const result = await this.$axios.$post('member/websiteIdentity', newData)
      console.log(result, 'resultresult')
      // 设置 token
      commit('setToken', result)
      // 然后使用 token 获取当前用户信息
      await dispatch('useGetMemberDataEn')
      // 初始化注册信息
      // await commit('initialize')
      // await commit('setLoginSection', 'login')
    } catch (error) {
      return new Promise.Reject('error')
      // if (error.code === 40001) {
      //   await commit('setStaffEmail', error.data.email)
      //   await commit('setStaffType', error.data.type)
      //   await commit('setLoginSection', 'staff-login')
      //   return new Promise.Reject('error')
      // } else {
      //   return new Promise.Reject('error')
      // }
    }

    // try {
    //   const result = await this.$axios.$post('member/websiteIdentity', 1)
    //   console.log(result)
    // } catch (error) {
    //   console.log(error)
    // }
  },
  // 英文版检测是否为员工
  async isStaffFn ({ state, commit }) {
    const newData = {
      'fm-login-id': state.registerData['fm-login-id'],
      area_code: state.registerData.area_code,
      code: state.registerData.code,
      password: state.registerData.password,
      pass_confirm: state.registerData.pass_confirm
    }
    const result = await this.$axios.$post('member/is_StaffEn', newData)
    await commit('setStaffEmail', result.email)
    await commit('setStaffType', result.type)
    console.log(result)
  }
}

/** 内容获取 */
export const getters = {
  getCodeIsActive (state) {
    return /^1[3-9]\d{9}$/.test(state.login.phoneNumber) && state.login.code !== '' && !state.login.loading && state.isAgreeCheck
  },
  getEnbtnIsActive (state) {
    return state.loginEn['fm-login-id'] !== '' && state.loginEn.password !== '' && state.isAgreeCheck
  },
  getRegisterBtnIsActive (state) {
    return state.registerData['fm-login-id'] !== '' && state.registerData.code !== '' && state.registerData.password !== '' && state.registerData.pass_confirm !== '' && state.isAgreeCheck
  },
  getToken (state) {
    return state.loginRes ? state.loginRes : {}
  },
  /** 获取注册步骤 */
  getRegisterStep (state) {
    return state.step
  },
  getMemberPhoneNumber (state) {
    return state.memberData ? state.memberData.mobile : ''
  },
  getMember (state) {
    return Object.assign(state.memberData, state.loginRes)
  },
  /** 校验登录状态 */
  checkLoginStatus (state) {
    /**
     * 有 token、过期时间、（邮箱或者手机号）才能算登录成功
     */

    if (state.loginRes.token && state.loginRes.expireAt && (state.memberData.email || state.memberData.mobile)) {
      const nowTime = new Date().getTime()
      const tokenTime = new Date(state.loginRes.expireAt.replace(' ', 'T')).getTime()
      return nowTime < tokenTime
    }
    return false
  },
  getStaffData (state) {
    return {
      phone: state.memberData.mobile,
      email: state.memberData.email,
      birthday: state.memberData.birthday
    }
  },
  getIdentity (state) {
    const nowIdentity = typeof state.memberData.identity === 'string'
      ? state.memberData.identity.split(',')
      : []
    return nowIdentity
  },
  // 验证数据是否填写
  notEmpty (state) {
    return state.registerData['fm-login-id'] !== '' && state.registerData.code !== '' && state.registerData.password !== '' && state.registerData.pass_confirm !== ''
  }
}
