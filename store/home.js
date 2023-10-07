export const state = () => ({
  bannerList: [],
  deviceBannerList: {
    desktop: [],
    mobile: []
  },
  videoList: [],
  reserveList: []
})

export const mutations = {
  setBannerList (state, data) {
    state.bannerList = data
  },
  setVideoList (state, data) {
    state.videoList = data
  },
  setReserveList (state, data) {
    state.reserveList = data
  },
  setDeviceBannerList (state, data) {
    state.deviceBannerList = data
  }
}

function getTime (date) {
  return Date.parse(date ? date.replace(/-/g, '/') : new Date())
}

export const actions = {
  /** 获取首页轮播 */
  async getBannerList ({ commit }) {
    try {
      let result = await this.$axios.$post('/getBannerList', {
        from: 'web'
      })
      const imgData = {
        desktop: [],
        mobile: []
      }
      result = result.filter(item => !!item.images).map((item) => {
        const nowImgs = {}
        item.images.forEach((element) => {
          nowImgs[element.type] = {
            url: element.url,
            isVideo: element.url.includes('.mp4')
          }
        })
        item.link_web_en = `/en${item.link_web}`
        item.images = nowImgs
        if (item.images.desktop || item.images.base) {
          const nowImages = JSON.parse(JSON.stringify(item.images.desktop || item.images.base))
          imgData.desktop.push({
            ...item,
            images: {
              url: nowImages.url,
              isVideo: nowImages.url.includes('.mp4')
            }
          })
        }
        if (item.images.mobile || item.images.base) {
          const nowImages = JSON.parse(JSON.stringify(item.images.mobile || item.images.base))
          imgData.mobile.push({
            ...item,
            images: {
              url: nowImages.url,
              isVideo: nowImages.url.includes('.mp4')
            }
          })
        }
        return item
      })
      commit('setDeviceBannerList', imgData)
      commit('setBannerList', result)
      // commit('setBannerList', result.map(item => !!item.images))
    } catch (error) {
      throw new Error(error)
    }
  },
  /** 获取首页的视频 */
  async getVideoList ({ commit }) {
    try {
      commit('setVideoList', await this.$axios.$post('/getVideoList'))
    } catch (error) {
      throw new Error(error)
    }
  },
  /** 获取首页的活动预约 */
  async getReserveList ({ commit, dispatch }) {
    try {
      let result = await this.$axios.$post('/reserve/list')
      result = result.filter(item => [1, 2, 4].includes(item.reserve_type))
      result.forEach((element) => {
        if (getTime() < getTime(element.start_time)) {
          element.status = '未开始'
        }
        if (getTime() > getTime(element.start_time) && getTime() < getTime(element.end_time)) {
          element.status = '进行中'
        }
        if (getTime() > getTime(element.end_time)) {
          element.status = '已结束'
        }
      })
      commit('setReserveList', result)
    } catch (error) {
      if (error && error.code === 603) {
        // 如果是 token 过期了就重复调用它自己
        dispatch('getReserveList')
      } else {
        throw new Error(error)
      }
    }
  },
  /** 获取首页的所有数据 */
  async getHomeApi ({ dispatch }) {
    try {
      await Promise.all([
        dispatch('getBannerList'),
        dispatch('getVideoList')
      ])
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const getters = {}
