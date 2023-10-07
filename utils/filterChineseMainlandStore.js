/** 过滤中国大陆的门店 */
export default function (list) {
  return (list && Array.isArray(list) && list.length)
    ? list.filter(item => item.country === '中国' && !['香港特别行政区', '澳门特别行政区', '台湾特别行政区', '台北市'].includes(item.city))
    : []
}
