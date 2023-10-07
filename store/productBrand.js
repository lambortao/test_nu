import { check, checkAll } from '~/utils/select'

/** 产品品牌的数据 */
export const state = () => ({
  brandList: [],
  value: [],
  nameKey: {},
  /** 是否正在获取数据 */
  getStatus: false,
  /** 当前展示的下拉菜单 */
  showFilterKey: ''
})

export const mutations = {
  setShowFilterKey (state, data) {
    state.showFilterKey = state.showFilterKey === data ? '' : data
  },
  setList (state, data) {
    state.brandList = data
  },
  /** 设置数据 */
  setValue (state, data) {
    state.value = check(state.value, data.alias)
  },
  coverValue (state, data) {
    state.value = data
  },
  /** 全选 */
  setAllValue (state) {
    const allData = Object.keys(state.nameKey)
    const value = [...state.value]
    state.value = checkAll(allData, value)
  },
  setNameKey (state, data) {
    state.nameKey = data
  },
  setStatus (state, status) {
    state.getStatus = status
  },
  resetValue (state) {
    state.value = []
  }
}

export const actions = {
  async getList ({ commit, state }) {
    if (!state.getStatus) {
      try {
        commit('setStatus', true)
        const result = await this.$axios.$post('/getGoodsBrand')
        const nowKeyName = {}
        result.forEach((element) => {
          nowKeyName[element.alias] = {
            name: element.name,
            nameen: element.name,
            form: 'brand',
            type: 'brand',
            level: 0
          }
        })
        commit('setNameKey', nowKeyName)
        commit('setList', result)
      } catch (error) {
        console.log(error)
      } finally {
        commit('setStatus', false)
      }
    }
  },
  useValue ({ commit, state, dispatch }, data) {
    /** 设置页面勾选的数据 */
    // console.log(data, 'data')
    // console.log(data.all, 'data')
    data.all ? commit('setAllValue') : commit('setValue', data.val)
  }
}

export const getters = {
  getAllStatus (state) {
    return state.value.length === state.brandList.length
  }
}
