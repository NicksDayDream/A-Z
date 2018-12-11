<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'sroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      dafault: []
    },
    listenScroll: {
      // 默认不监听滚动事件
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: null,
      default: false
    },
    beforeScrollStart: {
      type: null,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) return // 保证dom先渲染完毕
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', pos => {
          _this.$emit('scroll', pos)
        })
      }
    },
    _enable() {
      this.scroll && this.scroll.enable()
    },
    _disable() {
      this.scroll && this.scroll.disable()
    },
    _refresh() {
      this.scroll && this.scroll.refresh()
    },
    _scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    _scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
