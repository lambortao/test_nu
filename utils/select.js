/**
 * 单选数据，添加或者删除
 * @param list { array } 被操作的数组
 * @param data { string } 被添加的数据
 */
export const check = (list, data) => {
  const nowList = [...list]
  const dataIndex = nowList.indexOf(data)
  dataIndex > -1 ? nowList.splice(dataIndex, 1) : nowList.push(data)
  return nowList
}

/**
 * 全选数据，根据传入的数据来判断当前应该是全选中还是全不选
 * @param allData { array } 所有的数据
 * @param value { array } 当前已经选中的数据
 */
export const checkAll = (allData, value) => {
  const allIn = allData.every(i => value.includes(i))
  return allIn
    ? value.filter(i => !allData.includes(i))
    : value.concat(allData.filter(i => !value.includes(i)))
}
