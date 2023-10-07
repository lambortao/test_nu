import getCurrentPosition from '@/utils/useGeolocation'
import useStoreListData from '@/utils/useStoreListData'
import areaCode from '~/config/areaCode'

function getStoreCiytList (store) {
  return store && store.length
    ? Array.from(new Set(store.map(item => item.city)))
    : []
}

function getEnStoreCiytList (store) {
  return store && store.length
    ? Array.from(new Set(store.map(item => item.city_en)))
    : []
}

export const state = () => ({
  /** 数据列表 */
  storeList: {},
  /** 国家下拉 */
  countryList: [],
  /** 品牌下拉 */
  brandList: [],
  /** 门店所有的城市 */
  storeCityList: [],
  /** 英文门店所有的城市 */
  storeEnCityList: [],
  /** 搜索数据 */
  searchData: '',
  /** 国家和地区数据 */
  countryListData: {},
  /** 品牌数据 */
  brandListData: [],
  /** 门店源数据 */
  sourceStoreListData: [],
  /** 当前国家 */
  positionCountry: '',
  // 当前城市
  positionProvince: '',
  // 当前地区的简称
  positionAreaCode: '',
  positionData: {},
  /** 门店数据 */
  storeListData: {
    /** 热门展厅 */
    hotModule: [],
    /** 零售展厅 */
    retailShowroom: [],
    /** 项目展厅 */
    storeShowroom: [],
    projectShowroom: []
  },
  /** 选中的数据 */
  selectedData: {
    country: '',
    city: '',
    brand: []
  },
  /** 地理位置 */
  position: {
    latitude: '',
    longitude: ''
  }
})

export const mutations = {
  setstoreCityList (state, data) {
    state.storeCityList = data
  },
  setstoreEnCityList (state, data) {
    state.storeEnCityList = data
  },
  /** 设置选中项 */
  setSelected (state, data) {
    state.selectedData[data.key] = data.value
  },
  setSearchData (state, data) {
    state.searchData = data
  },
  /** 设置国家列表 */
  setCountryList (state, data) {
    state.countryList = data
  },
  /** 设置国家列表 */
  setcountryListData (state, data) {
    state.countryListData = data
  },
  /** 设置品牌列表 */
  setBrandList (state, data) {
    state.brandListData = data
  },
  /** 设置经纬度 */
  setLngLat (state, data) {
    state.position = data
  },
  /** 设置国家 */
  setPositionCountry (state, data) {
    state.positionCountry = data
  },
  /** 设置国家 */
  setPositionProvince (state, data) {
    state.positionProvince = data
  },
  /** 设置国家 */
  setPositionAreaCode (state, data) {
    state.positionAreaCode = data
  },
  /** 设置国家 */
  setPositionData (state, data) {
    state.positionData = data
  },
  /** 设置用户数据 */
  setStoreList (state, data) {
    // console.log(data, 'setStoreList')
    state.storeListData = data
  },
  /** 设置用户数据 */
  setSourceStoreListData (state, data) {
    state.sourceStoreListData = data
  }
}

function firstUpperCase (str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

export const actions = {
  /** 通过 IP 地址获取当前经纬度 */
  async useGetIpAddress ({ commit, rootState }, { ip }) {
    const resultData = await this.$axios.$post('/getIPAddress', { ip })
    if (resultData && resultData.ENTITY && resultData.ENTITY.INPUT_IP_ADDRESS && resultData.ENTITY.INPUT_IP_ADDRESS.GPS) {
      commit('setPositionData', resultData)
      commit('setPositionCountry', resultData.ENTITY.INPUT_IP_ADDRESS.NATION_NAME_EN)
      commit('setPositionProvince', resultData.ENTITY.INPUT_IP_ADDRESS.PROVINCE)
      commit('setPositionAreaCode', resultData.ENTITY.INPUT_IP_ADDRESS.NATION_NAME_EN_ABBR)

      console.log(`当前 IP 信息：${resultData}`)
      /** 区号自动选中当前定位的国家或者地区 */
      const nowPositionCountry = firstUpperCase(resultData.ENTITY.INPUT_IP_ADDRESS.NATION_NAME_EN || 'Afghanistan')
      const selectedCountry = areaCode.filter(item => item.en === nowPositionCountry)
      if (selectedCountry && selectedCountry.length) {
        commit('login/setLoginData', { key: 'country', value: selectedCountry[0].en }, { root: true })
        commit('login/setLoginEnData', { key: 'area_code', value: `+${selectedCountry[0].tel}` }, { root: true })
        commit('login/setLoginData', { key: 'countryTag', value: `+${selectedCountry[0].tel}` }, { root: true })
      } else {
        /** 没有就选中第一个 */
        commit('login/setLoginData', { key: 'country', value: 'Afghanistan' }, { root: true })
        commit('login/setLoginEnData', { key: 'area_code', value: '+93' }, { root: true })
        commit('login/setLoginData', { key: 'countryTag', value: '+93' }, { root: true })
      }
    }
  },
  async useStoreList ({ commit, state, dispatch }) {
    /** 获取后台内容 */
    try {
      commit('site/setLoading', true, { root: true })
      const lnglat = state.position.longitude ? `${state.position.longitude},${state.position.latitude}` : ''
      const resultData = await this.$axios.$post('/getStoreListForWeb', { lnglat })
      commit('setSourceStoreListData', JSON.parse(JSON.stringify(resultData)))
      commit('setstoreCityList', getStoreCiytList(resultData))
      commit('setstoreEnCityList', getEnStoreCiytList(resultData))
      commit('setStoreList', useStoreListData(resultData, state.selectedData, state.searchData))
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  /** 获取城市列表数据 */
  async useCountryList ({ commit }, language) {
    try {
      let resultData = await this.$axios.$post('/getStoreCityForWeb', {})
      resultData = resultData[language]
      const newData = {}
      resultData.forEach((element) => {
        newData[element.k] = element.option
      })
      commit('setcountryListData', newData)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  /** 获取品牌列表 */
  async useBrandList ({ commit }) {
    try {
      commit('site/setLoading', true, { root: true })
      let resultData = await this.$axios.$post('/getStoreBrandList', {})
      resultData = [resultData[3], resultData[1], resultData[0], resultData[2]]
      commit('setBrandList', resultData)
    } catch (error) {
      return Promise.reject(error)
    } finally {
      commit('site/setLoading', false, { root: true })
    }
  },
  async useLocal ({ commit }) {
    try {
      const { latitude, longitude } = await getCurrentPosition()
      commit('setLngLat', {
        latitude,
        longitude
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  /** 监听用户操作数据 */
  useSelected ({ commit, state }) {
    // console.log(useStoreListData(state.sourceStoreListData, state.selectedData, state.searchData), '196')
    commit('setStoreList', useStoreListData(state.sourceStoreListData, state.selectedData, state.searchData))
  },
  /** 搜索 */
  useSearchData ({ commit, state, dispatch }) {
    if (this.clearSearch) { clearTimeout(this.clearSearch) }
    this.clearSearch = setTimeout(() => {
      commit('setStoreList', useStoreListData(state.sourceStoreListData, state.selectedData, state.searchData))
    }, 500)
  }
}

export const getters = {
  /** 获取数据列表 */
  getStoreList: state => state.storeList,
  /** 国家下拉 */
  getCountryList: state => state.countryList,
  /** 品牌下拉 */
  getBrandList: state => state.brandList,

  /** 获取门店列表数据 */
  getStoreListData: state => state.storeListData
  // type filter 经销商
  // newGetStoreListData: state => state.storeListData.filter()
}
