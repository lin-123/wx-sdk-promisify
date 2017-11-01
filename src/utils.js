
export const inWX = navigator.userAgent.toLowerCase().match('micromessenger')

export const log = (msg, type='error') => console[type]('wx-sdk-promise: ', msg)

export const getRequest = (url, params) => {
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
