export const state = () => ({
  /** 详情页数据 */
  postData: {
    mobile: '',
    code: ''
  },
  result: null
})

export const mutations = {
  /** 设置数据列表 */
  setPostData (state, data) {
    state.postData[data.key] = data.value
  },
  setResult (state, data) {
    state.result = data
  }
}
export const actions = {
  async leaveInfo ({ commit, state }) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      const result = await this.$axios.$post('/member/scanCheckmobile', state.postData)
      commit('setResult', Boolean(result))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export const getters = {
  /** 获取数据列表 */
  getResult: state => state.result
}
