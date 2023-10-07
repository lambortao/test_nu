// eslint-disable-next-line camelcase
export default ({ lat, lng, title, address, title_en, address_en, en }) => {
  if (lat && lng) {
    if (en) {
      const addressUrl = `http://api.map.baidu.com/marker?location=${lat},${lng}&title=${encodeURIComponent(title_en)}&content=${encodeURIComponent(address_en)}&output=html&src=nineunitedtak-官网`
      window.location.href = addressUrl
    } else {
      const addressUrl = `http://api.map.baidu.com/marker?location=${lat},${lng}&title=${encodeURIComponent(title)}&content=${encodeURIComponent(address)}&output=html&src=nineunitedtak-官网`
      window.location.href = addressUrl
    }
  }
}
