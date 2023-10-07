const tracking = (val) => {
  console.log(val)
  const { action, eventName, reportBody } = val
  const reportAction = action || 'event'
  if (window.gtag) {
    if (reportBody) {
      window.gtag(reportAction, eventName, reportBody)
    } else {
      window.gtag(reportAction, eventName)
    }
  } else {
    console.log('gtag fail')
  }
}

export default tracking
