// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from '~store'
// 引入公共样式
import 'common/scss/index.scss'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('~components/m-header/logo@3x.png'),
  error: require('~components/m-header/logo@3x.png'),
  preLoad: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
