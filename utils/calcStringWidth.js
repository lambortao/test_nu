/**
 * 获取输入内容的长度
 * @param value
 * @return 内容的长度
 */
export default (value, width = 16) => {
  if (!value) {
    return 0
  }
  const charCount = value.split('').reduce((prev, curr) => {
    // 英文字母和数字等算一个字符；这个暂时还不完善；
    if (/\p{Unified_Ideograph}/ug.test(curr)) {
      return prev + 2
    }
    // 其他的算是2个字符
    return prev + 1
  }, 0)
  // 向上取整，防止出现半个字的情况
  console.log(charCount)
  return Math.ceil(charCount / 2) * width
}
