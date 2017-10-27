import wx from 'weixin-js-sdk'

const log = (msg, type='error') => console[type]('wx-sdk-promise: ', msg)

// 注册签名
export default ({appid, signatureUrl, debug = false, jsApiList}) => {
  if(!(appid || signatureUrl)) return log('invalid params! appid, signatureUrl should have value')
  getRequest(signatureUrl).then(({data, code}) => {
    if(code != 0) return log('get signature error!');
    const {timestamp, nonceStr, signature} = data
    wx.config({
      beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
      debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，
      // 若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appid, // 必填，企业微信的cropID
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature,// 必填，签名，见[附录1](#11974)
      jsApiList  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  })
}

const getRequest = (url, params) => {
  return new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200 ){
          resolve(JSON.parse(xmlHttp.responseText))
        }
    }

    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
  })
}
