<template>
  <transition name="slide">
    <music-list :songs="songs"
      :title="title"
      :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
// 引入获取歌手详情数据js
import { getSingerDetail } from 'api/getSinger'
// 引入常量
import { ERR_OK } from '~api/config'
// 引入格式化数据js
import { createSong } from 'common/js/song'
// 引入musicList组件
import musicList from 'components/musicList/musicList'
export default {
  name: 'singerDetail',
  components: {
    musicList
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      // 获取路由中的id
      // let id = this.$route.params.id
      if (!this.singer.item) {
        this.$router.push({
          path: '/singer'
        })
        return // 刷新当前页面回退到列表页面
      }
      let id = this.singer.item.id
      getSingerDetail(id)
        .then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.singer.item.name
    },
    bgImage() {
      return this.singer.item.avatar
    },
    ...mapGetters(['singer'])
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
