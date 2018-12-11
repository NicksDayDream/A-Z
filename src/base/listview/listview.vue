<template>
  <scroll class="singer-list"
    :data="singerData"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="_scroll"
    ref="singerList">
    <ul>
      <li v-for="(group,index) in singerData"
        :key="index"
        class="list-group"
        ref="listGroup">
        <i class="icon-huo"
          v-if="showHot && index===0"></i>
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectSinger(item,index)"
            v-for="(item,ids) in group.items"
            :key="ids"
            class="list-group-item">
            <img class="pic" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 右侧快速入口 -->
    <div class="list-shortcut"
      v-show="shortcutList.length"
      @touchstart.stop.prevent="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend="onTouchEnd">
      <!-- <span class="shortcutDot"
        ref="shortcutDot"></span>
      <div class="shortcutLight"
        ref="shortcutLight">123</div> -->
      <ul>
        <li v-for="(item, index) in shortcutList"
          :key="index"
          :data-index="index"
          class="item"
          :class="{'current' : currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed"
      v-show="fixedTitle"
      ref="fixedTitle">
      <i class="icon-huo"
        v-if="showHot"></i>
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div class="loading-container"
      v-show="!singerData.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import Loading from 'base/loading/loading'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
const HOT_NAME = '热门'
export default {
  name: '',
  props: ['singerData'],
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  methods: {
    selectSinger(item, index) {
      this.$emit('select', {
        item: item,
        index: index
      })
    },
    onTouchStart(e) {
      let anchorIndex = Number(getData(e.target, 'index'))
      this.touch.y1 = e.touches[0].pageY
      this.touch.index = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      let anchorIndex = this.touch.index + delta
      this._scrollTo(anchorIndex)
    },
    onTouchEnd(e) {},
    _scrollTo(index) {
      console.log(index)
      if (!index && index !== 0) return
      this.scrollY = -this.listHeight[index]
      this.$refs.singerList._scrollToElement(this.$refs.listGroup[index], 0)
    },
    _scroll(pos) {
      this.scrollY = pos.y
    },
    // 通过滚动到某个元素的高度计算currentIndex
    _caculateHeight() {
      this.listHeight = []
      let list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  computed: {
    shortcutList() {
      return this.singerData.map(item => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) return ''
      return this.singerData[this.currentIndex]
        ? this.singerData[this.currentIndex].title
        : ''
    },
    showHot() {
      return this.scrollY > 0 || this.fixedTitle === HOT_NAME
    }
  },
  watch: {
    singerData() {
      setTimeout(() => {
        this._caculateHeight()
      }, 20)
    },
    scrollY(newY) {
      let listHeight = this.listHeight
      // 滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 中间部分
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
        this.currentIndex = 0
      }
      // 滚动到底部
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) return
      this.fixedTop = fixedTop
      this.$refs.fixedTitle.style.transform = `translate3d(0, ${fixedTop}px, 0)` // 开启硬件加速
    }
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
.singer-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    padding-bottom: 30px;
    .icon-huo {
      float: left;
      color: $color-theme;
      font-size: 18px;
      margin: 6px 6px 0 6px;
    }
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-theme;
      background: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .pic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
        @include no-wrap();
        width: 240px;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .shortcutDot {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: $color-background;
    }
    .shortcutLight {
      position: absolute;
      right: 30px;
      top: 0;
      background: $color-theme-d;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      text-align: center;
      line-height: 60px;
      display: none;
    }
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    .icon-huo {
      float: left;
      color: $color-theme;
      font-size: 18px;
      margin: 6px 6px 0 6px;
    }
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-theme;
      background: $color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
