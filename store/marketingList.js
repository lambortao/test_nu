// import { mergeFormData } from '~/utils/getFormData'

export const state = () => ({

  requestData: {
    /** categories->二级id；tag->三级id； */
    categories: '',
    tag: '',
    page: 1,
    search: '',
    brand: ''
  },
  /** 物料的数据 */
  materialList: {
    list: [],
    pageTotal: 0,
    total: 0
  },
  requestBody: {
    page: ''
  }
})
// 修改函数
export const mutations = {
  /** 全量覆盖当前搜索的数据 */
  coverRequestData (state, data) {
    /** 初始加载的时候整合数据 */
    data.categories = data.categories || ''
    data.tag = data.tag || ''
    data.page = data.page || 1
    data.brand = data.brand || ''
    state.requestData = data
  },

  /** 设置物料列表 */
  setProductList (state, data) {
    const { list, pageTotal, total } = data
    state.materialList = {
      list,
      pageTotal,
      total
    }
  },
  setRequestData (state, data) {
    state.requestData[data.key] = data.value
  },
  /** 设置 keywords 字段 */
  setkeyswords (state, data) {
    state.requestData.search = data
  },
  setPagination (state, number) {
    state.requestData.page = number
  }
}
// 获取函数
export const actions = {
/** 设置上一页或下一页 */
  stepPagination ({ state, dispatch }, step) {
    const newNumber = parseInt(state.requestData.page) + parseInt(step)
    dispatch('handlePagination', newNumber)
  },
  /** 设置当前页 */
  handlePagination ({ commit, dispatch }, number) {
    commit('setPagination', number)
  },

  /** 并非第一次加载的时候整合子模块的数据 */
  getRequestData ({ state, rootState }) {
    /** 从各个子模块获取内容而并非当前模块，筛选出 method 数据，form 数据从 allKeysName 进行筛选 */
    return {
      /** 已选择的 二级ID */
      categories: state.requestData.categories,
      /** 已选择的 三级ID */
      tag: state.requestData.tag,
      /** 分页数据 */
      page: state.requestData.page,
      /** 关键字，使用关键字搜索的时候后台会自动过滤掉其他字段 */
      search: state.requestData.search,
      brand: state.requestData.brand
    }
  },
  /** 本地数据 */
  localRequestData ({ commit, state, dispatch }, query) {
    /** 初始加载的时候从 url 获取当前全量的数据 ID，覆盖当前的 vuex */
    commit('coverRequestData', { ...query })
    // dispatch('initSelectedList')
    /** 返回轻量整合的数据给去获取数据 */
    return Object.assign({
      categories: '',
      tag: '',
      page: 1,
      search: '',
      brand: ''
    }, query)
  },
  /** 获取列表数据 */
  async getMaterialList ({ commit, dispatch, rootState }, { local, query }) {
    try {
      commit('site/setLoading', true, { root: true })
      /**
         * 预处理请求数据
         * local 是否为 true, true 会直接使用 url 参数进行无感补充后用于数据请求，同时将 url 参数下发到各个模块数据内
         */
      const postData = local ? await dispatch('localRequestData', query) : await dispatch('getRequestData')
      postData.page = parseInt(postData.page) /** 后端只接受int */
      const url = rootState.site.language === 'en' ? '/material/en/list' : '/material/list'
      const result = await this.$axios.$post(url, postData)
      // console.log(result, '获取物料列表数据')
      commit('setProductList', result)
    } catch (error) {
      console.log(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  /** 获取跳转的路由参数 */
  async useRequestParam ({ dispatch, rootState }, { router, url, pagename }) {
    /** 预处理请求数据 */
    const postData = await dispatch('getRequestData')
    // console.log(postData, '获取跳转的路由参数')
    /** 通过路由参数获取数据的时候忽略分页参数和为空的参数 */
    for (const key in postData) {
      if (Object.hasOwnProperty.call(postData, key)) {
        const element = postData[key]
        if (!element) {
          delete postData[key]
        }
      }
    }
    const marketingUrl = rootState.site.language === 'en' ? '/en/marketing' : '/marketing'
    const marketingSearchUrl = rootState.site.language === 'en' ? '/en/marketing/search' : '/marketing/search'
    router.push({
      path: url || marketingUrl,
      query: postData
    })
    if (pagename === 'search') {
      router.push({
        path: url || marketingSearchUrl,
        query: postData
      })
    } else if (pagename === 'home') {
      router.push({
        path: url || marketingUrl,
        query: postData
      })
    }
  }
}

export const getters = {
  /** 是否展示加载更多按钮 */
  showMoreBtn (state) {
    return state.materialList.pageTotal > state.requestData.page
  },
  /** 获取总页数 */
  getPageTotal (state) {
    return state.materialList.pageTotal
  },
  /** 获取分页数据 */
  getPagination (state) {
    const c = parseInt(state.requestData.page)
    const t = parseInt(state.materialList.pageTotal)
    if (t <= 5) {
      const arr = []
      for (let index = 1; index <= t; index++) {
        arr.push(index)
      }
      return arr
    } else if (c <= 3) {
      /** 第一种情况 */
      return [1, 2, 3, 4, '...', t]
    } else if (c >= t - 2) {
      /** 第二种情况 */
      return [1, '...', t - 3, t - 2, t - 1, t]
    } else {
      /** 第三种情况 */
      return [1, '...', c - 1, c, c + 1, '...', t]
    }
  },
  prevBtnDisabled (state) {
    return parseInt(state.requestData.page) === 1
  },
  nextBtnDisabled (state) {
    return parseInt(state.requestData.page) === parseInt(state.materialList.pageTotal)
  }
}
