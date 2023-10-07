
export const state = () => ({
  /** 详情页数据 */
  detail: {}
})

export const mutations = {
  /** 设置数据列表 */
  setDetail (state, data) {
    state.detail = data
  }
}

export const actions = {
  async useDetail ({ commit }, id) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const resultData = await this.$axios.$post('/getCaseItem', { method: id })
      console.log(resultData, 'ppppp')
      commit('setDetail', resultData)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  }
}

export const getters = {
  /** 获取数据列表 */
  getDetail: state => state.detail,
  getDetailTitle: state => `${state.detail.title} - ${state.detail.subtitle}`
}
