<template>
  <div class="music-list">
    <div class="back"
      @click="back">
      <i class="icon-fanhui"></i>
    </div>
    <div class="detail">
      <i class="icon-share"></i>
    </div>
    <div class="bg-image"
      ref="bgImage"
      :style="bgStyle">
      <h1 class="title"
        ref="title"
        v-html="title"></h1>
      <div class="play-wrapper"
        ref="playBtn">
        <div class="play"
          @click="playAll">
          <i class="icon-bofang1"></i>
          <span class="text">一键播放,GO!</span>
        </div>
      </div>
      <div class="filter"
        ref="filter"></div>
    </div>
    <div class="bg-layer"
      ref="bgLayer"></div>
    <scroll :data="songs"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="_scroll"
      class="list"
      ref="scroll">
      <div class="song-list-wrapper">
        <song-list @selectSong="_selectSong"
          :songs="songs"></song-list>
      </div>
      <div v-show="!songs.length"
        class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import songList from 'base/songList/songList'
export default {
  name: '',
  components: {
    Scroll,
    Loading,
    songList
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: function() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      probeType: 3,
      listenScroll: true
    }
  },
  created() {},
  methods: {
    back() {
      this.$router.back()
    },
    playAll() {},
    _selectSong() {},
    _scroll() {}
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  mounted() {
    this.$refs.scroll.$el.style.top = this.$refs.bgImage.clientHeight + 'px'
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-fanhui {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-text;
    }
  }
  .detail {
    position: absolute;
    top: 0;
    right: 6px;
    z-index: 50;
    .icon-share {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-text;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 40;
    width: 100%;
    @include no-wrap();
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: $font-size-large;
    // font-size: 30px;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    z-index: 49;
    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: 120px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        //border: 1px solid $color-theme
        background-color: $color-theme;
        border-radius: 100px;
        font-size: 0;
        .icon-bofang1 {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song-list-wrapper {
      padding: 20px 30px;
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
