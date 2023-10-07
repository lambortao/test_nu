/** 产品列表页场景的数据 */
export const state = () => ({
  /** 列表的数据 */
  list: [],
  /** 名字的键值对 */
  nameKey: {},
  /** 选中的数据 */
  value: '',
  /** 是否正在获取数据 */
  getStatus: false
})

export const mutations = {
  setList (state, data) {
    state.list = data
  },
  setScene (state, data) {
    state.value = data
  },
  setNameKey (state, data) {
    state.nameKey = data
  },
  setStatus (state, status) {
    state.getStatus = status
  },
  resetValue (state) {
    state.value = ''
  }
}

export const actions = {
  async getList ({ commit, state }) {
    /** vuex 么有数据的时候才会去后台拉取数据，为了避免多次进入页面卡顿 */
    if (!state.getStatus) {
      try {
        commit('setStatus', true)
        const result = await this.$axios.$post('/getGoodsScenes')
        const nowKeyName = {}
        result.forEach((element) => {
          nowKeyName[element.alias] = {
            name: element.name,
            nameen: element.nameen,
            form: 'scenes',
            type: 'scenes',
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
  useScene ({ commit, state }, data) {
    const result = state.value === data ? '' : data
    commit('setScene', result)
  }
}

export const getters = {
}
