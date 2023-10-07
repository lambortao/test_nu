import cn from './cn'
import en from './en'

export default (routes, resolve) => {
  const path = __dirname.substring(0, __dirname.length - 5)
  return [cn(path, resolve), en(path, resolve)]
}
