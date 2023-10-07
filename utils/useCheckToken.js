/**
 * 校验url是否需要添加 token
 * @param { Array } 需要校验的接口地址
 * @param { string } 当前请求的接口地址
 */
export default (urlList, url) => urlList.filter(item => url.includes(item)).length
