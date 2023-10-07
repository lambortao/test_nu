import { mergeFormData, scatterFormData } from '~/utils/getFormData'

/** 产品列表页的数据 */
export const state = () => ({
  requestData: {
    /** 类型：channel->分类；scenes->场景；series->系列；brand->品牌；size->尺寸 */
    form: [],
    /** 别名 */
    method: [],
    /** 搜索的关键字，与 from 和 method 相斥 */
    keywords: '',
    page: 1,
    min: '',
    max: '',
    /** 尺寸区间 */
    size: [],
    orderby: '',
    color: '',
    material: ''
  },
  /** 筛选数据的列表 */
  filterList: {},
  /** 所有别名的键值对 */
  allKeysName: {},
  /** 商品的数据 */
  productListData: {
    list: [],
    pageTotal: 0,
    total: 0
  },
  /** menu 的来源 */
  type: '',
  // 产品列表显示隐藏
  frameShow: false,
  // 确认材质是否可选
  textureShow: false,
  // 颜色是否可选
  colorShow: true
})

export const mutations = {
  // 确认材质是否可选
  setTextureShow (state, data) {
    state.textureShow = data
  },
  // 颜色是否可选
  setColorShow (state, data) {
    state.colorShow = data
  },
  // 产品列表显示隐藏
  setFrameShow (state, data) {
    state.frameShow = data
  },
  setType (state, type) {
    state.type = type
  },
  /** 全量覆盖当前搜索的数据 */
  coverRequestData (state, data) {
    /** 初始加载的时候整合数据 */
    data.form = data.form ? data.form.split(',') : []
    data.method = data.method ? data.method.split(',') : []
    data.min = data.min != null ? data.min : ''
    data.max = data.max != null ? data.max : ''
    data.size = data.size ? data.size.split(',') : []
    data.orderby = data.orderby || ''
    data.page = data.page || 1

    state.requestData = data
  },
  /** 设置加载更多 */
  setMovePage (state) {
    state.requestData.page = state.requestData.page + 1
  },
  /** 设置所有的 key name 键值对 */
  setAllKeysName (state, data) {
    state.allKeysName = data
  },
  /** 设置商品列表 */
  setProductList (state, data) {
    const { list, pageTotal, total } = data
    state.productListData = {
      list,
      pageTotal,
      total
    }
  },
  /** 设置 keywords 字段 */
  setkeyswords (state, data) {
    state.requestData.keywords = data
  },
  setPagination (state, number) {
    state.requestData.page = number
  }
}

export const actions = {
  // 修改颜色材质数据
  async setColorOrTexture ({ rootState, commit }) {
    // 目前所处的版本(英文版或中文版)
    const language = rootState.site.language
    // 已选三级品类
    const classData = [
      ...rootState.productCategory.selectedProdcutList
    ]

    // 如果后台更改为二级品类，就用下面的代码
    // 筛选出二级品类
    // const selectedProdcutList = {
    //   ...rootState.productCategory.allLevelTwoMenuList
    // }
    // // 二级品类的key
    // const keys = Object.keys(selectedProdcutList)
    // // 筛选后的二级品类
    // const newClassData = []
    // keys.forEach((el) => {
    //   classData.forEach((item) => {
    //     // 判断每个对象里的数组是否存在三级品类，是的话就进入
    //     if (selectedProdcutList[el].includes(item)) {
    //       // 再判断二级品类是否已经存在，不存在就添加
    //       if (!newClassData.includes(el)) {
    //         newClassData.push(el)
    //       }
    //     }
    //   })
    // })

    // 已选品牌
    const brandData = [
      ...rootState.productBrand.value
    ]
    // 材质和颜色请求接口
    const result = await this.$axios.$post('/getFilter', {
      class: classData.join(','),
      brand: brandData.join(',')
    })
    // 判断是中文版还是英文版
    if (language === 'cn') {
      commit('productColor/setColorList', {
        data: result.colour,
        lang: 'cn'
      }, { root: true })
      commit('productTexture/setTextureList', {
        data: result.materials,
        lang: 'cn'
      }, { root: true })
    } else if (language === 'en') {
      commit('productColor/setColorList', {
        data: result.colour_en,
        lang: 'en'
      }, { root: true })
      commit('productTexture/setTextureList', {
        data: result.materials_en,
        lang: 'en'
      }, { root: true })
    }
  },
  stepPagination ({ state, dispatch }, step) {
    const newNumber = parseInt(state.requestData.page) + parseInt(step)
    dispatch('handlePagination', newNumber)
  },
  handlePagination ({ commit, dispatch }, number) {
    commit('setPagination', number)
  },
  /** 加载更多 */
  getMore ({ state, commit, dispatch }) {
    if (state.productListData && (state.productListData.pageTotal > state.requestData.page)) {
      commit('setMovePage')
    }
    dispatch('getProductList', { local: false, query: null })
  },
  /** 并非第一次加载的时候整合子模块的数据 */
  getRequestData ({ state, rootState, commit }) {
    /** 合并所有的 method 数据 */
    const method = [
      /** 分类 */
      ...rootState.productCategory.selectedProdcutList,
      /** 品牌 */
      ...rootState.productBrand.value
    ]
    // 颜色
    const productColor = [
      ...rootState.productColor.value
    ]
    // 材质
    const productTexture = [
      ...rootState.productTexture.value
    ]
    let color = ''
    let material = ''
    // 材质是否可以选择
    if (state.textureShow) {
      material = productTexture.join(',')
    } else {
      material = ''
      commit('productTexture/USETEXTURE', [], { root: true })
    }
    // 顏色是否可以选择
    if (state.colorShow) {
      color = productColor.join(',')
    } else {
      color = ''
      commit('productColor/USECOLOR', [], { root: true })
    }

    /** 场景 */
    if (rootState.productScene.value) {
      method.push(rootState.productScene.value)
    }
    /** 根据 method 数据获取当前数据的 form 字段 */
    const form = mergeFormData(method, state.allKeysName)

    /** 从各个子模块获取内容而并非当前模块，筛选出 method 数据，form 数据从 allKeysName 进行筛选 */
    return {
      /** 数据来源 */
      form: form.join(','),
      /** 已选择的 ID */
      method: method.join(','),
      /** 分页数据 */
      page: state.requestData.page,
      /** 最高价和最低价 */
      min: rootState.productCategory.priceRange.min,
      max: rootState.productCategory.priceRange.max,
      /** 排序 */
      orderby: rootState.productMoneySorter.value,
      /** 尺寸 */
      size: rootState.productSize.value.join(','),
      /** 关键字，使用关键字搜索的时候后台会自动过滤掉其他字段 */
      keywords: state.requestData.keywords,
      color,
      material
    }
  },
  /** 本地数据 */
  localRequestData ({ commit, state, dispatch }, query) {
    /** 初始加载的时候从 url 获取当前全量的数据 ID，覆盖当前的 vuex */
    commit('coverRequestData', { ...query })
    dispatch('useKeysName')
    dispatch('initSelectedList')
    /** 返回轻量整合的数据给去获取数据 */
    return Object.assign({
      form: '',
      method: '',
      keywords: '',
      page: 1,
      min: '',
      max: '',
      size: '',
      orderby: '',
      color: '',
      material: ''
    }, query)
  },
  /** 获取列表数据 */
  async getProductList ({ commit, dispatch, rootState, state }, { local, query }) {
    try {
      commit('site/setLoading', true, { root: true })
      /**
       * 预处理请求数据
       * local 是否为 true, true 会直接使用 url 参数进行无感补充后用于数据请求，同时将 url 参数下发到各个模块数据内
       */
      const postData = local ? await dispatch('localRequestData', query) : await dispatch('getRequestData')
      const url = rootState.site.language === 'en' ? '/getGoodsListWebsite' : '/getGoodsList'
      const result = await this.$axios.$post(url, postData)
      commit('setType', query.type || '')

      commit('setProductList', result)
    } catch (error) {
      console.log(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  useKeysName ({ rootState, commit }) {
    const productList = { ...rootState.productCategory.allProductNameList }
    const brandList = { ...rootState.productBrand.nameKey }
    const sceneList = { ...rootState.productScene.nameKey }
    commit('setAllKeysName', Object.assign({}, productList, brandList, sceneList))
  },
  initSelectedList ({ commit, state }) {
    /**
     * 获取到所有的 keysName 后将 requestData 数据给子模块二次分类
     * 子模块二次分类的时候要对比当前数据是否与子模块一致，只覆盖不一致的数据
     * 子模块分好类之后清空 requestData
     */
    const queryData = JSON.parse(JSON.stringify(state.requestData))
    /** 设置最低和最高价 */
    commit('productCategory/setAllPriceRange', {
      min: queryData.min,
      max: queryData.max
    }, { root: true })
    /** 设置排序 */
    commit('productMoneySorter/setSorter', queryData.orderby, { root: true })
    /** 设置尺寸数据 */
    commit('productSize/coverSize', queryData.size, { root: true })
    /** 过滤 method */
    const filterMethod = scatterFormData(queryData.method, state.allKeysName)
    if (filterMethod.brand) {
      /** 设置品牌 */
      commit('productBrand/coverValue', filterMethod.brand, { root: true })
    }
    if (filterMethod.channel) {
      /** 设置分类 */
      commit('productCategory/coverProductList', filterMethod.channel, { root: true })
    }
    if (filterMethod.scenes) {
      console.log(filterMethod.scenes, 'filterMethod.scenes')
      /** 设置场景 */
      // commit('productScene/setScene', filterMethod.scenes[0], { root: true })
    }
  },
  /** 获取筛选数据的基础数据 */
  async initList ({ dispatch }) {
    await Promise.all([
      /** 获取分类筛选列表 */
      dispatch('productCategory/getGoodsChannel', {}, { root: true }),
      /** 获取品牌列表 */
      dispatch('productBrand/getList', {}, { root: true }),
      /** 获取场景列表 */
      dispatch('productScene/getList', {}, { root: true })
    ])
    dispatch('useKeysName')
    dispatch('initSelectedList')
    /** 获取尺寸依赖数据 */
    // 解决选择品类导致尺寸没变化
    // dispatch('productCategory/getSpeclist', {}, { root: true })
  },
  /** 获取跳转的路由参数 */
  async useRequestParam ({ dispatch }, { router, url, query }) {
    /** 预处理请求数据 */
    const postData = await dispatch('getRequestData')
    /** 通过路由参数获取数据的时候忽略分页参数和为空的参数 */
    for (const key in postData) {
      if (Object.hasOwnProperty.call(postData, key)) {
        const element = postData[key]
        if (!element) {
          delete postData[key]
        }
      }
    }
    const postQuery = query ? { ...query, ...postData } : postData
    router.push({
      path: url || '/product',
      query: postQuery
    })
  }
}

export const getters = {
  /** 是否展示加载更多按钮 */
  showMoreBtn (state) {
    return state.productListData.pageTotal > state.requestData.page
  },
  /** 获取总页数 */
  getPageTotal (state) {
    return state.productListData.pageTotal
  },
  /** 获取分页数据 */
  getPagination (state) {
    const c = parseInt(state.requestData.page)
    const t = parseInt(state.productListData.pageTotal)
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
    return parseInt(state.requestData.page) === parseInt(state.productListData.pageTotal)
  }
}
