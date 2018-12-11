<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active : currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      // 自动循环
      type: Boolean,
      default: true
    },
    autoPlay: {
      // 自动轮播
      type: Boolean,
      default: true
    },
    interval: {
      // 轮播间隔
      type: Number,
      default: 3000
    }
  },
  mounted() {
    // mounted 与 created 是一个异步的 需要created拿到数据之后执行mounted
    // 初始化轮播组件
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      this.autoPlay && this._autoPlay()
    }, 20)
    // 视口宽度改变的情况
    window.addEventListener('resize', () => {
      if (!this.slider) return // 保证slider初始化完成
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize = false) {
      if (!isResize) this.children = this.$refs.sliderGroup.children
      let width = 0 // 轮播图片的总宽度
      // let sliderWidth = this.$refs.slider.clientWidth // 轮播图片父盒子的宽度
      let sliderWidth = document.body.clientWidth

      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        // 每个轮播图的宽度
        child.style.width = sliderWidth + 'px'
      }
      this.loop && !isResize
        ? (width = sliderWidth * (this.children.length + 2))
        : (width = sliderWidth * this.children.length)
      // 轮播组件容器的宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      // 初始化圆点
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, // 允许横向滚动
        scroolY: false, // 禁止纵向滚动
        momentum: false, // 惯性
        snap: true,
        loop: this.loop,
        threshold: 0.3,
        snapSpeed: 400
      })

      // 每翻一页都会派发scrollEnd事件，在这里获取currentPageIndex
      this.slider.on('scrollEnd', () => {
        let _index = this.slider.getCurrentPage().pageX
        this.currentPageIndex = _index
        // 每次翻页清除定时器并设置下一个
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._autoPlay()
        }
      })
    },
    _autoPlay() {
      let _index = this.currentPageIndex + 1
      if (_index === this.dots.length) _index = 0
      this.timer = setTimeout(() => {
        this.slider.goToPage(_index, 0, 400)
      }, this.interval)
    }
  },
  destroyed() {
    // 组件销毁的时候清除定时器
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';

.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: $font-size-small;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background: $color-text-l;
      &.active {
        background: $color-text-ll;
        width: 18px;
      }
    }
  }
}
</style>
