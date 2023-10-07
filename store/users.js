/* eslint-disable indent */
import axios from 'axios'
import forMate from '~/utils/forMate'
// import { checkPhone } from '~/utils/useCheck'

/** 用户相关的数据 */
export const state = () => ({
  user: {
    uid: '',
    isLogin: false,
    name: '',
    phone: '',
    tag: '',
    head: ''
  },
  newData: {
    status: '',
    nickname: '',
    headimgurl: '',
    birthday: '',
    phone: '',
    email: ''
  },
  enNewData: {
    status: '',
    fullname: '',
    headimgurl: '',
    country: '',
    birthday: '',
    area_code: '+86',
    phone: '',
    email: ''
  },
  /** 提交中 */
  submit: {
    disabled: false,
    text: '确认',
    enText: 'Confirm'
  },
  /** 验证码 */
  verification: {
    text: '获取验证码',
    enText: 'Get Code',
    code: '',
    disabledBtn: false
  },
  countDownNumber: 60,
  confirmChangeBtnStatus: true,
  step: ''
})

export const mutations = {
  setUsers (state, data) {
    state.user = data
  },
  setNewData (state, data) {
    state.newData[data.key] = data.value
  },
  setEnNewData (state, data) {
    state.enNewData[data.key] = data.value
  },
  setSubmit (state, data) {
    state.submit = data
  },
  setStep (state, step) {
    state.step = step
  },
  setVerification (state, data) {
    state.verification[data.key] = data.value
  },
  setAllVerification (state, data) {
    state.verification = data
  },
  setCountDownNumber (state, number) {
    state.countDownNumber = number
  },
  setConfirmChangeBtnStatus (state, data) {
    state.confirmChangeBtnStatus = data
  }
}

export const actions = {
  async setUserInfo ({ state, commit, rootState }) {
    const postData = { ...state.newData }
    try {
      commit('setSubmit', { disabled: true, text: '提交中...' })
      await axios({
        method: 'post',
        url: '/api/member/setUserInfo',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: rootState.login.loginRes.token
        },
        data: postData
      })
      commit('site/setErrorData', '修改成功', { root: true })
      commit('setStep', '')
    } catch (error) {
      console.log(error)
    } finally {
      commit('setSubmit', { disabled: false, text: '确认' })
    }
  },
  async setEnUserInfo ({ state, commit, rootState }, data) {
    let postData = { ...state.enNewData }
    if (data) {
      postData = new FormData()
      postData.append('headimgurl', data.target.files[0])
    }
    try {
      commit('setSubmit', { disabled: true, enText: 'Loading...' })
      await axios({
        method: 'post',
        url: '/api/member/websiteSetUserInfo',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: rootState.login.loginRes.token
        },
        data: postData
      })
      commit('site/setErrorData', 'Done', { root: true })
      if (!data) {
        commit('setStep', '')
      }
    } catch (error) {
      console.log(error)
    } finally {
      commit('setSubmit', { disabled: false, enText: 'Confirm' })
    }
  },
  async getCode ({ state, commit, dispatch }) {
    commit('setAllVerification', {
      text: '发送中...',
      code: '',
      disabledBtn: true
    })
    try {
      const result = await this.$axios.$post('/member/login/vcode', {
        mobile: state.newData.phone
      })
      if (!Array.isArray(result)) {
        throw new TypeError('错误')
      } else {
        commit('setStep', 'phone-confirm')
        dispatch('countDown')
      }
    } catch (error) {
      commit('setAllVerification', {
        text: '获取验证码',
        code: '',
        disabledBtn: false
      })
    }
  },
  async getEnCode ({ state, commit, dispatch }) {
    commit('setAllVerification', {
      enText: 'Loading...',
      code: '',
      disabledBtn: true
    })
    try {
      const postData = state.enNewData.status === 'mobile'
        ? {
          area_code: state.enNewData.area_code,
          'fm-login-id': state.enNewData.phone
        }
        : {
          'fm-login-id': state.enNewData.email,
          type: 3
        }
      console.log(state.enNewData)
      const result = await this.$axios.$post('/member/SendCode', postData)
      if (!Array.isArray(result)) {
        throw new TypeError('Error')
      } else {
        commit('setStep', 'email-confirm')
        dispatch('countDown')
      }
    } catch (error) {
      commit('setAllVerification', {
        enText: 'Get Code',
        code: '',
        disabledBtn: false
      })
    }
  },
  async getEmailCode ({ state, commit, dispatch }) {
    commit('setAllVerification', {
      text: '发送中...',
      code: '',
      disabledBtn: true
    })
    try {
      const result = await this.$axios.$post('/email/sendCode', {
        email: state.newData.email
      })
      if (!Array.isArray(result)) {
        throw new TypeError('错误')
      } else {
        commit('setStep', 'email-confirm')
        dispatch('countDown')
      }
    } catch (error) {
      commit('setAllVerification', {
        text: '获取验证码',
        code: '',
        disabledBtn: false
      })
    }
  },
  /** 更换绑定手机 */
  async changePhoneNumber ({ state, commit, dispatch }) {
    commit('setConfirmChangeBtnStatus', false)
    try {
      const result = await this.$axios.$post('/mobile/set', {
        mobile: state.newData.phone,
        code: state.verification.code
      })
      console.log(result)
      commit('site/setErrorData', '修改成功', { root: true })
      dispatch('login/useGetMemberData', {}, { root: true })
    } catch (error) {
      console.log(error)
    } finally {
      commit('setConfirmChangeBtnStatus', true)
    }
  },
  /** 更换绑定手机 */
  async changeEnPhoneNumber ({ state, commit, dispatch }) {
    commit('setConfirmChangeBtnStatus', false)
    try {
      const result = await this.$axios.$post('/member/websiteChangePhone', {
        area_code: state.enNewData.area_code,
        mobile: state.enNewData.phone,
        code: state.verification.code
      })
      console.log(result)
      commit('site/setErrorData', 'Done', { root: true })
      dispatch('login/useGetMemberDataEn', {}, { root: true })
    } catch (error) {
      console.log(error)
    } finally {
      commit('setConfirmChangeBtnStatus', true)
    }
  },
  /** 更换绑定邮箱 */
  async changeEmail ({ state, commit, dispatch }) {
    commit('setConfirmChangeBtnStatus', false)
    try {
      await this.$axios.$post('/email/bind', {
        email: state.newData.email,
        code: state.verification.code
      })
      dispatch('login/useGetMemberData', {}, { root: true })
      commit('site/setErrorData', '修改成功', { root: true })
    } catch (error) {
      return new Promise.Reject(error)
    } finally {
      commit('setConfirmChangeBtnStatus', true)
    }
  },
  /** 更换绑定邮箱 */
  async changeEnEmail ({ state, commit, dispatch }) {
    commit('setConfirmChangeBtnStatus', false)
    try {
      await this.$axios.$post('/member/websiteChangeEmail', {
        email: state.enNewData.email,
        code: state.verification.code
      })
      dispatch('login/useGetMemberData', {}, { root: true })
      commit('site/setErrorData', 'Done', { root: true })
    } catch (error) {
      return new Promise.Reject(error)
    } finally {
      commit('setConfirmChangeBtnStatus', true)
    }
  },
  countDown ({ commit, state }) {
    const defaultNumber = 60
    const down = () => {
      setTimeout(() => {
        if (state.countDownNumber > 0) {
          commit('setCountDownNumber', state.countDownNumber - 1)
          down()
        } else {
          commit('setCountDownNumber', defaultNumber)
          commit('setAllVerification', {
            text: '获取验证码',
            enText: 'GetCode',
            code: '',
            disabledBtn: false
          })
        }
      }, 1000)
    }
    down()
  },
  /** 上传头像 */
  async uploadHeaderUrl ({ commit, rootState, dispatch }, data) {
    const formData = new FormData()
    formData.append('headimgurl', data.target.files[0])

    const url = rootState.site.language === 'en' ? '/api/member/websiteSetUserInfo' : '/api/member/setUserInfo'

    try {
      await axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: rootState.login.loginRes.token
        },
        data: formData
      })
      if (rootState.site.language === 'en') {
        dispatch('login/useGetMemberDataEn', {}, { root: true })
        commit('site/setErrorData', 'Done', { root: true })
      } else if (rootState.site.language === 'cn') {
        dispatch('login/useGetMemberData', {}, { root: true })
        commit('site/setErrorData', '修改成功', { root: true })
      }
    } catch (error) {
      commit('site/setErrorData', '上传失败！')
    }
  }
}

export const getters = {
  getUser: state => state.user,
  /** 获取加密的手机号 */
  getEncryptPhone: state => state.user.phone ? forMate(state.user.phone, 3, 4) : '/',
  /** 获取当前步骤 */
  getStep: state => state.step,
  /** 获取新的用户数据 */
  getNewData: state => state.newData,
  getNewEnData: state => state.enNewData,
  /** 获取当前按钮的状态 */
  getSubmitDisabled: (state) => {
    return !state.submit.disabled &&
      (state.newData.nickname !== '' ||
        state.newData.email !== '' ||
        state.newData.phone !== '' ||
        state.newData.headimgurl !== '' ||
        state.newData.birthday !== '')
  },
  /** 获取当前按钮的状态 */
  getEnSubmitDisabled: (state) => {
    return !state.submit.disabled &&
      (state.enNewData.fullname !== '' ||
        state.enNewData.email !== '' ||
        state.enNewData.phone !== '' ||
        state.enNewData.headimgurl !== '' ||
        state.enNewData.birthday !== '')
  },
  disabledGetCode (state) {
    const regex = state.newData.status === 'mobile'
      ? /^1[3-9]\d{9}$/
      : /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    const data = state.newData.status === 'mobile' ? state.newData.phone : state.newData.email
    return !regex.test(data) || state.verification.disabledBtn
  },
  disabledEnGetCode (state) {
    let data = !state.enNewData.phone
    if (state.enNewData.status === 'mobile') {
      data = !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(data)
    }
    console.log(data)
    return data || state.verification.disabledBtn
  },
  getCountDownNumber (state) {
    return state.countDownNumber
  },
  disabledChangeBtn (state) {
    return state.verification.code && state.confirmChangeBtnStatus
  }
}
