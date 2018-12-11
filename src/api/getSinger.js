import jsonp from '~common/js/jsonp'
import {
  commonParams,
  options
} from './config'

export function getSinger() {
  const URL = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  // 合并对象
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    g_tk: 450152082,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(URL, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  // 把公共参数和其他参数合并
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 450152082,
    singermid: singerId
  })
  return jsonp(url, data, options)
}
