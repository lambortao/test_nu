
export const state = () => ({
  /** 数据列表 */
  caseList: {
    lists: [],
    pageTotal: 0,
    total: 0
  },
  /** 选中案例 */
  selectedCase: '',
  /** 选中的品牌 */
  selectedBrand: '',
  selectedPage: 1,
  /** 品牌列表 */
  brandList: [],
  /** 详情页数据 */
  detail: {
    images: [],
    AnchorGroup: []
  },
  /** 详情页选中的场景下标 */
  detailIndex: 0
})

export const mutations = {
  /** 设置案例列表 */
  setCaseList (state, data) {
    const { lists, pageTotal, total } = data
    /** 如果当前页面是第一页的话就覆盖列表，否则就在原基础上新增列表 */
    const dataList = state.selectedPage === 1 ? lists : state.caseList.lists.concat(lists)
    state.caseList = {
      lists: dataList,
      pageTotal,
      total
    }
  },
  /** 设置加载更多 */
  setMovePage (state) {
    state.selectedPage = state.selectedPage + 1
  },
  setSelectedCase (state, data) {
    state.selectedCase = data
  },
  /** 设置当前选中的品牌 */
  setSelectedBrand (state, data) {
    state.selectedBrand = data
  },
  setSelectedPage (state, data) {
    state.selectedPage = data
  },
  /** 设置品牌列表 */
  setBrandList (state, data) {
    state.brandList = data
  },
  /** 设置案例详情页数据 */
  setDetail (state, data) {
    state.detail = data
  },
  /** 设置详情页选中的下标 */
  setDetailIndex (state, index) {
    state.detailIndex = index
  },
  stepByIndex (state, step) {
    state.detailIndex = state.detailIndex + step
  }
}

export const actions = {
  /** 加载更多 */
  getMore ({ state, commit, dispatch }, postData) {
    if (state.caseList && (state.caseList.pageTotal > state.selectedPage)) {
      console.log('asssssss')
      commit('setMovePage')
      postData.page = state.selectedPage
    }
    dispatch('useCaseList', postData)
  },
  async useCaseList ({ commit }, postData) {
    /** 获取后台内容 */
    /** ... 调接口 */
    try {
      commit('site/setLoading', true, { root: true })
      const resultData = await this.$axios.$post('/getCaseList', postData)
      commit('setCaseList', resultData)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  useBrandList ({ commit }, data) {
    try {
      commit('site/setLoading', true, { root: true })
      commit('setBrandList', data)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  /** 获取详情页数据 */
  async useDetail ({ commit }, id) {
    try {
      commit('site/setLoading', true, { root: true })
      const resultData = await this.$axios.$post('/getCaseItem', { method: id })
      console.log(resultData)
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
  getCaseList: state => state.caseList,
  /** 获取选中的案例 */
  getSelectedCase: state => state.selectedCase,
  /** 获取选中的品牌 */
  getSelectedBrand: state => state.selectedBrand,
  getSelectedPage: state => state.selectedPage,
  /** 获取品牌列表 */
  getBrandList: state => state.brandList,
  /** 是否展示加载更多按钮 */
  showMoreBtn: state => state.caseList.pageTotal > state.selectedPage,
  /** 获取详情页数据 */
  getDetail: state => state.detail,
  /** 获取详情页锚点数据 */
  getAnchorGroup: state => state.detail.AnchorGroup,
  getAnchorGroupHeight: (state) => {
    if (state.detail.AnchorGroup && state.detail.AnchorGroup.length) {
      const groupNum = state.detail.AnchorGroup.length > 6 ? 6 : state.detail.AnchorGroup.length
      return `${groupNum * 5.5 + groupNum + 1}vw`
    } else {
      return 0
    }
  }
}
