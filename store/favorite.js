
export const state = () => ({
  goodsList: []
})

export const mutations = {
  setGoodsList (state, data) {
    state.goodsList = data
  }
}

export const actions = {
  async useGetGoodsList ({ commit }) {
    try {
      const result = await this.$axios.$post('/collectList', { form: 'goods' })
      commit('setGoodsList', result)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('xxxx')
    }
  },
  async removeFavorite ({ dispatch }, id) {
    try {
      await this.$axios.$post('/delCollectList', { method: id })
      await dispatch('useGetGoodsList')
    } catch (error) {
      console.log(error)
    }
  }
}

export const getters = {
  getGoodsList: state => state.goodsList
}
