
export const state = () => ({
/** 数据列表 */
  designerList: [],
  designerDetail: {},
  itemPostData: {
    alias: ''
  },
  otherPostData: {
    alias: '',
    brand: ''
  }
})

export const mutations = {
  setDesignerList (state, data) {
    state.designerList = data
  },
  setDesignerDetail (state, data) {
    state.designerDetail = data
  },
  setDesignerItemPostData (state, data) {
    state.itemPostData[data.key] = data.value
  },
  setOtherPostData (state, data) {
    state.otherPostData[data.key] = data.value
  }
}

export const actions = {
  async useDesignerList ({ commit }, postData) {
  /** 获取后台内容 */
  /** ... 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const resultData = await this.$axios.$post('/getBrandDesignerList', postData)
      commit('setDesignerList', resultData)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  async useDesignerDetail ({ commit, state, dispatch }) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const result = await this.$axios.$post('/getDesignerItem', state.itemPostData)
      commit('setDesignerDetail', result)
      dispatch('site/tracker', { event: 'view_designer', mode: 'Brands', page: `Brand-${state.otherPostData.brand}`, label: result.name, items: [{ CMSId: result.alias }] }, { root: true })
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  // 获取上一位
  async getPrevRow ({ commit, state, dispatch }) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const result = await this.$axios.$post('/getPrevRow', state.otherPostData)
      dispatch('site/tracker', { event: 'view_designer', mode: 'Brands', page: 'Brand-designer', label: state.designerDetail.prev.name, items: [{ CMSId: state.designerDetail.prev.alias }] }, { root: true })
      commit('setDesignerDetail', result)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  // 获取下一位
  async getNext ({ commit, state, dispatch }) {
    /** 获取后台内容 */
    try {
      commit('site/setLoading', true, { root: true })
      const result = await this.$axios.$post('/getNextRow', state.otherPostData)
      dispatch('site/tracker', { event: 'view_designer', mode: 'Brands', page: 'Brand-designer', label: state.designerDetail.next.name, items: [{ CMSId: state.designerDetail.next.alias }] }, { root: true })
      commit('setDesignerDetail', result)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  }
}

export const getters = {
  getDesignerList: state => state.designerList
}
