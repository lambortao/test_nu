export default function (req, res, next) {
  const forwarded = req.headers['x-forwarded-for']
  console.log(forwarded, 'forwarded')
  const ip = forwarded ? forwarded.split(/, /)[0] : req.connection.remoteAddress
  console.log(ip, 'middleware ip')
  req.clientIp = ip
  next()
}
