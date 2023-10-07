/** vuex 数据保持 */
import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'NU_USERSDATA',
    paths: [
      'login.loginRes',
      'login.memberData',
      'login.user',
      'login.isStaff',
      'login.step',
      'product.goBackHome'
    ]
  })(store)
}
