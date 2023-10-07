export default function (str, start = 1, end = 1, middle = '****') {
  const startStr = str.slice(0, start)
  const endStr = str.slice(str.length - end, str.length)
  return startStr + middle + endStr
}
