import wx from 'weixin-js-sdk'
import { asyncList, syncList} from './apiList'

const promisify = (obj, method, sync) => {
  const origin = obj[method].bind(obj)
  obj[method] = function({success, fail, ...otherArgs} = {}) {
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        if(sync) return resolve(origin({...otherArgs}));

        origin({
          ...otherArgs,
          success: (...args) => {
            if(success) success(...args)
            resolve(...args)
          },
          fail: (...args) => {
            if(fail) fail(...args)
            reject(...args)
          },
        })
      })
    })
  }
}

asyncList.forEach(key => promisify(wx, key))
syncList.forEach(key => promisify(wx, key, true))

export default wx
