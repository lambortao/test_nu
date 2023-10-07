export default (data, key) => {
  return data.sort((a, b) => {
    const aa = key ? a[key] : a
    const bb = key ? b[key] : b
    if (aa < bb) {
      return -1
    } else if (aa === bb) {
      return 0
    } else {
      return 1
    }
  })
}
