/** 产品数据 */
export const state = () => ({
  /** 列表页请求数据 */
  requestData: {
    form: [],
    method: [],
    keywords: '',
    page: '1',
    min: '',
    max: '',
    size: ''
  },
  /** 详情页请求数据 */
  requestDetailData: {
    method: ''
  },
  /** 展示用的筛选ID  */
  showFilterProductIdList: [],
  getProductList: [],
  productDetail: {
    title: '-',
    title_en: '-',
    images: [],
    brandids: [],
    children: [],
    recommend_list: []
  },
  goBackHome: false
})

export const mutations = {
  setGoBackHome (state, data) {
    state.goBackHome = data
  },
  /** 设置列表数据 */
  setProductList (state, data) {
    state.productList = data
    console.log(state.productList)
  },
  /** 设置请求数据 */
  setRequestData (state, data) {
    state.requestData = data
  },
  /** 设置详情页的请求数据 */
  setRequestDetailData (state, data) {
    state.requestDetailData = data
  },
  /** 设置详情页的数据 */
  setproductDetail (state, data) {
    state.productDetail = data
  }
}

export const actions = {
  /** 获取列表数据 */
  async getProductList ({ commit, state }) {
    console.log('state', state.requestData)
    try {
      commit('site/setLoading', true, { root: true })
      /** 预处理请求数据 */
      const postData = JSON.parse(JSON.stringify(state.requestData))
      /** 判断当前是否有选中的分类筛选 */
      if (state.selectedProdcutList?.length) {
        const selectedProdcutList = [...state.selectedProdcutList]
        postData.method = postData.method.concat(selectedProdcutList)
        postData.form.push('channel')
      } else {
        const scenesIndex = postData.method.indexOf('channel')
        if (scenesIndex > -1) {
          postData.form.splice(scenesIndex, 1)
        }
      }

      /** 将请求数据转换为后端可用格式 */
      postData.form = Array.isArray(postData.form) ? postData.form.join(',') : postData.form
      postData.method = Array.isArray(postData.method) ? postData.method.join(',') : postData.method
      const result = await this.$axios.$post('/getGoodsListWebsite', postData)
      commit('setProductList', result)
      return result
    } catch (error) {
      console.log(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  async getProductDetail ({ commit, state, dispatch }) {
    try {
      commit('site/setLoading', true, { root: true })
      const result = await this.$axios.$post('/getGoodsItem', state.requestDetailData)
      commit('setproductDetail', result)
      return result
    } catch (error) {
      if (error && error.code === 603) {
        // 如果是 token 过期了就重复调用它自己
        dispatch('getProductDetail')
      } else {
        throw new Error(error)
      }
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  // 获取英文产品详情
  async getProductDetailEn ({ commit, state }) {
    try {
      commit('site/setLoading', true, { root: true })
      const result = await this.$axios.$post('/getGoodsItemWebsite', state.requestDetailData)
      commit('setproductDetail', result)
      return result
    } catch (error) {
      console.log(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  /** 点击收藏按钮 */
  async toggleProductFavite ({ commit, dispatch }, method) {
    if (method) {
      try {
        commit('site/setLoading', true, { root: true })
        const result = await this.$axios.$post('/goodsCollectToggle', { method })
        await dispatch('getProductDetail')
        return result
      } catch (error) {
        console.log(error)
      } finally {
        commit('site/setLoading', false, { root: true })
      }
    }
  }
}

export const getters = {
  getProductList (state) {
    console.log(state)
    return state.productList
  },
  getGoodsChannel (state) {
    return state.channeList
  },
  getGoodsBrand (state) {
    return state.brandList
  },
  getGoodsScenes (state) {
    return state.scenesList
  },
  getProductDetail (state) {
    return state.productDetail
  },
  getTitle (state) {
    return state.productDetail.title
  }
}
