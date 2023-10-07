export const state = () => ({
  id: '',
  isMobile: false,
  hideHeader: false,
  theme: 'dark',
  themeFixed: false,
  errorData: '',
  caseChannel: {},
  /** 是否正在获取数据 */
  getStatus: false,
  /** 页面是否正在加载中 */
  pageLoading: false,
  wxConfig: {},
  language: 'cn',
  cookieVisible: false,
  newsLetterStatus: 'open'
})

export const mutations = {
  setDevice (state, status) {
    state.isMobile = status
  },
  setCookiePopupVisible (state, visible) {
    state.cookieVisible = visible
  },
  setHeaderStatus (state, status) {
    state.hideHeader = status
  },
  setTheme (state, theme) {
    state.theme = theme
  },
  setThemeStatus (state, status) {
    state.themeFixed = status
  },
  setErrorData (state, data) {
    state.errorData = data
  },
  setCaseChannel (state, data) {
    state.caseChannel = data
  },
  setStatus (state, status) {
    state.getStatus = status
  },
  setLoading (state, loading) {
    state.pageLoading = loading
  },
  setWxConfig (state, data) {
    state.wxConfig = data
  },
  setLanguage (state, language) {
    state.language = language
  },
  setNewsLetterStatus (state, data) {
    console.log(data)
    state.newsLetterStatus = data
  }
}

export const actions = {
  async useCaseChannel ({ commit, state }) {
    if (!state.getStatus) {
      try {
        commit('setStatus', true)
        commit('setCaseChannel', await this.$axios.$post('/getCaseChannel'))
      } catch (error) {
        return Promise.reject(error)
      } finally {
        commit('setStatus', false)
      }
    }
  },
  /** 获取微信配置 */
  async useWxConfig ({ commit, state }) {
    try {
      commit('setWxConfig', await this.$axios.$post('/member/login?c=scan'))
    } catch (error) {
      console.log(error)
    }
  },
  tracker ({ commit, state }, { event, mode, page, label, filterLabel, term, items }) {
    // items详细内容暂不记录
    if (window.gtag) {
      const website = process.env.NODE_ENV === 'production' ? 'NineUnited' : 'NineUnited_test'
      // console.log('trakcing', { website, event, lang: state.language.toUpperCase(), platform: state.isMobile ? 'Mobile' : 'PC', screen_name: page, mode, label, filterLabel, term, CMSid: items && items[0].CMSId ? items[0].CMSId : undefined })
      window.gtag('event', event, { // event操作事件名称
        website, // 网站名称（区分正式测试）{NineUnited_test}
        lang: state.language.toUpperCase(), // 区分中英文版本
        platform: state.isMobile ? 'Mobile' : 'PC', // 区分平台
        screen_name: page, // 当前页面名称（menu footer不传）
        mode, // 所属板块
        event_label: label, // 事件名称（button名称，banner名称等）
        filter_label: filterLabel, // 筛选分类时所属模块
        // info: JSON.stringify(items),
        CMSid: items && items[0].CMSId ? items[0].CMSId : undefined,
        search_term: term
      })
    } else {
      console.log('gtag fail')
    }
  }
}

export const getters = {
  getCaseChannel (state) {
    return state.caseChannel || []
  }
}
