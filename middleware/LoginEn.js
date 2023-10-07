export default function ({ store, redirect }) {
  /** 校验是否登录 */
  if (store.getters['login/checkLoginStatus']) {
    redirect('/en')
  }
}
