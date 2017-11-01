// 图片预览只接受http的url链接[见微信官方API]
export const previewImage = ({current, urls}) => {
  const toHttp = (url) => url.replace(/^https*/, 'http')
  return {current: toHttp(current), urls: urls.map(toHttp)}
}