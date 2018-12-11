<template>
  <div class="rank">
    <scroll :data="rankList"
      class="toplist"
      ref="scroll">
      <ul>
        <li class="item"
          v-for="(item, index) in rankList"
          :key="index">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl">
          </div>
            <ul class="songlist">
              <li class="song"
                v-for="(song, index) in item.songList"
                :key="index">
                <span>{{index + 1}}</span>
                <span>{{song.songname}} - {{song.singername}}</span>
              </li>
            </ul>
        </li>
      </ul>
      <div class="loading-container"
        v-show="!rankList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getRank } from 'api/rank'
// 引入常量
import { ERR_OK } from '~api/config'

export default {
  name: 'Rank',
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      rankList: []
    }
  },
  created() {
    this._getRank()
  },
  methods: {
    _getRank() {
      getRank()
        .then(res => {
          if (res.code === ERR_OK) {
            this.rankList = res.data.topList
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .toplist {
    height: 100%;
    overflow: hidden;
    ul {
      padding-bottom: 40px;
      .item {
        display: flex;
        margin: 20px 20px 0 20px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
        &:last-child {
          //margin-bottom: 40px
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-small;
          .song {
            @include no-wrap();
            line-height: 26px;
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
