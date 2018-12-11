const commonParams = {
  g_tk: 5381,
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0
}

const options = {
  param: 'jsonpCallback'
}

// 语义化，表示数据请求成功
const ERR_OK = 0

export {
  commonParams,
  options,
  ERR_OK
}
