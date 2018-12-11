<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>

<script>
import musicList from 'components/musicList/musicList'
export default {
  name: '',
  components: {
    musicList
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
