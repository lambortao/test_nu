/** 需要校验 token 的 url，这里的接口填写格式要和 axios 中调用的一致，不用填写自带的头，填写你写的那部分就行了 */
export default {
  required: [
    '/member/isStaf',
    '/member/info',
    '/member/Websiteinfo',
    // '/email/sendCode',
    '/member/getStaffInfo',
    '/member/StaffBind',
    '/member/applet/register',
    '/getLabelConfiglList',
    '/identityRegister',
    '/member/setUserInfo',
    '/mobile/set',
    '/collectList',
    '/goodsCollectToggle',
    '/delCollectList',
    '/email/bind',
    '/member/websiteChangeEmail',
    '/member/websiteChangePhone',
    '/member/changePwd',
    '/member/scanCheckmobile',
    '/material/categories',
    '/material/banner',
    '/material/list',
    '/material/bannerbind',
    '/material/details',
    '/material/en/categories',
    '/material/en/banner',
    '/material/en/list',
    '/material/en/bannerbind',
    '/material/en/details'
  ],
  /** 非强制性添加的 */
  optional: ['/reserve/list', '/getGoodsItem']
}
