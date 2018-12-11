class Song {
  constructor({
    id,
    mid,
    singer,
    name,
    album,
    duration,
    image,
    url
  }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval, // 时长
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // 专辑图片
    // url: `http://isure.stream.qqmusic.q...${musicData.songmid}.m4a?fromtag=32`
    url: `http://dl.stream.qqmusic.qq.com/C400 ${musicData.songmid}.m4a?vkey=39328742C4B3731730FA8FBF10622F8ED1EF66D68894482468410CD8D1535999A6AC1F4CA75118E7892EEAA1460E8C580628230C40C58AF3&guid=7981028948&uin=393651460&fromtag=66`
    // 播放源
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) return ''
  singer.forEach(e => {
    ret.push(e.name)
  })
  return ret.join('/')
}

export {
  createSong
}
