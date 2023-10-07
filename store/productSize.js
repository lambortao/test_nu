/** 产品尺寸的数据 */
export const state = () => ({
  sizeList: [],
  value: [],
  nameKey: {}
})

export const mutations = {
  coverSize (state, data) {
    state.value = data
  },
  setSize (state, data) {
    const nowIndex = state.value.includes(data)
    if (nowIndex > -1) {
      state.value.splice(data)
    } else {
      state.value.push(data)
    }
  }
}

export const actions = {
  /** 设置值 */
  useSize ({ commit }, data) {
    commit('coverSize', data)
  },
  useSetSize ({ commit }, data) {
    commit('setSize', data)
  }
}

export const getters = {
  signList (state) {
    return Array.from(new Set((state.value.map(item => item.split('_')[0]))))
  }
}
