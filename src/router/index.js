import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '~components/recommend/recommend'
import Singer from '~components/singer/singer'
import Rank from '~components/rank/rank'
import Search from '~components/search/search'
import SingerDetail from '~components/singerDetail/singerDetail'
import Disc from '~components/disc/disc'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      meta: {
        index: 0
      },
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      meta: {
        index: 1
      },
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      meta: {
        index: 2
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        index: 3
      }
    }
  ]
})
