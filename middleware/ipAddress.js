export default async function ({ store, route, redirect }) {
  if (!store.state.store.positionAreaCode) {
    await store.dispatch('store/useGetIpAddress')
  }
  // console.log(route, store.state.store.positionAreaCode)
  if (store.state.store.positionAreaCode === 'CN' && route.fullPath.includes('/en')) {
    const goPath = route.fullPath.split('/en')[1]
    redirect(goPath)
    return
  }
  if (store.state.store.positionAreaCode !== 'CN' && !route.fullPath.includes('/en')) {
    const goPath = route.fullPath
    redirect('/en' + goPath)
  }
}
