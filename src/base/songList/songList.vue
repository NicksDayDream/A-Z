<template>
  <div class="song-list">
    <ul>
      <li v-for="(song, index) in songs"
        :key="index"
        class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
        <!-- <song-rank-complex :index="index"
          v-if="showWhich()">
          <div class="content">
            <h2 class="name"
              :class="{hightLight: song.id === currentSong.id}">{{song.name}}</h2>
            <p class="desc"
              :class="{hightLight: song.id === currentSong.id}">{{getDesc(song)}}</p>
          </div>
        </song-rank-complex>
        <song-rank-simple :index="index"
          v-else>
          <div class="content">
            <h2 class="name"
              :class="{hightLight: song.id === currentSong.id}">{{song.name}}</h2>
            <p class="desc"
              :class="{hightLight: song.id === currentSong.id}">{{getDesc(song)}}</p>
          </div>
        </song-rank-simple> -->
        <!-- <div class="currentIcon"
          v-if="song.id === currentSong.id">
          <i class="icon-playing"></i>
        </div> -->
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    songs: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    getDesc(song) {
      return `${song.singer} · ${song.album}`
    }
  }
}
</script>
<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    position: relative;
    .hightLight {
      color: $color-theme !important;
    }
    &:after {
      position: absolute;
      height: 1px;
      content: '';
      background: $color-text-d;
      transform: scaleY(0.2);
      width: 100%;
      top: 100%;
      left: 0;
    }
    .currentIcon {
      position: absolute;
      right: 2px;
      font-size: $font-size-large;
      color: $color-theme;
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
    }
  }
  .name {
    @include no-wrap();
    color: $color-text-l;
    width: 240px;
  }
  .desc {
    @include no-wrap();
    margin-top: 4px;
    color: $color-text-d;
    width: 240px;
  }
}
</style>
