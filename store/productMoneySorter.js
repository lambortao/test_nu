/** 产品列表的价格排序 */
export const state = () => ({
  sortBox: [{
    value: '',
    label: '默认',
    enLabel: 'Default'
  }, {
    value: 'ASC',
    label: '价格由低到高',
    enLabel: 'Price: Low - High '
  }, {
    value: 'DESC',
    label: '价格由高到低',
    enLabel: 'Price: High - Low'
  }],
  sortNameKey: {
    '': ['默认', 'Default'],
    ASC: ['价格由低到高', 'Ascend'],
    DESC: ['价格由高到低', 'Descend']
  },
  /** 选中的数据 */
  value: ''
})

export const mutations = {
  setSorter (state, data) {
    state.value = data
  }
}

export const actions = {
  /** 设置值 */
  useSorter ({ commit }, data) {
    commit('setSorter', data)
    // commit('productList/setSorter', data, { root: true })
  },
  /** 循环切换排序 */
  toggleSorter ({ state, dispatch }) {
    let nowIndex = 0
    state.sortBox.forEach((element, index) => {
      if (element.value === state.value) {
        nowIndex = index
      }
    })
    console.log(nowIndex, state.sortBox.length - 1)
    nowIndex = nowIndex === (state.sortBox.length - 1) ? 0 : nowIndex + 1
    dispatch('useSorter', state.sortBox[nowIndex].value)
  }
}

export const getters = {}
