
export const state = () => ({
  /** 数据列表 */
  materialDetail: '',
  /** 详情页请求数据 */
  requestDetailData: {
    resources_id: ''
  }
})

export const mutations = {
  /** 设置详情页的请求数据 */
  setRequestDetailData (state, data) {
    state.requestDetailData = data
  },
  /** 设置详情页的数据 */
  setMaterialDetail (state, data) {
    state.materialDetail = data
  }
}

export const actions = {
  async getMaterialDetail ({ commit, state, rootState }) {
    /** 获取后台内容 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const url = rootState.site.language === 'en' ? '/material/en/details' : '/material/details'
      const result = await this.$axios.$post(url, state.requestDetailData)
      commit('setMaterialDetail', result)
      return result
    } catch (error) {
      console.log(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  }
}

export const getters = {

}
