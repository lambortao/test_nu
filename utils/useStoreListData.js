/**
 * 按照 orderby 以及距离排序
 * 1. orderby 由大到小
*  2. 距离由近到远（由小到大）
 */
function sortOrderbyAndDistance (data, type) {
  /** orderby 不为零的数据 */
  let otherOrderby = []
  /** orderby 为零的数据 */
  let zeroOrderby = []
  /** 距离排序，只有在有距离数据的时候才会进行排序 */
  if (data.length) {
    if (data[0].distance) {
      /** 取出 orderby 不为 0 的首先进行距离排序 */
      otherOrderby = data.filter(item => !!item.orderby).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      /** 取出 orderby 为 0 的进行距离排序 */
      zeroOrderby = data.filter(item => !item.orderby).sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
      if (type === 'close') {
        /** 对比两组数据的第一位哪一个是距离更近 */
        if (otherOrderby && zeroOrderby && Array.isArray(otherOrderby) && Array.isArray(zeroOrderby)) {
          if (otherOrderby.length && zeroOrderby.length) {
            if (otherOrderby.length && parseFloat(otherOrderby[0].distance) > parseFloat(zeroOrderby[0].distance)) {
              otherOrderby[0].isProximity = true
            } else {
              zeroOrderby[0].isProximity = true
            }
          } else if (otherOrderby.length) {
            otherOrderby[0].isProximity = true
          } else if (zeroOrderby.length) {
            zeroOrderby[0].isProximity = true
          }
        }
      }
      /** 再将 orderby 不为零的进行 orderby 排序 */
      otherOrderby = otherOrderby.filter(item => !!item.orderby).sort((a, b) => b.orderby - a.orderby)
    } else {
      /** 没有距离数据的话只做单纯的 orderby 排序 */
      otherOrderby = data.filter(item => !!item.orderby).sort((a, b) => b.orderby - a.orderby)
      zeroOrderby = data.filter(item => !item.orderby).sort((a, b) => b.orderby - a.orderby)
    }
  }
  /** orderby 为零的在前，不为零的在后合并数据 */
  return otherOrderby.concat(zeroOrderby)
}

export default (data, useStoreListData, searchData) => {
  /** 过滤条件 */
  if (useStoreListData) {
    if (useStoreListData.country) {
      data = data.filter(item =>
        [(item.country).toLowerCase(), (item.country_en).toLowerCase()].includes((useStoreListData.country).toLowerCase())
      )
    }
    if (useStoreListData.city) {
      data = data.filter(item =>
        item.city_en && [(item.city).toLowerCase(), (item.city_en).toLowerCase()].includes((useStoreListData.city).toLowerCase())
      )
    }
    if (useStoreListData.brand.length) { data = data.filter(i => !!useStoreListData.brand.filter(v => i.brandids.includes(v)).length) }
  }

  /**
   * 搜索条件，以下几种条件的中英文
   * 1. 国家
   * 2. 城市
   * 3. 标题
   * 4. 地址
   * 5. 品牌
   */
  searchData = searchData ? searchData.toLowerCase() : ''
  data = searchData ? data.filter(item => (`${item.country}${item.country_en}${item.city}${item.city_en}${item.title}${(item.title_en)}${item.address}${item.address_en}${item.brandids.join(',')}`).toLowerCase().includes(searchData)) : data
  /**
   * 热门展厅
   * 1. hot = 1
   * 2. 有图 > 无图
   */
  const hotModule = sortOrderbyAndDistance(data.filter(item => item.storetype !== '经销店' && !!parseInt(item.hot)).map((item) => {
    item.orderImg = item.thumbnail ? 1 : 0
    return item
  }).sort((a, b) => b.orderImg - a.orderImg))
  /**
   * 零售展厅
   * 1. hot !== 1
   * 2. type === '零售展厅'
   */
  const retailShowroom = sortOrderbyAndDistance(data.filter(item => !parseInt(item.hot) && item.storetype !== '经销店' && item.type === '零售展厅'), 'close')
  // 手机端
  const modileRetailShowroom = sortOrderbyAndDistance(data.filter(item => !parseInt(item.hot) && item.type === '零售展厅'), 'close')
  /**
   * 项目展厅
   * 1. hot !== 1
   * 2. type !== '零售展厅'
   */
  const storeShowroom = sortOrderbyAndDistance(data.filter(item => item.storetype === '经销店'))
  // 手机端
  const projectShowroom = sortOrderbyAndDistance(data.filter(item => !parseInt(item.hot) && item.type !== '零售展厅'))
  return {
    hotModule,
    retailShowroom,
    projectShowroom,
    storeShowroom,
    modileRetailShowroom
  }
}
