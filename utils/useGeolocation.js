/** 定位操作 */
export default () => {
  return new Promise((resolve, reject) => {
    console.log(navigator.geolocation)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords)
        resolve(position.coords)
      }, function (err) {
        console.log(err)
        reject(new Error(err))
      })
    } else {
      reject(new Error('不支持定位'))
    }
  })
}
