import jsonp from '~common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'


// 获取轮播图数据
export function getRecommend() {
  const URL = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // 合并对象
  let data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(URL, data, options)
}

// 获取歌单数据
export function getDesDetail() {
  // const URL = 'https://y.qq.com/w/taoge.html'
  const URL = '/api/getDesdetaol'
  // const URL = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  // 合并对象
  let data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 0,
    sortId: 0,
    needNewCode: 0,
    catagoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(URL, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  });
}
