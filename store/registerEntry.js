/** 注册入口 */
export const state = () => ({
  selected: null,
  loading: false,
  btnText: '下一步',
  classType: [
    {
      id: 1,
      text: '普通会员',
      textEn: 'Member',
      show: true
    }, {
      id: 2,
      text: '设计师',
      textEn: 'Designers',
      show: true
    }, {
      id: 3,
      text: '经销商/合作方',
      textEn: 'Dealers',
      show: false
    }, {
      id: 4,
      text: '博主',
      textEn: 'KOL',
      show: false
    }, {
      id: 5,
      text: '媒体',
      textEn: 'Journalists',
      show: true
    }
  ],
  agree: false,
  labelConfiglList: {}
})

export const mutations = {
  setSelected (state, data) {
    state.selected = data
  },
  setAgree (state, data) {
    state.agree = data
  },
  setBtnText (state, text) {
    state.btnText = text
  },
  setLoadingStatus (state, data) {
    state.loading = data
  },
  setLabelConfiglList (state, data) {
    const newObj = {}
    data.forEach((element) => {
      newObj[element.nameen] = element.child.map(item => ({ value: item.alias, label: item.name }))
    })
    state.labelConfiglList = newObj
  }
}

export const actions = {
  /** 普通会员注册 */
  async memberRegister ({ commit, rootState }, data) {
    try {
      commit('setBtnText', '提交中...')
      commit('setLoadingStatus', true)
      await this.$axios.$post('/member/applet/register', {
        mobile: rootState.login.memberData.mobile,
        route: data,
        source: '自然注册'
      })
    } catch (error) {
      console.log(error)
    } finally {
      commit('setBtnText', '下一步')
      commit('setLoadingStatus', false)
    }
  },
  /** 获取注册信息 */
  async getLabelConfiglList ({ commit, state }) {
    try {
      commit('setBtnText', '提交中...')
      commit('setLoadingStatus', true)
      const stepList = ['designer', 'dealer', 'kol', 'Multimedia']
      const result = await this.$axios.$post('/getLabelConfiglList', {
        platform: 'web',
        form: stepList[state.selected - 2]
      })
      commit('setLabelConfiglList', result[0].child)
    } catch (error) {
      console.log(error)
    } finally {
      commit('setBtnText', '下一步')
      commit('setLoadingStatus', false)
    }
  }
}

export const getters = {
  disabled (state) {
    return !(state.selected && state.agree) || state.loading
  },
  getConfigList: state => state.labelConfiglList
}
