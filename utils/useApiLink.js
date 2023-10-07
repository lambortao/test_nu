export default () => {
  const productionUrl = 'https://nineunitedtak.com/api'
  const demoUrl = 'https://nineunitedtak.com/api'
  /** 使用 demo API 的域名 */
  const demoMode = ['localhost', '192.168', '127.0.0.1', 'nineunited.brandsh.cn']
  const nowUrl = window.location.href
  return demoMode.filter(item => nowUrl.includes(item)).length ? demoUrl : productionUrl
}
