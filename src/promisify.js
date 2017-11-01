import wx from 'weixin-js-sdk'
import { asyncList, syncList} from './apiList'
import * as hook from './hook'
import {inWX, log} from './utils'

const promisify = (obj, method, sync) => {
  const origin = obj[method].bind(obj)
  obj[method] = function({success, fail, ...otherArgs} = {}) {
    return new Promise((resolve, reject) => {
      if(!inWX) return log('not in weixin') && resolve({errMsg: 'not in weixin'});

      wx.ready(() => {
        if(hook[method]) otherArgs = hook[method]({...otherArgs});
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
