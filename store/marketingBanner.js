
export const state = () => ({

  /** 数据列表 */
  bannerList: {
    list: [],
    pageTotal: 0,
    total: 0,
    bannerImg: ''
  },
  selectedPage: 1
})

export const mutations = {

  /** 设置营销工具包列表 */
  setBannerList (state, data) {
    const { list, pageTotal, total } = data
    /** 如果当前页面是第一页的话就覆盖列表，否则就在原基础上新增列表 */
    const dataList = state.selectedPage === 1 ? list : state.bannerList.list.concat(list)
    state.bannerList = {
      list: dataList,
      pageTotal,
      total,
      banner_img: data.banner_img
    }
  },
  /** 设置加载更多 */
  setMovePage (state) {
    state.selectedPage = state.selectedPage + 1
  },
  setSelectedPage (state, data) {
    state.selectedPage = data
  }
}

export const actions = {

  async getBannerDetail ({ commit, rootState }, postData) {
    /** 获取后台banner详情内容 调接口 */
    try {
      // commit('site/setLoading', true, { root: true })
      const url = rootState.site.language === 'en' ? '/material/en/bannerbind' : '/material/bannerbind'

      const result = await this.$axios.$post(url, postData)
      commit('setBannerList', result)
      return result
    } catch (error) {
      console.log(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  /** 加载更多 */
  getMore ({ state, commit, dispatch }, postData) {
    if (state.bannerList && (state.bannerList.pageTotal > state.selectedPage)) {
      commit('setMovePage')
      postData.page = state.selectedPage
    }
    dispatch('getBannerDetail', postData)
  }
}

export const getters = {
  /** 获取数据列表 */
  getBannerList: state => state.bannerList,
  getSelectedPage: state => state.selectedPage,
  /** 是否展示加载更多按钮 */
  showMoreBtn: state => state.bannerList.pageTotal > state.selectedPage
}
