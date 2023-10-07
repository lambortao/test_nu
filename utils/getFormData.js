export const mergeFormData = (method, allName) => {
  const nameList = []

  method.forEach((element) => {
    const nowData = allName[element]
    if (nowData && !nameList.includes(nowData.form)) {
      nameList.push(nowData.form)
    }
  })
  return nameList
}

export const scatterFormData = (method, allName) => {
  const data = {}
  console.log(method, JSON.parse(JSON.stringify(allName)))
  method.forEach((element) => {
    const nowData = allName[element]
    if (nowData) {
      if (nowData && !data[nowData.form]) {
        data[nowData.form] = []
      }
      data[nowData.form].push(element)
    }
  })
  return data
}
