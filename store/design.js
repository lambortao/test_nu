
export const state = () => ({
  /** 数据列表 */
  designList: {}
})
export const mutations = {
  setDesignList (state, data) {
    state.designList = data
  }
}

export const actions = {
  async useDesignList ({ commit }, postData) {
  /** 获取后台内容 */
  /** ... 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const resultData = await this.$axios.$post('/getDesignerItem', postData)
      commit('setDesignList', resultData)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  }
}

export const getters = {
  getDesignList: state => state.designList
}
