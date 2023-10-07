// import { mergeFormData } from '~/utils/getFormData'

export const state = () => ({

  /** 图片轮播数据 */
  bannersList: [],
  /** 一级菜单目录结构数据 */
  directorysList: [],
  /** 选择的一级品牌名字 */
  selectedBrandName: '',
  /** 二级和三级结构数据 */
  subAndThirdList: [],
  /** 三级id */
  selectedThirdId: '',
  /** 二级id */
  selectedSubId: '',
  /** 全部数据  */
  allCateList: [],
  /** 语言版本 */
  language: ''
})
// 修改函数
export const mutations = {
  /** 设置图片轮播列表 */
  setBannersList (state, payload) {
    state.bannersList = payload
  },

  /** 设置目录结构列表 */
  setDirectoryList (state, payload) {
    state.directorysList = payload
    state.selectedBrandName = payload[0].name
  },

  /** 设置选择的品牌名 */
  setBrandName (state, payload) {
    const level1Arr = state.directorysList
    // console.log(payload, '设置选择的品牌名payload')
    if (state.language === 'en') {
      if (payload === 'ALL') {
        state.selectedBrandName = 'ALL'
        state.allCateList = level1Arr.slice(0, -1)
      } else {
        const otherCateList = level1Arr.slice(0, -1)
        const brandMenuList = otherCateList.find(item => item.name === payload)
        state.selectedBrandName = brandMenuList.name
        state.subAndThirdList = brandMenuList.child
      }
    } else if (state.language === 'cn') {
      if (payload === '全部品牌') {
        state.selectedBrandName = '全部品牌'
        state.allCateList = level1Arr.slice(0, -1)
      } else {
        const otherCateList = level1Arr.slice(0, -1)
        const brandMenuList = otherCateList.find(item => item.name === payload)
        state.selectedBrandName = brandMenuList.name
        state.subAndThirdList = brandMenuList.child
      }
    }
  },

  /** 设置选择的二级id 添加类名 */
  setSelectedSubId (state, payload) {
    state.selectedSubId = payload
    // console.log(payload, '设置选择的二级id 添加类名')
  },

  /** 设置选择的三级id 添加类名 */
  setSelectedThirdId (state, payload) {
    state.selectedThirdId = payload
    // console.log(payload, '设置选择的三级id')
  },
  setLanguage (state, payload) {
    state.language = payload
  }
}
// 获取函数
export const actions = {
  /** 获取banner列表 */
  async getMaterialBannerList ({ commit, rootState }) {
    try {
      const url = rootState.site.language === 'en' ? '/material/en/banner' : '/material/banner'
      const result = await this.$axios.$post(url)
      commit('setBannersList', result)
    } catch (error) {
      console.log(error)
    }
  },
  /** 获取目录 */
  async  getDirectoryList ({ commit, rootState }) {
    try {
      const url = rootState.site.language === 'en' ? '/material/en/categories' : '/material/categories'
      const result = await this.$axios.$post(url)
      result.push({
        alias: '',
        name: rootState.site.language === 'en' ? 'ALL' : '全部品牌'
      })
      // console.log(result, 'resultresultresult')
      const subid = result[0].child[0].alias
      const thirdid = result[0].child[0].child[0].alias
      commit('setSelectedThirdId', thirdid)
      commit('setSelectedSubId', subid)
      commit('setDirectoryList', result)
      commit('setLanguage', rootState.site.language)
    } catch (error) {
      console.log(error)
      if (error.code === 20666) {
        // 20666 暂无身份权限
        if (rootState.site.language === 'en') {
          setTimeout(() => {
            this.$router.push({
              path: '/en/user',
              query: {
                pos: 'setting'
              }
            })
          }, 4000)
        } else {
          setTimeout(() => {
            this.$router.push({
              path: '/user',
              query: {
                pos: 'setting'
              }
            })
          }, 4000)
        }
      } else if (error.code === 20604) {
        // 20604 用户不存在
        commit('login/logout', {}, { root: true })
      }
    }
  }
}

export const getters = {

}
