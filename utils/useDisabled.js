export default (sign, list) => {
  if (list.length) {
    switch (sign) {
      /** 深度与其他全部互斥 */
      case 'DEPTH':
        return !list.includes('DEPTH')

      /** 长度不能与直径深度复选 */
      case 'LENGTH':
        return !!list.includes('DIAMETER') || !!list.includes('DEPTH')

      /** 宽不能与直径深度复选 */
      case 'WIDTH':
        return !!list.includes('DIAMETER') || !!list.includes('DEPTH')

      /** 高不能与深度复选 */
      case 'HEIGHT':
        return !!list.includes('DEPTH')

      /** 直径不能与长宽深复选 */
      case 'DIAMETER':
        return !!list.includes('DEPTH') || !!list.includes('WIDTH') || !!list.includes('LENGTH')

      default:
        return false
    }
  } else {
    /** 默认全部可选 */
    return false
  }
}
