<template>
  <div class="recommend">
    <scroll ref="scroll"
      class="recommend-content"
      :data="songList">
      <div class="wrapper">
        <!-- 轮播 -->
        <div v-if="recommends.length"
          class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in recommends"
              :key="index">
              <a :href="item.linkUrl">
                <!-- fastclick 监听到dong上有这个class = needsclick 就不会阻止这个点击事件 -->
                <img class="needsclick" @load="loadImg" :src="item.picUrl"/>
            </a>
            </div>
          </slider>
        </div>
        <!-- 电台 -->
        <div class="recommend-list">
          <i class="icon-huo icon-pajian_gequliebiao_"></i>
          <h2 class="list-title">电台</h2>
          <ul v-if="radioList.length"
            class="clearfix">
            <li class="item"
              v-for="(item, index) in radioList"
              :key="index">
              <div class="icon">
                <img class="needsclick" width="100%" v-lazy="item.picUrl">
                <!-- <span class="">{{item.Ftitle}}</span> -->
                <i class="listenNum icon-bofang"
                  style="font-size: 22px;"></i>
              </div>
              <div class="text">
                <h2 class="name">{{item.Ftitle}}</h2>
                <p class="desc">{{item.radioid}}</p>
              </div>
            </li>
          </ul>
        </div>
        <!-- 热门歌单 -->
        <div class="recommend-list">
          <i class="icon-huo"></i>
          <h2 class="list-title">热门歌单</h2>
          <ul class="clearfix">
            <li class="item"
              v-for="(item, index) in songList"
              :key="index"
              @click="selectItem(item)">
              <div class="icon">
                <img class="needsclick" width="100%" v-lazy="item.picUrl">
                <span class="listenNum">{{item.accessnum}}万人听过</span>
              </div>
              <div class="text">
                <h2 class="name">{{item.songListDesc}}</h2>
                <p class="desc">{{item.songListAuthor}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container"
        v-show="!songList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
// 引入获取 推荐 页面的数据js
import { getRecommend, getDesDetail } from '~api/getRecommend'
// 引入常量
import { ERR_OK } from '~api/config'
// 引入轮播组件
import Slider from 'base/slider/slider'
// 引入滚动组件  better-scroll init和refresh必须保证dom已经渲染玩吧
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  name: 'Recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      radioList: [],
      songList: [],
      desdetaol: []
    }
  },
  created() {
    // 获取轮播数据
    this._getRecommend()
  },
  methods: {
    // 获取轮播数据
    _getRecommend() {
      getRecommend().then(res => {
        // console.log(res)
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider // 轮播图
          this.radioList = res.data.radioList // 电台
          this.songList = res.data.songList // 热门歌单
        }
      })
    },
    loadImg() {
      if (!this.imgOk) {
        // 保证轮播图片已经加载完毕后再计算高度
        this.$refs.scroll._refresh()
        this.imgOk = true // 避免重复调用
      }
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .fixed-wrapper {
    position: fixed;
    top: 86px;
    left: 0;
    width: 100%;
    padding-left: 20px;
    height: 60px;
    line-height: 60px;
    background: $color-background;
    z-index: 999;
    text-align: center;
    display: none;
    transition: all 2s;
    .icon-huo {
      float: left;
      color: red;
      font-size: $font-size-large;
    }
    .fixed-title {
      font-size: $font-size-large;
      color: $color-text-l;
      margin-left: 2px;
      float: left;
    }
  }
  .recommend-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .loading-wrapper {
      position: absolute;
      top: -80px;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      position: relative;
      .icon-huo {
        float: left;
        width: 30px;
        color: $color-theme;
        font-size: $font-size-large-x;
        height: 65px;
        line-height: 65px;
        margin-left: 20px;
      }
      .list-title {
        height: 65px;
        line-height: 65px;
        padding-left: 40px;
        font-size: $font-size-large;
        color: $color-theme;
      }
      ul {
        padding: 0 10px;
        &.clearfix:after {
          display: table;
          content: '';
          clear: both;
          height: 0;
        }
        &.clearfix {
          *zoom: 1;
        }
        .item {
          float: left;
          width: 48%;
          &:nth-child(odd) {
            margin-right: 10px;
          }
          .icon {
            position: relative;
            .listenNum {
              position: absolute;
              bottom: 10px;
              left: 5px;
            }
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 20px;
            font-size: $font-size-medium;
            margin-bottom: 10px;
          }
          .name {
            margin-bottom: 0px;
            color: $color-text-l;
            @include no-wrap();
          }
          .desc {
            color: $color-text-d;
          }
          .loading-container {
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
          .updateTip {
            position: fixed;
            display: none;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: $color-theme;
            top: 88px;
            left: 0;
          }
        }
      }
    }
  }
}
</style>
