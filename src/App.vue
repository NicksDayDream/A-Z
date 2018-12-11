<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <transition :name="dir">
      <keep-alive>
        <!-- 会缓存不活动的组件实例，而不是销毁它们 不会重复执行生命周期钩子 -->
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Mheader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  name: 'App',
  components: {
    'm-header': Mheader,
    Tab
  },
  data() {
    return {
      dir: ''
    }
  },
  watch: {
    $route(to, from) {
      console.log('到了：' + to.meta.index, '来自：' + from.meta.index)
      if (to.meta.index > from.meta.index) {
        this.dir = 'left'
      } else if (to.meta.index < from.meta.index) {
        this.dir = 'right'
      } else if (!from.meta.index) {
        this.dir = ''
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  transition: all 0.3s;
}
.left-enter {
  transform: translate3d(100%, 0, 0);
}
.left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.right-enter {
  transform: translate3d(-100%, 0, 0);
}
.right-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
