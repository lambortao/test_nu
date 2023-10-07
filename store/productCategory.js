import { check, checkAll } from '~/utils/select'

/** 产品分类筛选的数据 */
export const state = () => ({
  /** 分类列表 */
  channeList: [1, 2, 3],
  /** 产品顶层的选中的状态 */
  selectedProductFirstIndex: -1,
  /** 选中的商品 */
  selectedProdcutList: [],
  /** 所有的产品名字 */
  allProductNameList: {},
  /** 所有的二级菜单组合 */
  allLevelTwoMenuList: {},
  /** 所有的一级菜单组合 */
  allLevelOneMenuList: {},
  /** 菜单上所有的别名数据 */
  allMenuAlias: [],
  /** 尺寸的列表 */
  sizeList: [],
  /** 价格区间 */
  priceRange: {
    min: '',
    max: ''
  },
  /** 当前选中的区间 */
  selectedPrizeRangeAlias: '',
  /** 是否正在获取数据中 */
  getStatus: false,
  getTwoMenuStatus: false
})

export const mutations = {
  /** 设置选中的价格区间别名 */
  setSelectedPrizeRangeAlias (state, data) {
    state.selectedPrizeRangeAlias = data.length === 1 ? data[0] : ''
  },
  /** 设置自定义价格区间 */
  setPriceRange (state, data) {
    state.priceRange[data.key] = data.value
  },
  /** 设置自定义价格区间 */
  setAllPriceRange (state, data) {
    state.priceRange = data
  },
  /** 设置产品一级分类的下标 */
  setSelectedProductFirstIndex (state, index) {
    state.selectedProductFirstIndex = index
  },
  setChanneList (state, data) {
    state.channeList = data
  },
  /** 点击全选按钮 */
  setSelectedAll (state, allData) {
    const value = [...state.selectedProdcutList]
    state.selectedProdcutList = checkAll(allData, value)
  },
  /** 单选 */
  setSelectedProductList (state, alias) {
    state.selectedProdcutList = check(state.selectedProdcutList, alias)
  },
  /** 覆盖当前数据 */
  coverProductList (state, list) {
    state.selectedProdcutList = list
  },
  /** 清除所有的选择 */
  resetAllSelected (state) {
    state.selectedProdcutList = []
  },
  /** 设置尺寸的列表 */
  setSizeList (state, data) {
    state.sizeList = data
  },
  setStatus (state, status) {
    state.getStatus = status
  },
  setTwoMenuStatus (state, status) {
    state.getTwoMenuStatus = status
  },
  setAllMenuAlias (state, data) {
    state.allMenuAlias = data
  },
  setAllMenuKeysName (state, data) {
    state.allProductNameList = data
  },
  setAllLevelTwoMenuList (state, data) {
    state.allLevelTwoMenuList = data
  },
  setAllLevelOneMenuList (state, data) {
    state.allLevelOneMenuList = data
  },
  resetValue (state) {
    state.selectedProdcutList = ''
    state.sizeList = []
  }
}

export const actions = {
  // 产品分类列表
  async getGoodsChannel ({ commit, state }) {
    try {
      commit('setStatus', true)
      const result = await this.$axios.$post('/getGoodsChannel')
      const allMenuAlias = []
      const allProductNameList = {}
      const allLevelTwoMenuList = {}
      const allLevelOneMenuList = {}
      result.forEach((oElement) => {
        const oneMenuList = []
        oElement.child.forEach((tElement) => {
          allProductNameList[tElement.alias] = {
            name: tElement.name,
            nameen: tElement.nameen,
            form: 'channel',
            type: 'product',
            level: 2
          }
          tElement.allChildAlias = tElement.child.map((item) => {
            allProductNameList[item.alias] = {
              name: item.name,
              nameen: item.nameen,
              form: 'channel',
              type: 'product',
              level: 3
            }
            oneMenuList.push(item.alias)
            allMenuAlias.push(item.alias)
            return item.alias
          })
          allLevelTwoMenuList[tElement.alias] = tElement.allChildAlias
        })
        allLevelOneMenuList[oElement.alias] = oneMenuList
      })
      commit('setAllLevelTwoMenuList', allLevelTwoMenuList)
      commit('setAllLevelOneMenuList', allLevelOneMenuList)
      commit('setAllMenuKeysName', allProductNameList)
      commit('setAllMenuAlias', allMenuAlias)
      commit('setChanneList', result)
    } catch (error) {
      console.log(error)
    } finally {
      commit('setStatus', false)
    }
  },
  setShowFilterProductIdList ({ state, dispatch }, item) {
    /** 先判断是否是二级菜单 */
    const allLevelTwoAliasList = Object.keys(state.allLevelTwoMenuList)
    if (allLevelTwoAliasList.includes(item)) {
      dispatch('useSelectedProduct', {
        mode: 'all',
        value: state.allLevelTwoMenuList[item]
      })
    } else {
      dispatch('useSelectedProduct', {
        value: item
      })
    }
  },
  /** 根据选中的二级菜单来获取对应的尺寸 */
  async getSpeclist ({ commit, state }) {
    try {
      /**
       * 尺寸筛选不能跨二级分类
       * 1. 需要判断当前选中的商品是否属于跨二级分类
       * 2. 选中一个商品传商品ID，一个以上的商品传二级分类的 ID
       */
      const allLevelOneMenuList = state.allLevelOneMenuList
      const allLevelTwoMenuList = state.allLevelTwoMenuList
      const selectedProdcutList = state.selectedProdcutList
      const selectedMenuKeys = {}
      // console.log(selectedProdcutList)
      for (const key in allLevelTwoMenuList) {
        if (Object.hasOwnProperty.call(allLevelTwoMenuList, key)) {
          const element = allLevelTwoMenuList[key]
          const filterData = element.filter(v => selectedProdcutList.includes(v))
          if (filterData.length) {
            selectedMenuKeys[key] = filterData
          }
        }
      }

      if (Object.keys(selectedMenuKeys).length) {
        if (Object.keys(selectedMenuKeys).length > 1) {
          /** 当前跨级分类，禁用尺寸筛选 */
          console.warn('跨级选择，清空尺寸筛选')
          commit('setSizeList', [])
        } else {
          const method = []
          const nowKey = Object.keys(selectedMenuKeys)[0]
          const firstLastKeys = selectedMenuKeys[nowKey][0]
          /** 查询并加入一级分类 */
          method.push(Object.keys(allLevelOneMenuList).filter(keys => allLevelOneMenuList[keys].includes(firstLastKeys))[0])
          /** 加入二级分类 */
          method.push(nowKey)
          /** 加入三级分类 */
          if (selectedMenuKeys[nowKey].length === 1) {
            method.push(firstLastKeys)
          }
          // console.log(method, nowKey, selectedMenuKeys)
          const result = await this.$axios.$post('/getSpeclist', { method: method.join(',') })
          commit('setSizeList', result)
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  /** 选中价格，自动填充价格区间的输入框 */
  useSelectedRangePrice ({ commit }, data) {
    commit('setPriceRange', { key: 'min', value: data[0] })
    commit('setPriceRange', { key: 'max', value: data[1] != null ? data[1] : '' })
  },
  useSelectedProduct ({ commit, state, rootState, dispatch }, data) {
    if (data.mode === 'all') {
      commit('setSelectedAll', data.value)
    } else if (data.mode === 'reset') {
      commit('resetAllSelected')
      commit('productTexture/USETEXTURE', [], { root: true })
      commit('productColor/USECOLOR', [], { root: true })
    } else {
      commit('setSelectedProductList', data.value)
    }
  }
}

export const getters = {
  useGoodsChannel (state) {
    return state.channeList
  }
}
