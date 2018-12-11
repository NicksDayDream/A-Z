import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  // 如果url本身没有'?'那么加上'?',否则直接加上'&'
  url += (url.indexOf('?') < 0 ? '?' : '&') + params(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      !err ? resolve(data) : reject(err)
    })
  })
}

// 将data拼接到url后面
function params(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // url += '&' + k + '=' + encodeURIComponent(value)
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
