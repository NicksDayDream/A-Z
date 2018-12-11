<template>
  <div class="singer">
    <list-view @select="selectSinger"
      :singerData="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
// 引入获取 歌手 页面的数据js
import { getSinger } from '~api/getSinger'
// 引入常量
import { ERR_OK } from '~api/config'
// 引入格式化singer数据js
import createSinger from '~common/js/singer'
// 引入listview组件
import ListView from 'base/listview/listview'
// 引入mapMutations
import { mapMutations } from 'vuex'
const HOT_NAME = '热门'
const HOT_SINGER_NUM = 10
export default {
  name: 'Singer',
  components: {
    'list-view': ListView
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.item.id}`
      })
      this.setSinger(singer) // 传入数据
    },
    _getSinger() {
      getSinger()
        .then(res => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
            this.singers = this._normelizeSingers(res.data.list)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _normelizeSingers(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_NUM) {
          // map.hot.items.push({
          //   id: item.Fsinger_mid,
          //   name: item.Fsinger_name,
          //   avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${
          //     item.Fsinger_mid
          //   }.jpg?max_age=2592000`
          // })
          map.hot.items.push(createSinger(item))
        }
        // map 有没有这个key 没有就创建 并将这个key对应的值push到items
        let key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(createSinger(item))
      })
      let hot = []
      let ret = []
      for (let key in map) {
        if (map[key].title.match(/[a-zA-Z]/)) {
          ret.push(map[key])
        } else if (map[key].title === HOT_NAME) {
          hot.push(map[key])
        }
      }
      // ret 那字母升序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER' // this.setSinger 映射为 this.$store.commit('SET_SINGER')
    })
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
